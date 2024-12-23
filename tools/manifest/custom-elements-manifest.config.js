const overrideTypeKey = 'overrideType';
const classGenericsTypeKey = 'classGenerics';

/**
 * Docs: https://custom-elements-manifest.open-wc.org/analyzer/getting-started/
 */
export function createManifestConfig(library = '') {
  return {
    litelement: true,
    globs: [`src/${library}/**/*.ts`],
    exclude: [
      '**/*[.-]{stories,spec,test-utils}.ts',
      '**/private/*',
      '**/private.ts',
      'vite.config.ts',
    ],
    outdir: `dist/${library}`,
    dependencies: false,
    packagejson: false,
    /** @type {import('@custom-elements-manifest/analyzer').Plugin[]} */
    plugins: [
      {
        analyzePhase({ ts, node, moduleDoc }) {
          function replace(typeObj, typeName, typeValue) {
            if (typeObj && typeObj.text) {
              typeObj.text = typeObj.text.replace(typeName, typeValue);
            }
          }

          /**
           * Replaces the mixins generics types with the default value.
           *
           * It has been created mainly referencing the `SbbFormAssociatedMixin`,
           * in which it is necessary to replace the generic V type with its default (string).
           * This allows using the jsDoc `@overrideType` annotation only for cases where the default is actually overridden.
           */
          if (ts.isVariableStatement(node)) {
            node.declarationList?.declarations?.forEach((decl) => {
              if (decl.initializer?.typeParameters) {
                const moduleDeclaration = moduleDoc.declarations.find(
                  (e) => e.name === decl.name?.getText(),
                );
                decl.initializer?.typeParameters?.forEach((typeParam) => {
                  if (typeParam.default) {
                    const typeName = typeParam.name.getText();
                    let typeValue;
                    switch (typeParam.default.kind) {
                      case ts.SyntaxKind.StringKeyword:
                      case ts.SyntaxKind.NumberKeyword: {
                        typeValue = ts.tokenToString(typeParam.default.kind);
                        break;
                      }
                      case ts.SyntaxKind.TypeReference: {
                        typeValue = typeParam.default.typeName.getText();
                        break;
                      }
                      case ts.SyntaxKind.LiteralType: {
                        switch (typeParam.default.literal.kind) {
                          case ts.SyntaxKind.TrueKeyword:
                          case ts.SyntaxKind.FalseKeyword:
                          case ts.SyntaxKind.NullKeyword: {
                            typeValue = typeParam.default.literal.getText();
                            break;
                          }
                          default: {
                            typeValue = `'${typeParam.default.literal.getText()}'`;
                            break;
                          }
                        }
                        break;
                      }
                      default: {
                        // missing cases: intersection types, union types,..?
                        typeValue = typeParam.default.getText();
                        break;
                      }
                    }
                    moduleDeclaration?.members?.forEach((member) => {
                      if (member.kind === 'field') {
                        replace(member.type, typeName, typeValue);
                      }
                      if (member.kind === 'method') {
                        if (member.return) {
                          replace(member.return.type, typeName, typeValue);
                        }
                        if (member.parameters) {
                          member.parameters.forEach((parameter) => {
                            replace(parameter.type, typeName, typeValue);
                          });
                        }
                      }
                    });
                  }
                });
              }
            });
          }

          if (ts.isClassDeclaration(node)) {
            const classDeclaration = moduleDoc.declarations.find(
              (declaration) => declaration.name === node.name.getText(),
            );

            /**
             * If the class uses a generic type parameter, add it to the class declaration.
             * It will be used in the Angular wrapper to correctly generate classes.
             * Mainly used for datepicker and calendar components.
             */
            if (node.typeParameters && node.typeParameters.length > 0) {
              classDeclaration[classGenericsTypeKey] = node.typeParameters[0].getText();
            }

            /**
             * When a generic T type is used in a superclass declaration, it overrides the type defined in derived class
             * during the doc generation (as the `value` property in the `SbbFormAssociatedMixinType`).
             * Using the `@overrideType` annotation in the jsDoc's derived class allows to override the type with the correct one.
             *
             * In this phase, the script looks for all the `@overrideType` annotations,
             * and it saves them in the `classDeclaration` object as a pair <property name> / <correct type>.
             */
            node.jsDoc?.forEach((doc) => {
              doc.tags?.forEach((tag) => {
                // eslint-disable-next-line lyne/local-name-rule
                if (tag.tagName.getText() === overrideTypeKey) {
                  const [memberName, memberOverrideType] = tag.comment.split(' - ');
                  if (!classDeclaration[overrideTypeKey]) {
                    classDeclaration[overrideTypeKey] = [{ memberName, memberOverrideType }];
                  } else {
                    classDeclaration[overrideTypeKey].push({ memberName, memberOverrideType });
                  }
                }
              });
            });
          }
        },
        packageLinkPhase({ customElementsManifest }) {
          function fixModulePaths(node, pathAction) {
            for (const [key, value] of Object.entries(node)) {
              if (Array.isArray(value)) {
                value.forEach((v) => fixModulePaths(v, pathAction));
              } else if (typeof value === 'object') {
                fixModulePaths(value, pathAction);
              } else if (key === 'module' || key === 'path') {
                node[key] = pathAction(value);
              }
            }
          }
          const fixTsPathsReg = new RegExp(`^\\/?src\\/${library}\\/`);
          const fixTsPaths = (value) => value.replace(fixTsPathsReg, '').replace(/.ts$/, '.js');
          for (const module of customElementsManifest.modules) {
            fixModulePaths(module, fixTsPaths);
            for (const declaration of module.declarations.filter((d) => d.kind === 'class')) {
              // Abstract base classes are considered components even if they don't have the `customElement` annotation.
              if (declaration.name.includes('Base')) {
                delete declaration.customElement;
              }

              /**
               * Search for all the `classDeclaration` which have the `overrideTypeKey` property,
               * and update the provided property with the provided type.
               */
              if (declaration[overrideTypeKey]) {
                declaration[overrideTypeKey].forEach((overrideObj) => {
                  const memberToOverride = declaration.members.find(
                    (member) => member.name === overrideObj.memberName,
                  );
                  if (memberToOverride) {
                    memberToOverride.type = {
                      ...memberToOverride.type,
                      text: overrideObj.memberOverrideType,
                    };
                  }
                });
                delete declaration[overrideTypeKey];
              }

              for (const member of declaration.members) {
                if (member.name.startsWith('_') && member.default) {
                  const publicName = member.name.replace(/^_/, '');
                  const publicMember = declaration.members.find((m) => m.name === publicName);
                  if (publicMember) {
                    publicMember.default = member.default;
                  }
                }

                /**
                 * If an element extends a base class, and the base class implements a mixin and overrides some of its property,
                 * the overriding is not considered during the manifest generation because the inheritance chain
                 * is traversed from the outer to the inner element and not vice versa as expected.
                 *
                 * A practical example is the `form` property (get/set) in the button-base-element, which overrides the `form` getter in the form-associated-mixin;
                 * however, the changes are not reflected in the manifest, which mark the `form` member as `readonly`.
                 * This behavior is problematic when the Angular classes are generated, so a manual override must be done.
                 * The corresponding attribute field is not changed, so it can be used as a 'baseline'.
                 */
                const matchedAttribute = declaration.attributes?.find(
                  (e) =>
                    e.name === member.name &&
                    member.inheritedFrom &&
                    e.inheritedFrom &&
                    e.inheritedFrom?.name !== member.inheritedFrom?.name,
                );
                if (matchedAttribute) {
                  delete member.readonly;
                  member.description = matchedAttribute.description;
                  member.inheritedFrom = matchedAttribute.inheritedFrom;
                }
              }
            }
          }
          const reexportModules = [];
          const moduleMapping = new Map();
          for (const moduleEntry of customElementsManifest.modules) {
            if (
              !reexportModules.includes(moduleEntry) &&
              moduleEntry.exports?.length &&
              moduleEntry.exports.some((e) => e.name !== '*')
            ) {
              const reexportPath = moduleEntry.path.replace(/\/[\w-]+\.js/, '.js');
              const reexportModule = customElementsManifest.modules.find(
                (m) => m.path === reexportPath,
              );
              if (reexportModule) {
                moduleMapping.set(moduleEntry.path, reexportModule.path);
                reexportModules.push(reexportModule);
                reexportModule.declarations.push(...moduleEntry.declarations);
                for (const entry of moduleEntry.exports) {
                  entry.declaration.module = reexportModule.path;
                }
                reexportModule.exports = reexportModule.exports.filter(
                  (e) =>
                    e.name !== '*' ||
                    moduleEntry.path ===
                      reexportModule.path.replace(/\/[\w-]+\.js/, '') +
                        e.declaration.package.substring(2),
                );
                reexportModule.exports.push(...moduleEntry.exports);
                customElementsManifest.modules = customElementsManifest.modules.filter(
                  (m) => m !== moduleEntry,
                );
              }
            }
          }
          fixModulePaths(customElementsManifest, (value) => moduleMapping.get(value) ?? value);
        },
      },
    ],
  };
}
