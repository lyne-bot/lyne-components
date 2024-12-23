import { ESLintUtils, type TSESTree } from '@typescript-eslint/utils';

export default ESLintUtils.RuleCreator.withoutDocs({
  create(context) {
    return {
      ['MethodDefinition > Decorator[expression.callee.name="property"]'](
        node: TSESTree.Decorator,
      ) {
        if (
          node.expression.type !== 'CallExpression' ||
          !node.expression.arguments.length ||
          node.expression.arguments[0].type !== 'ObjectExpression' ||
          node.expression.arguments[0].properties.every(
            (p) => p.type !== 'Property' || p.key.type !== 'Identifier' || p.key.name !== 'reflect',
          )
        ) {
          return;
        }

        const propertySetter = node.parent as TSESTree.MethodDefinition;
        const backingPropertyName = `_${(propertySetter.key as TSESTree.Identifier).name}`;
        const backingProperty = propertySetter.parent.body.find(
          (n): n is TSESTree.PropertyDefinition =>
            n.type === 'PropertyDefinition' &&
            n.key.type === 'Identifier' &&
            n.key.name === backingPropertyName,
        );

        if (
          backingProperty?.value &&
          (backingProperty.value.type !== 'Literal' ||
            ![null, false].includes(backingProperty.value.value as any))
        ) {
          context.report({
            node: backingProperty,
            messageId: 'propertyDecoratorSetterInitializer',
          });
        }
      },
    };
  },
  meta: {
    docs: {
      description:
        'Backing fields for setters with the @property decorators must be initialized in the constructor via setter',
    },
    messages: {
      propertyDecoratorSetterInitializer:
        'Backing fields for setters with the @property decorators must be initialized in the constructor via setter',
    },
    fixable: 'code',
    type: 'problem',
    schema: [],
  },
  defaultOptions: [],
});
