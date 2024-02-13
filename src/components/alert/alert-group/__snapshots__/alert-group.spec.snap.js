/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-alert-group should render Dom"] = 
`<sbb-alert-group
  accessibility-level="3"
  accessibility-title="Disruptions"
  role="status"
>
  <sbb-alert
    data-state="opening"
    href="https://www.sbb.ch"
    size="m"
    title-content="Interruption between Genève and Lausanne"
  >
    The rail traffic between Allaman and Morges is interrupted. All trains are cancelled.
  </sbb-alert>
</sbb-alert-group>
`;
/* end snapshot sbb-alert-group should render Dom */

snapshots["sbb-alert-group should render ShadowDom"] = 
`<div class="sbb-alert-group">
  <h2 class="sbb-alert-group__title">
    <slot name="accessibility-title">
      Disruptions
    </slot>
  </h2>
  <slot>
  </slot>
</div>
`;
/* end snapshot sbb-alert-group should render ShadowDom */

snapshots["sbb-alert-group should render A11y tree Chrome"] = 
`<p>
  {
  "role": "WebArea",
  "name": "",
  "children": [
    {
      "role": "heading",
      "name": "Disruptions",
      "level": 2
    },
    {
      "role": "heading",
      "name": "Interruption between Genève and Lausanne",
      "level": 3
    },
    {
      "role": "text",
      "name": "The rail traffic between Allaman and Morges is interrupted. All trains are cancelled. "
    },
    {
      "role": "link",
      "name": "Find out more",
      "children": [
        {
          "role": "link",
          "name": "Find out more"
        }
      ]
    },
    {
      "role": "button",
      "name": "Close message"
    }
  ]
}
</p>
`;
/* end snapshot sbb-alert-group should render A11y tree Chrome */

snapshots["sbb-alert-group should render A11y tree Firefox"] = 
`<p>
  {
  "role": "document",
  "name": "",
  "children": [
    {
      "role": "heading",
      "name": "Disruptions",
      "level": 2
    },
    {
      "role": "heading",
      "name": "Interruption between Genève and Lausanne",
      "level": 3
    },
    {
      "role": "text leaf",
      "name": "The rail traffic between Allaman and Morges is interrupted. All trains are cancelled. "
    },
    {
      "role": "link",
      "name": "Find out more",
      "children": [
        {
          "role": "link",
          "name": "Find out more",
          "value": "https://www.sbb.ch/"
        }
      ]
    },
    {
      "role": "button",
      "name": "Close message"
    }
  ]
}
</p>
`;
/* end snapshot sbb-alert-group should render A11y tree Firefox */

snapshots["sbb-alert-group should render A11y tree Safari"] = 
`<p>
  {
  "role": "WebArea",
  "name": "",
  "children": [
    {
      "role": "heading",
      "name": "Disruptions",
      "level": 2
    },
    {
      "role": "heading",
      "name": "Interruption between Genève and Lausanne",
      "level": 3
    },
    {
      "role": "text",
      "name": "The rail traffic between Allaman and Morges is interrupted. All trains are cancelled."
    },
    {
      "role": "link",
      "name": "",
      "children": [
        {
          "role": "link",
          "name": "Find out more",
          "children": [
            {
              "role": "text",
              "name": "Find out more"
            }
          ]
        }
      ]
    },
    {
      "role": "button",
      "name": "Close message"
    }
  ]
}
</p>
`;
/* end snapshot sbb-alert-group should render A11y tree Safari */

