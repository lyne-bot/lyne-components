/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-link-list should render named slots if data-ssr-child-count attribute is set"] = 
`<div class="sbb-link-list-wrapper">
  <sbb-title
    aria-level="2"
    class="sbb-link-list-title"
    id="sbb-link-list-title-id"
    level="2"
    role="heading"
    visual-level="5"
  >
    <slot name="title">
    </slot>
  </sbb-title>
  <ul
    aria-labelledby="sbb-link-list-title-id"
    class="sbb-link-list"
  >
    <li>
      <slot name="li-0">
      </slot>
    </li>
    <li>
      <slot name="li-1">
      </slot>
    </li>
    <li>
      <slot name="li-2">
      </slot>
    </li>
  </ul>
  <span hidden="">
    <slot>
    </slot>
  </span>
</div>
`;
/* end snapshot sbb-link-list should render named slots if data-ssr-child-count attribute is set */

snapshots["sbb-link-list rendered with a slotted title in light DOM"] = 
`<sbb-link-list
  data-slot-names="li-0 li-1 li-2 li-3 li-4 title"
  orientation="vertical"
  size="s"
  title-level="2"
>
  <span slot="title">
    Help & Contact
  </span>
  <sbb-link
    data-slot-names="unnamed"
    dir="ltr"
    href="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html"
    role="link"
    size="s"
    slot="li-0"
    tabindex="0"
    variant="block"
  >
    Rückerstattungen
  </sbb-link>
  <sbb-link
    data-slot-names="unnamed"
    dir="ltr"
    href="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html"
    role="link"
    size="s"
    slot="li-1"
    tabindex="0"
    variant="block"
  >
    Fundbüro
  </sbb-link>
  <sbb-link
    data-slot-names="unnamed"
    dir="ltr"
    href="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html"
    role="link"
    size="s"
    slot="li-2"
    tabindex="0"
    variant="block"
  >
    Beschwerden
  </sbb-link>
  <sbb-link
    data-slot-names="unnamed"
    dir="ltr"
    href="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html"
    role="link"
    size="s"
    slot="li-3"
    tabindex="0"
    variant="block"
  >
    Lob aussprechen
  </sbb-link>
  <sbb-link
    data-slot-names="unnamed"
    dir="ltr"
    href="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html"
    role="link"
    size="s"
    slot="li-4"
    tabindex="0"
    variant="block"
  >
    Sachbeschädigung melden
  </sbb-link>
</sbb-link-list>
`;
/* end snapshot sbb-link-list rendered with a slotted title in light DOM */

snapshots["sbb-link-list rendered with a slotted title in shadow DOM"] = 
`<div class="sbb-link-list-wrapper">
  <sbb-title
    aria-level="2"
    class="sbb-link-list-title"
    id="sbb-link-list-title-id"
    level="2"
    role="heading"
    visual-level="5"
  >
    <slot name="title">
    </slot>
  </sbb-title>
  <ul
    aria-labelledby="sbb-link-list-title-id"
    class="sbb-link-list"
  >
    <li>
      <slot name="li-0">
      </slot>
    </li>
    <li>
      <slot name="li-1">
      </slot>
    </li>
    <li>
      <slot name="li-2">
      </slot>
    </li>
    <li>
      <slot name="li-3">
      </slot>
    </li>
    <li>
      <slot name="li-4">
      </slot>
    </li>
  </ul>
  <span hidden="">
    <slot>
    </slot>
  </span>
</div>
`;
/* end snapshot sbb-link-list rendered with a slotted title in shadow DOM */

snapshots["sbb-link-list rendered with a slotted title A11y tree Chrome"] = 
`<p>
  {
  "role": "WebArea",
  "name": ""
}
</p>
`;
/* end snapshot sbb-link-list rendered with a slotted title A11y tree Chrome */

snapshots["sbb-link-list rendered with a title from properties in light DOM"] = 
`<sbb-link-list
  data-slot-names="li-0 li-1 li-2 li-3 li-4"
  orientation="vertical"
  size="s"
  title-content="Help &amp; Contact"
  title-level="2"
>
  <sbb-link
    data-slot-names="unnamed"
    dir="ltr"
    href="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html"
    role="link"
    size="s"
    slot="li-0"
    tabindex="0"
    variant="block"
  >
    Rückerstattungen
  </sbb-link>
  <sbb-link
    data-slot-names="unnamed"
    dir="ltr"
    href="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html"
    role="link"
    size="s"
    slot="li-1"
    tabindex="0"
    variant="block"
  >
    Fundbüro
  </sbb-link>
  <sbb-link
    data-slot-names="unnamed"
    dir="ltr"
    href="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html"
    role="link"
    size="s"
    slot="li-2"
    tabindex="0"
    variant="block"
  >
    Beschwerden
  </sbb-link>
  <sbb-link
    data-slot-names="unnamed"
    dir="ltr"
    href="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html"
    role="link"
    size="s"
    slot="li-3"
    tabindex="0"
    variant="block"
  >
    Lob aussprechen
  </sbb-link>
  <sbb-link
    data-slot-names="unnamed"
    dir="ltr"
    href="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html"
    role="link"
    size="s"
    slot="li-4"
    tabindex="0"
    variant="block"
  >
    Sachbeschädigung melden
  </sbb-link>
</sbb-link-list>
`;
/* end snapshot sbb-link-list rendered with a title from properties in light DOM */

snapshots["sbb-link-list rendered with a title from properties in shadow DOM"] = 
`<div class="sbb-link-list-wrapper">
  <sbb-title
    aria-level="2"
    class="sbb-link-list-title"
    id="sbb-link-list-title-id"
    level="2"
    role="heading"
    visual-level="5"
  >
    <slot name="title">
      Help & Contact
    </slot>
  </sbb-title>
  <ul
    aria-labelledby="sbb-link-list-title-id"
    class="sbb-link-list"
  >
    <li>
      <slot name="li-0">
      </slot>
    </li>
    <li>
      <slot name="li-1">
      </slot>
    </li>
    <li>
      <slot name="li-2">
      </slot>
    </li>
    <li>
      <slot name="li-3">
      </slot>
    </li>
    <li>
      <slot name="li-4">
      </slot>
    </li>
  </ul>
  <span hidden="">
    <slot>
    </slot>
  </span>
</div>
`;
/* end snapshot sbb-link-list rendered with a title from properties in shadow DOM */

snapshots["sbb-link-list rendered without a title in light DOM"] = 
`<sbb-link-list
  data-slot-names="li-0 li-1 li-2 li-3 li-4"
  orientation="vertical"
  size="s"
>
  <sbb-link
    data-slot-names="unnamed"
    dir="ltr"
    href="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html"
    role="link"
    size="s"
    slot="li-0"
    tabindex="0"
    variant="block"
  >
    Rückerstattungen
  </sbb-link>
  <sbb-link
    data-slot-names="unnamed"
    dir="ltr"
    href="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html"
    role="link"
    size="s"
    slot="li-1"
    tabindex="0"
    variant="block"
  >
    Fundbüro
  </sbb-link>
  <sbb-link
    data-slot-names="unnamed"
    dir="ltr"
    href="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html"
    role="link"
    size="s"
    slot="li-2"
    tabindex="0"
    variant="block"
  >
    Beschwerden
  </sbb-link>
  <sbb-link
    data-slot-names="unnamed"
    dir="ltr"
    href="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html"
    role="link"
    size="s"
    slot="li-3"
    tabindex="0"
    variant="block"
  >
    Lob aussprechen
  </sbb-link>
  <sbb-link
    data-slot-names="unnamed"
    dir="ltr"
    href="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html"
    role="link"
    size="s"
    slot="li-4"
    tabindex="0"
    variant="block"
  >
    Sachbeschädigung melden
  </sbb-link>
</sbb-link-list>
`;
/* end snapshot sbb-link-list rendered without a title in light DOM */

snapshots["sbb-link-list rendered without a title in shadow DOM"] = 
`<div class="sbb-link-list-wrapper">
  <sbb-title
    aria-level="2"
    class="sbb-link-list-title"
    id="sbb-link-list-title-id"
    level="2"
    role="heading"
    visual-level="5"
  >
    <slot name="title">
    </slot>
  </sbb-title>
  <ul
    aria-labelledby="sbb-link-list-title-id"
    class="sbb-link-list"
  >
    <li>
      <slot name="li-0">
      </slot>
    </li>
    <li>
      <slot name="li-1">
      </slot>
    </li>
    <li>
      <slot name="li-2">
      </slot>
    </li>
    <li>
      <slot name="li-3">
      </slot>
    </li>
    <li>
      <slot name="li-4">
      </slot>
    </li>
  </ul>
  <span hidden="">
    <slot>
    </slot>
  </span>
</div>
`;
/* end snapshot sbb-link-list rendered without a title in shadow DOM */

snapshots["sbb-link-list rendered with a slotted title A11y tree Firefox"] = 
`<p>
  {
  "role": "document",
  "name": ""
}
</p>
`;
/* end snapshot sbb-link-list rendered with a slotted title A11y tree Firefox */

snapshots["sbb-link-list rendered with a slotted title A11y tree Safari"] = 
`<p>
  {
  "role": "WebArea",
  "name": ""
}
</p>
`;
/* end snapshot sbb-link-list rendered with a slotted title A11y tree Safari */

