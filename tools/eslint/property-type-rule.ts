import { ESLintUtils, type TSESLint, type TSESTree } from '@typescript-eslint/utils';

export default ESLintUtils.RuleCreator.withoutDocs({
  create(context) {
    return {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      AccessorProperty(node) {
        if (node.accessibility !== 'public' || node.static || node.readonly) {
          return;
        } else if (node.typeAnnotation) {
          // Continue to the rules below
        } else if (node.value?.type === 'Literal') {
          const fix: TSESLint.ReportFixFunction | null =
            typeof node.value.value === 'boolean'
              ? (fixer) => fixer.insertTextAfter(node.key, ': boolean')
              : typeof node.value.value === 'number'
                ? (fixer) => fixer.insertTextAfter(node.key, ': number')
                : typeof node.value.value === 'string'
                  ? (fixer) => fixer.insertTextAfter(node.key, ': string')
                  : null;
          context.report({
            node,
            messageId: 'propertyTypeTypeAnnotation',
            fix,
          });
          return;
        } else {
          return;
        }

        const propertyTypes = node.typeAnnotation
          ? context.sourceCode
              .getText(node.typeAnnotation!.typeAnnotation)
              .split('|')
              .map((t) => t.trim())
              .filter(Boolean)
          : [];
        const fixDualNullishTypes: TSESLint.ReportFixFunction | null =
          propertyTypes.length === 2
            ? (fixer) =>
                fixer.replaceText(
                  node.typeAnnotation!.typeAnnotation,
                  propertyTypes.find((t) => t !== 'undefined' && t !== 'null')!,
                )
            : null;
        const primitiveTypes = ['boolean', 'number', 'string'];
        if (propertyTypes.includes('undefined')) {
          context.report({
            node: node.typeAnnotation!.typeAnnotation,
            messageId: 'propertyTypeRuleNoUndefined',
            fix: fixDualNullishTypes,
          });
        } else if (
          propertyTypes.includes('null') &&
          propertyTypes.length === 2 &&
          primitiveTypes.some((t) => propertyTypes.includes(t))
        ) {
          context.report({
            node: node.typeAnnotation!.typeAnnotation,
            messageId: 'propertyTypeRuleNoNull',
            fix: fixDualNullishTypes,
          });
        }

        if (node.definite) {
          context.report({
            node: node.typeAnnotation!.typeAnnotation,
            messageId: 'propertyTypeRuleNoDefinite',
            fix: (fixer) => fixer.remove(context.sourceCode.getTokenAfter(node.key)!),
          });
        }

        if (
          !node.parent.parent.declare &&
          propertyTypes.length === 1 &&
          primitiveTypes.includes(propertyTypes[0]) &&
          !node.value
        ) {
          const defaults: Record<string, string> = {
            boolean: 'false',
            number: 'NaN',
            string: `''`,
          };
          context.report({
            node,
            messageId: 'propertyTypeRuleInitializer',
            fix: (fixer) =>
              fixer.insertTextAfter(node.typeAnnotation!, ` = ${defaults[propertyTypes[0]!]!}`),
          });
        }

        if (
          !node.parent.parent.declare &&
          propertyTypes.length === 1 &&
          primitiveTypes.includes(propertyTypes[0]) &&
          node.decorators.every(
            (d) =>
              d.expression.type !== 'CallExpression' ||
              (d.expression.callee as TSESTree.Identifier).name !== 'forceType',
          )
        ) {
          context.report({
            node,
            messageId: 'propertyTypeForceType',
            fix: (fixer) =>
              node.decorators.length
                ? fixer.insertTextAfter(node.decorators.at(-1)!, ` @forceType() `)
                : fixer.insertTextBefore(node, ` @forceType() `),
          });
        }

        const propertyDecorator = node.decorators.find(
          (d) =>
            d.expression.type === 'CallExpression' &&
            d.expression.callee.type === 'Identifier' &&
            d.expression.callee.name === 'property',
        );
        if (
          propertyDecorator &&
          (propertyDecorator.expression as TSESTree.CallExpression).arguments[0]?.type ===
            'ObjectExpression'
        ) {
          const options = (propertyDecorator.expression as TSESTree.CallExpression)
            .arguments[0] as TSESTree.ObjectExpression;
          if (
            options.properties.some(
              (p) =>
                p.type === 'Property' && p.key.type === 'Identifier' && p.key.name === 'reflect',
            ) &&
            options.properties.every(
              (p) =>
                p.type !== 'Property' || p.key.type !== 'Identifier' || p.key.name !== 'converter',
            ) &&
            node.value?.type === 'Literal' &&
            (node.value.value === '' || Number.isNaN(node.value.value as number))
          ) {
            context.report({
              node: propertyDecorator,
              messageId: 'propertyTypeConverter',
              fix: (fixer) =>
                fixer.insertTextAfter(
                  options.properties.at(-1)!,
                  ', converter: omitEmptyConverter',
                ),
            });
          }
        }
      },
    };
  },
  meta: {
    docs: {
      description: 'Properties should avoid certain type combinatios',
    },
    messages: {
      propertyTypeTypeAnnotation: 'Properties should have a type annotation.',
      propertyTypeRuleNoUndefined:
        'Accessor properties should not use undefined. Use null if necessary.',
      propertyTypeRuleNoNull: 'Accessor properties should not use null with primitive tyes.',
      propertyTypeRuleNoDefinite:
        'Accessor properties should not use ! assignment. Initialize with null if necessary.',
      propertyTypeRuleInitializer: 'Primitive accessor properties should have an initializer.',
      propertyTypeForceType: 'Primitive properties should use the @forceType() decorator.',
      propertyTypeConverter: `Properties with '' or NaN initializers should use omitEmptyConverter converter.`,
    },
    fixable: 'code',
    type: 'problem',
    schema: [],
  },
  defaultOptions: [],
});
