import { h } from 'jsx-dom';
import readme from './readme.md';
import isChromatic from 'chromatic/isChromatic';

// eslint-disable-next-line no-unused-vars
import styles from './typo-internal.scss';

const text = `Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.`;

const TextTemplate = () =>
  ['xxs', 'xs', 's', 'm', 'l', 'xl'].map((textSize, index, sizes) => [
    <sbb-title level={sizes.length - index}>
      Titel Level {sizes.length - index} / Text size {textSize}
    </sbb-title>,
    <p class={`sbb-text-${textSize}`} style="margin-block-start:0">
      {text}
    </p>,
  ]);

const TextBoldTemplate = () =>
  ['xxs', 'xs', 's', 'm', 'l', 'xl'].map((textSize, index, sizes) => [
    <sbb-title level={sizes.length - index}>
      Titel Level {sizes.length - index} / Text size {textSize}
    </sbb-title>,
    <p class={`sbb-text-${textSize} sbb-text-bold`} style="margin-block-start:0">
      {text}
    </p>,
  ]);

const LegendSubSupTemplate = () => [
  <p class="sbb-text-m">
    A sentence with a<sub>subscript</sub> character.
  </p>,
  <span class="sbb-legend">
    <sup>1</sup>&nbsp;Legend text which is small and should be placed at the end.
  </span>,
];

const LinkInlineTemplate = () => (
  <p class="sbb-text-m">
    A text with a link inside{' '}
    <a href="" class="sbb-link-inline">
      the text
    </a>
    . It should adapt to the text but have an underline and hover colors.
  </p>
);

const LinkInlineNegativeTemplate = () => (
  <p
    class="sbb-text-m"
    style="background-color:var(--sbb-color-charcoal-default);color:var(--sbb-color-white-default);padding:1rem;"
  >
    A text with a negative link inside{' '}
    <a href="" class="sbb-link-inline-negative">
      the text
    </a>
    . It should adapt to the text but have an underline and hover colors.
  </p>
);

export const Text = TextTemplate.bind({});
export const TextBold = TextBoldTemplate.bind({});
export const LegendSubSup = LegendSubSupTemplate.bind({});
export const LinkInline = LinkInlineTemplate.bind({});
export const LinkInlineNegative = LinkInlineNegativeTemplate.bind({});

function config() {
  return {
    excludeStories: isChromatic() ? [] : ['LinkInline', 'LinkInlineNegative'],
    decorators: [
      (Story) => (
        <div style={'padding: 2rem'}>
          <Story />
        </div>
      ),
    ],
    parameters: {
      chromatic: { disableSnapshot: false },
      docs: {
        extractComponentDescription: () => readme,
      },
      layout: 'fullscreen',
    },
    title: 'styles/typography',
  };
}

export default config();
