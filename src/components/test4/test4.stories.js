import { text, withKnobs } from '@storybook/addon-knobs';
import { h } from 'jsx-dom';
import { withA11y } from '@storybook/addon-a11y';
import readme from './readme.md';

const textLabel = 'Sample Text';

export const level1 = () => <lyne-test4
  text={text(textLabel, 'Text 1')}
/>;

export const level2 = () => <lyne-test4
  text={text(textLabel, 'Text 2')}
/>;

export const level3 = () => <lyne-test4
  text={text(textLabel, 'Text 3')}
/>;

export const level4 = () => <lyne-test4
  text={text(textLabel, 'Text 4')}
/>;

export const level5 = () => <lyne-test4
  text={text(textLabel, 'Text 5')}
/>;

export const level6 = () => <lyne-test4
  text={text(textLabel, 'Text 6')}
/>;

export const level7 = () => <lyne-test4
  text={text(textLabel, 'Text 7')}
/>;

export const level8 = () => <lyne-test4
  text={text(textLabel, 'Text 8')}
/>;

export default {
  decorators: [
    withKnobs,
    withA11y
  ],
  title: 'Lyne Test 4',
  parameters: {
    chromatic: {
      viewports: [
        320,
        764,
        1201
      ]
    },
    docs: {
      extractComponentDescription: () => {
        return readme;
      }
    }
  }
};
