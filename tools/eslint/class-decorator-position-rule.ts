import { ESLintUtils, type TSESTree } from '@typescript-eslint/utils';

export default ESLintUtils.RuleCreator.withoutDocs({
  create(context) {
    return {
      ['ClassDeclaration > Decorator'](node: TSESTree.Decorator) {
        const classDeclaration = node.parent as TSESTree.ClassDeclaration;
        const exportNamedDeclaration = classDeclaration.parent as TSESTree.ExportNamedDeclaration;
        if (exportNamedDeclaration.type !== 'ExportNamedDeclaration') {
          return;
        }

        const exportKeyword = context.sourceCode.getFirstToken(exportNamedDeclaration)!;
        if (exportKeyword.value !== 'export') {
          throw new Error(
            `We expect the first token of a ExportNamedDeclaration to be the 'export' keyword!`,
          );
        }

        const firstDecorator = classDeclaration.decorators[0];
        if (exportKeyword.range[0] < firstDecorator.range[0]) {
          return;
        }

        context.report({
          node,
          messageId: 'classDecoratorPosition',
          fix: (fixer) => [
            fixer.remove(exportKeyword),
            fixer.insertTextBefore(firstDecorator, 'export '),
          ],
        });
      },
    };
  },
  meta: {
    messages: {
      classDecoratorPosition: 'Class decorators must be after the export keyword',
    },
    fixable: 'code',
    type: 'problem',
    schema: [],
  },
  defaultOptions: [],
});
