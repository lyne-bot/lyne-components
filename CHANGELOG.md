# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [1.12.1](https://github.com/sbb-design-systems/lyne-components/compare/v1.12.0...v1.12.1) (2024-10-03)


### Bug Fixes

* fix list colors ([#3126](https://github.com/sbb-design-systems/lyne-components/issues/3126)) ([44c2810](https://github.com/sbb-design-systems/lyne-components/commit/44c2810268e29760dbfb5e6cf8b0676ac501a3e3)), closes [#3123](https://github.com/sbb-design-systems/lyne-components/issues/3123)
* **sbb-image:** fix skipLqip mode ([#3131](https://github.com/sbb-design-systems/lyne-components/issues/3131)) ([4519006](https://github.com/sbb-design-systems/lyne-components/commit/4519006b6513d4c5963675c4a1e0028ae2d27b84))
* **sbb-image:** introduce css property to configure object-fit ([#3134](https://github.com/sbb-design-systems/lyne-components/issues/3134)) ([5a4ae41](https://github.com/sbb-design-systems/lyne-components/commit/5a4ae416e02b42d47ff35a0887d036b2b6900f0e)), closes [#3133](https://github.com/sbb-design-systems/lyne-components/issues/3133)
* **sbb-radio-group:** avoid focusing disabled radios ([#3125](https://github.com/sbb-design-systems/lyne-components/issues/3125)) ([e4745c4](https://github.com/sbb-design-systems/lyne-components/commit/e4745c4cf50a2ab2c8c6e3e0090971c0e0626834))
* **sbb-teaser:** allow teaser usage in flexible layouts ([#3140](https://github.com/sbb-design-systems/lyne-components/issues/3140)) ([a51507b](https://github.com/sbb-design-systems/lyne-components/commit/a51507bf2af94a5cb8b91e9028fcc333da28cbf2)), closes [#3136](https://github.com/sbb-design-systems/lyne-components/issues/3136)

## [1.12.0](https://github.com/sbb-design-systems/lyne-components/compare/v1.11.3...v1.12.0) (2024-09-26)


### Features

* add sbb-icon-list styles ([#3038](https://github.com/sbb-design-systems/lyne-components/issues/3038)) ([d081288](https://github.com/sbb-design-systems/lyne-components/commit/d08128823044eef07722bec574628839e826d599))
* **sbb-journey-summary:** provide a11y footpath property ([#3104](https://github.com/sbb-design-systems/lyne-components/issues/3104)) ([05c6d1a](https://github.com/sbb-design-systems/lyne-components/commit/05c6d1a7828f4c4aad23f5a9aca5ef5cf047d5b3))
* **sbb-paginator:** initial implementation ([#2982](https://github.com/sbb-design-systems/lyne-components/issues/2982)) ([8306362](https://github.com/sbb-design-systems/lyne-components/commit/83063628c88a6db6cc01acbaf6d9c04083b9c8a6))
* **sbb-slider:** implement native form support ([#3071](https://github.com/sbb-design-systems/lyne-components/issues/3071)) ([ad35f2f](https://github.com/sbb-design-systems/lyne-components/commit/ad35f2f8169768fd52ee08fad9aba45d0f5c315b))


### Bug Fixes

* **sbb-radio-group:** disable focus when disabling radio ([#3116](https://github.com/sbb-design-systems/lyne-components/issues/3116)) ([6453b6b](https://github.com/sbb-design-systems/lyne-components/commit/6453b6b9c77e8032171e04698f8ed7658e7869d5))

## [1.11.3](https://github.com/sbb-design-systems/lyne-components/compare/v1.11.2...v1.11.3) (2024-09-24)


### Bug Fixes

* provide jsdom support for focus trap mechanism ([#3113](https://github.com/sbb-design-systems/lyne-components/issues/3113)) ([57179c1](https://github.com/sbb-design-systems/lyne-components/commit/57179c186aa28cb651ad3386059fbe2a95ee2082))

## [1.11.2](https://github.com/sbb-design-systems/lyne-components/compare/v1.11.1...v1.11.2) (2024-09-23)


### Bug Fixes

* prevent using HTMLElement in SSR context ([#3107](https://github.com/sbb-design-systems/lyne-components/issues/3107)) ([333e90e](https://github.com/sbb-design-systems/lyne-components/commit/333e90e867729bdb73fb2d3b150ce1b96c407be3))
* respect disabled interactive elements in focus trap ([#3108](https://github.com/sbb-design-systems/lyne-components/issues/3108)) ([fb0a1bb](https://github.com/sbb-design-systems/lyne-components/commit/fb0a1bba0aa4b83c8fe91b892af7d5baa6e8adba)), closes [#3109](https://github.com/sbb-design-systems/lyne-components/issues/3109)

## [1.11.1](https://github.com/sbb-design-systems/lyne-components/compare/v1.11.0...v1.11.1) (2024-09-20)


### Bug Fixes

* assign correct dependency versions for published packages ([#3102](https://github.com/sbb-design-systems/lyne-components/issues/3102)) ([ed99ce9](https://github.com/sbb-design-systems/lyne-components/commit/ed99ce9d3bea5b49c4919908b5c9680feb5fd2ab)), closes [#3100](https://github.com/sbb-design-systems/lyne-components/issues/3100)

## [1.11.0](https://github.com/sbb-design-systems/lyne-components/compare/v1.10.0...v1.11.0) (2024-09-19)


### Features

* **sbb-header:** introduce size s ([#3047](https://github.com/sbb-design-systems/lyne-components/issues/3047)) ([cd60922](https://github.com/sbb-design-systems/lyne-components/commit/cd60922f59af898f5875a3d6e9d378a1cf118080))
* **sbb-map-container:** allow config of sticky offset on mobile ([#3092](https://github.com/sbb-design-systems/lyne-components/issues/3092)) ([520d812](https://github.com/sbb-design-systems/lyne-components/commit/520d8122899ba0281cf60f07f697002dbde407de)), closes [#3091](https://github.com/sbb-design-systems/lyne-components/issues/3091)


### Bug Fixes

* introduce disabledInteractive property and revert focusing disabled actions in general ([#3096](https://github.com/sbb-design-systems/lyne-components/issues/3096)) ([74b3e6f](https://github.com/sbb-design-systems/lyne-components/commit/74b3e6f880cf22e5868ff6619855fafd73f60b2e))

## [1.10.0](https://github.com/sbb-design-systems/lyne-components/compare/v1.9.0...v1.10.0) (2024-09-12)


### Features

* keep action elements focusable when disabled ([#3040](https://github.com/sbb-design-systems/lyne-components/issues/3040)) ([a9410ba](https://github.com/sbb-design-systems/lyne-components/commit/a9410ba7d36b2ea7d5d9902869db21828337e3f0))
* **sbb-selection-expansion-panel:** introduce size s ([#3030](https://github.com/sbb-design-systems/lyne-components/issues/3030)) ([a04b5b4](https://github.com/sbb-design-systems/lyne-components/commit/a04b5b498e6479992d791cc5292bede7098d1738))
* **sbb-timetable-row:** provide a11y footpaths ([#3048](https://github.com/sbb-design-systems/lyne-components/issues/3048)) ([cf9e70f](https://github.com/sbb-design-systems/lyne-components/commit/cf9e70fb002bc19c79eab87ab195b2549ac9499b))
* **table:** introduce table size xs ([#3077](https://github.com/sbb-design-systems/lyne-components/issues/3077)) ([9701f84](https://github.com/sbb-design-systems/lyne-components/commit/9701f844022aab1908fa8223d4df227a7f6ab587))


### Bug Fixes

* **option-base:** use data-active instead of active attribute ([#3055](https://github.com/sbb-design-systems/lyne-components/issues/3055)) ([92cf0ca](https://github.com/sbb-design-systems/lyne-components/commit/92cf0caa20da994ffe5738766606b6e020492467))
* **sbb-dialog:** fix resizing flickering ([#3065](https://github.com/sbb-design-systems/lyne-components/issues/3065)) ([06aa927](https://github.com/sbb-design-systems/lyne-components/commit/06aa92734883e4de4ab5212cee2714f1a4736476)), closes [#3063](https://github.com/sbb-design-systems/lyne-components/issues/3063)
* **sbb-expansion-panel-header:** fix height if disabled ([#3059](https://github.com/sbb-design-systems/lyne-components/issues/3059)) ([64eca9f](https://github.com/sbb-design-systems/lyne-components/commit/64eca9f3bb43f7cba34312193166196b848e9258))
* **sbb-icon:** ensure sbb-angular compatibility ([#3081](https://github.com/sbb-design-systems/lyne-components/issues/3081)) ([ef4b587](https://github.com/sbb-design-systems/lyne-components/commit/ef4b587b047642a08a7da660264bc49086782c86))
* **sbb-image:** improve default image cdn config ([#3060](https://github.com/sbb-design-systems/lyne-components/issues/3060)) ([546cfd8](https://github.com/sbb-design-systems/lyne-components/commit/546cfd83a3427e4e07ffd3816de90370806d8a27))
* **sbb-pearl-chain:** fix spacing of bullet points ([#3066](https://github.com/sbb-design-systems/lyne-components/issues/3066)) ([0f10796](https://github.com/sbb-design-systems/lyne-components/commit/0f107965aae46fecce38147b70e302a23f877d4d)), closes [#3064](https://github.com/sbb-design-systems/lyne-components/issues/3064)
* warn about nested action elements ([#3058](https://github.com/sbb-design-systems/lyne-components/issues/3058)) ([5b1a823](https://github.com/sbb-design-systems/lyne-components/commit/5b1a8233f543fb4bd0f7cf8e795f2fa6a37e5a3b))

## [1.9.0](https://github.com/sbb-design-systems/lyne-components/compare/v1.8.0...v1.9.0) (2024-08-29)


### Features

* **sbb-autocomplete:** introduce size s ([#3020](https://github.com/sbb-design-systems/lyne-components/issues/3020)) ([aa55e7f](https://github.com/sbb-design-systems/lyne-components/commit/aa55e7fc01f44735ff96a04ceace94c34ddf5ed1))
* **sbb-stepper:** add size 's' ([#3026](https://github.com/sbb-design-systems/lyne-components/issues/3026)) ([6c965c5](https://github.com/sbb-design-systems/lyne-components/commit/6c965c503bda51c3f646eb1400fdf4620883870f))
* **sbb-time-input:** add size 's' ([#3018](https://github.com/sbb-design-systems/lyne-components/issues/3018)) ([375bdad](https://github.com/sbb-design-systems/lyne-components/commit/375bdad9f8413ce00cbc1f50c6a815bb0d6e5016))


### Bug Fixes

* **sbb-container:** remove relative positioning for non-image case ([#3024](https://github.com/sbb-design-systems/lyne-components/issues/3024)) ([d0d928f](https://github.com/sbb-design-systems/lyne-components/commit/d0d928f8107b3e799185357f675fd2c27498bca4))
* **sbb-datepicker-toggle:** fix datepicker toggle empty state synchronization ([#3032](https://github.com/sbb-design-systems/lyne-components/issues/3032)) ([cae910b](https://github.com/sbb-design-systems/lyne-components/commit/cae910b1e93b19e680c98967af4646617c1d9f1d))
* **sbb-overlay:** fix padding block ([#3028](https://github.com/sbb-design-systems/lyne-components/issues/3028)) ([6b95be6](https://github.com/sbb-design-systems/lyne-components/commit/6b95be6871d5b18f50d1011ac0c9ad5ab608f384))
* **sbb-select:** fix display value in SSR context ([#3027](https://github.com/sbb-design-systems/lyne-components/issues/3027)) ([f733b38](https://github.com/sbb-design-systems/lyne-components/commit/f733b38e2aa3f4fe5eef73749d6611f748f3f17e))
* **sbb-toggle:** avoid console error on checked option click ([#3034](https://github.com/sbb-design-systems/lyne-components/issues/3034)) ([94fa2b6](https://github.com/sbb-design-systems/lyne-components/commit/94fa2b64a2691cea45322dd521da74eb4e29b7e1))
* **step-list:** fix border radius of step list elements ([#3036](https://github.com/sbb-design-systems/lyne-components/issues/3036)) ([cf26d07](https://github.com/sbb-design-systems/lyne-components/commit/cf26d0703f15e84cd79da9d8ddac597ac8650b15))

## [1.8.0](https://github.com/sbb-design-systems/lyne-components/compare/v1.7.0...v1.8.0) (2024-08-22)


### Features

* **datepicker:** add size s ([#3006](https://github.com/sbb-design-systems/lyne-components/issues/3006)) ([b75c4c5](https://github.com/sbb-design-systems/lyne-components/commit/b75c4c5587897deff318c245029136dd1a3b7f2f))
* **sbb-calendar, sbb-datepicker-toggle:** allow choosing initial calendar view ([#2990](https://github.com/sbb-design-systems/lyne-components/issues/2990)) ([7c8a690](https://github.com/sbb-design-systems/lyne-components/commit/7c8a6900060e3b918f30f98f6da0d7d6b9525287)), closes [#2822](https://github.com/sbb-design-systems/lyne-components/issues/2822)
* **sbb-container:** support background-expanded for images ([#3004](https://github.com/sbb-design-systems/lyne-components/issues/3004)) ([298b335](https://github.com/sbb-design-systems/lyne-components/commit/298b3352e42966747237d043690a90671987faa0))
* **sbb-lead-container:** add spacing class support for notification ([#3019](https://github.com/sbb-design-systems/lyne-components/issues/3019)) ([2f4c817](https://github.com/sbb-design-systems/lyne-components/commit/2f4c8179b5c0f7fc9b807057da16e255ec7890cb)), closes [#2932](https://github.com/sbb-design-systems/lyne-components/issues/2932)
* **sbb-select:** introduce size s ([#3011](https://github.com/sbb-design-systems/lyne-components/issues/3011)) ([b614923](https://github.com/sbb-design-systems/lyne-components/commit/b614923e994ac406318caf7f6e129bb4a103c681))


### Bug Fixes

* fix inert mechanism for overlays ([#2986](https://github.com/sbb-design-systems/lyne-components/issues/2986)) ([92992d2](https://github.com/sbb-design-systems/lyne-components/commit/92992d2e5915a7d44b163240f41f7bd32f254289)), closes [#2969](https://github.com/sbb-design-systems/lyne-components/issues/2969)
* **sbb-flip-card:** fix animation ([#3001](https://github.com/sbb-design-systems/lyne-components/issues/3001)) ([9885dfc](https://github.com/sbb-design-systems/lyne-components/commit/9885dfc31e3c24b7a23353d99877333b4f2021ab))
* **sbb-popover:** ensure correct trigger connection after hydration ([#3016](https://github.com/sbb-design-systems/lyne-components/issues/3016)) ([5e59b8f](https://github.com/sbb-design-systems/lyne-components/commit/5e59b8ff491029385d7708ea62f39514285c6f5a)), closes [#3012](https://github.com/sbb-design-systems/lyne-components/issues/3012) [#3014](https://github.com/sbb-design-systems/lyne-components/issues/3014)
* **sbb-toggle:** fix pill position on value change and initial rendering ([#3015](https://github.com/sbb-design-systems/lyne-components/issues/3015)) ([bd03798](https://github.com/sbb-design-systems/lyne-components/commit/bd03798f96ba7a1e83266e800ed3d12f971a2612)), closes [#3013](https://github.com/sbb-design-systems/lyne-components/issues/3013)

## [1.7.0](https://github.com/sbb-design-systems/lyne-components/compare/v1.6.0...v1.7.0) (2024-08-15)


### ⚠ BREAKING CHANGES

* **sbb-teaser-hero, sbb-teaser-paid:** `sbb-teaser-paid` was removed and integrated in `sbb-teaser-hero`. Replacing the component / selector should be enough, as the API remains the same. `sbb-teaser-hero` moved from `@sbb-esta/experimental` into `@sbb-esta/elements` package, therefore imports need to be adapted.

### Features

* **sbb-container:** support for background image ([#2999](https://github.com/sbb-design-systems/lyne-components/issues/2999)) ([ff68e28](https://github.com/sbb-design-systems/lyne-components/commit/ff68e28dcb5723f8347517be633989555d100d09))
* **sbb-flip-card:** add flip event and isFlipped getter ([#2988](https://github.com/sbb-design-systems/lyne-components/issues/2988)) ([b912dac](https://github.com/sbb-design-systems/lyne-components/commit/b912dac06e4041c5df3628a162ce240d28f78d59))
* **sbb-form-field:** introduce size s ([#2995](https://github.com/sbb-design-systems/lyne-components/issues/2995)) ([9abb131](https://github.com/sbb-design-systems/lyne-components/commit/9abb1314348e1d06be211c2dbf362ad899d894d0))
* **sbb-link-list-anchor:** component implementation ([#2987](https://github.com/sbb-design-systems/lyne-components/issues/2987)) ([d81a565](https://github.com/sbb-design-systems/lyne-components/commit/d81a565d776499472b91d9c82b99511034985d8e))
* **sbb-mini-button-group:** component implementation ([#2959](https://github.com/sbb-design-systems/lyne-components/issues/2959)) ([e732593](https://github.com/sbb-design-systems/lyne-components/commit/e73259362859271e04ffb6130375b00d1e2e9674))
* **sbb-teaser-hero, sbb-teaser-paid:** merge components and move into elements package ([#2984](https://github.com/sbb-design-systems/lyne-components/issues/2984)) ([2b3f13e](https://github.com/sbb-design-systems/lyne-components/commit/2b3f13ed436a675a478767aa7ba4db86da83cb9e))
* **sbb-teaser-product:** initial implementation ([#2976](https://github.com/sbb-design-systems/lyne-components/issues/2976)) ([79601d2](https://github.com/sbb-design-systems/lyne-components/commit/79601d2f28dbfff571cbe38b33d3c875ab3308a8))


### Bug Fixes

* **sbb-flip-card:** fix accessibility issues ([#3000](https://github.com/sbb-design-systems/lyne-components/issues/3000)) ([1f107a0](https://github.com/sbb-design-systems/lyne-components/commit/1f107a0cad33764a4be2c32b84fcceb81342aca5)), closes [#2983](https://github.com/sbb-design-systems/lyne-components/issues/2983)
* **sbb-flip-card:** support disabled animation ([#2998](https://github.com/sbb-design-systems/lyne-components/issues/2998)) ([fbb6ca6](https://github.com/sbb-design-systems/lyne-components/commit/fbb6ca6d824e1d4d90ad3e1e0c382387ba3b00ad))
* **sbb-flip-card:** use type button to avoid accidental form submission ([#3002](https://github.com/sbb-design-systems/lyne-components/issues/3002)) ([25dbd78](https://github.com/sbb-design-systems/lyne-components/commit/25dbd7863f37a81dbfd179c37166574a0b0502bb))
* **sbb-form-field:** fix disabled state for borderless variant ([#2994](https://github.com/sbb-design-systems/lyne-components/issues/2994)) ([c31cc89](https://github.com/sbb-design-systems/lyne-components/commit/c31cc89e212f02579c2bde8997f49b95e6698d1e))
* **sbb-form-field:** fix textarea bottom padding ([#2997](https://github.com/sbb-design-systems/lyne-components/issues/2997)) ([1540f46](https://github.com/sbb-design-systems/lyne-components/commit/1540f46eac791e985c6262e5ad25fba9dbd01c5c))


### Miscellaneous Chores

* release 1.7.0 ([b486bb4](https://github.com/sbb-design-systems/lyne-components/commit/b486bb465af2b6dc0200e6033d51ce6941f8eac1))

## [1.6.0](https://github.com/sbb-design-systems/lyne-components/compare/v1.5.0...v1.6.0) (2024-07-26)


### Features

* **sbb-alert:** add close fade-out animation and change `animation` property default to all ([#2943](https://github.com/sbb-design-systems/lyne-components/issues/2943)) ([581b95c](https://github.com/sbb-design-systems/lyne-components/commit/581b95c4bf184fb3c862a68c983074a8ac48bdce))
* **sbb-icon:** provide compatibility with sbb-angular ([#2971](https://github.com/sbb-design-systems/lyne-components/issues/2971)) ([3c4e4b0](https://github.com/sbb-design-systems/lyne-components/commit/3c4e4b093cb33f260544f5b3495738aa9cde7a53)), closes [#2746](https://github.com/sbb-design-systems/lyne-components/issues/2746)


### Bug Fixes

* **sbb-clock:** fix internal await to actually finish ([#2966](https://github.com/sbb-design-systems/lyne-components/issues/2966)) ([af634c0](https://github.com/sbb-design-systems/lyne-components/commit/af634c08729283f4da596a71e03a6127af849cd9))
* **sbb-overlay:** add background animation ([#2945](https://github.com/sbb-design-systems/lyne-components/issues/2945)) ([dac84ce](https://github.com/sbb-design-systems/lyne-components/commit/dac84ce40e3785afd828bf14669f54650a8d2561))
* **sbb-toggle:** spacing adjustment ([#2957](https://github.com/sbb-design-systems/lyne-components/issues/2957)) ([8870deb](https://github.com/sbb-design-systems/lyne-components/commit/8870deb231d054dd78ee7c3f05deb5b4bca1bd77))
* **various:** re-enable scrolling when disconnecting the component before animationend ([#2970](https://github.com/sbb-design-systems/lyne-components/issues/2970)) ([76ef11b](https://github.com/sbb-design-systems/lyne-components/commit/76ef11bfd88b5c0177d42e530bd5818dccbb27c5)), closes [#2967](https://github.com/sbb-design-systems/lyne-components/issues/2967)

## [1.5.0](https://github.com/sbb-design-systems/lyne-components/compare/v1.4.0...v1.5.0) (2024-07-19)


### Features

* **sbb-checkbox:** add size xs ([#2933](https://github.com/sbb-design-systems/lyne-components/issues/2933)) ([56db302](https://github.com/sbb-design-systems/lyne-components/commit/56db30290eddaaa4fa0d67b20f6c1610380ce5fd))
* **sbb-flip-card:** first implementation ([#2946](https://github.com/sbb-design-systems/lyne-components/issues/2946)) ([b086612](https://github.com/sbb-design-systems/lyne-components/commit/b08661298d6f6bf42e98182d760007e97ab716d1))
* **sbb-status:** add new types ([#2939](https://github.com/sbb-design-systems/lyne-components/issues/2939)) ([9e44f2a](https://github.com/sbb-design-systems/lyne-components/commit/9e44f2adb9d11b4e4fe645d66b7e1610b7defa5f))

## [1.4.0](https://github.com/sbb-design-systems/lyne-components/compare/v1.3.0...v1.4.0) (2024-07-16)


### Features

* **sbb-autocomplete-grid:** component implementation ([#2512](https://github.com/sbb-design-systems/lyne-components/issues/2512)) ([0fc5f40](https://github.com/sbb-design-systems/lyne-components/commit/0fc5f40191bcab18f901984e86d75607edc304e4))
* **sbb-image:** provide ability to crop image on host ([#2917](https://github.com/sbb-design-systems/lyne-components/issues/2917)) ([84a7cf7](https://github.com/sbb-design-systems/lyne-components/commit/84a7cf7c7c05657a2ab8ef98e316a42c00bcc01c))
* **sbb-radio-button, sbb-radio-button-group:** add size xs ([#2936](https://github.com/sbb-design-systems/lyne-components/issues/2936)) ([7237dce](https://github.com/sbb-design-systems/lyne-components/commit/7237dce8c3def73b82718ea1fb1f96580cc87990))


### Bug Fixes

* **sbb-checkbox, sbb-checkbox-panel:** fix visual disabled state after prop change ([#2906](https://github.com/sbb-design-systems/lyne-components/issues/2906)) ([36999a9](https://github.com/sbb-design-systems/lyne-components/commit/36999a9a0ecc2028bc06c440aef434b3590d7ee3)), closes [#2905](https://github.com/sbb-design-systems/lyne-components/issues/2905)
* **sbb-container, sbb-tab-group:** avoid reserving invisible space ([#2921](https://github.com/sbb-design-systems/lyne-components/issues/2921)) ([edec173](https://github.com/sbb-design-systems/lyne-components/commit/edec173a8046d7a284f0c610abd2f36616552c3a)), closes [#2835](https://github.com/sbb-design-systems/lyne-components/issues/2835)
* **sbb-map-container:** remove z-index to avoid stacking problems ([#2924](https://github.com/sbb-design-systems/lyne-components/issues/2924)) ([bf27c10](https://github.com/sbb-design-systems/lyne-components/commit/bf27c100ab5857cdaa088b5aff6f4fdc5378b579)), closes [#2804](https://github.com/sbb-design-systems/lyne-components/issues/2804)
* **sbb-radio-button-panel:** fix spacing between label and suffix ([#2900](https://github.com/sbb-design-systems/lyne-components/issues/2900)) ([c76a0ac](https://github.com/sbb-design-systems/lyne-components/commit/c76a0ac655c9b0dd6947ce10aaa2b76826476a07))

## [1.3.0](https://github.com/sbb-design-systems/lyne-components/compare/v1.2.1...v1.3.0) (2024-07-08)


### Features

* **sbb-datepicker:** add support for `DateAdapter` ([#2889](https://github.com/sbb-design-systems/lyne-components/issues/2889)) ([4d9973e](https://github.com/sbb-design-systems/lyne-components/commit/4d9973e147faa281f0e38d10286ca086eb2da9d1))


### Bug Fixes

* **sbb-button:** fix high contrast styles ([#2890](https://github.com/sbb-design-systems/lyne-components/issues/2890)) ([8f9237c](https://github.com/sbb-design-systems/lyne-components/commit/8f9237c966b8797ab176736986abd5a8b594ccea))
* **sbb-form-field:** ensure input element is detected during hydration ([#2894](https://github.com/sbb-design-systems/lyne-components/issues/2894)) ([9519827](https://github.com/sbb-design-systems/lyne-components/commit/95198270efbf02dfc54bc5228ca9fab0b9293503)), closes [#2877](https://github.com/sbb-design-systems/lyne-components/issues/2877)
* **sbb-map-container:** respect disabled global animation ([#2879](https://github.com/sbb-design-systems/lyne-components/issues/2879)) ([d5e52e3](https://github.com/sbb-design-systems/lyne-components/commit/d5e52e3674e3c255fed81c58b303c4a77cca54e0))
* **sbb-notification:** avoid resizeObserver loop warning ([#2855](https://github.com/sbb-design-systems/lyne-components/issues/2855)) ([6222b25](https://github.com/sbb-design-systems/lyne-components/commit/6222b258973c8c6a617b51bc99c3a0ece8fec5ba))
* **sbb-popover:** prevent matchMedia call before hydration ([#2893](https://github.com/sbb-design-systems/lyne-components/issues/2893)) ([c5bbb96](https://github.com/sbb-design-systems/lyne-components/commit/c5bbb96e120b8692a0be756e5c8e541d222fc4bc)), closes [#2875](https://github.com/sbb-design-systems/lyne-components/issues/2875)
* **various:** ensure slotchange event is handled properly in hydration ([#2897](https://github.com/sbb-design-systems/lyne-components/issues/2897)) ([9b5f498](https://github.com/sbb-design-systems/lyne-components/commit/9b5f4980ccd35c922b8acdce4a640d67f0fd0522))

## [1.2.1](https://github.com/sbb-design-systems/lyne-components/compare/v1.2.0...v1.2.1) (2024-06-27)


### Bug Fixes

* ensure slotchange events are handled correctly in hydration ([#2850](https://github.com/sbb-design-systems/lyne-components/issues/2850)) ([06112a4](https://github.com/sbb-design-systems/lyne-components/commit/06112a4237b310f07a1031a548498dea7211385a))
* missing async/await in tests ([#2849](https://github.com/sbb-design-systems/lyne-components/issues/2849)) ([14dcef4](https://github.com/sbb-design-systems/lyne-components/commit/14dcef4dba501b9d7a9edd95dd7e9b4cefee5ae6))
* **sbb-clock:** treat a specific date consistently ([#2838](https://github.com/sbb-design-systems/lyne-components/issues/2838)) ([4ffa4bc](https://github.com/sbb-design-systems/lyne-components/commit/4ffa4bc70a77db30067dc942d3c994a6d3fe5c00))
* **sbb-visual-checkbox:** fix high contrast mode of indeterminate state ([#2845](https://github.com/sbb-design-systems/lyne-components/issues/2845)) ([f7e5adb](https://github.com/sbb-design-systems/lyne-components/commit/f7e5adb25d3fa3e1b7e686dbc43226ba146ac57e))

## [1.2.0](https://github.com/sbb-design-systems/lyne-components/compare/v1.1.0...v1.2.0) (2024-06-26)


### Features

* **sbb-timetable-row:** enhance trip status and display logic ([#2680](https://github.com/sbb-design-systems/lyne-components/issues/2680)) ([6e0424f](https://github.com/sbb-design-systems/lyne-components/commit/6e0424f71a9f4a74f52757ee21d2d62cf82933a3))

## [1.1.0](https://github.com/sbb-design-systems/lyne-components/compare/v1.0.0...v1.1.0) (2024-06-25)


### Features

* **sbb-table-wrapper:** initial implementation ([#2715](https://github.com/sbb-design-systems/lyne-components/issues/2715)) ([d6aaf68](https://github.com/sbb-design-systems/lyne-components/commit/d6aaf68ef1e5e040e948a452919a3183b23104d1))


### Bug Fixes

* disabled and focused state in mini-button mixin ([#2799](https://github.com/sbb-design-systems/lyne-components/issues/2799)) ([5797419](https://github.com/sbb-design-systems/lyne-components/commit/579741920414ba304516750094401b4bd142fa4a))
* **sbb-tab-group:** fix nested tab groups logic ([#2816](https://github.com/sbb-design-systems/lyne-components/issues/2816)) ([4674a61](https://github.com/sbb-design-systems/lyne-components/commit/4674a61cf47e7593e0274c3de81c2863d9e4076a))
* verify SSR functionality ([#2805](https://github.com/sbb-design-systems/lyne-components/issues/2805)) ([1095121](https://github.com/sbb-design-systems/lyne-components/commit/1095121f2d299d23df13d873a3edcd442cb5d377))

## [1.0.0](https://github.com/sbb-design-systems/lyne-components/compare/v0.53.0...v1.0.0) (2024-06-17)


### Miscellaneous Chores

* prepare release 1.0.0 ([33c4e4b](https://github.com/sbb-design-systems/lyne-components/commit/33c4e4b9b5b28c281f9fcb302e8c6f7e78aac0f7))

## [0.53.0](https://github.com/sbb-design-systems/lyne-components/compare/v0.52.2...v0.53.0) (2024-06-17)


### ⚠ BREAKING CHANGES

* **sbb-teaser-hero, sbb-teaser-paid:** `sbb-teaser-hero` and `sbb-teaser-paid` are now part of the `@sbb-esta/lyne-elements-experimental` package.
* **sbb-tab:** the `sbb-tab-title` component has been renamed to `sbb-tab-label`.  A new component named `sbb-tab` has been created, and it is now the only supported tag for the tab's content; `article`, `section` and `div` are not supported anymore.  To solve the issue #1351, the `didChange` event on `sbb-tab-group` now includes an object which contains the currently selected tab index, the `sbb-tab-label` component and related `sbb-tab` component, plus, if available, the previous ones.
* **sbb-selection-panel, sbb-checkbox, sbb-radio-button:** `sbb-selection-panel` has been renamed to `sbb-selection-expansion-panel`. The `sbb-checkbox` and `sbb-radio-button` components cannot be used anymore with `sbb-selection-expansion-panel` (does not apply for cases where they are slotted inside the `content` slot). As a replacement, we introduce the new components `sbb-checkbox-panel` and `sbb-radio-button-panel`, which could also be used standalone in cases where there is no content. `sbb-checkbox-group` and `sbb-radio-button-group` also support the panel variants. How to migrate?
    - Rename usages of `sbb-selection-panel` to `sbb-selection-expansion-panel`.
    - Inside the `sbb-selection-expansion-panel`, replace `sbb-checkbox` with `sbb-checkbox-panel` and `sbb-radio-button` with `sbb-radio-button-panel` (does not apply for cases where they are slotted inside the `content` slot of the `sbb-selection-expansion-panel`)
    - In cases where there was no content (slot), don't use `sbb-selection-panel`/`sbb-selection-expansion-panel` anymore, but directly use `sbb-checkbox-panel` or `sbb-radio-button-panel`.

### Bug Fixes

* **sbb-train-formation:** hide sectors row if no sectors were defined ([#2779](https://github.com/sbb-design-systems/lyne-components/issues/2779)) ([b011a92](https://github.com/sbb-design-systems/lyne-components/commit/b011a92cf42deec24ba0b12d73549cf3293a321b))


### Code Refactoring

* **sbb-selection-panel, sbb-checkbox, sbb-radio-button:** split into regular and panel variants ([#2778](https://github.com/sbb-design-systems/lyne-components/issues/2778)) ([d206926](https://github.com/sbb-design-systems/lyne-components/commit/d206926ad8944653e9010462fe926a04742a3e9d))
* **sbb-tab:** align with sbb-stepper ([#2744](https://github.com/sbb-design-systems/lyne-components/issues/2744)) ([4305ca8](https://github.com/sbb-design-systems/lyne-components/commit/4305ca8bf348a62ee72bc2453487c385bc55bda2))
* **sbb-teaser-hero, sbb-teaser-paid:** move to `@sbb-esta/lyne-elements-experimental` ([#2782](https://github.com/sbb-design-systems/lyne-components/issues/2782)) ([1032e76](https://github.com/sbb-design-systems/lyne-components/commit/1032e76b5fedd0bb01f1795fa3933de51b4aebeb))

## [0.52.2](https://github.com/sbb-design-systems/lyne-components/compare/v0.52.1...v0.52.2) (2024-06-14)


### Bug Fixes

* revert mangle configuration from build ([239a6a1](https://github.com/sbb-design-systems/lyne-components/commit/239a6a1cd4ccb9915b9fa3a8a2370fbe2aa80975))
* revert split of sbb-checkbox and sbb-radio-button ([ebe391f](https://github.com/sbb-design-systems/lyne-components/commit/ebe391fab57463c03550ab711dff103838bf0537))

## [0.52.1](https://github.com/sbb-design-systems/lyne-components/compare/v0.52.0...v0.52.1) (2024-06-14)


### Features

* **sbb-image:** provide load and error events ([#2725](https://github.com/sbb-design-systems/lyne-components/issues/2725)) ([56ae5b1](https://github.com/sbb-design-systems/lyne-components/commit/56ae5b16ccf2d2099f58b51508bfa89d2049d292))
* **sbb-toggle-check:** add size 'xs' ([#2724](https://github.com/sbb-design-systems/lyne-components/issues/2724)) ([7415aeb](https://github.com/sbb-design-systems/lyne-components/commit/7415aeb5e2fb62155c042ae6da67396eeebaa53c))


### Bug Fixes

* avoid breaking type declarations due to alias resolution ([#2776](https://github.com/sbb-design-systems/lyne-components/issues/2776)) ([be72249](https://github.com/sbb-design-systems/lyne-components/commit/be72249727f40263138d4969bfc3a813273abfb7))
* fix stacked overlays inert mechanism ([#2736](https://github.com/sbb-design-systems/lyne-components/issues/2736)) ([b611271](https://github.com/sbb-design-systems/lyne-components/commit/b611271d2b85647b96e99ea95a043c3320cc13ad))
* **sbb-breadcrumb:** avoid to collapse for two or fewer breadcrumbs ([#2733](https://github.com/sbb-design-systems/lyne-components/issues/2733)) ([ecdb355](https://github.com/sbb-design-systems/lyne-components/commit/ecdb355a466599da8002fb0db4dad04af617ceb7))

## [0.52.0](https://github.com/sbb-design-systems/lyne-components/compare/v0.51.1...v0.52.0) (2024-06-06)


### ⚠ BREAKING CHANGES

* type 'SbbDialogCloseEventDetails' has been renamed to 'SbbOverlayCloseEventDetails'
* The half-public data-now attribute has become a public `now` property that can be used to set time or date-based components into a specific state, especially for testing purposes.
    - `sbb-calendar`, `sbb-datepicker`, `sbb-timetable-row`, `sbb-journey-summary`, `sbb-pearl-chain`, `sbb-pearl-chain-time`: change the attribute `data-now` to `now`. The property `now` can be a Date or Unix timestamp. If you had a timestamp in milliseconds before, please divide by 1000 to get seconds.
    - `sbb-clock`: change the attribute `data-now` to `now`. The property `now` has to be in the format "HH:MM:SS".
* `Lyne components` and `Lyne components react` libraries have been renamed, please update imports accordingly.
    - `@sbb-esta/lyne-components` => `@sbb-esta/lyne-elements`
    - `@sbb-esta/lyne-components-react` => `@sbb-esta/lyne-react`
    The following components, and their react wrappers, have been moved into `@sbb-esta/lyne-elements-experimental` and `@sbb-esta/lyne-react-experimental` respectively:
    - sbb-journey-summary
    - sbb-pearl-chain
    - sbb-pearl-chain-time
    - sbb-pearl-chain-vertical
    - sbb-pearl-chain-vertical-item
    - sbb-timetable-duration
    - sbb-timetable-row
* **sbb-link:** Due to screen reader limitations, we had to move the `link` role inside the Shadow DOM. Therefore, for the following components, replace the `[aria-label]` usages with `[accessibility-label]` attribute or `accessibilityLabel` property:
    - `sbb-breadcrumb`
    - `sbb-button-link`, `sbb-secondary-button-link`, `sbb-tertiary-button-link`, `sbb-transparent-button-link`
    - `sbb-card-link`
    - `sbb-header-link`
    - `sbb-link`, `sbb-block-link`
    - `sbb-menu-link`
    - `sbb-navigation-link`
    - `sbb-teaser`, `sbb-teaser-hero`, `sbb-teaser-paid`

### Features

* add 'now' property instead of data-now attribute ([#2674](https://github.com/sbb-design-systems/lyne-components/issues/2674)) ([94c25b1](https://github.com/sbb-design-systems/lyne-components/commit/94c25b1b84250ea39f07ea3c6efa38a1c9c74e39))
* **file-selector:** add size s ([#2685](https://github.com/sbb-design-systems/lyne-components/issues/2685)) ([6783621](https://github.com/sbb-design-systems/lyne-components/commit/67836212fe5f8c5acc2f227933ba69490cdace54))
* **journey-header:** add size s ([#2656](https://github.com/sbb-design-systems/lyne-components/issues/2656)) ([610ef3a](https://github.com/sbb-design-systems/lyne-components/commit/610ef3af31a161fadbc7202f54dc49a95c1fd3f4))
* **sbb-lead-container:** add support for sbb-alert-group ([#2719](https://github.com/sbb-design-systems/lyne-components/issues/2719)) ([3d556f9](https://github.com/sbb-design-systems/lyne-components/commit/3d556f94eee2bc5326bd70112f143df4870ae19e)), closes [#2714](https://github.com/sbb-design-systems/lyne-components/issues/2714)
* **sbb-lead-container:** initial implementation ([#2672](https://github.com/sbb-design-systems/lyne-components/issues/2672)) ([bb1f3a8](https://github.com/sbb-design-systems/lyne-components/commit/bb1f3a850291b533491563feca207cadcbd08a9d))
* **sbb-popover:** change close button size ([#2688](https://github.com/sbb-design-systems/lyne-components/issues/2688)) ([1f259be](https://github.com/sbb-design-systems/lyne-components/commit/1f259beb31d09a185803f3b24e418489376c3bce))
* **sbb-stepper:** introduce `sbb-stepper` component ([#2491](https://github.com/sbb-design-systems/lyne-components/issues/2491)) ([d389572](https://github.com/sbb-design-systems/lyne-components/commit/d389572284afad476961e996756adfa925e9cb1b))
* **sbb-tab-group:** add size s variant ([#2683](https://github.com/sbb-design-systems/lyne-components/issues/2683)) ([c00aa58](https://github.com/sbb-design-systems/lyne-components/commit/c00aa58add944e30ad74a99e5058860b9d263251))
* **sbb-tag, sbb-tag-group:** add size s variant ([#2664](https://github.com/sbb-design-systems/lyne-components/issues/2664)) ([6291bdc](https://github.com/sbb-design-systems/lyne-components/commit/6291bdcf62c7b5cecbd60296841a4dbd2e1b852b))


### Bug Fixes

* fix lead container tests ([d6355dd](https://github.com/sbb-design-systems/lyne-components/commit/d6355dd44f18b2b561e2ae91a055054b3944cc3e))
* prevent stack overflow with attribute changes ([#2661](https://github.com/sbb-design-systems/lyne-components/issues/2661)) ([4b382ed](https://github.com/sbb-design-systems/lyne-components/commit/4b382ede1942ecf09fce323e2a57b7fac437d064))
* **sbb-alert:** improve SSR hydration support ([#2650](https://github.com/sbb-design-systems/lyne-components/issues/2650)) ([1b09429](https://github.com/sbb-design-systems/lyne-components/commit/1b094291be6e03516bd4e41555c05fe2c6fa46c3))
* **sbb-block-link:** always show underline except for footer links ([#2705](https://github.com/sbb-design-systems/lyne-components/issues/2705)) ([5fbedd2](https://github.com/sbb-design-systems/lyne-components/commit/5fbedd2b05a0b88e05e156b168409f8a741860f5))
* **sbb-button:** fix gap between icon and text for size s ([#2678](https://github.com/sbb-design-systems/lyne-components/issues/2678)) ([38efbd8](https://github.com/sbb-design-systems/lyne-components/commit/38efbd86161f1bb59a66512c054543bfcf62bac2))
* **sbb-datepicker:** handle hydration correctly ([#2721](https://github.com/sbb-design-systems/lyne-components/issues/2721)) ([058489a](https://github.com/sbb-design-systems/lyne-components/commit/058489a1323935a1142e5fa43ae5211f19d013f1)), closes [#2691](https://github.com/sbb-design-systems/lyne-components/issues/2691)
* **sbb-dialog:** fix dialog-content z-index ([#2722](https://github.com/sbb-design-systems/lyne-components/issues/2722)) ([55b3446](https://github.com/sbb-design-systems/lyne-components/commit/55b34467bb0e734eb92466b94c7ab1ee3e0e9fc0))
* **sbb-image:** render URL correctly with SSR ([#2712](https://github.com/sbb-design-systems/lyne-components/issues/2712)) ([fde1700](https://github.com/sbb-design-systems/lyne-components/commit/fde17007f0391fdf7cd6f1512477a8a67b65a1b6))
* **sbb-link:** fix accessibility by inlining link functionality into Shadow DOM ([52344e9](https://github.com/sbb-design-systems/lyne-components/commit/52344e95138a622b2fa3012b7f13963002fde0de))
* **sbb-option:** correctly determine highlight state with SSR ([#2713](https://github.com/sbb-design-systems/lyne-components/issues/2713)) ([d2d253c](https://github.com/sbb-design-systems/lyne-components/commit/d2d253c29faff01a3545fb759773449e7e75bd89)), closes [#2689](https://github.com/sbb-design-systems/lyne-components/issues/2689)
* **sbb-radio-button:** fix checked initialization ([#2692](https://github.com/sbb-design-systems/lyne-components/issues/2692)) ([abdaf43](https://github.com/sbb-design-systems/lyne-components/commit/abdaf43389ac19f590b5b0326cc8783166bc243d))


### Code Refactoring

* create base class for overlay functionality ([#2599](https://github.com/sbb-design-systems/lyne-components/issues/2599)) ([2059719](https://github.com/sbb-design-systems/lyne-components/commit/20597192f0ca6a1cfbcfd229110574a35e1e9520))
* rename `lyne-components` into `lyne-elements` and create `lyne-elements-experimental` ([edd3a73](https://github.com/sbb-design-systems/lyne-components/commit/edd3a730ee09d2ca3e54f77c6e1510ff83789ec9))

## [0.51.1](https://github.com/sbb-design-systems/lyne-components/compare/v0.51.0...v0.51.1) (2024-05-08)


### Bug Fixes

* **sbb-toggle:** fix event timing ([#2646](https://github.com/sbb-design-systems/lyne-components/issues/2646)) ([6da2d26](https://github.com/sbb-design-systems/lyne-components/commit/6da2d2684c962422339e643531a8f01915f8787b))

## [0.51.0](https://github.com/sbb-design-systems/lyne-components/compare/v0.50.2...v0.51.0) (2024-05-07)


### ⚠ BREAKING CHANGES

* As we split up the former `typography.css` into smaller consumable modules, we had to change the names of some files.
    - Renamed `typography.css` to `standard-theme.css`. Notice: there is still a file called `typography.css` that contains only a few typography-related outputs. Therefore, **import adaption from `typography.css` to `standard-theme.css` is mandatory**.
    - Changed the name of `fullfont.css` to `font-characters-extension.css`.
* Replaced `Roman`, `Bold`, and `Light` font-face variants with the single `SBB` font. Using CSS `font-weight` property automatically selects the correct font family. Migration guide:
    - Replace `font-family: "SBBWeb Roman", ...` with `font-family: "SBB", ...`  and use `font-weight: normal` (potentially not necessary as `normal` is the default).
    - Replace `font-family: "SBBWeb Bold", ...` with `font-family: "SBB", ...` and use `font-weight: bold` or CSS class `sbb-text--bold`.
    - Replace `font-family: "SBBWeb Light", ...` with `font-family: "SBB", ...` and use `font-weight: 300`.
    - Replace CSS variable `--sbb-typo-type-face-sbb-roman` with `--sbb-typo-font-family` and use `font-weight: normal` (potentially not necessary as `normal` is the default).
    - Replace CSS variable `--sbb-typo-type-face-sbb-bold` with `--sbb-typo-font-family` and use `font-weight: bold`.
    - Replace CSS variable `--sbb-typo-type-face-sbb-light` with `--sbb-typo-font-family` and use `font-weight: 300`.
* **alert:** Removed `disable-animation` property. Use `animation='none'` instead.
* **notification:** Removed `disable-animation` property. Use `animation='none'` instead or depending on the case 'open' or 'close'.
* **disable-animation:** Add the `sbb-disable-animation` CSS class to disable animations for the element and all its children. Consequently, all `disable-animation` properties of the following components have been removed.
    - Removed `disable-animation` property from `sbb-accordion`
    - Removed `disable-animation` property from `sbb-alert`
    - Removed `disable-animation` property from `sbb-autocomplete`
    - Removed `disable-animation` property from `sbb-datepicker-toggle`
    - Removed `disable-animation` property from `sbb-dialog`
    - Removed `disable-animation` property from `sbb-expansion-panel`
    - Removed `disable-animation` property from `sbb-image`
    - Removed `disable-animation` property from `sbb-loading-indicator`
    - Removed `disable-animation` property from `sbb-menu`
    - Removed `disable-animation` property from `sbb-navigation`
    - Removed `disable-animation` property from `sbb-navigation-section`
    - Removed `disable-animation` property from `sbb-notification`
    - Removed `disable-animation` property from `sbb-overlay`
    - Removed `disable-animation` property from `sbb-popover`
    - Removed `disable-animation` property from `sbb-select`
    - Removed `disable-animation` property from `sbb-selection-panel`
    - Removed `disable-animation` property from `sbb-sticky-bar`
    - Removed `disable-animation` property from `sbb-toast`
    - Removed `disable-animation` property from `sbb-toggle`

### Features

* add default entries for style exports in package.json ([#2643](https://github.com/sbb-design-systems/lyne-components/issues/2643)) ([73271e2](https://github.com/sbb-design-systems/lyne-components/commit/73271e25c057b7229e3f245a73d8b1e831fc72dc))
* add root entry point with global component registration ([#2641](https://github.com/sbb-design-systems/lyne-components/issues/2641)) ([3572fa9](https://github.com/sbb-design-systems/lyne-components/commit/3572fa9657b8f44873caf341d126fb563e69b09e))
* **alert:** add `animation` property ([#2507](https://github.com/sbb-design-systems/lyne-components/issues/2507)) ([8b91eb8](https://github.com/sbb-design-systems/lyne-components/commit/8b91eb8c0046e330bcfb7b7c880e71a531ee44a5))
* **notification:** add `animation` property ([#2507](https://github.com/sbb-design-systems/lyne-components/issues/2507)) ([8b91eb8](https://github.com/sbb-design-systems/lyne-components/commit/8b91eb8c0046e330bcfb7b7c880e71a531ee44a5))
* **notification:** add size 's' ([#2606](https://github.com/sbb-design-systems/lyne-components/issues/2606)) ([cf97ecd](https://github.com/sbb-design-systems/lyne-components/commit/cf97ecd290dbaf97e650aab1f23cc96cb5b5d8ee))
* reduce font-faces to the single SBB variant ([#2618](https://github.com/sbb-design-systems/lyne-components/issues/2618)) ([679d9e9](https://github.com/sbb-design-systems/lyne-components/commit/679d9e9339df501aca0a9eb22ae52a10adbfeeab))
* **sbb-accordion, sbb-expansion-panel:** add size s ([#2603](https://github.com/sbb-design-systems/lyne-components/issues/2603)) ([015201d](https://github.com/sbb-design-systems/lyne-components/commit/015201d3c5592bdc4f73d18ccea57e559e33d6fa))
* **sbb-alert:** add size s ([#2591](https://github.com/sbb-design-systems/lyne-components/issues/2591)) ([3a82c67](https://github.com/sbb-design-systems/lyne-components/commit/3a82c6733f8c78180cbf236dea1362aa623faddb))
* **sbb-container:** allow expanded background color ([#2640](https://github.com/sbb-design-systems/lyne-components/issues/2640)) ([2854e8e](https://github.com/sbb-design-systems/lyne-components/commit/2854e8ef955f2860a7706f5ba1a2c2ff92cbf2e2))
* split CSS outputs into smaller modules ([#2615](https://github.com/sbb-design-systems/lyne-components/issues/2615)) ([646e5a4](https://github.com/sbb-design-systems/lyne-components/commit/646e5a498e6ba725574416a0f507f9a301af2460))


### Bug Fixes

* enable next.js 14 support and add some upstream fixes ([#2613](https://github.com/sbb-design-systems/lyne-components/issues/2613)) ([341b7ce](https://github.com/sbb-design-systems/lyne-components/commit/341b7ce4ed10bdb1d8dc1b9c17b7bf6a7ea6c1a1))
* prefix all css variable names ([#2609](https://github.com/sbb-design-systems/lyne-components/issues/2609)) ([788cef7](https://github.com/sbb-design-systems/lyne-components/commit/788cef734c28615d0fbbb7be66e547664ba504e7))
* **sbb-container:** fix background color for nested containers ([#2611](https://github.com/sbb-design-systems/lyne-components/issues/2611)) ([c9f0e0e](https://github.com/sbb-design-systems/lyne-components/commit/c9f0e0ea992c3e61ec5be0579f9dbe5a9bc057a2))
* **sbb-dialog:** show all content if header is always present ([#2637](https://github.com/sbb-design-systems/lyne-components/issues/2637)) ([924fa37](https://github.com/sbb-design-systems/lyne-components/commit/924fa3768b6275390db9b6641e3b73e89a016cab)), closes [#2635](https://github.com/sbb-design-systems/lyne-components/issues/2635)
* **sbb-image:** fix alt attribute and provide css var for aspect-ratio ([#2607](https://github.com/sbb-design-systems/lyne-components/issues/2607)) ([54d3192](https://github.com/sbb-design-systems/lyne-components/commit/54d31922525677e1401d315154499fe308326148))
* **sbb-loading-indicator:** fix sizes of loading indicator ([#2630](https://github.com/sbb-design-systems/lyne-components/issues/2630)) ([a1270b2](https://github.com/sbb-design-systems/lyne-components/commit/a1270b2b96d9c515e8245c35a7918ce7c7432227))
* **sbb-tab-group:** avoid unwanted margin block spaces ([#2628](https://github.com/sbb-design-systems/lyne-components/issues/2628)) ([87d10d8](https://github.com/sbb-design-systems/lyne-components/commit/87d10d8baec6e63873e5ebb2f36f21c25b04ba50))


### Code Refactoring

* **disable-animation:** migrate disable-animation mechanism ([#2507](https://github.com/sbb-design-systems/lyne-components/issues/2507)) ([8b91eb8](https://github.com/sbb-design-systems/lyne-components/commit/8b91eb8c0046e330bcfb7b7c880e71a531ee44a5))

## [0.50.2](https://github.com/sbb-design-systems/lyne-components/compare/v0.50.1...v0.50.2) (2024-04-16)


### Bug Fixes

* adapt lyne tokens change ([#2582](https://github.com/sbb-design-systems/lyne-components/issues/2582)) ([94bf4f0](https://github.com/sbb-design-systems/lyne-components/commit/94bf4f069688cc958a34beb2e4337822cf70cd9a))
* adapt react package import paths missed during migration ([#2589](https://github.com/sbb-design-systems/lyne-components/issues/2589)) ([0781c6a](https://github.com/sbb-design-systems/lyne-components/commit/0781c6a3a2a69dce800a3106908b9d9c694d26df))
* **sbb-overlay:** consider sbb-overlay as overlay in inert mechanism ([#2588](https://github.com/sbb-design-systems/lyne-components/issues/2588)) ([4ecc125](https://github.com/sbb-design-systems/lyne-components/commit/4ecc1254f79bfc95af2aa66c1021c507c6e7db2f))
* **sbb-teaser-hero:** use auto hyphens for title text to avoid overflow ([#2581](https://github.com/sbb-design-systems/lyne-components/issues/2581)) ([3b8844c](https://github.com/sbb-design-systems/lyne-components/commit/3b8844c2311f27e238ba73812a6a3c01abb2a5a3))

## [0.50.1](https://github.com/sbb-design-systems/lyne-components/compare/v0.50.0...v0.50.1) (2024-04-15)


### Bug Fixes

* update import paths missed in the migration ([#2579](https://github.com/sbb-design-systems/lyne-components/issues/2579)) ([9c90fa8](https://github.com/sbb-design-systems/lyne-components/commit/9c90fa88f83978bc163ab886b968cff13327ed9b))

## [0.50.0](https://github.com/sbb-design-systems/lyne-components/compare/v0.49.0...v0.50.0) (2024-04-11)


### ⚠ BREAKING CHANGES

* The entry points for the `@sbb-esta/lyne-components` have changed from extension-less to including the extension (e.g. `@sbb-esta/lyne-components/button` to `@sbb-esta/lyne-components/button.js`).
* **sbb-dialog:** The `sbb-dialog` component now needs the dedicated inner elements `sbb-dialog-title`, `sbb-dialog-content`, and `sbb-dialog-actions`. Use these components to respectively provide a title, a content and, optionally, a footer with an action group. Moreover, the full-screen variant (which occurred when no title was provided to the dialog) has been removed. To achieve a full-screen overlay, please use the new `sbb-overlay` component. As a migration help, consider the following example. Old: ```<sbb-dialog title-content="Title"><p>Dialog content.</p><sbb-action-group slot="action-group">...</sbb-action-group></sbb-dialog>```. New: ```<sbb-dialog><sbb-dialog-title>Title</sbb-dialog-title><sbb-dialog-content><p>Dialog content</p></sbb-dialog-content><sbb-dialog-actions>...</sbb-dialog-actions></sbb-dialog>```. Previously, a full-screen dialog was displayed if no title was provided to the dialog component: ```<sbb-dialog><p>Dialog content.</p></sbb-dialog>```. To achieve the same, it is now mandatory to use the `sbb-overlay` component: ```<sbb-overlay><p>Overlay content.</p></sbb-overlay>```.
* Changed several internal class names. Consumers shouldn't be affected.
* **sbb-form-field:** The css var `--sbb-form-field-height` has been renamed to `--sbb-form-field-min-height`.

### Features

* **button:** implemented size 'S' ([#2544](https://github.com/sbb-design-systems/lyne-components/issues/2544)) ([396d4dc](https://github.com/sbb-design-systems/lyne-components/commit/396d4dc00749c1335ec86128571ac31b2a8f875f))
* provide full font characters set as alternative ([#2573](https://github.com/sbb-design-systems/lyne-components/issues/2573)) ([4047883](https://github.com/sbb-design-systems/lyne-components/commit/40478831addeb79dc92cabc52b9d0665dd37a195))
* **sbb-form-field:** support the textarea inside the `&lt;sbb-form-field&gt;` ([#2506](https://github.com/sbb-design-systems/lyne-components/issues/2506)) ([f8316f0](https://github.com/sbb-design-systems/lyne-components/commit/f8316f074a36fe91c46d36ace2f5ebb2194e1e3a)), closes [#2497](https://github.com/sbb-design-systems/lyne-components/issues/2497)
* **sbb-overlay:** extract `sbb-overlay` component from dialog ([#2477](https://github.com/sbb-design-systems/lyne-components/issues/2477)) ([5ea4fb7](https://github.com/sbb-design-systems/lyne-components/commit/5ea4fb79c98495cf7859c99a3b16778a633c81d7)), closes [#2476](https://github.com/sbb-design-systems/lyne-components/issues/2476) [#2470](https://github.com/sbb-design-systems/lyne-components/issues/2470)
* **sbb-sticky-bar:** allow configuration of z-index ([#2566](https://github.com/sbb-design-systems/lyne-components/issues/2566)) ([20a98b2](https://github.com/sbb-design-systems/lyne-components/commit/20a98b2c126c4eccfc15c039b13da57df717a1e3))
* update size tokens ([#2551](https://github.com/sbb-design-systems/lyne-components/issues/2551)) ([74d8929](https://github.com/sbb-design-systems/lyne-components/commit/74d892927ff7d52536833e5502b31078716fbeac))


### Bug Fixes

* fix boolean handling in react wrapper ([#2547](https://github.com/sbb-design-systems/lyne-components/issues/2547)) ([e4ba04b](https://github.com/sbb-design-systems/lyne-components/commit/e4ba04b8144b2fa391cf9b406df28033832d319c))
* **sbb-calendar:** align month view label ([#2564](https://github.com/sbb-design-systems/lyne-components/issues/2564)) ([0215e00](https://github.com/sbb-design-systems/lyne-components/commit/0215e00d9aad145b1f5d26b1b00470c79c8e8640))
* **sbb-dialog:** fix accessibility with option to hide the header on scroll ([159f536](https://github.com/sbb-design-systems/lyne-components/commit/159f536b429350ac54cd28bd55cb63754a423a11))
* **sbb-dialog:** fix z-index ([#2572](https://github.com/sbb-design-systems/lyne-components/issues/2572)) ([374d7b7](https://github.com/sbb-design-systems/lyne-components/commit/374d7b7ed88ef2e97656417e6266ac20a11d1881))
* **sbb-form-error:** fix internal css variable name ([#2558](https://github.com/sbb-design-systems/lyne-components/issues/2558)) ([cc275af](https://github.com/sbb-design-systems/lyne-components/commit/cc275afb7fc8066723738bebaf3f61fb90bdf22e))
* set colspan properly ([0215e00](https://github.com/sbb-design-systems/lyne-components/commit/0215e00d9aad145b1f5d26b1b00470c79c8e8640))
* use valid import/export syntax ([#2563](https://github.com/sbb-design-systems/lyne-components/issues/2563)) ([585cfc5](https://github.com/sbb-design-systems/lyne-components/commit/585cfc52091a66c4da7d88fb781a7d419cc35ff0))


### Code Refactoring

* re-structure common behaviors ([#2533](https://github.com/sbb-design-systems/lyne-components/issues/2533)) ([906d576](https://github.com/sbb-design-systems/lyne-components/commit/906d5764b113a725c064d695e8e997f83c9628f4)), closes [#2534](https://github.com/sbb-design-systems/lyne-components/issues/2534)
* restructure entry points ([#2575](https://github.com/sbb-design-systems/lyne-components/issues/2575)) ([3d4c8ab](https://github.com/sbb-design-systems/lyne-components/commit/3d4c8ab34f63315548009c31920d89ce8235024f))

## [0.49.0](https://github.com/sbb-design-systems/lyne-components/compare/v0.48.3...v0.49.0) (2024-03-28)


### ⚠ BREAKING CHANGES

* **sbb-form-field:** `label` property and attribute of `<sbb-form-field>` was removed. Use `<label>` tag inside `<sbb-form-field>` to provide the label information. E.g. `<sbb-form-field label="Example">...</sbb-form-field>` becomes `<sbb-form-field><label>Example</label>...</sbb-form-field>`
* renamed component `sbb-screenreader-only` to `sbb-screeen-reader-only`.
* **sbb-calendar:** The `SbbDatepicker` property `selectedDate` has been renamed to `selected`. This also applies to the attribute `selected-date`, which has been renamed to `selected`. Additionally the `DateAdapter` (and `NativeDateAdapter`) have been superficially refactored. An important change is that the month is now `1`-based, instead of `0`-based.

### Features

* implement experimental support for server side rendering (SSR) ([#2466](https://github.com/sbb-design-systems/lyne-components/issues/2466)) ([3abcc68](https://github.com/sbb-design-systems/lyne-components/commit/3abcc6827a3152c7216c3a2178e63a19f96ba22b))


### Bug Fixes

* fix scrollbar styles for Chrome ([#2524](https://github.com/sbb-design-systems/lyne-components/issues/2524)) ([1266a21](https://github.com/sbb-design-systems/lyne-components/commit/1266a2197237eee1712896b7e5959658a3956193))
* **sbb-button:** remove gap for hidden icons in icon slot ([#2526](https://github.com/sbb-design-systems/lyne-components/issues/2526)) ([433c57c](https://github.com/sbb-design-systems/lyne-components/commit/433c57c5c5533ebb6409d3be5c47fec1fdd3aac6))
* **sbb-form-field:** remove label property and attribute ([#2523](https://github.com/sbb-design-systems/lyne-components/issues/2523)) ([602064c](https://github.com/sbb-design-systems/lyne-components/commit/602064c3d0ff4092c94b8faec4f95c1c1ae3bbb0))
* stories with label bold for sbb-checkbox and sbb-radio-button ([#2528](https://github.com/sbb-design-systems/lyne-components/issues/2528)) ([9e85be5](https://github.com/sbb-design-systems/lyne-components/commit/9e85be5d1c63c309e583402162f67e59e78bb897))


### Code Refactoring

* rename component name from `sbb-screenreader-only` to `sbb-screeen-reader-only` ([#2520](https://github.com/sbb-design-systems/lyne-components/issues/2520)) ([6fbf085](https://github.com/sbb-design-systems/lyne-components/commit/6fbf085dab84d64acac5151ed09dd29a8bc3d034))
* **sbb-calendar:** implement initial support for other date libraries ([6d4e9c2](https://github.com/sbb-design-systems/lyne-components/commit/6d4e9c2d22ae9cdf4d2ea73cbca650fd6d3ec4c2))

## [0.48.3](https://github.com/sbb-design-systems/lyne-components/compare/v0.48.2...v0.48.3) (2024-03-21)


### Bug Fixes

* **sbb-checkbox, sbb-toggle-check:** enable attribute mutation after form reset ([#2505](https://github.com/sbb-design-systems/lyne-components/issues/2505)) ([6bd8924](https://github.com/sbb-design-systems/lyne-components/commit/6bd892499aa3745ffa9dc52fecc3d8a392a35914))
* **sbb-header:** fix header shadow on keyboard navigation ([#2508](https://github.com/sbb-design-systems/lyne-components/issues/2508)) ([3eefbea](https://github.com/sbb-design-systems/lyne-components/commit/3eefbea158d28d54ed18b2a650c7ae7155fd1c42))
* **sbb-navigation-section:** ensure `sbb-active` initializes correctly ([#2493](https://github.com/sbb-design-systems/lyne-components/issues/2493)) ([baede50](https://github.com/sbb-design-systems/lyne-components/commit/baede50909c745f5d74d55722c0bc6db12701454))

## [0.48.2](https://github.com/sbb-design-systems/lyne-components/compare/v0.48.1...v0.48.2) (2024-03-14)


### Bug Fixes

* fix button dts files ([#2485](https://github.com/sbb-design-systems/lyne-components/issues/2485)) ([2228a02](https://github.com/sbb-design-systems/lyne-components/commit/2228a0255cdd205c3891dc6a12278e39584fc793))
* fix order of class decorators ([#2489](https://github.com/sbb-design-systems/lyne-components/issues/2489)) ([580b56f](https://github.com/sbb-design-systems/lyne-components/commit/580b56fbfcb020c21b96d639ecec45f717c7abdd))
* **sbb-navigation:** fix navigation actions contrast ratio ([#2481](https://github.com/sbb-design-systems/lyne-components/issues/2481)) ([f605a1e](https://github.com/sbb-design-systems/lyne-components/commit/f605a1ed48d27df4a3cc5dfe4f4cdddff36d8b5f))

## [0.48.1](https://github.com/sbb-design-systems/lyne-components/compare/v0.48.0...v0.48.1) (2024-03-13)


### Bug Fixes

* fix unresolved sass imports ([#2483](https://github.com/sbb-design-systems/lyne-components/issues/2483)) ([964ab42](https://github.com/sbb-design-systems/lyne-components/commit/964ab421bcbfb67061fe13dbe4970bae857e92c7))
* **sbb-status:** fix flex behavior in Firefox ([#2479](https://github.com/sbb-design-systems/lyne-components/issues/2479)) ([92d7492](https://github.com/sbb-design-systems/lyne-components/commit/92d74927bf02b4873c468b2c641d861ab5cbacb1))

## [0.48.0](https://github.com/sbb-design-systems/lyne-components/compare/v0.47.2...v0.48.0) (2024-03-12)


### ⚠ BREAKING CHANGES

* **sbb-navigation:** The `active` property of `<sbb-navigation-button>`/`<sbb-navigation-link>` (former `<sbb-navigation-action>`) has been removed. Add the CSS class `sbb-active` to the corresponding button/link, to mark it as active. Additionally, whenever `sbb-active` class is set in navigation, the corresponding navigation section, if one is connected, automatically opens.
* The action element refactoring brings a couple of breaking changes:
    - The following components have been split into two components. One with pure button and one with pure link behavior:
        - `sbb-card-action`: split in `sbb-card-button` and `sbb-card-link`
        - `sbb-header-action`: split in `sbb-header-button` and `sbb-header-link`
        - `sbb-menu-action`: split in `sbb-menu-button` and `sbb-menu-link`
        - `sbb-navigation-action`: split in `sbb-navigation-button` and `sbb-navigation-link`
    - The `isStatic` flag has been removed from buttons and links; since the static case was automatically detected when action elements were nested in other action elements, now you need to check for usage of nested buttons/links in other action elements and possibly fix them using the new static variants.
    - `sbb-button`: the `variant` property has been removed and for each value, a new component has been created (e.g. `sbb-button`, `sbb-secondary-button`, `sbb-tertiary-button`, `sbb-transparent-button`); each of them has been further divided considering the behavior: 
      - If the component was used as a button (no `href` set), replace it with `<sbb{-variant}-button>`
      - If the component was used as a link (`href` set), replace it with `<sbb{-variant}-button-link>`
      - If the component was nested into another action element (`isStatic` set), replace it with `<sbb{-variant}-button-static>`
    - The usage of an icon-only `sbb-button` in a `sbb-form-field` is not supported anymore; a new component named `sbb-mini-button` has been created to handle this specific case
    - Check and replace any `sbb-button` in `sbb-toast` with the new `sbb-transparent-button`/`sbb-transparent-button-link`, since the variant is not automatically set anymore
    - `sbb-link` has been split into nine components, based on type and variant:
      - If `sbb-link` had an `[href="..."]`, it migrates to `<sbb{-variant}-link>`:
        - `<sbb-link href="...">` should be replaced with `<sbb-block-link href="...">`
        - `<sbb-link href="..." variant="block">` should be replaced with `<sbb-block-link href="...">`
        - `<sbb-link href="..." variant="inline" >` should be replaced with `<sbb-link href="...">` 
      - If `sbb-link` did not have an `[href="..."]`, it migrates to `<sbb{-variant}-link-button>`
        - `<sbb-link>` should be replaced with `<sbb-block-link-button>`
        - `<sbb-link variant="block">` should be replaced with `<sbb-block-link-button>`
        - `<sbb-link variant="inline">` should be replaced with `<sbb-link-button>`
      - If `sbb-link` had an `[is-static]`, it migrates to `<sbb{-variant}-link-static>`
        - `<sbb-link is-static>` should be replaced with `<sbb-block-link-static>`
        - `<sbb-link is-static variant="block">` should be replaced with `<sbb-block-link-static>`
        - `<sbb-link is-static variant="inline">` should be replaced with `<sbb-link-static>`
    - `sbb-action-group` now only accepts `sbb-block-link | sbb-block-link-button` besides any `<sbb-button>` variant
    - `sbb-link-list` now only accepts `sbb-block-link | sbb-block-link-button`
    - `sbb-skiplink-list` now only accepts `sbb-block-link | sbb-block-link-button`
    - `sbb-toast` now only accepts `sbb-link | sbb-link-button | sbb-transparent-button | sbb-transparent-button-link`
    - SASS mixin renamings:
      - `link-variables` SASS mixin renamed to `block-link-variables`,
      - `link-variables--negative` SASS mixin renamed to `block-link-variables--negative`,
      - `link-variables--inline` SASS mixin renamed to `link-variables`,
      - `link-variables--inline-negative` SASS mixin renamed to `link-variables--negative`
      - `link-inline-consolidation` SASS mixin renamed to `link-consolidation`,
      - `link-inline` SASS mixin renamed to `link`,
      - `link-inline-negative` SASS mixin renamed to `link-negative`
* **color:** Removed 'default' suffix from color tokens (e.g. `--sbb-color-iron-default` => `--sbb-color-iron` and `SbbColorIronDefault` => `SbbColorIron`).
* **multiple:** rename type `TitleLevel` to `SbbTitleLevel`

### Features

* button variant refactoring ([98ea7f5](https://github.com/sbb-design-systems/lyne-components/commit/98ea7f541e457da982f0c23a427e324aba9332cf))
* implement initial support for SSR ([#2437](https://github.com/sbb-design-systems/lyne-components/issues/2437)) ([39d37ca](https://github.com/sbb-design-systems/lyne-components/commit/39d37ca31112617b206bdd15053cafd89886267f))
* increase `--sbb-font-size-title-5` for zero to small breakpoints ([#2448](https://github.com/sbb-design-systems/lyne-components/issues/2448)) ([15b786a](https://github.com/sbb-design-systems/lyne-components/commit/15b786aae95fbd92cb4b9584d3b37b959df9bc27))
* **sbb-card:** introduce new color for active state ([#2462](https://github.com/sbb-design-systems/lyne-components/issues/2462)) ([6553d6b](https://github.com/sbb-design-systems/lyne-components/commit/6553d6b1f21d3f05aa8be2c514fa12a4a61da7a7))
* **sbb-checkbox, sbb-toggle-check:** introduce native form support ([#2456](https://github.com/sbb-design-systems/lyne-components/issues/2456)) ([c9549a1](https://github.com/sbb-design-systems/lyne-components/commit/c9549a10abb527812caefb03b637817bc426e02a))
* **sbb-navigation:** remove navigation section divider ([#2473](https://github.com/sbb-design-systems/lyne-components/issues/2473)) ([71c1412](https://github.com/sbb-design-systems/lyne-components/commit/71c141212be8aaea32e3c471830420de93f4366e))
* **sbb-selection-panel:** increase border width for active state ([#2463](https://github.com/sbb-design-systems/lyne-components/issues/2463)) ([4c4bf5c](https://github.com/sbb-design-systems/lyne-components/commit/4c4bf5c2f1487d1667833dff4575786fbe176152)), closes [#2461](https://github.com/sbb-design-systems/lyne-components/issues/2461)
* **sbb-sticky-bar:** allow overlapping to the following content ([#2459](https://github.com/sbb-design-systems/lyne-components/issues/2459)) ([9518dfd](https://github.com/sbb-design-systems/lyne-components/commit/9518dfd82c6660f0601dac5bcb63898ed0499170))
* **sbb-teaser-paid:** first implementation ([#2434](https://github.com/sbb-design-systems/lyne-components/issues/2434)) ([68f807a](https://github.com/sbb-design-systems/lyne-components/commit/68f807ad39f18d1e50094c1162c931e88cb0d3ea))


### Bug Fixes

* fix imports of common styles ([#2475](https://github.com/sbb-design-systems/lyne-components/issues/2475)) ([fda1960](https://github.com/sbb-design-systems/lyne-components/commit/fda1960be53fe0884f105dea8cdeef2215cfd787))
* **layout:** apply max-width only for ultra screen size ([#2458](https://github.com/sbb-design-systems/lyne-components/issues/2458)) ([cce71b2](https://github.com/sbb-design-systems/lyne-components/commit/cce71b2cf062a47a8beb24d77d26f5c842133647))
* **sbb-navigation:** fix active and focus handling ([#2471](https://github.com/sbb-design-systems/lyne-components/issues/2471)) ([ea81790](https://github.com/sbb-design-systems/lyne-components/commit/ea81790cb49dfd2f05d93df1cbd93702c1757274))
* **sbb-radio-group, sbb-tab-group:** avoid incorrect setup if component is invisible during init ([#2446](https://github.com/sbb-design-systems/lyne-components/issues/2446)) ([1586137](https://github.com/sbb-design-systems/lyne-components/commit/158613728058d084c9c89d91a571d6a5311d876a))
* **sbb-selection-panel:** fix transition of border-width ([#2468](https://github.com/sbb-design-systems/lyne-components/issues/2468)) ([8300b7f](https://github.com/sbb-design-systems/lyne-components/commit/8300b7f072ac78f68943de57c972ec63b6ea1a51))
* **sbb-selection-panel:** fix transition of border-width [second attempt] ([#2469](https://github.com/sbb-design-systems/lyne-components/issues/2469)) ([942bf45](https://github.com/sbb-design-systems/lyne-components/commit/942bf4548f8c1ae0498700d24697f45de00de98c))
* **sbb-status:** fix text styling ([#2457](https://github.com/sbb-design-systems/lyne-components/issues/2457)) ([292d316](https://github.com/sbb-design-systems/lyne-components/commit/292d316ca94db90ba5ea1a87f40c4a3d1aaf0b54))
* **sbb-teaser:** prevent overlapping chip if including long content ([#2450](https://github.com/sbb-design-systems/lyne-components/issues/2450)) ([b78b3ce](https://github.com/sbb-design-systems/lyne-components/commit/b78b3ce68aa2480885dc77b0dc446eed3374b39e))


### Documentation

* **multiple:** remove undefined type from titleLevel ([#2447](https://github.com/sbb-design-systems/lyne-components/issues/2447)) ([c2532cd](https://github.com/sbb-design-systems/lyne-components/commit/c2532cdd5a1aa3ca574f8d1a711b4ca3ac68ba12))


### Styles

* **color:** remove 'default' suffix from color tokens ([77454de](https://github.com/sbb-design-systems/lyne-components/commit/77454de9e1fae3e9ef5c4dc39d0bc4c9f5f63ea8))


### Code Refactoring

* **sbb-navigation:** improve active handling and focus ([4f8f309](https://github.com/sbb-design-systems/lyne-components/commit/4f8f3099e6864e711a80027f5bce4b079dd6902f))

## [0.47.2](https://github.com/sbb-design-systems/lyne-components/compare/v0.47.1...v0.47.2) (2024-02-15)


### Bug Fixes

* **sbb-container:** remove overflowing margin without using overflow ([#2427](https://github.com/sbb-design-systems/lyne-components/issues/2427)) ([42b7da3](https://github.com/sbb-design-systems/lyne-components/commit/42b7da313ae59eced55adac0313e8ac944201665))
* **sbb-toast:** fix default z-index ([#2428](https://github.com/sbb-design-systems/lyne-components/issues/2428)) ([d0927ff](https://github.com/sbb-design-systems/lyne-components/commit/d0927ff4f568c426b2eb89da39d1716afa25989b))

## [0.47.1](https://github.com/sbb-design-systems/lyne-components/compare/v0.47.0...v0.47.1) (2024-02-15)


### Bug Fixes

* **sbb-status:** add index export ([03349f0](https://github.com/sbb-design-systems/lyne-components/commit/03349f02408d84f78810c6c8b14e944e188b128a))

## [0.47.0](https://github.com/sbb-design-systems/lyne-components/compare/v0.46.3...v0.47.0) (2024-02-14)


### ⚠ BREAKING CHANGES

* **sbb-image:** property `noBorderRadius` has been replaced by `borderRadius` which can receive 'default', 'none' and 'round'.

### Features

* **sbb-image:** introduce support for round variant ([#2401](https://github.com/sbb-design-systems/lyne-components/issues/2401)) ([971bd5c](https://github.com/sbb-design-systems/lyne-components/commit/971bd5c5a407f5550a633c222195e98eaf89befb))
* **sbb-status:** allow custom icons ([#2403](https://github.com/sbb-design-systems/lyne-components/issues/2403)) ([56b4068](https://github.com/sbb-design-systems/lyne-components/commit/56b4068781bdea5540a4fcdb1c43c8a20632d0f4)), closes [#2398](https://github.com/sbb-design-systems/lyne-components/issues/2398)


### Bug Fixes

* **sbb-pearl-chain-time:** use role paragraph for accessibility reasons ([#2424](https://github.com/sbb-design-systems/lyne-components/issues/2424)) ([9009807](https://github.com/sbb-design-systems/lyne-components/commit/90098076117c722cad853912b52503b2bc44963b))

## [0.46.3](https://github.com/sbb-design-systems/lyne-components/compare/v0.46.2...v0.46.3) (2024-02-14)


### Bug Fixes

* **react-wrapper:** avoid writing classname property on a component ([#2421](https://github.com/sbb-design-systems/lyne-components/issues/2421)) ([1ee492e](https://github.com/sbb-design-systems/lyne-components/commit/1ee492ed303563fb53b525cd79e711796088cc3f))
* **sbb-container:** container causes interference with overlay components ([#2419](https://github.com/sbb-design-systems/lyne-components/issues/2419)) ([099164c](https://github.com/sbb-design-systems/lyne-components/commit/099164c1fca0293a951f019ec953f7eaeaa5a845))

## [0.46.2](https://github.com/sbb-design-systems/lyne-components/compare/v0.46.1...v0.46.2) (2024-02-14)


### Bug Fixes

* **sbb-map-container:** adapt width starting from ultra breakpoint ([#2417](https://github.com/sbb-design-systems/lyne-components/issues/2417)) ([3c55d0c](https://github.com/sbb-design-systems/lyne-components/commit/3c55d0c8fd5ac0355cf60951c2038abacd269b57))

## [0.46.1](https://github.com/sbb-design-systems/lyne-components/compare/v0.46.0...v0.46.1) (2024-02-13)


### Bug Fixes

* **sbb-select:** let promise of update cycle complete ([5086cd6](https://github.com/sbb-design-systems/lyne-components/commit/5086cd6db157a4c328025a3e590dfd14794ebb1e))

## [0.46.0](https://github.com/sbb-design-systems/lyne-components/compare/v0.45.0...v0.46.0) (2024-02-12)


### ⚠ BREAKING CHANGES

* **sbb-popover:** Component `sbb-tooltip` has been renamed to `sbb-popover`. Component `sbb-tooltip-trigger` has been renamed to `sbb-popover-trigger` Attribute `sbb-tooltip-close` has been renamed to `sbb-popover-close`. Every CSS tooltip variable has been renamed from `--sbb-tooltip-*` to `--sbb-popover-*` (including trigger).

### Bug Fixes

* **sbb-popover:** rename tooltip to popover and fix accessibility bugs ([#2368](https://github.com/sbb-design-systems/lyne-components/issues/2368)) ([70c1c07](https://github.com/sbb-design-systems/lyne-components/commit/70c1c07965e2c4f7eac431628b8a432cea384207)), closes [#2018](https://github.com/sbb-design-systems/lyne-components/issues/2018)
* **sbb-select:** wait for shadow DOM readiness before setup when using nextjs ([#2409](https://github.com/sbb-design-systems/lyne-components/issues/2409)) ([fbef967](https://github.com/sbb-design-systems/lyne-components/commit/fbef9675929e84d05708d4317704ade3f4f3a732))
* **sbb-sticky-bar:** remove unnecessary import to container ([#2406](https://github.com/sbb-design-systems/lyne-components/issues/2406)) ([c935436](https://github.com/sbb-design-systems/lyne-components/commit/c9354363567afe84ecce8cee870ec66fc75bb367))

## [0.45.0](https://github.com/sbb-design-systems/lyne-components/compare/v0.44.1...v0.45.0) (2024-02-08)


### ⚠ BREAKING CHANGES

* **sbb-alert:** renamed `willPresent` event to `willOpen` and `didPresent` to `didOpen`.

### Features

* **a11y:** implemented a11y tree snapshot function ([#2378](https://github.com/sbb-design-systems/lyne-components/issues/2378)) ([3484e7b](https://github.com/sbb-design-systems/lyne-components/commit/3484e7b19118075d9ea1e90e4cb95c4b6c6e7d27))
* **sbb-clock:** introduce option to configure color of seconds hand ([#2400](https://github.com/sbb-design-systems/lyne-components/issues/2400)) ([b94d92d](https://github.com/sbb-design-systems/lyne-components/commit/b94d92da4d6ae20e540fbfe9b018514d0abcdd42))
* **sbb-container:** first implementation ([#2271](https://github.com/sbb-design-systems/lyne-components/issues/2271)) ([7403b67](https://github.com/sbb-design-systems/lyne-components/commit/7403b67fb89e4ebd3d301ce084e19766ad7bfc48))
* **sbb-screenreader-only:** initial implementation ([#2377](https://github.com/sbb-design-systems/lyne-components/issues/2377)) ([2e763d4](https://github.com/sbb-design-systems/lyne-components/commit/2e763d4454ef71c4707767a3962f6735a9e34f1f))
* update journey-summary storybook title ([#2390](https://github.com/sbb-design-systems/lyne-components/issues/2390)) ([3469654](https://github.com/sbb-design-systems/lyne-components/commit/3469654a81e1b33b5b3e5505b547953164ee15c1))


### Bug Fixes

* **multiple:** render lists with just one element as span ([#2381](https://github.com/sbb-design-systems/lyne-components/issues/2381)) ([e703be1](https://github.com/sbb-design-systems/lyne-components/commit/e703be1eb29c73fd8fe5ce4cc033373a0aefab84))
* **sbb-alert:** refactor animation to properly work in Safari ([#2394](https://github.com/sbb-design-systems/lyne-components/issues/2394)) ([30bf7c1](https://github.com/sbb-design-systems/lyne-components/commit/30bf7c1f3f9e662f2430b6815f1b3d518e47043b)), closes [#2389](https://github.com/sbb-design-systems/lyne-components/issues/2389)
* **sbb-calendar:** using keyboard navigation loses focus ([#2354](https://github.com/sbb-design-systems/lyne-components/issues/2354)) ([68be709](https://github.com/sbb-design-systems/lyne-components/commit/68be709fa4530afc505c193112d5fa0e15ea238d))
* **sbb-form-field:** suppress firefox outline for external framework compatibility ([#2386](https://github.com/sbb-design-systems/lyne-components/issues/2386)) ([6374162](https://github.com/sbb-design-systems/lyne-components/commit/6374162c465f4c68ca582c75557166f1484b289f))
* **sbb-notification:** fix accessibility ([#2325](https://github.com/sbb-design-systems/lyne-components/issues/2325)) ([00e9540](https://github.com/sbb-design-systems/lyne-components/commit/00e9540480758b4cfff690d3ed8ec81018e947ee))
* **sbb-select:** hide placeholder when using floating label in HCM ([#2399](https://github.com/sbb-design-systems/lyne-components/issues/2399)) ([dd38d13](https://github.com/sbb-design-systems/lyne-components/commit/dd38d1325415a1297b47a0679cfbe538721d6a5a)), closes [#2326](https://github.com/sbb-design-systems/lyne-components/issues/2326)

## [0.44.1](https://github.com/sbb-design-systems/lyne-components/compare/v0.44.0...v0.44.1) (2024-01-24)


### Bug Fixes

* **sbb-header:** fix border radius of focus outline in Safari ([#2365](https://github.com/sbb-design-systems/lyne-components/issues/2365)) ([aa409e7](https://github.com/sbb-design-systems/lyne-components/commit/aa409e743b29e97a54b02eb66a55ca385974e97d))
* **scrollbar:** fix track color in nested context ([#2363](https://github.com/sbb-design-systems/lyne-components/issues/2363)) ([82a4ad8](https://github.com/sbb-design-systems/lyne-components/commit/82a4ad8457e7528587af7d974821ff30e190cff6))

## [0.44.0](https://github.com/sbb-design-systems/lyne-components/compare/v0.43.14...v0.44.0) (2024-01-22)


### ⚠ BREAKING CHANGES

* **sbb-teaser:** The property `isStacked` has been removed in favor of `alignment`. Please see the documentation for further info. The `description` is not clamped to two lines anymore (responsibility of consumer). The slotted `image` has now a default width of `300px`. The slot, formerly named `description`, has been replaced by the unnamed slot. Support of nested `p` elements dropped (invalid html).
* The following components have been removed: `sbb-timetable-barrier-free`, `sbb-timetable-park-and-rail`, `sbb-timetable-row-column-headers`, `sbb-timetable-row-day-change`, `sbb-timetable-row-header`, `sbb-timetable-transportation-number`, `sbb-timetable-transportation-time`, `timetable-travel-hints`.

### Features

* **form-field:** allow label to be visually hidden ([#2361](https://github.com/sbb-design-systems/lyne-components/issues/2361)) ([9f618db](https://github.com/sbb-design-systems/lyne-components/commit/9f618db1980e83ea1e985c6560b599d6504471ce))
* **sbb-teaser:** redesign ([#2211](https://github.com/sbb-design-systems/lyne-components/issues/2211)) ([ba5f86c](https://github.com/sbb-design-systems/lyne-components/commit/ba5f86c44e27b55256f8ff4e064edeb379b226a6))


### Bug Fixes

* **sbb-title:** move font-smoothing into scss mixin ([#2355](https://github.com/sbb-design-systems/lyne-components/issues/2355)) ([331bac3](https://github.com/sbb-design-systems/lyne-components/commit/331bac31a51550ec672d3b3ec4589003cb2b8a56))


### Code Refactoring

* remove unused components ([e3b29eb](https://github.com/sbb-design-systems/lyne-components/commit/e3b29eb1af4c7bfa49a24b22fa63214a789b0043))

## [0.43.14](https://github.com/sbb-design-systems/lyne-components/compare/v0.43.13...v0.43.14) (2024-01-17)


### Bug Fixes

* **selection-panel:** fix typo ([#2347](https://github.com/sbb-design-systems/lyne-components/issues/2347)) ([074b63b](https://github.com/sbb-design-systems/lyne-components/commit/074b63b85f32c9dee016e094f8c6e21ff8ffe90c))

## [0.43.13](https://github.com/sbb-design-systems/lyne-components/compare/v0.43.12...v0.43.13) (2024-01-16)


### Bug Fixes

* prevent re-rendering during update ([#2343](https://github.com/sbb-design-systems/lyne-components/issues/2343)) ([b3e7a02](https://github.com/sbb-design-systems/lyne-components/commit/b3e7a02ede8a26f9ec3ceb35156f4f9d080a0689))

## [0.43.12](https://github.com/sbb-design-systems/lyne-components/compare/v0.43.11...v0.43.12) (2024-01-16)


### Bug Fixes

* adopt sass import guidelines ([#2340](https://github.com/sbb-design-systems/lyne-components/issues/2340)) ([f585122](https://github.com/sbb-design-systems/lyne-components/commit/f58512235fe1b7990777e5f85520d31392b64539)), closes [#2307](https://github.com/sbb-design-systems/lyne-components/issues/2307)
* fix SSR of sbb-select ([#2341](https://github.com/sbb-design-systems/lyne-components/issues/2341)) ([c46e63e](https://github.com/sbb-design-systems/lyne-components/commit/c46e63ea8ebcb40696389f1151d5a72aac17967e))

## [0.43.11](https://github.com/sbb-design-systems/lyne-components/compare/v0.43.10...v0.43.11) (2024-01-16)


### Bug Fixes

* improve creation of react component ([#2337](https://github.com/sbb-design-systems/lyne-components/issues/2337)) ([a64a3eb](https://github.com/sbb-design-systems/lyne-components/commit/a64a3eb54ac252f3e668c45d414a14e07a185fac))
* remove setTimeout from SlotChildObserver ([#2334](https://github.com/sbb-design-systems/lyne-components/issues/2334)) ([4905c9b](https://github.com/sbb-design-systems/lyne-components/commit/4905c9b71f848cc2f5778d73a60d183a7cf35dda))
* **sbb-header:** shows the header if it has visible focus within ([#2237](https://github.com/sbb-design-systems/lyne-components/issues/2237)) ([37061ad](https://github.com/sbb-design-systems/lyne-components/commit/37061ad1703c4d5661c3ab5270124a652012cd58))
* **sbb-notification:** border left stability ([#2330](https://github.com/sbb-design-systems/lyne-components/issues/2330)) ([0cae556](https://github.com/sbb-design-systems/lyne-components/commit/0cae55695c75318beb16de122bae5743c6241b45))
* **sbb-notification:** delay removal of notification after closing ([#2333](https://github.com/sbb-design-systems/lyne-components/issues/2333)) ([63ba57c](https://github.com/sbb-design-systems/lyne-components/commit/63ba57c5a5f0523044e0d9b4428269aa338118b2))
* **sbb-notification:** fix notification animation ([#2274](https://github.com/sbb-design-systems/lyne-components/issues/2274)) ([5272043](https://github.com/sbb-design-systems/lyne-components/commit/52720433b19427b72f3bd1492ac047c2b2bacc5d))
* **sbb-toggle:** deal with undefined option component ([#2327](https://github.com/sbb-design-systems/lyne-components/issues/2327)) ([97a4061](https://github.com/sbb-design-systems/lyne-components/commit/97a40610abea58f3d9f85880e4f96e0ad9a075b5))

## [0.43.10](https://github.com/sbb-design-systems/lyne-components/compare/v0.43.9...v0.43.10) (2024-01-09)


### Bug Fixes

* use renderAttributesOnCreate for react ([#2323](https://github.com/sbb-design-systems/lyne-components/issues/2323)) ([1de1379](https://github.com/sbb-design-systems/lyne-components/commit/1de1379f249efbc75778c5819dd1ffde0097926d))

## [0.43.9](https://github.com/sbb-design-systems/lyne-components/compare/v0.43.8...v0.43.9) (2024-01-09)


### Bug Fixes

* improve SSR handling of React components with children ([#2306](https://github.com/sbb-design-systems/lyne-components/issues/2306)) ([da0c1c5](https://github.com/sbb-design-systems/lyne-components/commit/da0c1c5deaf7c970da7c532df665f32322bcbe28))
* **sbb-autocomplete:** highlight option when options change ([#2317](https://github.com/sbb-design-systems/lyne-components/issues/2317)) ([76affb1](https://github.com/sbb-design-systems/lyne-components/commit/76affb1e07a288b2f02eda7bc2656d06291e53e0))
* **sbb-icon:** fix preserving space during loading ([#2308](https://github.com/sbb-design-systems/lyne-components/issues/2308)) ([2a01652](https://github.com/sbb-design-systems/lyne-components/commit/2a01652bfa5d206583e5e411b97bc0aed55818a5))
* **sbb-map-container:** add scrollbar background and divider line ([#2316](https://github.com/sbb-design-systems/lyne-components/issues/2316)) ([4b0f765](https://github.com/sbb-design-systems/lyne-components/commit/4b0f7653341d131731da24824c7081bfcf02c3ad))

## [0.43.8](https://github.com/sbb-design-systems/lyne-components/compare/v0.43.7...v0.43.8) (2024-01-03)


### Features

* **sbb-status:** component implementation ([#2262](https://github.com/sbb-design-systems/lyne-components/issues/2262)) ([8e1da55](https://github.com/sbb-design-systems/lyne-components/commit/8e1da55cb08aaa56ede9083ba5820f6e30d7038d))


### Bug Fixes

* fix using of new Date() ([#2315](https://github.com/sbb-design-systems/lyne-components/issues/2315)) ([9f69606](https://github.com/sbb-design-systems/lyne-components/commit/9f696061a32aae09f6d944697d4facaf339eb361))

## [0.43.7](https://github.com/sbb-design-systems/lyne-components/compare/v0.43.6...v0.43.7) (2023-12-20)


### Bug Fixes

* **sbb-journey-header:** add non breaking space for screen readers ([#2304](https://github.com/sbb-design-systems/lyne-components/issues/2304)) ([81a2c0a](https://github.com/sbb-design-systems/lyne-components/commit/81a2c0aa2e5e0a538c0d0dc7f2efcccee9ee0804))

## [0.43.6](https://github.com/sbb-design-systems/lyne-components/compare/v0.43.5...v0.43.6) (2023-12-18)


### Bug Fixes

* **sbb-select:** fix hydration timing issue ([#2301](https://github.com/sbb-design-systems/lyne-components/issues/2301)) ([7c52c9a](https://github.com/sbb-design-systems/lyne-components/commit/7c52c9abee9962fd5973e63e06caf2d809bda317))

## [0.43.5](https://github.com/sbb-design-systems/lyne-components/compare/v0.43.4...v0.43.5) (2023-12-18)


### Bug Fixes

* remove side effects entries from package.json ([d45c2cb](https://github.com/sbb-design-systems/lyne-components/commit/d45c2cbe729bd24017b67ba6ec4c5b59a8bcdc7f))

## [0.43.4](https://github.com/sbb-design-systems/lyne-components/compare/v0.43.3...v0.43.4) (2023-12-14)


### Bug Fixes

* chromatic instability ([#2280](https://github.com/sbb-design-systems/lyne-components/issues/2280)) ([b955328](https://github.com/sbb-design-systems/lyne-components/commit/b955328f0de803038ab5bd3a034938f39b7706a8))
* fix overlay positioning when virtual keyboard is present ([#2296](https://github.com/sbb-design-systems/lyne-components/issues/2296)) ([59ca8cd](https://github.com/sbb-design-systems/lyne-components/commit/59ca8cdc26045350571ed9916d6692f25cd1df5a))
* **sbb-calendar:** always display header centered ([#2293](https://github.com/sbb-design-systems/lyne-components/issues/2293)) ([85e4eb7](https://github.com/sbb-design-systems/lyne-components/commit/85e4eb7c84b7f6378ec179f270f516968715dcee))

## [0.43.3](https://github.com/sbb-design-systems/lyne-components/compare/v0.43.2...v0.43.3) (2023-12-13)


### Bug Fixes

* fix fake event detection ([#2291](https://github.com/sbb-design-systems/lyne-components/issues/2291)) ([26e7803](https://github.com/sbb-design-systems/lyne-components/commit/26e78033545ef90722d975b45167ddc36484f5f9))
* **sbb-selection-panel:** arrow navigation with radio-button-group with no content should select the radio-button ([#2255](https://github.com/sbb-design-systems/lyne-components/issues/2255)) ([a3d5891](https://github.com/sbb-design-systems/lyne-components/commit/a3d589113399d7fd012037291a7daed20f213ce8))

## [0.43.2](https://github.com/sbb-design-systems/lyne-components/compare/v0.43.1...v0.43.2) (2023-12-11)


### Miscellaneous Chores

* release 0.43.2 ([4912e90](https://github.com/sbb-design-systems/lyne-components/commit/4912e9066d847e441398b14411472187cd92b064))

## [0.43.1](https://github.com/sbb-design-systems/lyne-components/compare/v0.43.0...v0.43.1) (2023-12-11)


### Features

* **overlays:** provide option to cancel 'willClose' and 'willOpen' events ([#2264](https://github.com/sbb-design-systems/lyne-components/issues/2264)) ([1bc5596](https://github.com/sbb-design-systems/lyne-components/commit/1bc5596eab0dcd2dbb95dc928a6e7014d5b3d52b))

## [0.43.0](https://github.com/sbb-design-systems/lyne-components/compare/v0.43.0-next.16...v0.43.0) (2023-12-07)

## [0.43.0-next.16](https://github.com/sbb-design-systems/lyne-components/compare/v0.43.0-next.15...v0.43.0-next.16) (2023-12-07)

### Bug Fixes

- **sbb-radio-button-group, sbb-checkbox-group:** fix disabled and required state exchange ([#2273](https://github.com/sbb-design-systems/lyne-components/issues/2273)) ([8608c99](https://github.com/sbb-design-systems/lyne-components/commit/8608c994fb9f6d75f621c1df93bb68271e4c93da))
- **sbb-select:** adapt setup to work with Next.js hydration ([#2270](https://github.com/sbb-design-systems/lyne-components/issues/2270)) ([be8a5c5](https://github.com/sbb-design-systems/lyne-components/commit/be8a5c525eb2f219a0973de88582a802b2e3d89c))

### Refactorings

- rename components with Element suffix ([#2275](https://github.com/sbb-design-systems/lyne-components/issues/2275)) ([2c4cf25](https://github.com/sbb-design-systems/lyne-components/commit/2c4cf25f87b5c25c601c8844d2703edcd38ea56a))

## [0.43.0-next.15](https://github.com/sbb-design-systems/lyne-components/compare/v0.43.0-next.14...v0.43.0-next.15) (2023-12-06)

### Features

- **sbb-radio-button-group:** emit radio button in change event ([#2267](https://github.com/sbb-design-systems/lyne-components/issues/2267)) ([e0ce718](https://github.com/sbb-design-systems/lyne-components/commit/e0ce7181131f659573befb4d2238ec6c48d67fd7))

### Bug Fixes

- fix datepicker initialization ([#2266](https://github.com/sbb-design-systems/lyne-components/issues/2266)) ([cc23aff](https://github.com/sbb-design-systems/lyne-components/commit/cc23aff86e723d48129b4d7ff6199439e58b6615))
- make querySelector JSDOM compatible ([#2265](https://github.com/sbb-design-systems/lyne-components/issues/2265)) ([a9b4ad6](https://github.com/sbb-design-systems/lyne-components/commit/a9b4ad66a90c089989e9a03b93324950a142bc57))
- replace attribute access with property where possible ([#2258](https://github.com/sbb-design-systems/lyne-components/issues/2258)) ([8babd50](https://github.com/sbb-design-systems/lyne-components/commit/8babd50b67d4c8533b8c928d0010e82bda26461f))
- **sbb-autocomplete:** delay origin look up ([#2268](https://github.com/sbb-design-systems/lyne-components/issues/2268)) ([e060531](https://github.com/sbb-design-systems/lyne-components/commit/e060531f0ed39ec6c89eea482b489fcae413209b))
- **sbb-toggle:** calc pill position on hydration ([#2259](https://github.com/sbb-design-systems/lyne-components/issues/2259)) ([5260579](https://github.com/sbb-design-systems/lyne-components/commit/5260579d9721814f5d8d61580036625c3c804ca0))

## [0.43.0-next.14](https://github.com/sbb-design-systems/lyne-components/compare/v0.43.0-next.13...v0.43.0-next.14) (2023-12-04)

### Bug Fixes

- add CommonJS distribution for jest consumers ([#2261](https://github.com/sbb-design-systems/lyne-components/issues/2261)) ([7fddd42](https://github.com/sbb-design-systems/lyne-components/commit/7fddd42f08c0ad15c2a16a0b778bcde10fede58b))
- **sbb-timetable-occupancy-icon:** enable SSR rendering ([#2260](https://github.com/sbb-design-systems/lyne-components/issues/2260)) ([cc5e0f9](https://github.com/sbb-design-systems/lyne-components/commit/cc5e0f96f35d77786ec9377b626648fe7ff2c6cf))

## [0.43.0-next.13](https://github.com/sbb-design-systems/lyne-components/compare/v0.43.0-next.12...v0.43.0-next.13) (2023-12-04)

### Bug Fixes

- move ref to the back of declarations ([9a56187](https://github.com/sbb-design-systems/lyne-components/commit/9a56187178de7ac80e160ab143fc8a559e0e739f))
- move ref to the back of declarations ([#2243](https://github.com/sbb-design-systems/lyne-components/issues/2243)) ([a6ddbc4](https://github.com/sbb-design-systems/lyne-components/commit/a6ddbc406868987773e3c2ea46341a600c03f221))
- **sbb-dialog:** correctly check whether pointer down event is on dialog ([#2245](https://github.com/sbb-design-systems/lyne-components/issues/2245)) ([fcada63](https://github.com/sbb-design-systems/lyne-components/commit/fcada63f44fd2d5d5827f1f46c2519d6e4839d5d))
- sbb-occupancy bug in high contrast mode ([#2143](https://github.com/sbb-design-systems/lyne-components/issues/2143)) ([9e757b6](https://github.com/sbb-design-systems/lyne-components/commit/9e757b66ffd5ba82d00d9e85eb5982261d4b90f6))
- **sbb-select:** fix template mismatch on hydration ([#2241](https://github.com/sbb-design-systems/lyne-components/issues/2241)) ([6608466](https://github.com/sbb-design-systems/lyne-components/commit/66084663ba3423b81f3bb5d8665df099418f2cc8))
- **select:** enhance test robustness ([#2256](https://github.com/sbb-design-systems/lyne-components/issues/2256)) ([a8c4d21](https://github.com/sbb-design-systems/lyne-components/commit/a8c4d212585ceef74a943a09e8f75b5fd49c48e7))

### Refactorings

- **sbb-notification:** set fixed story height to work around chromatic issues ([#2233](https://github.com/sbb-design-systems/lyne-components/issues/2233)) ([f18da8f](https://github.com/sbb-design-systems/lyne-components/commit/f18da8f68c690642f2aeadd844f96014bd7e8eae))

### Documentation

- **readme:** fix attribute name composition ([#2254](https://github.com/sbb-design-systems/lyne-components/issues/2254)) ([0713997](https://github.com/sbb-design-systems/lyne-components/commit/0713997b2677b57f137b13dc3aed9be9e2d87835))

## [0.43.0-next.12](https://github.com/sbb-design-systems/lyne-components/compare/v0.43.0-next.11...v0.43.0-next.12) (2023-11-29)

### Bug Fixes

- convert classes on host in data attributes ([#2242](https://github.com/sbb-design-systems/lyne-components/issues/2242)) ([03310ab](https://github.com/sbb-design-systems/lyne-components/commit/03310ab9530dd2db6682dc4195549bd5c01a9313))
- fix connected abort controller ([7b40581](https://github.com/sbb-design-systems/lyne-components/commit/7b4058151ffa8764bfec84b2499bf734ee6a6971))
- minor ssr fixes ([#2235](https://github.com/sbb-design-systems/lyne-components/issues/2235)) ([03978bd](https://github.com/sbb-design-systems/lyne-components/commit/03978bd186ee476860878c57d824df25141bf61b))
- **radio-button-group:** fix event type ([#2238](https://github.com/sbb-design-systems/lyne-components/issues/2238)) ([159f518](https://github.com/sbb-design-systems/lyne-components/commit/159f518f0f34eb11fb15a9be7932029a79d9384e))
- **sbb-selection-panel:** fix data-state on selection panels with no content ([#2236](https://github.com/sbb-design-systems/lyne-components/issues/2236)) ([2b67f4b](https://github.com/sbb-design-systems/lyne-components/commit/2b67f4babeb48fcb24343ddd2940a67db236ab6d))

## [0.43.0-next.11](https://github.com/sbb-design-systems/lyne-components/compare/v0.43.0-next.10...v0.43.0-next.11) (2023-11-28)

### ⚠ BREAKING CHANGES

- - sbb-alert: Event `will-present` was renamed to `willPresent`.

* sbb-alert: Event `did-present` was renamed to `didPresent`.
* sbb-alert: Event `dismissal-requested` was renamed to `dismissalRequested`.
* sbb-alert-group: Event `did-dismiss-alert` was renamed to `didDismissAlert`.
* sbb-autocomplete: Event `will-open` was renamed to `willOpen`.
* sbb-autocomplete: Event `did-open` was renamed to `didOpen`.
* sbb-autocomplete: Event `will-close` was renamed to `willClose`.
* sbb-autocomplete: Event `did-close` was renamed to `didClose`.
* sbb-calendar: Event `date-selected` was renamed to `dateSelected`.
* sbb-checkbox: Event `did-change` was renamed to `didChange`.
* sbb-dialog: Event `will-open` was renamed to `willOpen`.
* sbb-dialog: Event `did-open` was renamed to `didOpen`.
* sbb-dialog: Event `will-close` was renamed to `willClose`.
* sbb-dialog: Event `did-close` was renamed to `didClose`.
* sbb-dialog: Event `request-back-action` was renamed to `requestBackAction`.
* sbb-expansion-panel: Event `will-open` was renamed to `willOpen`.
* sbb-expansion-panel: Event `did-open` was renamed to `didOpen`.
* sbb-expansion-panel: Event `will-close` was renamed to `willClose`.
* sbb-expansion-panel: Event `did-close` was renamed to `didClose`.
* sbb-expansion-panel-header: Event `toggle-expanded` was renamed to `toggleExpanded`.
* sbb-file-selector: Event `file-changed` was renamed to `fileChanged`.
* sbb-menu: Event `will-open` was renamed to `willOpen`.
* sbb-menu: Event `did-open` was renamed to `didOpen`.
* sbb-menu: Event `will-close` was renamed to `willClose`.
* sbb-menu: Event `did-close` was renamed to `didClose`.
* sbb-notification: Event `will-open` was renamed to `willOpen`.
* sbb-notification: Event `did-open` was renamed to `didOpen`.
* sbb-notification: Event `will-close` was renamed to `willClose`.
* sbb-notification: Event `did-close` was renamed to `didClose`.
* sbb-option: Event `option-selection-change` was renamed to `optionSelectionChange`.
* sbb-option: Event `option-selected` was renamed to `optionSelected`.
* sbb-select: Event `will-open` was renamed to `willOpen`.
* sbb-select: Event `did-open` was renamed to `didOpen`.
* sbb-select: Event `will-close` was renamed to `willClose`.
* sbb-select: Event `did-close` was renamed to `didClose`.
* sbb-tab-group: Event `did-change` was renamed to `didChange`.
* sbb-tag: Event `state-change` was renamed to `stateChange` and was changed to an internal event.
* sbb-toast: Event `will-open` was renamed to `willOpen`.
* sbb-toast: Event `did-open` was renamed to `didOpen`.
* sbb-toast: Event `will-close` was renamed to `willClose`.
* sbb-toast: Event `did-close` was renamed to `didClose`.
* sbb-tooltip: Event `will-open` was renamed to `willOpen`.
* sbb-tooltip: Event `did-open` was renamed to `didOpen`.
* sbb-tooltip: Event `will-close` was renamed to `willClose`.
* sbb-tooltip: Event `did-close` was renamed to `didClose`.

### Features

- **sbb-toast:** introduce css var for container position ([#2229](https://github.com/sbb-design-systems/lyne-components/issues/2229)) ([150724f](https://github.com/sbb-design-systems/lyne-components/commit/150724fc12d50abe0f6474de28d30f5e4479d35f))

### Bug Fixes

- **overlays:** hide overlays before hydration ([#2226](https://github.com/sbb-design-systems/lyne-components/issues/2226)) ([42ea83b](https://github.com/sbb-design-systems/lyne-components/commit/42ea83bb1abf7e41e5c41d4d1a1c1706f85c7778))
- **sbb-autocomplete:** fix SSR ([#2225](https://github.com/sbb-design-systems/lyne-components/issues/2225)) ([d6b0143](https://github.com/sbb-design-systems/lyne-components/commit/d6b01430313dd511aba2d75b333b179cdf79cf47))
- **sbb-calendar:** ensure dateFilter works with SSR ([#2220](https://github.com/sbb-design-systems/lyne-components/issues/2220)) ([4c127f9](https://github.com/sbb-design-systems/lyne-components/commit/4c127f95043bab2461e417484419e185a99be5a6))
- **sbb-image:** support SSR ([#2227](https://github.com/sbb-design-systems/lyne-components/issues/2227)) ([b00e2d3](https://github.com/sbb-design-systems/lyne-components/commit/b00e2d33718b55c217a84981340ff2430373b197))
- **sbb-signet:** export sbb-signet correctly ([b2f304f](https://github.com/sbb-design-systems/lyne-components/commit/b2f304f17def879ce938252536c67b2814357aed))
- **sbb-slider:** fix trapped focus on the knob ([#2222](https://github.com/sbb-design-systems/lyne-components/issues/2222)) ([cbe33ad](https://github.com/sbb-design-systems/lyne-components/commit/cbe33adedbd56e6cefd1188bdf74bdce59032e4b))
- **sbb-toggle:** supress warnings on SSR ([#2228](https://github.com/sbb-design-systems/lyne-components/issues/2228)) ([9ac2eef](https://github.com/sbb-design-systems/lyne-components/commit/9ac2eefe7f4a35ff64054b9c50c9d696065bf1f4))

### Refactorings

- rename event names to camelCase ([#2215](https://github.com/sbb-design-systems/lyne-components/issues/2215)) ([9b657e8](https://github.com/sbb-design-systems/lyne-components/commit/9b657e82390b81f081115b0666eabefdc56a2b82))
- resolve todos ([#2200](https://github.com/sbb-design-systems/lyne-components/issues/2200)) ([83af539](https://github.com/sbb-design-systems/lyne-components/commit/83af53966fef791fc0ce49364dd25e4deae5090b))
- **sbb-breadcrumb:** fix storybook functionality in docs ([35928e3](https://github.com/sbb-design-systems/lyne-components/commit/35928e350b4d3730ef96279f957f80ed64805eba))
- **sbb-breadcrumb:** support SSR and hydration ([#2224](https://github.com/sbb-design-systems/lyne-components/issues/2224)) ([e38ee8a](https://github.com/sbb-design-systems/lyne-components/commit/e38ee8a183ca078b0ee1998674084e5026f660d8))
- **stories:** migrate jsx to lit template ([#2198](https://github.com/sbb-design-systems/lyne-components/issues/2198)) ([581be19](https://github.com/sbb-design-systems/lyne-components/commit/581be19ad42a691620656d018a46a66d8c9c7642))
- update coding standards ([#2219](https://github.com/sbb-design-systems/lyne-components/issues/2219)) ([c832459](https://github.com/sbb-design-systems/lyne-components/commit/c8324598bb9c2f1911aad7803771e37d44297c26))

## [0.43.0-next.10](https://github.com/sbb-design-systems/lyne-components/compare/v0.43.0-next.9...v0.43.0-next.10) (2023-11-23)

### Refactorings

- change EventEmitter.emit to return the result of dispatchEvent ([#2218](https://github.com/sbb-design-systems/lyne-components/issues/2218)) ([91c6801](https://github.com/sbb-design-systems/lyne-components/commit/91c680102657a28481d3153b8f8388abdb103808))

## [0.43.0-next.9](https://github.com/sbb-design-systems/lyne-components/compare/v0.43.0-next.8...v0.43.0-next.9) (2023-11-22)

### ⚠ BREAKING CHANGES

- **sbb-icon:** sbb-icon: Invert property default behavior from sanitize = true to noSanitize = false.

### Bug Fixes

- address various issues with SSR ([#2213](https://github.com/sbb-design-systems/lyne-components/issues/2213)) ([7107bbf](https://github.com/sbb-design-systems/lyne-components/commit/7107bbf7d909edd3023523a6e14c56148159ef4d))
- fix method and value accessors for SSR ([#2207](https://github.com/sbb-design-systems/lyne-components/issues/2207)) ([d590c17](https://github.com/sbb-design-systems/lyne-components/commit/d590c1700d653363a177ae3a91e3b237d84df105))
- **sbb-icon:** change sanitize prop to no-sanitize ([#2197](https://github.com/sbb-design-systems/lyne-components/issues/2197)) ([6e8c660](https://github.com/sbb-design-systems/lyne-components/commit/6e8c660e496e714d7326e25c38122767c13517e2))
- **sbb-logo,sbb-signet:** solve SSR issue with text assignment ([#2208](https://github.com/sbb-design-systems/lyne-components/issues/2208)) ([548d45d](https://github.com/sbb-design-systems/lyne-components/commit/548d45dec7553aa3a7d2dd80f55fe4f5df35a69c))

## [0.43.0-next.8](https://github.com/sbb-design-systems/lyne-components/compare/v0.43.0-next.7...v0.43.0-next.8) (2023-11-20)

### Bug Fixes

- **sbb-logo,sbb-signet:** fix SSR issue with svg title elements ([5b5e8a1](https://github.com/sbb-design-systems/lyne-components/commit/5b5e8a10a8c4cd60d52631fb222eeb572c929423))

## [0.43.0-next.7](https://github.com/sbb-design-systems/lyne-components/compare/v0.43.0-next.6...v0.43.0-next.7) (2023-11-17)

### Bug Fixes

- resolve issues with server side rendering ([3a79b80](https://github.com/sbb-design-systems/lyne-components/commit/3a79b806636b53391a93156f3532ae5d39937c72))
- skip checking breakpoints on server side rendering ([6c49bbc](https://github.com/sbb-design-systems/lyne-components/commit/6c49bbc59bf0f98615439a1433022b27b37a8dbd))

## [0.43.0-next.6](https://github.com/sbb-design-systems/lyne-components/compare/v0.43.0-next.5...v0.43.0-next.6) (2023-11-17)

### Bug Fixes

- **sbb-log,sbb-signet:** fix svg templating ([1ec9eca](https://github.com/sbb-design-systems/lyne-components/commit/1ec9ecae27c44a63d37d5d041ae322c9b6cb57a2))
- **sbb-skiplink-list:** initialize links variable to avoid undefined reference ([30d8bac](https://github.com/sbb-design-systems/lyne-components/commit/30d8bacce68aa584a32001ce3e5195140ccca028))

## [0.43.0-next.5](https://github.com/sbb-design-systems/lyne-components/compare/v0.43.0-next.4...v0.43.0-next.5) (2023-11-17)

### Bug Fixes

- fix issues with server side rendering for consumers ([636163e](https://github.com/sbb-design-systems/lyne-components/commit/636163eadc1742ab8ea1ccae55033828554ae8fd))

## [0.43.0-next.4](https://github.com/sbb-design-systems/lyne-components/compare/v0.43.0-next.3...v0.43.0-next.4) (2023-11-16)

### Bug Fixes

- add @lit/react as dependency of the react wrapper ([00853f9](https://github.com/sbb-design-systems/lyne-components/commit/00853f9246b4bf2764f93902173f5b19f29fd928))

## [0.43.0-next.3](https://github.com/sbb-design-systems/lyne-components/compare/v0.43.0-next.2...v0.43.0-next.3) (2023-11-16)

## [0.43.0-next.2](https://github.com/sbb-design-systems/lyne-components/compare/v0.43.0-next.1...v0.43.0-next.2) (2023-11-16)

## [0.43.0-next.1](https://github.com/sbb-design-systems/lyne-components/compare/v0.43.0-next.0...v0.43.0-next.1) (2023-11-16)

## [0.43.0-next.0](https://github.com/sbb-design-systems/lyne-components/compare/v0.42.6...v0.43.0-next.0) (2023-11-16)

### ⚠ BREAKING CHANGES

- Distribution and import paths changed:
  Previously with Stencil.js we had various distribution bundles, which served nontransparent purposes. With Lit we now have one distribution format, which is modern JavaScript as EcmaScript Modules (ESM). This significantly reduces bundle size and reduces confusion with building and debugging.
  Additionally, we have separated components into their own modules, with secondary entry points (available via e.g. @sbb-esta/lyne-components/button). Even with modern tooling, this improves bundler and IDE performance and creates logical boundaries for related functionality.
- Boolean attributes are now considered as true as long as they are present, even when manually set to false (e.g. `disabled='false'` is still disabled). See https://developer.mozilla.org/en-US/docs/Glossary/Boolean/HTML
- `hydration` CSS class is not set anymore. Use `:defined` selector if you like to know whenever a component is defined.
- `sbb-image`: properties `lqip` renamed to `skipLqip` and `borderRadius` to `noBorderRadius`. The logic is inverted now.
- **sbb-header:** The spacing between the logo and the `sbb-header-action`s is now in responsibility of Lyne. Therefore consumers need to remove any manually added spacing. Lyne examples are updated. (cherry picked from commit 07cbf3080f834171a9b6580398711138aea7558e)

### Features

- implement React wrapper ([#2171](https://github.com/sbb-design-systems/lyne-components/issues/2171)) ([b2c6548](https://github.com/sbb-design-systems/lyne-components/commit/b2c65487c58c6f3f71c7387d1291bf7f80dace88))

### Bug Fixes

- add CSSResult import and type ([#2006](https://github.com/sbb-design-systems/lyne-components/issues/2006)) ([c22164f](https://github.com/sbb-design-systems/lyne-components/commit/c22164f0a34cb7302cbed759eb30daa92aeb7d96))
- connect sbb-datepicker with related components when initialized ([#2160](https://github.com/sbb-design-systems/lyne-components/issues/2160)) ([901896e](https://github.com/sbb-design-systems/lyne-components/commit/901896e6baca6c4c26f1176625e7627d7760ab7e))
- **form-field:** fix optional spacing ([fbf6c0e](https://github.com/sbb-design-systems/lyne-components/commit/fbf6c0efee4c38906204f3c6409255bd1446bf8d))
- **lit-migration:** change public methods to private where possible ([#2125](https://github.com/sbb-design-systems/lyne-components/issues/2125)) ([046544b](https://github.com/sbb-design-systems/lyne-components/commit/046544b0a9ed3f56799c668c06fbb2918c159483))
- resolve attributes function not handling states correctly ([#2064](https://github.com/sbb-design-systems/lyne-components/issues/2064)) ([dc981b5](https://github.com/sbb-design-systems/lyne-components/commit/dc981b560cf1ad51987e6a58f82d6b4e85e2e00e))
- **sbb-datepicker:** add missing tests on related components, minor fixes ([#2185](https://github.com/sbb-design-systems/lyne-components/issues/2185)) ([c5e14d9](https://github.com/sbb-design-systems/lyne-components/commit/c5e14d937d23fc9c3efd83996310eedb9b9eb278))
- **sbb-navigation, sbb-menu, sbb-dialog, sbb-tooltip:** new overlay mechanism ([#2133](https://github.com/sbb-design-systems/lyne-components/issues/2133)) ([f6885e6](https://github.com/sbb-design-systems/lyne-components/commit/f6885e604eec9f068ef4fe868b743ca7238be9b2))
- **sbb-radio-button-group, sbb-checkbox-group:** radio and checkbox group state update ([#2186](https://github.com/sbb-design-systems/lyne-components/issues/2186)) ([f6b5194](https://github.com/sbb-design-systems/lyne-components/commit/f6b51941d341d50411af1f7d06c918bf37ec0155))
- **sbb-selection-panel:** disabled border color when checked ([#2189](https://github.com/sbb-design-systems/lyne-components/issues/2189)) ([3ccf91a](https://github.com/sbb-design-systems/lyne-components/commit/3ccf91aff4bc53f050d3213f10d90a37c4e48a67))
- **sbb-selection-panel:** state and value initialization ([#2178](https://github.com/sbb-design-systems/lyne-components/issues/2178)) ([6d1ad9a](https://github.com/sbb-design-systems/lyne-components/commit/6d1ad9ac737cac2b18fdf0e9c92274e489207cb3))
- **sbb-toggle-check:** await Promise of setTimeout ([#2058](https://github.com/sbb-design-systems/lyne-components/issues/2058)) ([fbf67ee](https://github.com/sbb-design-systems/lyne-components/commit/fbf67eed7beaba1222c2782c249e910c687c31d9))

### Documentation

- coding standards update ([19ede73](https://github.com/sbb-design-systems/lyne-components/commit/19ede731bb09be0af3cafe52ea6a68f9214950f6))
- develop documentation update ([218b34e](https://github.com/sbb-design-systems/lyne-components/commit/218b34eb83d663f3cc9c2dedcf6e6ec24a4e7022))
- develop documentation update ([d1bb87d](https://github.com/sbb-design-systems/lyne-components/commit/d1bb87d5308d1ba19ed123845978fa3112ea3373))
- **generate:** adapt to manifest changes and general fixes ([#2135](https://github.com/sbb-design-systems/lyne-components/issues/2135)) ([941ac68](https://github.com/sbb-design-systems/lyne-components/commit/941ac68cfd526c413f3d194c58642a4b769d5300))
- readme refactoring ([#1996](https://github.com/sbb-design-systems/lyne-components/issues/1996)) ([40a06ee](https://github.com/sbb-design-systems/lyne-components/commit/40a06ee42a1f659e2665c937779bcefb302b9f43))
- **readme:** restored readme auto-generation ([#2109](https://github.com/sbb-design-systems/lyne-components/issues/2109)) ([bb15b2e](https://github.com/sbb-design-systems/lyne-components/commit/bb15b2e28eb93a0621f181b6146db350792e4d3c))
- remove todo and update components docs ([#2176](https://github.com/sbb-design-systems/lyne-components/issues/2176)) ([13fb68f](https://github.com/sbb-design-systems/lyne-components/commit/13fb68f3f069f7703c93b1b9c4583a75898458a1))
- update coding standards ([#2158](https://github.com/sbb-design-systems/lyne-components/issues/2158)) ([d7f3635](https://github.com/sbb-design-systems/lyne-components/commit/d7f3635a539b27978319d6dec122c7446f5d8008))

### Refactorings

- adapt imports ([a668cff](https://github.com/sbb-design-systems/lyne-components/commit/a668cff92eb72577a97972dd9b6595f5a3140ccc))
- add eslint-plugin-import and apply rules ([#2162](https://github.com/sbb-design-systems/lyne-components/issues/2162)) ([8185e3d](https://github.com/sbb-design-systems/lyne-components/commit/8185e3def118bf605c4f7f03328d6f315c5d3342))
- **css:** migrate '.hydrated' css rules ([bae27d4](https://github.com/sbb-design-systems/lyne-components/commit/bae27d42502216cfab95573c1f9472caac03d33f))
- **EventEmitter:** set default options to true ([2c07a95](https://github.com/sbb-design-systems/lyne-components/commit/2c07a958f7a21e76d1246eb1d44626acffd3774d))
- **home, styles:** lit migration ([#2086](https://github.com/sbb-design-systems/lyne-components/issues/2086)) ([d978b16](https://github.com/sbb-design-systems/lyne-components/commit/d978b16fd99b7ba4efe2f8cae5f6d797c691ff68))
- improve linting ([#2122](https://github.com/sbb-design-systems/lyne-components/issues/2122)) ([e79d0b7](https://github.com/sbb-design-systems/lyne-components/commit/e79d0b79958df76b14baef1996520c5ced1664a0))
- inline event name map in components ([#2104](https://github.com/sbb-design-systems/lyne-components/issues/2104)) ([dcadb36](https://github.com/sbb-design-systems/lyne-components/commit/dcadb36f0982d8814e125e59f01c675345732149))
- migrate library to Lit ([d1b8b62](https://github.com/sbb-design-systems/lyne-components/commit/d1b8b62232904e353055c1cd2ac18bb9fea30b6f))
- migrate readme imports ([9cae032](https://github.com/sbb-design-systems/lyne-components/commit/9cae032957f1cfcc6e19f471b4996f78a8839ccc))
- migrate toggle and toggle-option ([#2021](https://github.com/sbb-design-systems/lyne-components/issues/2021)) ([00be8b2](https://github.com/sbb-design-systems/lyne-components/commit/00be8b249c5214165a57086929825e081209eaee))
- migrate toggle-check ([#2022](https://github.com/sbb-design-systems/lyne-components/issues/2022)) ([2c215a6](https://github.com/sbb-design-systems/lyne-components/commit/2c215a6437533e2cb7df8376b5e7f4cfdae694e5))
- move src/global to src/components/core ([#2140](https://github.com/sbb-design-systems/lyne-components/issues/2140)) ([947f858](https://github.com/sbb-design-systems/lyne-components/commit/947f85850eac399c260d1230eac371a76632b4ed))
- refactor timetable base components ([#2060](https://github.com/sbb-design-systems/lyne-components/issues/2060)) ([871bd8e](https://github.com/sbb-design-systems/lyne-components/commit/871bd8e5399522122abc21c3493cda6e8ff52ddd))
- remove \*.d.ts files ([#2110](https://github.com/sbb-design-systems/lyne-components/issues/2110)) ([199b21a](https://github.com/sbb-design-systems/lyne-components/commit/199b21a492c580bbe06547251bd0edd6c1ed8f51))
- remove CSS selectors for boolean attributes ([#2145](https://github.com/sbb-design-systems/lyne-components/issues/2145)) ([9d1dd59](https://github.com/sbb-design-systems/lyne-components/commit/9d1dd59438282b329bc4b51b310ee7c8e6038504))
- rename and restructure components ([bf7dd40](https://github.com/sbb-design-systems/lyne-components/commit/bf7dd40e409cc8e0185179d0e47ec3b66cf2b655))
- **sbb-accordion:** lit migration ([#2069](https://github.com/sbb-design-systems/lyne-components/issues/2069)) ([055aceb](https://github.com/sbb-design-systems/lyne-components/commit/055aceb69b345aa7d3186a1db0018ebf5c94f8b4))
- **sbb-alert:** lit migration ([#2073](https://github.com/sbb-design-systems/lyne-components/issues/2073)) ([4298825](https://github.com/sbb-design-systems/lyne-components/commit/4298825981e0513b897ea8e253101d1877b525a7))
- **sbb-breadcrumb, sbb-breadcrumb-group:** lit migration ([#2071](https://github.com/sbb-design-systems/lyne-components/issues/2071)) ([0ad2547](https://github.com/sbb-design-systems/lyne-components/commit/0ad25474a6754693da7ea8b226e00492e2fb3dfa))
- **sbb-button:** lit migration ([#1997](https://github.com/sbb-design-systems/lyne-components/issues/1997)) ([a0e02cb](https://github.com/sbb-design-systems/lyne-components/commit/a0e02cbf37e9bbe46606e5b7c877a9010bff8a5f))
- **sbb-calendar:** migrate component to lit ([#2045](https://github.com/sbb-design-systems/lyne-components/issues/2045)) ([c475ded](https://github.com/sbb-design-systems/lyne-components/commit/c475ded0686a6e5fa7648060658cb1309c389a87))
- **sbb-card:** lit migration ([#2056](https://github.com/sbb-design-systems/lyne-components/issues/2056)) ([5a3424d](https://github.com/sbb-design-systems/lyne-components/commit/5a3424d6a6a5d4109a28158ab157e3282fc49da5))
- **sbb-checkbox, sbb-checkbox-group:** migration to Lit ([#2065](https://github.com/sbb-design-systems/lyne-components/issues/2065)) ([1160c84](https://github.com/sbb-design-systems/lyne-components/commit/1160c84bfe99bebbece64370ffc9aa1cfcc8d7ea))
- sbb-chip migration ([#2008](https://github.com/sbb-design-systems/lyne-components/issues/2008)) ([8205fc8](https://github.com/sbb-design-systems/lyne-components/commit/8205fc8060572b542cc1e00e9f7fdc4a7c8f1c91))
- **sbb-clock, sbb-link-list, sbb-footer:** migrate to lit ([#2059](https://github.com/sbb-design-systems/lyne-components/issues/2059)) ([73ab56a](https://github.com/sbb-design-systems/lyne-components/commit/73ab56a01a5a53d358e174f2bbc47df615858f1c))
- **sbb-datepicker:** lit migration ([#2102](https://github.com/sbb-design-systems/lyne-components/issues/2102)) ([1e6f506](https://github.com/sbb-design-systems/lyne-components/commit/1e6f506e864c4b0fe18e3296176a9b6e7f025beb))
- **sbb-datepicker:** remove unnecessary code to stabilize tests ([#2165](https://github.com/sbb-design-systems/lyne-components/issues/2165)) ([11fc6c0](https://github.com/sbb-design-systems/lyne-components/commit/11fc6c07b4c546d2d3465aec38b28d6dc8bea4ee))
- **sbb-dialog:** lit migration ([#2041](https://github.com/sbb-design-systems/lyne-components/issues/2041)) ([2461067](https://github.com/sbb-design-systems/lyne-components/commit/24610670bd11d2059c5285de30269edf696b5ffb))
- sbb-divider migration ([#2009](https://github.com/sbb-design-systems/lyne-components/issues/2009)) ([8d8d067](https://github.com/sbb-design-systems/lyne-components/commit/8d8d067c4cae5f6c9f4e96453855da49635e2bdb))
- **sbb-expansion-panel:** improve expansion animation ([#2043](https://github.com/sbb-design-systems/lyne-components/issues/2043)) ([10ec53b](https://github.com/sbb-design-systems/lyne-components/commit/10ec53b06eeda0a73abdd49ee26cd7fcda1015be))
- **sbb-file-selector:** lit migration ([#2091](https://github.com/sbb-design-systems/lyne-components/issues/2091)) ([e48d5d2](https://github.com/sbb-design-systems/lyne-components/commit/e48d5d2432688ed8ba6eaae1dc17da20110146b9))
- **sbb-form-field:** lit migration ([#2012](https://github.com/sbb-design-systems/lyne-components/issues/2012)) ([9508817](https://github.com/sbb-design-systems/lyne-components/commit/9508817749e0e187aebac9534d1975b6729ae69d))
- **sbb-header, sbb-header-action, sbb-logo, sbb-signet:** migrate lit ([#2049](https://github.com/sbb-design-systems/lyne-components/issues/2049)) ([4f3be22](https://github.com/sbb-design-systems/lyne-components/commit/4f3be2285744ff0e96294e55d5e6674cae4e6270))
- **sbb-icon:** lit migration ([#1994](https://github.com/sbb-design-systems/lyne-components/issues/1994)) ([0b4cbf0](https://github.com/sbb-design-systems/lyne-components/commit/0b4cbf0ba17a9ed32acc69fbc4705b9afc996b17))
- **sbb-image:** lit migration ([#2029](https://github.com/sbb-design-systems/lyne-components/issues/2029)) ([8d915b8](https://github.com/sbb-design-systems/lyne-components/commit/8d915b8aecd24da71d709e32b45a4037dc0b83f3))
- **sbb-journey-header, sbb-journey-summary:** lit migration ([#2074](https://github.com/sbb-design-systems/lyne-components/issues/2074)) ([9b02b89](https://github.com/sbb-design-systems/lyne-components/commit/9b02b89cde90afd9e34a1c8dfca4169760f5d914))
- **sbb-link:** lit migration ([#2004](https://github.com/sbb-design-systems/lyne-components/issues/2004)) ([2cd9a2c](https://github.com/sbb-design-systems/lyne-components/commit/2cd9a2ca13d629cefdb688a73a6dbc186d1ade34))
- **sbb-loading-indicator:** lit migration ([#2089](https://github.com/sbb-design-systems/lyne-components/issues/2089)) ([b6b7d34](https://github.com/sbb-design-systems/lyne-components/commit/b6b7d34b44f9e3b65fea6830df91325f79192eed))
- **sbb-map-container:** lit migration ([#2084](https://github.com/sbb-design-systems/lyne-components/issues/2084)) ([ceb2d33](https://github.com/sbb-design-systems/lyne-components/commit/ceb2d33009ba50f77ec9c8bd8ec6485ac8228797))
- **sbb-menu:** lit migration ([#2024](https://github.com/sbb-design-systems/lyne-components/issues/2024)) ([e316987](https://github.com/sbb-design-systems/lyne-components/commit/e316987604f472ea05239b8fa0192a0d2d6331be))
- **sbb-message:** lit migration ([#2032](https://github.com/sbb-design-systems/lyne-components/issues/2032)) ([143596f](https://github.com/sbb-design-systems/lyne-components/commit/143596f702ee7a1c0c6743ad7be11b53cb52aeca))
- **sbb-navigation:** lit migration ([#2050](https://github.com/sbb-design-systems/lyne-components/issues/2050)) ([1a29131](https://github.com/sbb-design-systems/lyne-components/commit/1a29131c1db8cecaa4a069692f64f96300ddeb1d))
- **sbb-notification:** lit migration ([#2075](https://github.com/sbb-design-systems/lyne-components/issues/2075)) ([b923b3b](https://github.com/sbb-design-systems/lyne-components/commit/b923b3b478d8c5209334a3c690dc3b245118722f))
- **sbb-option, sbb-optgroup, sbb-autocomplete, sbb-select:** lit migration ([#2062](https://github.com/sbb-design-systems/lyne-components/issues/2062)) ([fcb5eac](https://github.com/sbb-design-systems/lyne-components/commit/fcb5eacd82a314cee4032ff2baf58c1f734b4842))
- **sbb-pearl-chain:** lit migration ([#2030](https://github.com/sbb-design-systems/lyne-components/issues/2030)) ([7a57aef](https://github.com/sbb-design-systems/lyne-components/commit/7a57aef1874b430e0b380450d6d69f0febd62330))
- **sbb-radio-button-group:** lit migration ([#2054](https://github.com/sbb-design-systems/lyne-components/issues/2054)) ([7b596ef](https://github.com/sbb-design-systems/lyne-components/commit/7b596eff8cdbdedc8ddf4cb9202825df14b049cb))
- **sbb-selection-panel:** lit migration ([#2101](https://github.com/sbb-design-systems/lyne-components/issues/2101)) ([6fe9b82](https://github.com/sbb-design-systems/lyne-components/commit/6fe9b82ac23063feabd09aef62bbc19bcc91e0ee))
- **sbb-skiplink-list:** lit migration ([#2130](https://github.com/sbb-design-systems/lyne-components/issues/2130)) ([12a1a71](https://github.com/sbb-design-systems/lyne-components/commit/12a1a71adcd64f0751043fe09f21c01612511482))
- **sbb-slider:** lit migration ([#2082](https://github.com/sbb-design-systems/lyne-components/issues/2082)) ([7c0098d](https://github.com/sbb-design-systems/lyne-components/commit/7c0098d1349c1281e1adfb4ec177b0d6b8fa49ed))
- **sbb-tab-group:** lit migration ([#2031](https://github.com/sbb-design-systems/lyne-components/issues/2031)) ([1b59e50](https://github.com/sbb-design-systems/lyne-components/commit/1b59e5038e9d537662faabdcd50d7b93808d3b9e))
- **sbb-tag-group:** lit migration ([#2055](https://github.com/sbb-design-systems/lyne-components/issues/2055)) ([b12dc6e](https://github.com/sbb-design-systems/lyne-components/commit/b12dc6e638555658efb7c8a3afe36266a7a4c4ac))
- **sbb-teaser-hero:** lit migration ([#2077](https://github.com/sbb-design-systems/lyne-components/issues/2077)) ([8a65f43](https://github.com/sbb-design-systems/lyne-components/commit/8a65f43789cedac3e8a72ba54291bf67d84bfe79))
- **sbb-teaser:** lit migration ([#2076](https://github.com/sbb-design-systems/lyne-components/issues/2076)) ([a0b5546](https://github.com/sbb-design-systems/lyne-components/commit/a0b5546487790224205b749dbcbcb7bd26021752))
- **sbb-time-input:** lit migration ([#2036](https://github.com/sbb-design-systems/lyne-components/issues/2036)) ([2267a2b](https://github.com/sbb-design-systems/lyne-components/commit/2267a2b82a925b88a1cffcadc46cb635674b68c6))
- **sbb-timetable-row:** lit migration ([#2078](https://github.com/sbb-design-systems/lyne-components/issues/2078)) ([6cb07c7](https://github.com/sbb-design-systems/lyne-components/commit/6cb07c7eeb9446fa96a2b8a5d5326e57ab136740))
- **sbb-title:** finalize migration ([6216cec](https://github.com/sbb-design-systems/lyne-components/commit/6216cec584aa69628596fbf11148f83bca8a73bd))
- **sbb-title:** migrate to Lit ([72ed19e](https://github.com/sbb-design-systems/lyne-components/commit/72ed19ef0244011bf78de037bd40d6a72b380d11))
- **sbb-title:** use 'unsafeStatic' directive ([1e52246](https://github.com/sbb-design-systems/lyne-components/commit/1e52246bb41c605113e5095de03fd829a947f56d))
- **sbb-toast:** lit migration ([#2007](https://github.com/sbb-design-systems/lyne-components/issues/2007)) ([6083d1f](https://github.com/sbb-design-systems/lyne-components/commit/6083d1fd91abb62297ee55b73d5f0b89ae426e72))
- **sbb-tooltip:** migrate sbb-tooltip and sbb-tooltip-trigger ([#2066](https://github.com/sbb-design-systems/lyne-components/issues/2066)) ([5df8f59](https://github.com/sbb-design-systems/lyne-components/commit/5df8f59cc97387f02b9a37d30c62e18834fe0d8e))
- **sbb-train-formation:** lit migration ([#2087](https://github.com/sbb-design-systems/lyne-components/issues/2087)) ([06fdb52](https://github.com/sbb-design-systems/lyne-components/commit/06fdb526edfb133de74892c068b5c8b32ed65c2a))
- sbb-visual-checkbox migration ([#2010](https://github.com/sbb-design-systems/lyne-components/issues/2010)) ([8cc96eb](https://github.com/sbb-design-systems/lyne-components/commit/8cc96eb61a9bb1a08e1696055bf02287686ffeca))
- use CSSResultGroup to better support style inheritance ([#2187](https://github.com/sbb-design-systems/lyne-components/issues/2187)) ([5bfe947](https://github.com/sbb-design-systems/lyne-components/commit/5bfe947185287d0d98655260c9665f6416021b3d))
- wait for all child components to be updated in tests ([#2063](https://github.com/sbb-design-systems/lyne-components/issues/2063)) ([993002a](https://github.com/sbb-design-systems/lyne-components/commit/993002add07251f45de3afe1baf1ee90b78716dc))

### [0.42.6](https://github.com/sbb-design-systems/lyne-components/compare/v0.42.5...v0.42.6) (2023-11-14)

### Bug Fixes

- **sbb-radio-button-group, sbb-checkbox-group:** group state update ([#2183](https://github.com/sbb-design-systems/lyne-components/issues/2183)) ([6199ec6](https://github.com/sbb-design-systems/lyne-components/commit/6199ec6e732d9f18a7b573bcfea04ed6627aa79a))

### [0.42.5](https://github.com/sbb-design-systems/lyne-components/compare/v0.42.4...v0.42.5) (2023-11-12)

### Documentation

- **sbb-time-input:** re-activate chromatic and cleanup stories ([#2173](https://github.com/sbb-design-systems/lyne-components/issues/2173)) ([9798be2](https://github.com/sbb-design-systems/lyne-components/commit/9798be206a73144085cbf2e93360b4e9988c64ee))

### [0.42.4](https://github.com/sbb-design-systems/lyne-components/compare/v0.42.3...v0.42.4) (2023-11-08)

### Bug Fixes

- **sbb-radio-button-group:** radio group state update ([#2138](https://github.com/sbb-design-systems/lyne-components/issues/2138)) ([3ae0902](https://github.com/sbb-design-systems/lyne-components/commit/3ae0902bb4372482c2dfd308c60847f8acc15704))

### [0.42.3](https://github.com/sbb-design-systems/lyne-components/compare/v0.42.2...v0.42.3) (2023-11-07)

### Bug Fixes

- **sbb-journey-summary:** avoid list role for single entry lists ([#2152](https://github.com/sbb-design-systems/lyne-components/issues/2152)) ([1de5f61](https://github.com/sbb-design-systems/lyne-components/commit/1de5f61bd36d75bca4172a3c371c506237266e4b))
- **sbb-navigation:** fix automatic focus setting inside navigation ([#2141](https://github.com/sbb-design-systems/lyne-components/issues/2141)) ([0039ce9](https://github.com/sbb-design-systems/lyne-components/commit/0039ce9c7f809eb5ca96aed2982df3d04081369d))

### [0.42.2](https://github.com/sbb-design-systems/lyne-components/compare/v0.42.1...v0.42.2) (2023-11-06)

### [0.42.1](https://github.com/sbb-design-systems/lyne-components/compare/v0.42.0...v0.42.1) (2023-10-30)

### Bug Fixes

- **sbb-skiplink-list:** avoid rendering before defined ([#2128](https://github.com/sbb-design-systems/lyne-components/issues/2128)) ([47c4eec](https://github.com/sbb-design-systems/lyne-components/commit/47c4eec48133ca887a298d5c5f7b85432ad9faa7)), closes [#2120](https://github.com/sbb-design-systems/lyne-components/issues/2120)

## [0.42.0](https://github.com/sbb-design-systems/lyne-components/compare/v0.41.13...v0.42.0) (2023-10-26)

### ⚠ BREAKING CHANGES

- **sbb-dialog, sbb-menu, sbb-navigation, sbb-tooltip:** - The property `accessibilityLabel` of the `sbb-navigation` was removed. As replacement, an `aria-label` can now directly be placed on the `sbb-navigation` element.

### Bug Fixes

- **sbb-dialog, sbb-menu, sbb-navigation, sbb-tooltip:** fix reading order for VoiceOver with Safari ([#2106](https://github.com/sbb-design-systems/lyne-components/issues/2106)) ([6497b18](https://github.com/sbb-design-systems/lyne-components/commit/6497b18b96d4955789fd858d66a29ad7913023ce)), closes [#2015](https://github.com/sbb-design-systems/lyne-components/issues/2015) [#1879](https://github.com/sbb-design-systems/lyne-components/issues/1879) [#1880](https://github.com/sbb-design-systems/lyne-components/issues/1880)

### [0.41.13](https://github.com/sbb-design-systems/lyne-components/compare/v0.41.12...v0.41.13) (2023-10-23)

### Bug Fixes

- **sbb-menu:** menu action focus on mobile ([#2103](https://github.com/sbb-design-systems/lyne-components/issues/2103)) ([9827fa1](https://github.com/sbb-design-systems/lyne-components/commit/9827fa16b6cc5d4efa295bd873f17a93fd49525e))

### [0.41.12](https://github.com/sbb-design-systems/lyne-components/compare/v0.41.11...v0.41.12) (2023-10-20)

### Bug Fixes

- overlays focus and inert ([#2097](https://github.com/sbb-design-systems/lyne-components/issues/2097)) ([f8706c1](https://github.com/sbb-design-systems/lyne-components/commit/f8706c1ffabb12b1e8ee8e7d7e447b4ad1b2839c))

### [0.41.11](https://github.com/sbb-design-systems/lyne-components/compare/v0.41.10...v0.41.11) (2023-10-20)

### Bug Fixes

- implement overlays inert mechanism ([#2095](https://github.com/sbb-design-systems/lyne-components/issues/2095)) ([731b9e4](https://github.com/sbb-design-systems/lyne-components/commit/731b9e4fe18d09de156aab02af5d921471d75930))

### [0.41.10](https://github.com/sbb-design-systems/lyne-components/compare/v0.41.9...v0.41.10) (2023-10-19)

### Bug Fixes

- **sbb-navigation, sbb-menu, sbb-dialog:** screen readers readability ([#2092](https://github.com/sbb-design-systems/lyne-components/issues/2092)) ([dbddfa8](https://github.com/sbb-design-systems/lyne-components/commit/dbddfa8f569c5ed8692d719ce52c901cd86cbd80))

### [0.41.9](https://github.com/sbb-design-systems/lyne-components/compare/v0.41.8...v0.41.9) (2023-10-18)

### Bug Fixes

- **sbb-selection-panel:** handle data-state correctly ([#2088](https://github.com/sbb-design-systems/lyne-components/issues/2088)) ([1c7a67c](https://github.com/sbb-design-systems/lyne-components/commit/1c7a67c74e2f1a6e122f8d096261b79b78f2ea60))

### [0.41.8](https://github.com/sbb-design-systems/lyne-components/compare/v0.41.7...v0.41.8) (2023-10-17)

### Bug Fixes

- **sbb-timetable-row:** fix a11y ([#2083](https://github.com/sbb-design-systems/lyne-components/issues/2083)) ([fced9e2](https://github.com/sbb-design-systems/lyne-components/commit/fced9e2918df31507fddb6582bccc07acf3acb16))

### [0.41.7](https://github.com/sbb-design-systems/lyne-components/compare/v0.41.6...v0.41.7) (2023-10-12)

### Features

- **sbb-tag-group:** allow other slotted elements than `sbb-tag`s ([#2067](https://github.com/sbb-design-systems/lyne-components/issues/2067)) ([2b86f98](https://github.com/sbb-design-systems/lyne-components/commit/2b86f98ccf6b0120f61a80f9601f235a6795c737))

### [0.41.6](https://github.com/sbb-design-systems/lyne-components/compare/v0.41.5...v0.41.6) (2023-10-12)

### Bug Fixes

- **sbb-journey-summary:** remove obsolete dot after weekday ([#2068](https://github.com/sbb-design-systems/lyne-components/issues/2068)) ([c7d6356](https://github.com/sbb-design-systems/lyne-components/commit/c7d6356062ae04d9ab908555eacdcab2abb7530f))

### [0.41.5](https://github.com/sbb-design-systems/lyne-components/compare/v0.41.4...v0.41.5) (2023-10-11)

### Documentation

- readme refactoring ([#1996](https://github.com/sbb-design-systems/lyne-components/issues/1996)) ([95bb0d5](https://github.com/sbb-design-systems/lyne-components/commit/95bb0d5486e9ba287094de89d2401c6bc6a37703))

### [0.41.4](https://github.com/sbb-design-systems/lyne-components/compare/v0.41.3...v0.41.4) (2023-10-09)

### Bug Fixes

- **sbb-footer:** use correct focus outline color in negative mode ([#2057](https://github.com/sbb-design-systems/lyne-components/issues/2057)) ([5134baa](https://github.com/sbb-design-systems/lyne-components/commit/5134baa6fbe8d5cf290292b6bee14706984e26ea))

### Refactorings

- **sbb-expansion-panel:** improve expansion animation ([#2043](https://github.com/sbb-design-systems/lyne-components/issues/2043)) ([2e155a0](https://github.com/sbb-design-systems/lyne-components/commit/2e155a085355d0e940f9ffed85558feaa0f4d552))

### [0.41.3](https://github.com/sbb-design-systems/lyne-components/compare/v0.41.2...v0.41.3) (2023-10-05)

### Bug Fixes

- **sbb-selection-panel:** panel content overflow ([#2048](https://github.com/sbb-design-systems/lyne-components/issues/2048)) ([def7fcb](https://github.com/sbb-design-systems/lyne-components/commit/def7fcb7e1ba98c76576deb6999253d6f2600e0b))

### [0.41.2](https://github.com/sbb-design-systems/lyne-components/compare/v0.41.1...v0.41.2) (2023-10-04)

### Bug Fixes

- **sbb-calendar:** fix wrong width when orientation changes in iOS ([#2044](https://github.com/sbb-design-systems/lyne-components/issues/2044)) ([ccf2704](https://github.com/sbb-design-systems/lyne-components/commit/ccf2704ba067efa82ea1a27bb3997025625ca0b8))

### [0.41.1](https://github.com/sbb-design-systems/lyne-components/compare/v0.41.0...v0.41.1) (2023-10-04)

### Bug Fixes

- **sbb-breadcrumb-group:** fix color of divider arrow ([#2042](https://github.com/sbb-design-systems/lyne-components/issues/2042)) ([cbab58d](https://github.com/sbb-design-systems/lyne-components/commit/cbab58d38689b7380e724a370de9276facaa55af))

## [0.41.0](https://github.com/sbb-design-systems/lyne-components/compare/v0.40.22...v0.41.0) (2023-10-04)

### ⚠ BREAKING CHANGES

- **sbb-header:** - The spacing between the logo and the `sbb-header-action`s is now in responsibility of Lyne. Therefore consumers need to remove any manually added spacing. Lyne examples are updated.

### Bug Fixes

- **sbb-header:** guarantee space between logo and other header content ([#2035](https://github.com/sbb-design-systems/lyne-components/issues/2035)) ([07cbf30](https://github.com/sbb-design-systems/lyne-components/commit/07cbf3080f834171a9b6580398711138aea7558e)), closes [#1984](https://github.com/sbb-design-systems/lyne-components/issues/1984)

### [0.40.22](https://github.com/sbb-design-systems/lyne-components/compare/v0.40.21...v0.40.22) (2023-10-03)

### Bug Fixes

- **sbb-selection-panel:** remove wrongly announced expanded state for nested radios and checkboxes ([#2040](https://github.com/sbb-design-systems/lyne-components/issues/2040)) ([11105b3](https://github.com/sbb-design-systems/lyne-components/commit/11105b3b7a9cad79aa8089ccd6f66ff3eab716b7)), closes [#2017](https://github.com/sbb-design-systems/lyne-components/issues/2017)

### [0.40.21](https://github.com/sbb-design-systems/lyne-components/compare/v0.40.20...v0.40.21) (2023-09-30)

### Features

- **sbb-dialog:** add backdropAction property ([#2028](https://github.com/sbb-design-systems/lyne-components/issues/2028)) ([5f16c79](https://github.com/sbb-design-systems/lyne-components/commit/5f16c79efaa8db1feea82bf487447088f6c0300e))
- **sbb-loading:** add color variants ([#1998](https://github.com/sbb-design-systems/lyne-components/issues/1998)) ([7c57401](https://github.com/sbb-design-systems/lyne-components/commit/7c5740165cfe43e19f9c711456e084aa724fd912))

### [0.40.20](https://github.com/sbb-design-systems/lyne-components/compare/v0.40.19...v0.40.20) (2023-09-29)

### Bug Fixes

- **sbb-dialog:** open/close methods exit conditions ([#2027](https://github.com/sbb-design-systems/lyne-components/issues/2027)) ([a966a01](https://github.com/sbb-design-systems/lyne-components/commit/a966a015385a1af7ae93fb6b38ce2eaca8c78778))

### [0.40.19](https://github.com/sbb-design-systems/lyne-components/compare/v0.40.18...v0.40.19) (2023-09-28)

### Features

- **sbb-tab-group:** tab titles redesign ([#1975](https://github.com/sbb-design-systems/lyne-components/issues/1975)) ([231c140](https://github.com/sbb-design-systems/lyne-components/commit/231c14087640d6730d979f1abb050a4f678ce892))

### [0.40.18](https://github.com/sbb-design-systems/lyne-components/compare/v0.40.17...v0.40.18) (2023-09-28)

### Bug Fixes

- trigger release ([e78469f](https://github.com/sbb-design-systems/lyne-components/commit/e78469f1a715492d65b962711d164950c567497d))

### [0.40.17](https://github.com/sbb-design-systems/lyne-components/compare/v0.40.16...v0.40.17) (2023-09-27)

### Bug Fixes

- **sbb-breadcrumb:** reliably detect text/content changes ([#2013](https://github.com/sbb-design-systems/lyne-components/issues/2013)) ([bac69dd](https://github.com/sbb-design-systems/lyne-components/commit/bac69dd43a5e7397f18191d632f71f6926d982dc))

### [0.40.16](https://github.com/sbb-design-systems/lyne-components/compare/v0.40.15...v0.40.16) (2023-09-27)

### Bug Fixes

- **sbb-selection-panel:** content overflowing the panel ([#1993](https://github.com/sbb-design-systems/lyne-components/issues/1993)) ([406be88](https://github.com/sbb-design-systems/lyne-components/commit/406be8826900a04dd2d4f86c2cc84a2a3563e35f))

### [0.40.15](https://github.com/sbb-design-systems/lyne-components/compare/v0.40.14...v0.40.15) (2023-09-26)

### Bug Fixes

- trigger release ([a2050ef](https://github.com/sbb-design-systems/lyne-components/commit/a2050efd01cba9c7054177b3bc91f0f80b02b8b9))

### [0.40.14](https://github.com/sbb-design-systems/lyne-components/compare/v0.40.13...v0.40.14) (2023-09-22)

### Bug Fixes

- **sbb-map-container:** remove width CSS property to avoid overscroll ([#1995](https://github.com/sbb-design-systems/lyne-components/issues/1995)) ([d0ad56b](https://github.com/sbb-design-systems/lyne-components/commit/d0ad56bdd60687f20ecece1d634416f370130ef8))

### [0.40.13](https://github.com/sbb-design-systems/lyne-components/compare/v0.40.12...v0.40.13) (2023-09-21)

### Features

- **sbb-form-field:** adapt new design and add negative mode ([#1976](https://github.com/sbb-design-systems/lyne-components/issues/1976)) ([c04a0ef](https://github.com/sbb-design-systems/lyne-components/commit/c04a0ef3c368455f32fa6fa71f853b552a364d11))

### [0.40.12](https://github.com/sbb-design-systems/lyne-components/compare/v0.40.11...v0.40.12) (2023-09-21)

### Features

- **sbb-calendar:** add year and month selection views ([#1951](https://github.com/sbb-design-systems/lyne-components/issues/1951)) ([df3a5d7](https://github.com/sbb-design-systems/lyne-components/commit/df3a5d78c70f4b95ddc0227fe42552310d1af265))

### [0.40.11](https://github.com/sbb-design-systems/lyne-components/compare/v0.40.10...v0.40.11) (2023-09-19)

### Features

- **sbb-loading-indicator:** initial implementation ([#1968](https://github.com/sbb-design-systems/lyne-components/issues/1968)) ([98c4f7a](https://github.com/sbb-design-systems/lyne-components/commit/98c4f7a0af5e09ccd0d69fa106974781ae5e7b22))

### [0.40.10](https://github.com/sbb-design-systems/lyne-components/compare/v0.40.9...v0.40.10) (2023-09-18)

### Features

- **sbb-file-selector:** component implementation ([#1894](https://github.com/sbb-design-systems/lyne-components/issues/1894)) ([0019676](https://github.com/sbb-design-systems/lyne-components/commit/001967618ed4ce2ece098761e78f444afcd23722))

### [0.40.9](https://github.com/sbb-design-systems/lyne-components/compare/v0.40.8...v0.40.9) (2023-09-14)

### Bug Fixes

- **sbb-timetable-row:** add space for certain vehicles ([#1985](https://github.com/sbb-design-systems/lyne-components/issues/1985)) ([739054d](https://github.com/sbb-design-systems/lyne-components/commit/739054dbb42c8d9d524223be6f633580606ea9dc))

### [0.40.8](https://github.com/sbb-design-systems/lyne-components/compare/v0.40.7...v0.40.8) (2023-09-13)

### Bug Fixes

- **sbb-card:** allow placing tooltips inside non-interactive cards ([#1983](https://github.com/sbb-design-systems/lyne-components/issues/1983)) ([cb716b3](https://github.com/sbb-design-systems/lyne-components/commit/cb716b339a166dbeada88348e41fd4c0ea59d644)), closes [#1982](https://github.com/sbb-design-systems/lyne-components/issues/1982)

### [0.40.7](https://github.com/sbb-design-systems/lyne-components/compare/v0.40.6...v0.40.7) (2023-09-12)

### Bug Fixes

- **multiple:** disabled states ([#1972](https://github.com/sbb-design-systems/lyne-components/issues/1972)) ([dc47583](https://github.com/sbb-design-systems/lyne-components/commit/dc47583e62997bf002bddb7be6fe5e3b1134f152)), closes [#1955](https://github.com/sbb-design-systems/lyne-components/issues/1955)

### [0.40.6](https://github.com/sbb-design-systems/lyne-components/compare/v0.40.5...v0.40.6) (2023-09-11)

### Bug Fixes

- **sbb-select:** fix focused styles ([#1979](https://github.com/sbb-design-systems/lyne-components/issues/1979)) ([7ab3ea6](https://github.com/sbb-design-systems/lyne-components/commit/7ab3ea6616951fac7f984eb07dc9713214b64660))

### [0.40.5](https://github.com/sbb-design-systems/lyne-components/compare/v0.40.4...v0.40.5) (2023-09-05)

### Features

- **sbb-form-field-clear:** initial implementation ([#1962](https://github.com/sbb-design-systems/lyne-components/issues/1962)) ([2075dfa](https://github.com/sbb-design-systems/lyne-components/commit/2075dfa13f5c05aa5654229fc292d55e58009443))

### [0.40.4](https://github.com/sbb-design-systems/lyne-components/compare/v0.40.3...v0.40.4) (2023-09-05)

### Bug Fixes

- **sbb-dialog:** react to slot changes ([#1969](https://github.com/sbb-design-systems/lyne-components/issues/1969)) ([326e208](https://github.com/sbb-design-systems/lyne-components/commit/326e20864036da6084cc2f980af531de2c53640f))

### [0.40.3](https://github.com/sbb-design-systems/lyne-components/compare/v0.40.2...v0.40.3) (2023-09-05)

### Features

- **sbb-accordion:** component implementation ([#1860](https://github.com/sbb-design-systems/lyne-components/issues/1860)) ([dae2246](https://github.com/sbb-design-systems/lyne-components/commit/dae22462723c43321557907c7a17938366f42214))

### [0.40.2](https://github.com/sbb-design-systems/lyne-components/compare/v0.40.1...v0.40.2) (2023-09-04)

### Bug Fixes

- **sbb-navigation-section:** use divider instead of separation border ([#1965](https://github.com/sbb-design-systems/lyne-components/issues/1965)) ([25ea609](https://github.com/sbb-design-systems/lyne-components/commit/25ea60997a2cd50aa5df11c0b7a51fca5d2224ed))

### [0.40.1](https://github.com/sbb-design-systems/lyne-components/compare/v0.40.0...v0.40.1) (2023-09-04)

### Features

- **sbb-time-table-row:** show trip departure quay formatted ([#1960](https://github.com/sbb-design-systems/lyne-components/issues/1960)) ([dd49d34](https://github.com/sbb-design-systems/lyne-components/commit/dd49d34f5bc77a7472d6bddc1f46528ee4d7a844))

## [0.40.0](https://github.com/sbb-design-systems/lyne-components/compare/v0.39.12...v0.40.0) (2023-09-04)

### ⚠ BREAKING CHANGES

- **sbb-message:** - `sbb-no-results` was renamed to `sbb-message`

### Refactorings

- **sbb-message:** rename `sbb-no-results` to `sbb-message` ([#1954](https://github.com/sbb-design-systems/lyne-components/issues/1954)) ([29df5a8](https://github.com/sbb-design-systems/lyne-components/commit/29df5a8d899e0fa555342c91b6b7dc831868dfd6))

### [0.39.12](https://github.com/sbb-design-systems/lyne-components/compare/v0.39.11...v0.39.12) (2023-08-31)

### Bug Fixes

- **sbb-form-field:** support tooltip for floating labels ([#1959](https://github.com/sbb-design-systems/lyne-components/issues/1959)) ([ce2dcf1](https://github.com/sbb-design-systems/lyne-components/commit/ce2dcf1b7abd96a279d24fcc6e93899b6ebd11f6))

### [0.39.11](https://github.com/sbb-design-systems/lyne-components/compare/v0.39.10...v0.39.11) (2023-08-31)

### Features

- **sbb-calendar:** allow dynamic width ([#1957](https://github.com/sbb-design-systems/lyne-components/issues/1957)) ([fc9d8fd](https://github.com/sbb-design-systems/lyne-components/commit/fc9d8fdaafdddfe655853213efa0b2ea03fb0f99))

### [0.39.10](https://github.com/sbb-design-systems/lyne-components/compare/v0.39.9...v0.39.10) (2023-08-30)

### Bug Fixes

- ignore hidden elements for keyboard navigation ([#1937](https://github.com/sbb-design-systems/lyne-components/issues/1937)) ([8f21bff](https://github.com/sbb-design-systems/lyne-components/commit/8f21bffc63694acc8a82aacb9285ed6381e7da31))
- **sbb-datepicker:** datepicker prev and next day buttons aria-label ([#1952](https://github.com/sbb-design-systems/lyne-components/issues/1952)) ([2e1dfbf](https://github.com/sbb-design-systems/lyne-components/commit/2e1dfbffbb2722ea9bd4be662128eb82ca2d01f3))

### [0.39.9](https://github.com/sbb-design-systems/lyne-components/compare/v0.39.8...v0.39.9) (2023-08-29)

### Bug Fixes

- fix focus outline color for positive elements in negative context ([#1947](https://github.com/sbb-design-systems/lyne-components/issues/1947)) ([254e77c](https://github.com/sbb-design-systems/lyne-components/commit/254e77c2e4731b77b480616ad2211ef51b448231))

### [0.39.8](https://github.com/sbb-design-systems/lyne-components/compare/v0.39.7...v0.39.8) (2023-08-29)

### Refactorings

- use dataset API for `resizeDisableAnimation` ([#1948](https://github.com/sbb-design-systems/lyne-components/issues/1948)) ([43789ea](https://github.com/sbb-design-systems/lyne-components/commit/43789ea2e3db36bd2bb35c3983c08932dc7e68b3))

### [0.39.7](https://github.com/sbb-design-systems/lyne-components/compare/v0.39.6...v0.39.7) (2023-08-28)

### Refactorings

- **sbb-no-results:** improve slot handling ([#1946](https://github.com/sbb-design-systems/lyne-components/issues/1946)) ([1a56291](https://github.com/sbb-design-systems/lyne-components/commit/1a56291888034b3e5a992704c9980908e81312c3))

### [0.39.6](https://github.com/sbb-design-systems/lyne-components/compare/v0.39.5...v0.39.6) (2023-08-28)

### Features

- **sbb-no-results:** first implementation ([#1943](https://github.com/sbb-design-systems/lyne-components/issues/1943)) ([97c4355](https://github.com/sbb-design-systems/lyne-components/commit/97c43557ad792ab8a522a6a3a191c0a07ed7218a))

### [0.39.5](https://github.com/sbb-design-systems/lyne-components/compare/v0.39.4...v0.39.5) (2023-08-11)

### Bug Fixes

- **sbb-datepicker:** remove disable property from next and previous day ([#1936](https://github.com/sbb-design-systems/lyne-components/issues/1936)) ([0bd2b70](https://github.com/sbb-design-systems/lyne-components/commit/0bd2b702429ef85f9312292d6a43b410292e083c))

### [0.39.4](https://github.com/sbb-design-systems/lyne-components/compare/v0.39.3...v0.39.4) (2023-08-10)

### Bug Fixes

- **sbb-notification, sbb-alert:** update zero to micro breakpoint styles ([#1931](https://github.com/sbb-design-systems/lyne-components/issues/1931)) ([5801718](https://github.com/sbb-design-systems/lyne-components/commit/580171867c5d989ef1e22db507f80ab2f970673d)), closes [#1930](https://github.com/sbb-design-systems/lyne-components/issues/1930)

### [0.39.3](https://github.com/sbb-design-systems/lyne-components/compare/v0.39.2...v0.39.3) (2023-08-10)

### Bug Fixes

- **sbb-notification:** handle stories disableAnimation correctly ([#1928](https://github.com/sbb-design-systems/lyne-components/issues/1928)) ([ac3a483](https://github.com/sbb-design-systems/lyne-components/commit/ac3a483cea4cec87c1a9af0df354b3ebc8b3aaf5))

### [0.39.2](https://github.com/sbb-design-systems/lyne-components/compare/v0.39.1...v0.39.2) (2023-08-08)

### Documentation

- trigger release ([4e19a54](https://github.com/sbb-design-systems/lyne-components/commit/4e19a5498918ad7eacadb9acbcc427c2cd69da1d))

### [0.39.1](https://github.com/sbb-design-systems/lyne-components/compare/v0.39.0...v0.39.1) (2023-08-08)

### Bug Fixes

- **sbb-datepicker:** add accessibility label and localize date ([#1925](https://github.com/sbb-design-systems/lyne-components/issues/1925)) ([de14dff](https://github.com/sbb-design-systems/lyne-components/commit/de14dff54601e6adeb41dd284dd39f483215f979)), closes [#1912](https://github.com/sbb-design-systems/lyne-components/issues/1912) [#1916](https://github.com/sbb-design-systems/lyne-components/issues/1916)

## [0.39.0](https://github.com/sbb-design-systems/lyne-components/compare/v0.38.13...v0.39.0) (2023-08-08)

### ⚠ BREAKING CHANGES

- **sbb-time-input:** - Consumers have to provide their own native `input` element and link it to the `sbb-time-input` (e.g. `<input id="input-id"><sbb-time-input input="input-id"/>`. If it's used inside an `sbb-form-field`, the connection is made automatically (no id reference necessary).

* The following properties of `sbb-time-input` were removed: `value`, `valueAsDate`, `form`, `readonly`, `disabled` and `required`. They can directly be used on the `input` except `valueAsDate` which was replaced by `getValueAsDate()` method on `sbb-time-input`.

### Bug Fixes

- **sbb-form-field:** fix accessibility when slotting form error ([#1922](https://github.com/sbb-design-systems/lyne-components/issues/1922)) ([5f6036b](https://github.com/sbb-design-systems/lyne-components/commit/5f6036b64466a9443d40aec53d18dc8371af0ff6))
- **sbb-time-input:** fix accessibility with structure refactoring ([#1893](https://github.com/sbb-design-systems/lyne-components/issues/1893)) ([aa4b848](https://github.com/sbb-design-systems/lyne-components/commit/aa4b848f55d47269b7cc222e4a2c3b7df9846138)), closes [#1888](https://github.com/sbb-design-systems/lyne-components/issues/1888)

### Documentation

- add new line before html examples to avoid console errors in storybook ([#1924](https://github.com/sbb-design-systems/lyne-components/issues/1924)) ([ad5824e](https://github.com/sbb-design-systems/lyne-components/commit/ad5824e08218167995fa1f9d025f1779f246a997))

### [0.38.13](https://github.com/sbb-design-systems/lyne-components/compare/v0.38.12...v0.38.13) (2023-08-08)

### Bug Fixes

- **sbb-calendar:** adding `aria-current='date'` to current date ([#1923](https://github.com/sbb-design-systems/lyne-components/issues/1923)) ([f617457](https://github.com/sbb-design-systems/lyne-components/commit/f617457471935f777951d47954c8c0d1b594ba27)), closes [#1881](https://github.com/sbb-design-systems/lyne-components/issues/1881)

### [0.38.12](https://github.com/sbb-design-systems/lyne-components/compare/v0.38.11...v0.38.12) (2023-08-08)

### Features

- **sbb-timetable-row:** reorder sr-text ([#1920](https://github.com/sbb-design-systems/lyne-components/issues/1920)) ([ec4bbae](https://github.com/sbb-design-systems/lyne-components/commit/ec4bbae92833cea6fdc353332bceff3fdd9a2b40))

### [0.38.11](https://github.com/sbb-design-systems/lyne-components/compare/v0.38.10...v0.38.11) (2023-08-07)

### Documentation

- fix typos ([#1918](https://github.com/sbb-design-systems/lyne-components/issues/1918)) ([f3d347b](https://github.com/sbb-design-systems/lyne-components/commit/f3d347bfb8772ab71c978c7df8eb0b5756ad75cc))

### [0.38.10](https://github.com/sbb-design-systems/lyne-components/compare/v0.38.9...v0.38.10) (2023-08-03)

### Documentation

- **sbb-datepicker:** improve docs on how to use format and dateParser functions ([#1914](https://github.com/sbb-design-systems/lyne-components/issues/1914)) ([f0aa3c6](https://github.com/sbb-design-systems/lyne-components/commit/f0aa3c627cbe644e323d29592ebf6503b4301ecf))

### [0.38.9](https://github.com/sbb-design-systems/lyne-components/compare/v0.38.8...v0.38.9) (2023-08-03)

### Bug Fixes

- **sbb-dialog:** close stacked dialogs one by one on ESC press ([#1910](https://github.com/sbb-design-systems/lyne-components/issues/1910)) ([3bfc42f](https://github.com/sbb-design-systems/lyne-components/commit/3bfc42f8b65cb75250bb29ab8fe7f6e88b83b09c))

### [0.38.8](https://github.com/sbb-design-systems/lyne-components/compare/v0.38.7...v0.38.8) (2023-07-31)

### Features

- **sbb-datepicker:** allow custom date formats ([#1909](https://github.com/sbb-design-systems/lyne-components/issues/1909)) ([67709be](https://github.com/sbb-design-systems/lyne-components/commit/67709bea71a1b51bc6bfef9bece040c6ca27a048))

### [0.38.7](https://github.com/sbb-design-systems/lyne-components/compare/v0.38.6...v0.38.7) (2023-07-24)

### Refactorings

- **sbb-alert:** implement new design specs ([#1891](https://github.com/sbb-design-systems/lyne-components/issues/1891)) ([0b517a7](https://github.com/sbb-design-systems/lyne-components/commit/0b517a7716abb88270d2bc654966cc0bcc14a458)), closes [#1890](https://github.com/sbb-design-systems/lyne-components/issues/1890)

### [0.38.6](https://github.com/sbb-design-systems/lyne-components/compare/v0.38.5...v0.38.6) (2023-07-20)

### Bug Fixes

- **sbb-form-field:** fix floating label on form reset ([#1889](https://github.com/sbb-design-systems/lyne-components/issues/1889)) ([5a53561](https://github.com/sbb-design-systems/lyne-components/commit/5a53561566b8f1226b73835d2b5902f88b9f399d))

### [0.38.5](https://github.com/sbb-design-systems/lyne-components/compare/v0.38.4...v0.38.5) (2023-07-19)

### Bug Fixes

- **sbb-skiplink-list:** detect links which were added after connected ([#1886](https://github.com/sbb-design-systems/lyne-components/issues/1886)) ([8fb5a9d](https://github.com/sbb-design-systems/lyne-components/commit/8fb5a9da00ece55485a107da0b69b648dc3604ed)), closes [#1887](https://github.com/sbb-design-systems/lyne-components/issues/1887)

### [0.38.4](https://github.com/sbb-design-systems/lyne-components/compare/v0.38.3...v0.38.4) (2023-07-19)

### Refactorings

- re-structure helpers directory ([#1876](https://github.com/sbb-design-systems/lyne-components/issues/1876)) ([ac37e3a](https://github.com/sbb-design-systems/lyne-components/commit/ac37e3a1946692e141c05470dbb7dbf688ccb000))

### [0.38.3](https://github.com/sbb-design-systems/lyne-components/compare/v0.38.2...v0.38.3) (2023-07-18)

### Bug Fixes

- **sbb-menu:** menu actions arrow navigation ([#1882](https://github.com/sbb-design-systems/lyne-components/issues/1882)) ([ce89c23](https://github.com/sbb-design-systems/lyne-components/commit/ce89c23af293c11456a9601f98fda65ee199c652))

### [0.38.2](https://github.com/sbb-design-systems/lyne-components/compare/v0.38.1...v0.38.2) (2023-07-15)

### Bug Fixes

- avoid animationend triggered twice ([#1872](https://github.com/sbb-design-systems/lyne-components/issues/1872)) ([3d008ba](https://github.com/sbb-design-systems/lyne-components/commit/3d008bafc81af290fd5a7604e40e287cfc8cf549))

### [0.38.1](https://github.com/sbb-design-systems/lyne-components/compare/v0.38.0...v0.38.1) (2023-07-13)

### Documentation

- fix CHANGELOG.md ([2b37438](https://github.com/sbb-design-systems/lyne-components/commit/2b37438b64040c69715105bbd520fac4e033b375))
- fix CHANGELOG.md ([da6d0ea](https://github.com/sbb-design-systems/lyne-components/commit/da6d0ea3bbe626640cba52fd6fc80f1b488aee10))

## [0.38.0](https://github.com/sbb-design-systems/lyne-components/compare/v0.37.11...v0.38.0) (2023-07-13)

### ⚠ BREAKING CHANGES

- `sbb-group` was removed and replaced by `sbb-card`.

  **How to migrate**:

  - Rename `sbb-group` to `sbb-card`.
  - If `color` property is set to `transparent`, change value from `transparent` to `transparent-bordered`.
  - Replace property `padding` with property `size` and update the values like following:
    - Padding `3x-xxs` -> size `xs`
    - Padding `xxxs-xxs` -> size `s`
    - Padding `xxxs-s` -> size `m`
    - Padding `4x-xxs` -> size `l`
    - Padding `xxs-xxs` -> size `xl`
    - Padding `s-s` -> size `xxl`

- `sbb-card` is not interactive anymore and replaces the `sbb-group` in a static way. To create an action, add `<sbb-card-action>` component as content to `sbb-card`. All the interactive properties of the former `<sbb-card>` were transferred to the new `<sbb-card-action>` (`active`, `download`, `form`, `href`, `name`, `rel`, `target`, `type`, `value`).

  Before, interactive content in the unnamed slot of the `<sbb-card>` was automatically made static as it is prohibited to have an action nested in an action. However, as the content is not nested anymore in the interactive element, nested interactive elements stay interactive. This needs either adding `is-static` to the `<sbb-button>` or `<sbb-link>` or adding a real action to it (other action than the card, but it's not recommended!).

  **Windows High Contrast notes**

  In high contrast mode, all the content of a link or a button receives a specific color which overrides every other color.
  However, as the content of the card is not directly inside the button or link, this does not happen
  when the slotted content has a specific color set.
  To improve coloring, it's needed to manually define styles for high contrast mode (setting `LinkText` or `ButtonText`).

  **How to migrate**:

  1. Create a `<sbb-card-action>` element and add it as content of the `<sbb-card>`.
  2. Move all action related properties from `<sbb-card>` to `<sbb-card-action>` (`active`, `download`, `form`, `href`, `name`, `rel`, `target`, `type`, `value`).
  3. **Create a meaningful label which describes the action.** This label is important for search engines and screen readers but is not visible.
  4. If you had other interactive elements inside the `<sbb-card>`, as e.g. the often seen usage of a `<sbb-button>`, add `is-static` attribute to the element.
  5. If needed, style content of card for windows high contrast mode with `LinkText` or `ButtonText`.

  before:

  ```
  <sbb-card href="https://www.sbb.ch" target="_blank">
    Tickets
    <sbb-button>Buy a ticket</sbb-button>
  </sbb-card>
  ```

  after:

  ```
  <sbb-card>
    <sbb-card-action href="https://www.sbb.ch" target="_blank">Buy a ticket</sbb-card-action>
    Tickets
    <sbb-button **is-static**>Buy a ticket</sbb-button>
  </sbb-card>
  ```

- All properties of `<sbb-card-badge>` were either removed and replaced by the unnamed slot or renamed.

  - The property `size` was removed, as it was not used at all.
  - The property `appearance` was renamed to `color`. Its old value `primary` becomes `charcoal` and its old value `primary-negative` becomes `white`.
  - The properties `isDiscount`, `price`, `text` were removed.
  - The attribute `slot="badge"` is assigned automatically and therefore doesn't have to be added by the consumer anymore.

    **How to migrate**:

  - The property `appearance` should be renamed to `color`. Its old value `primary` becomes `charcoal` and its old value `primary-negative` becomes `white`.
  - The properties `isDiscount`, `price`, `text` should be replaced with `<span>` elements in the unnamed slot (see example below). If the `isDiscount` property was set, it should be replaced by `<span>%</span>`.

    before:

    ```
    <sbb-card-badge
      aria-label="Super saver sales ticket price starts at CHF 92.50 Black Friday Special"
      appearance="primary"
      is-discount
      price="92.50"
      text="from CHF"
      slot="badge"
    >
      <div slot="generic"><time datetime="2021-11-25">Black Friday</time> Special</div>
    </sbb-card-badge>
    ```

    after:

    ```
     <sbb-card-badge
       aria-label="Super saver sales ticket price starts at CHF 92.50 Black Friday Special"
       color="charcoal"
     >
       <span>%</span> <!-- Replaces the logic of isDiscount -->
       <span>from CHF</span>
       <span>92.50</span>
       <span><time datetime="2021-11-25">Black Friday</time></span>
     </sbb-card-badge>
    ```

### Bug Fixes

- **sbb-card, sbb-card-badge:** fix accessibility of card ([#1732](https://github.com/sbb-design-systems/lyne-components/issues/1732)) ([3565a8a](https://github.com/sbb-design-systems/lyne-components/commit/3565a8acfc26f2587ea170a80414254e4d39a557)), closes [#1833](https://github.com/sbb-design-systems/lyne-components/issues/1833) [#1242](https://github.com/sbb-design-systems/lyne-components/issues/1242)

### [0.37.11](https://github.com/sbb-design-systems/lyne-components/compare/v0.37.10...v0.37.11) (2023-07-11)

### Bug Fixes

- **sbb-datepicker:** empty month bug, improve error validation, add blur event ([#1861](https://github.com/sbb-design-systems/lyne-components/issues/1861)) ([ba0c0f2](https://github.com/sbb-design-systems/lyne-components/commit/ba0c0f264b74bea2c649981cee4ca320a91097ae))

### [0.37.10](https://github.com/sbb-design-systems/lyne-components/compare/v0.37.9...v0.37.10) (2023-07-11)

### Bug Fixes

- revert renovate changes to react package.json ([4db895f](https://github.com/sbb-design-systems/lyne-components/commit/4db895fcf5e71b31bebc8b9b4f15d7fb7af441f4))

### [0.37.9](https://github.com/sbb-design-systems/lyne-components/compare/v0.37.8...v0.37.9) (2023-07-11)

### Features

- **sbb-notification:** introduce notification component ([#1856](https://github.com/sbb-design-systems/lyne-components/issues/1856)) ([d2faab2](https://github.com/sbb-design-systems/lyne-components/commit/d2faab2bf3232f42fd5316160dc67b7e1411435c))

### Bug Fixes

- **deps:** update dependency @sbb-esta/lyne-components to v0.37.8 ([2435e73](https://github.com/sbb-design-systems/lyne-components/commit/2435e7333e5cf0c46ce0b2a96473bfebcb504afb))
- **sbb-navigation:** fix word break ([#1866](https://github.com/sbb-design-systems/lyne-components/issues/1866)) ([b6e543e](https://github.com/sbb-design-systems/lyne-components/commit/b6e543edf3f2fbb2155cc03329fc14d27012b2b8))
- **sbb-select:** emit didChange event ([#1867](https://github.com/sbb-design-systems/lyne-components/issues/1867)) ([d23aecb](https://github.com/sbb-design-systems/lyne-components/commit/d23aecb494a84bf1ce83a89d76045deac36bf882))

### [0.37.8](https://github.com/sbb-design-systems/lyne-components/compare/v0.37.7...v0.37.8) (2023-07-09)

### Bug Fixes

- **deps:** update dependency @sbb-esta/lyne-components to v0.37.7 ([dbef9f1](https://github.com/sbb-design-systems/lyne-components/commit/dbef9f1233d3cb17134c8e707dd89f7abde1b608))

### [0.37.7](https://github.com/sbb-design-systems/lyne-components/compare/v0.37.6...v0.37.7) (2023-07-05)

### Features

- **sbb-tag-group:** use list to display tags ([#1855](https://github.com/sbb-design-systems/lyne-components/issues/1855)) ([e77450a](https://github.com/sbb-design-systems/lyne-components/commit/e77450adaee8f854a3c17826ee922dfe40861169))

### [0.37.6](https://github.com/sbb-design-systems/lyne-components/compare/v0.37.5...v0.37.6) (2023-07-05)

### Features

- **sbb-toast:** component implementation ([#1026](https://github.com/sbb-design-systems/lyne-components/issues/1026)) ([94bdd64](https://github.com/sbb-design-systems/lyne-components/commit/94bdd64c6c7d1e8e0994c9233e8eb7369f5cc228))

### [0.37.5](https://github.com/sbb-design-systems/lyne-components/compare/v0.37.4...v0.37.5) (2023-07-03)

### Documentation

- reorder stories ([#1841](https://github.com/sbb-design-systems/lyne-components/issues/1841)) ([12a8dc0](https://github.com/sbb-design-systems/lyne-components/commit/12a8dc01d014e2be96bc27653cfc8a7c3c6b46da))

### [0.37.4](https://github.com/sbb-design-systems/lyne-components/compare/v0.37.3...v0.37.4) (2023-07-03)

### Bug Fixes

- **sbb-breadcrumb-group:** avoid showing expand button if nothing is expandable ([#1853](https://github.com/sbb-design-systems/lyne-components/issues/1853)) ([29693d9](https://github.com/sbb-design-systems/lyne-components/commit/29693d9acf37bb7f507f4ed0b36bdf42a2334c08))

### [0.37.3](https://github.com/sbb-design-systems/lyne-components/compare/v0.37.2...v0.37.3) (2023-07-03)

### Features

- **sbb-breadcrumb, sbb-breadcrumb-group:** components implementation ([#1788](https://github.com/sbb-design-systems/lyne-components/issues/1788)) ([ca9025c](https://github.com/sbb-design-systems/lyne-components/commit/ca9025ca0e15a395efac79a0ebfe1185e12c27a2))

### [0.37.2](https://github.com/sbb-design-systems/lyne-components/compare/v0.37.1...v0.37.2) (2023-06-30)

### Bug Fixes

- **sbb-dialog:** handle unwanted backdrop clicks on overlay components ([#1845](https://github.com/sbb-design-systems/lyne-components/issues/1845)) ([9f1c3b2](https://github.com/sbb-design-systems/lyne-components/commit/9f1c3b2b1ec59e506e7b9494d1bf0eb93b335eab))

### [0.37.1](https://github.com/sbb-design-systems/lyne-components/compare/v0.37.0...v0.37.1) (2023-06-29)

### Features

- **sbb-toggle-check:** add new size variant (M) ([#1849](https://github.com/sbb-design-systems/lyne-components/issues/1849)) ([6c20d1f](https://github.com/sbb-design-systems/lyne-components/commit/6c20d1f29f34571cf2ac87fe109df1815030e58f))

## [0.37.0](https://github.com/sbb-design-systems/lyne-components/compare/v0.36.31...v0.37.0) (2023-06-29)

### ⚠ BREAKING CHANGES

- **sbb-button, sbb-link:** - In order to fully support typings, static attribute of sbb-link and sbb-button have been renamed to is-static (property `isStatic`).

### Bug Fixes

- **sbb-button, sbb-link:** rename `static` attribute to `is-static` ([#1850](https://github.com/sbb-design-systems/lyne-components/issues/1850)) ([157a646](https://github.com/sbb-design-systems/lyne-components/commit/157a646023bdde8040ee77ba3fe63984190d9109))

### [0.36.31](https://github.com/sbb-design-systems/lyne-components/compare/v0.36.30...v0.36.31) (2023-06-29)

### Refactorings

- update icon cdn domain ([#1847](https://github.com/sbb-design-systems/lyne-components/issues/1847)) ([38b7841](https://github.com/sbb-design-systems/lyne-components/commit/38b7841266392107bc10db7773f1273e361fdf62))

### [0.36.30](https://github.com/sbb-design-systems/lyne-components/compare/v0.36.29...v0.36.30) (2023-06-28)

### Bug Fixes

- **sbb-form-field:** improve floating label for various input types ([#1842](https://github.com/sbb-design-systems/lyne-components/issues/1842)) ([a25637f](https://github.com/sbb-design-systems/lyne-components/commit/a25637f3631ff29885d24fc07321ba1d59803ed9))

### [0.36.29](https://github.com/sbb-design-systems/lyne-components/compare/v0.36.28...v0.36.29) (2023-06-28)

### Bug Fixes

- **sbb-button:** remove submitter parameter in requestSubmit logic ([#1844](https://github.com/sbb-design-systems/lyne-components/issues/1844)) ([3853acd](https://github.com/sbb-design-systems/lyne-components/commit/3853acd3303e9bbac8b857b99d6a2ddd4bb543b2))

### [0.36.28](https://github.com/sbb-design-systems/lyne-components/compare/v0.36.27...v0.36.28) (2023-06-28)

### Bug Fixes

- **sbb-select:** select shows selected value in form field instead of the label ([#1843](https://github.com/sbb-design-systems/lyne-components/issues/1843)) ([d67e974](https://github.com/sbb-design-systems/lyne-components/commit/d67e974060f1d5adeda5b21bf3fa0b3bf01d0520))

### [0.36.27](https://github.com/sbb-design-systems/lyne-components/compare/v0.36.26...v0.36.27) (2023-06-28)

### Features

- **sbb-selection-panel:** add borderless variant ([#1837](https://github.com/sbb-design-systems/lyne-components/issues/1837)) ([88d6498](https://github.com/sbb-design-systems/lyne-components/commit/88d6498e660b87ce374788f4179dd7ef5018fbb4))

### [0.36.26](https://github.com/sbb-design-systems/lyne-components/compare/v0.36.25...v0.36.26) (2023-06-27)

### Features

- **sbb-form-field:** reference label for custom form components ([#1828](https://github.com/sbb-design-systems/lyne-components/issues/1828)) ([a2f7418](https://github.com/sbb-design-systems/lyne-components/commit/a2f74180934f013b62bcc805f2d0ee8d048f908c))

### [0.36.25](https://github.com/sbb-design-systems/lyne-components/compare/v0.36.24...v0.36.25) (2023-06-27)

### Bug Fixes

- **sbb-calendar:** calendar animation glitch ([#1840](https://github.com/sbb-design-systems/lyne-components/issues/1840)) ([9f92472](https://github.com/sbb-design-systems/lyne-components/commit/9f92472e533b0cbd13c0698f1586515f6d9ec7ad))

### [0.36.24](https://github.com/sbb-design-systems/lyne-components/compare/v0.36.23...v0.36.24) (2023-06-27)

### Bug Fixes

- **sbb-timetable-row:** stringify accessibilityExpanded prop ([#1830](https://github.com/sbb-design-systems/lyne-components/issues/1830)) ([8b7ef00](https://github.com/sbb-design-systems/lyne-components/commit/8b7ef0038895b53548b004f720a5fdd2715c6c66))

### [0.36.23](https://github.com/sbb-design-systems/lyne-components/compare/v0.36.22...v0.36.23) (2023-06-27)

### Bug Fixes

- **sbb-navigation:** remove focus outline from the container ([#1838](https://github.com/sbb-design-systems/lyne-components/issues/1838)) ([82fa2b3](https://github.com/sbb-design-systems/lyne-components/commit/82fa2b34b357257d345f820127a2a73deafab44f))

### [0.36.22](https://github.com/sbb-design-systems/lyne-components/compare/v0.36.21...v0.36.22) (2023-06-26)

### Bug Fixes

- change first loading logic for proxied parameters ([#1812](https://github.com/sbb-design-systems/lyne-components/issues/1812)) ([c0cc043](https://github.com/sbb-design-systems/lyne-components/commit/c0cc043f3f0bf1e937c55689fe77af71d27af60f))
- **sbb-tooltip:** close all open tooltips before open a new one ([#1823](https://github.com/sbb-design-systems/lyne-components/issues/1823)) ([9b6cf38](https://github.com/sbb-design-systems/lyne-components/commit/9b6cf389b3f9ce3b4b631bfaa618dffa4b6ea3f3))

### [0.36.21](https://github.com/sbb-design-systems/lyne-components/compare/v0.36.20...v0.36.21) (2023-06-26)

### Documentation

- remove doubled titles in readme.md ([#1832](https://github.com/sbb-design-systems/lyne-components/issues/1832)) ([6014156](https://github.com/sbb-design-systems/lyne-components/commit/601415621cf7ee83634e065c2cd019cd30fadf41))

### [0.36.20](https://github.com/sbb-design-systems/lyne-components/compare/v0.36.19...v0.36.20) (2023-06-22)

### Bug Fixes

- **sbb-time-input:** resolve backspace bug ([#1819](https://github.com/sbb-design-systems/lyne-components/issues/1819)) ([27f833b](https://github.com/sbb-design-systems/lyne-components/commit/27f833b5e7b9e56969088a777ffa38c18ca189e4))

### [0.36.19](https://github.com/sbb-design-systems/lyne-components/compare/v0.36.18...v0.36.19) (2023-06-22)

### Bug Fixes

- **sbb-navigation:** add accessibility recommendations and fix focus order ([#1786](https://github.com/sbb-design-systems/lyne-components/issues/1786)) ([9ed1d94](https://github.com/sbb-design-systems/lyne-components/commit/9ed1d94fcf0ffcb9f3dd7deaa7104de97cef3b0d))

### [0.36.18](https://github.com/sbb-design-systems/lyne-components/compare/v0.36.17...v0.36.18) (2023-06-21)

### Features

- **sbb-option:** provide option-selected event ([#1825](https://github.com/sbb-design-systems/lyne-components/issues/1825)) ([8d31a60](https://github.com/sbb-design-systems/lyne-components/commit/8d31a60215640763d604d9568d2ee1eef385b82f))

### [0.36.17](https://github.com/sbb-design-systems/lyne-components/compare/v0.36.16...v0.36.17) (2023-06-21)

### Features

- **sbb-select:** component implementation ([#1756](https://github.com/sbb-design-systems/lyne-components/issues/1756)) ([7ecc880](https://github.com/sbb-design-systems/lyne-components/commit/7ecc8804effd7499a9c42c0c9e7daa9bb3a7292e)), closes [#1166](https://github.com/sbb-design-systems/lyne-components/issues/1166)

### [0.36.16](https://github.com/sbb-design-systems/lyne-components/compare/v0.36.15...v0.36.16) (2023-06-20)

### Bug Fixes

- **sbb-form-field:** use space to combine aria-describedby ids ([#1820](https://github.com/sbb-design-systems/lyne-components/issues/1820)) ([ebfe368](https://github.com/sbb-design-systems/lyne-components/commit/ebfe36820e4b944854b5c32fb7301fa99a214d8b))

### [0.36.15](https://github.com/sbb-design-systems/lyne-components/compare/v0.36.14...v0.36.15) (2023-06-20)

### Features

- **sbb-journey-summary:** add headerLevel prop ([#1813](https://github.com/sbb-design-systems/lyne-components/issues/1813)) ([c5bae4e](https://github.com/sbb-design-systems/lyne-components/commit/c5bae4e056be6da9b580bd7badb25cea7df7d5c8))

### [0.36.14](https://github.com/sbb-design-systems/lyne-components/compare/v0.36.13...v0.36.14) (2023-06-20)

### Features

- **sbb-timetable-row:** add accessibilityExpanded prop ([#1814](https://github.com/sbb-design-systems/lyne-components/issues/1814)) ([38d1751](https://github.com/sbb-design-systems/lyne-components/commit/38d17517e00650e01df6d06b88eb2357e82048bb))

### [0.36.13](https://github.com/sbb-design-systems/lyne-components/compare/v0.36.12...v0.36.13) (2023-06-13)

### Refactorings

- adapt chromatic check imports ([#1811](https://github.com/sbb-design-systems/lyne-components/issues/1811)) ([a5865f8](https://github.com/sbb-design-systems/lyne-components/commit/a5865f84450900b216cca0ee87a74131678339e2))

### [0.36.12](https://github.com/sbb-design-systems/lyne-components/compare/v0.36.11...v0.36.12) (2023-06-13)

### Bug Fixes

- remove duplicate file, change test file extension ([#1808](https://github.com/sbb-design-systems/lyne-components/issues/1808)) ([1ae5c31](https://github.com/sbb-design-systems/lyne-components/commit/1ae5c31b5e975c01aef926794360fe8713d622f9))

### [0.36.11](https://github.com/sbb-design-systems/lyne-components/compare/v0.36.10...v0.36.11) (2023-06-12)

### Bug Fixes

- enable pressing enter on action elements in Firefox ([#1807](https://github.com/sbb-design-systems/lyne-components/issues/1807)) ([adaca6d](https://github.com/sbb-design-systems/lyne-components/commit/adaca6d1373ce04804cb47c09721f8c0e9a10a1f))

### [0.36.10](https://github.com/sbb-design-systems/lyne-components/compare/v0.36.9...v0.36.10) (2023-06-09)

### Features

- **sbb-menu:** improve accessibility ([#1801](https://github.com/sbb-design-systems/lyne-components/issues/1801)) ([5c0344b](https://github.com/sbb-design-systems/lyne-components/commit/5c0344be3460d60e156af674388b89ab3a1be9ee))

### [0.36.9](https://github.com/sbb-design-systems/lyne-components/compare/v0.36.8...v0.36.9) (2023-06-08)

### Features

- **sbb-datepicker:** provide `setValue` and `getValue` on `sbb-datepicker` ([#1804](https://github.com/sbb-design-systems/lyne-components/issues/1804)) ([b793a65](https://github.com/sbb-design-systems/lyne-components/commit/b793a65f7b147813ce95b7579f88a17aa48850b8))

### [0.36.8](https://github.com/sbb-design-systems/lyne-components/compare/v0.36.7...v0.36.8) (2023-06-08)

### Documentation

- fix story bundling script ([c661489](https://github.com/sbb-design-systems/lyne-components/commit/c6614892358de68f0b2f68efff6d2b9749ad8d5c))

### [0.36.7](https://github.com/sbb-design-systems/lyne-components/compare/v0.36.6...v0.36.7) (2023-06-08)

### Documentation

- fix icon link ([#1802](https://github.com/sbb-design-systems/lyne-components/issues/1802)) ([d871c61](https://github.com/sbb-design-systems/lyne-components/commit/d871c61b8791c08cc040db0ab2c7e51ea7f431fb))
- **sbb-image:** fix tokens in sample config ([#1803](https://github.com/sbb-design-systems/lyne-components/issues/1803)) ([3539af1](https://github.com/sbb-design-systems/lyne-components/commit/3539af1227f5e0a48b4413cb029ffffa440813c5))

### [0.36.6](https://github.com/sbb-design-systems/lyne-components/compare/v0.36.5...v0.36.6) (2023-06-08)

### Documentation

- fix story bundling script ([7e3a305](https://github.com/sbb-design-systems/lyne-components/commit/7e3a3052c99a100d15ddaf8c95b554e42df0adee))

### [0.36.5](https://github.com/sbb-design-systems/lyne-components/compare/v0.36.4...v0.36.5) (2023-06-08)

### Bug Fixes

- **sbb-form-field:** fix floating label support for popup components ([#1805](https://github.com/sbb-design-systems/lyne-components/issues/1805)) ([bc4b10f](https://github.com/sbb-design-systems/lyne-components/commit/bc4b10fac75ddbd41def980a422ebce6f938f3b9))

### [0.36.4](https://github.com/sbb-design-systems/lyne-components/compare/v0.36.3...v0.36.4) (2023-06-08)

### Bug Fixes

- **sbb-train:** improve accessibility by replacing `span` with heading tag ([#1787](https://github.com/sbb-design-systems/lyne-components/issues/1787)) ([fb93a9e](https://github.com/sbb-design-systems/lyne-components/commit/fb93a9eae3b8d3cc67daefbe3eddea2fd1e6a03a))

### [0.36.3](https://github.com/sbb-design-systems/lyne-components/compare/v0.36.2...v0.36.3) (2023-06-07)

### Refactorings

- convert storybook stories to TypeScript ([#1792](https://github.com/sbb-design-systems/lyne-components/issues/1792)) ([5179d93](https://github.com/sbb-design-systems/lyne-components/commit/5179d9362a5ae69dd56ba1e2a8a36d3d5f00c5d0))

### [0.36.2](https://github.com/sbb-design-systems/lyne-components/compare/v0.36.1...v0.36.2) (2023-06-05)

### Bug Fixes

- **sbb-form-field:** include optional info in ellipsis ([#1790](https://github.com/sbb-design-systems/lyne-components/issues/1790)) ([c44d231](https://github.com/sbb-design-systems/lyne-components/commit/c44d2313218b1b4b4cfd9eaa5273641482c0a4c9))

### [0.36.1](https://github.com/sbb-design-systems/lyne-components/compare/v0.36.0...v0.36.1) (2023-06-01)

### Bug Fixes

- **sbb-navigation:** focus outline on the trigger element in Safari ([#1784](https://github.com/sbb-design-systems/lyne-components/issues/1784)) ([64db143](https://github.com/sbb-design-systems/lyne-components/commit/64db1439b33ee057a4ceee63196e18a230092ab6))

## [0.36.0](https://github.com/sbb-design-systems/lyne-components/compare/v0.35.18...v0.36.0) (2023-05-31)

### ⚠ BREAKING CHANGES

- **sbb-alert, sbb-teaser, sbb-teaser-hero:** Internally we wrapped slotted content with a `<p>` tag in sbb-alert, sbb-teaser and sbb-teaser-hero to guarantee semantic meaning of descriptions. This should not be a problem as long there are no other semantic elements slotted. Anyways, basically only textual elements are intended to be slotted by design.

Please check your usages:

- `sbb-alert`: default slot
- `sbb-teaser`: `description` slot
- `sbb-teaser-hero:`: default slot

### Bug Fixes

- **sbb-alert, sbb-teaser, sbb-teaser-hero:** use paragraph for content slot due to semantic reasons ([#1785](https://github.com/sbb-design-systems/lyne-components/issues/1785)) ([7c7c962](https://github.com/sbb-design-systems/lyne-components/commit/7c7c962086ac26f79aecd5a78bd8f570f0273825))

### [0.35.18](https://github.com/sbb-design-systems/lyne-components/compare/v0.35.17...v0.35.18) (2023-05-30)

### Bug Fixes

- **sbb-menu,sbb-tooltip:** fix overlay position when direction="rtl" ([#1783](https://github.com/sbb-design-systems/lyne-components/issues/1783)) ([e53a4b3](https://github.com/sbb-design-systems/lyne-components/commit/e53a4b363b9968eb3a7b84f0b0e5593a9fb73617))

### [0.35.17](https://github.com/sbb-design-systems/lyne-components/compare/v0.35.16...v0.35.17) (2023-05-30)

### Features

- **sbb-journey-summary:** add additional prop to display round trip ([#1761](https://github.com/sbb-design-systems/lyne-components/issues/1761)) ([2869eb1](https://github.com/sbb-design-systems/lyne-components/commit/2869eb1745fc82edaee9d7e3458baf3dd1ed5d7c))

### [0.35.16](https://github.com/sbb-design-systems/lyne-components/compare/v0.35.15...v0.35.16) (2023-05-30)

### Documentation

- **sbb-selection-panel:** fix nested radios and checkboxes stories rendering ([#1781](https://github.com/sbb-design-systems/lyne-components/issues/1781)) ([10ee887](https://github.com/sbb-design-systems/lyne-components/commit/10ee887a474a22e6b664d639efe556347765a9ae))

### [0.35.15](https://github.com/sbb-design-systems/lyne-components/compare/v0.35.14...v0.35.15) (2023-05-30)

### Bug Fixes

- **sbb-radio-button:** prevent scrolling on spacebar press ([#1778](https://github.com/sbb-design-systems/lyne-components/issues/1778)) ([7c00f54](https://github.com/sbb-design-systems/lyne-components/commit/7c00f5472e59c6164763ca6fd3201cd38b0d67ec))

### [0.35.14](https://github.com/sbb-design-systems/lyne-components/compare/v0.35.13...v0.35.14) (2023-05-25)

### Bug Fixes

- avoid reading all overlay content for screen readers ([#1748](https://github.com/sbb-design-systems/lyne-components/issues/1748)) ([863c7f8](https://github.com/sbb-design-systems/lyne-components/commit/863c7f85a0c1f665cf467822e55a819a309d43bd)), closes [#1595](https://github.com/sbb-design-systems/lyne-components/issues/1595)

### Documentation

- **sbb-skiplink-list:** fix typo in docs ([03ae786](https://github.com/sbb-design-systems/lyne-components/commit/03ae78619857e74811b66e1b9dfe08e7dd329409))

### [0.35.13](https://github.com/sbb-design-systems/lyne-components/compare/v0.35.12...v0.35.13) (2023-05-25)

### Bug Fixes

- **sbb-title:** improve accessibility by setting heading role ([#1773](https://github.com/sbb-design-systems/lyne-components/issues/1773)) ([6bbab18](https://github.com/sbb-design-systems/lyne-components/commit/6bbab18bf684273e7a4728ebe4fb2ed86f6ff36a))

### [0.35.12](https://github.com/sbb-design-systems/lyne-components/compare/v0.35.11...v0.35.12) (2023-05-25)

### Documentation

- **sbb-header-action:** fix component name in readme.md ([#1775](https://github.com/sbb-design-systems/lyne-components/issues/1775)) ([5769f02](https://github.com/sbb-design-systems/lyne-components/commit/5769f0247fc80ce6652c75640a5ad969cd6725d1))

### [0.35.11](https://github.com/sbb-design-systems/lyne-components/compare/v0.35.10...v0.35.11) (2023-05-25)

### Bug Fixes

- **sbb-checkbox, sbb-toggle-check:** prevent scrolling on space bar click ([#1774](https://github.com/sbb-design-systems/lyne-components/issues/1774)) ([91cc682](https://github.com/sbb-design-systems/lyne-components/commit/91cc682fc682379ec6ff070e23f20567bb853d36))

### [0.35.10](https://github.com/sbb-design-systems/lyne-components/compare/v0.35.9...v0.35.10) (2023-05-24)

### Features

- **sbb-datepicker:** parse ISO dates ([#1763](https://github.com/sbb-design-systems/lyne-components/issues/1763)) ([322af78](https://github.com/sbb-design-systems/lyne-components/commit/322af78c05f1d3b0100cf2f7fd0581700e22c459))
- **sbb-form-field:** provide option for floating labels ([#1765](https://github.com/sbb-design-systems/lyne-components/issues/1765)) ([d6ef480](https://github.com/sbb-design-systems/lyne-components/commit/d6ef4803cbf4a6a5066308f7745b2b6ef8acedba))

### [0.35.9](https://github.com/sbb-design-systems/lyne-components/compare/v0.35.8...v0.35.9) (2023-05-24)

### Bug Fixes

- **sbb-selection-panel:** allow nested checkbox and radio groups ([#1767](https://github.com/sbb-design-systems/lyne-components/issues/1767)) ([a81a987](https://github.com/sbb-design-systems/lyne-components/commit/a81a987c77c409f48907a3466612b622ce7669cd))

### [0.35.8](https://github.com/sbb-design-systems/lyne-components/compare/v0.35.7...v0.35.8) (2023-05-24)

### Bug Fixes

- set most recent input modality initial value ([#1758](https://github.com/sbb-design-systems/lyne-components/issues/1758)) ([e7d1388](https://github.com/sbb-design-systems/lyne-components/commit/e7d138860116580483f81380147c7e589f9adb61))

### [0.35.7](https://github.com/sbb-design-systems/lyne-components/compare/v0.35.6...v0.35.7) (2023-05-24)

### Features

- **sbb-datepicker-toggle:** allow opening calendar programmatically ([#1762](https://github.com/sbb-design-systems/lyne-components/issues/1762)) ([390ce46](https://github.com/sbb-design-systems/lyne-components/commit/390ce461d845697bcad4309d4e2bc4ed6c9e7497))

### [0.35.6](https://github.com/sbb-design-systems/lyne-components/compare/v0.35.5...v0.35.6) (2023-05-23)

### Bug Fixes

- **sbb-autocomplete:** handle readonly state ([#1764](https://github.com/sbb-design-systems/lyne-components/issues/1764)) ([ad43efd](https://github.com/sbb-design-systems/lyne-components/commit/ad43efd4fd03f75d0d9bea86f5d5be7cd8d38dc3))

### [0.35.5](https://github.com/sbb-design-systems/lyne-components/compare/v0.35.4...v0.35.5) (2023-05-23)

### Features

- sbb-skiplink implementation ([#1740](https://github.com/sbb-design-systems/lyne-components/issues/1740)) ([76baa8c](https://github.com/sbb-design-systems/lyne-components/commit/76baa8cb7762c68acd07b687d48aad73461d3011))

### [0.35.4](https://github.com/sbb-design-systems/lyne-components/compare/v0.35.3...v0.35.4) (2023-05-22)

### Bug Fixes

- **styles:** exclude other elements than paragraph for gap in lists ([#1760](https://github.com/sbb-design-systems/lyne-components/issues/1760)) ([5b7b379](https://github.com/sbb-design-systems/lyne-components/commit/5b7b3796d9c4f7cec3026cf936a6d4fe371c134e)), closes [#1679](https://github.com/sbb-design-systems/lyne-components/issues/1679)

### [0.35.3](https://github.com/sbb-design-systems/lyne-components/compare/v0.35.2...v0.35.3) (2023-05-22)

### Features

- **sbb-button:** sbb-form-field integration ([#1746](https://github.com/sbb-design-systems/lyne-components/issues/1746)) ([9c3fdb1](https://github.com/sbb-design-systems/lyne-components/commit/9c3fdb14b310198d40e6e407f2d9922dae817cf5)), closes [#1683](https://github.com/sbb-design-systems/lyne-components/issues/1683)

### [0.35.2](https://github.com/sbb-design-systems/lyne-components/compare/v0.35.1...v0.35.2) (2023-05-22)

### Features

- **sbb-autocomplete:** component implementation ([#1667](https://github.com/sbb-design-systems/lyne-components/issues/1667)) ([28ea027](https://github.com/sbb-design-systems/lyne-components/commit/28ea027a66484b1c8c89eb38021601b9641fad8b))

### Bug Fixes

- add 'withActions' decorator for Storybook's actions tab ([#1747](https://github.com/sbb-design-systems/lyne-components/issues/1747)) ([52e3529](https://github.com/sbb-design-systems/lyne-components/commit/52e35292071e5bee8b7b75c39a18c2bdb797a6d8))
- **sbb-selection-panel:** chromatic and force-open tests ([#1752](https://github.com/sbb-design-systems/lyne-components/issues/1752)) ([d5f7e2a](https://github.com/sbb-design-systems/lyne-components/commit/d5f7e2aec9bda3c5ee68c0cd9d7f32ef0aedd55e))

### [0.35.1](https://github.com/sbb-design-systems/lyne-components/compare/v0.35.0...v0.35.1) (2023-05-16)

### Bug Fixes

- new disabled states ([#1733](https://github.com/sbb-design-systems/lyne-components/issues/1733)) ([6deb6eb](https://github.com/sbb-design-systems/lyne-components/commit/6deb6eb7a53f293bf800994d738e424aad82e9c2))

## [0.35.0](https://github.com/sbb-design-systems/lyne-components/compare/v0.34.0...v0.35.0) (2023-05-16)

### ⚠ BREAKING CHANGES

- **sbb-tab-group:** removed `sbb-tab-amount` component which can be replaced by property `amount`
  or slot `amount` of `sbb-tab-title` component.
  e.g. `<sbb-tab-amount>123</sbb-tab-amount>` becomes `<span slot="amount">123</span>`
  or alternatively `<sbb-tab-title amount="123">Label</sbb-tab-title>`.

### Refactorings

- **sbb-tab-group:** remove sbb-tab-amount, provide amount and iconName properties ([#1744](https://github.com/sbb-design-systems/lyne-components/issues/1744)) ([12a4946](https://github.com/sbb-design-systems/lyne-components/commit/12a494608e3f76f37210d8e6f4db1a2c588f577d))

## [0.34.0](https://github.com/sbb-design-systems/lyne-components/compare/v0.33.16...v0.34.0) (2023-05-16)

### ⚠ BREAKING CHANGES

- The `picto:`-namespace is now pointing to the new English named icons.
  If the old german named icons should be used, you can access them by using
  the namespace `picto-legacy:` (deprecated).

### Refactorings

- migrate to new English named pictograms, fix gondola picto ([#1738](https://github.com/sbb-design-systems/lyne-components/issues/1738)) ([714cafe](https://github.com/sbb-design-systems/lyne-components/commit/714cafefbaa26f4a04b08f5079cb4d41c1ac6f1d))

### [0.33.16](https://github.com/sbb-design-systems/lyne-components/compare/v0.33.15...v0.33.16) (2023-05-15)

### Features

- **sbb-selection-panel:** introduce sbb-selection-panel component ([#1673](https://github.com/sbb-design-systems/lyne-components/issues/1673)) ([d1d5722](https://github.com/sbb-design-systems/lyne-components/commit/d1d57228fa3775d9a1eff67f70b9d268f42024bb))

### [0.33.15](https://github.com/sbb-design-systems/lyne-components/compare/v0.33.14...v0.33.15) (2023-05-15)

### Bug Fixes

- **sbb-menu:** fixed the window snap on scrolling with an open menu ([#1736](https://github.com/sbb-design-systems/lyne-components/issues/1736)) ([686e407](https://github.com/sbb-design-systems/lyne-components/commit/686e407553b6e4f865de63a5804d12685623c43f))

### [0.33.14](https://github.com/sbb-design-systems/lyne-components/compare/v0.33.13...v0.33.14) (2023-05-11)

### Bug Fixes

- detect screen reader keyboard events ([#1731](https://github.com/sbb-design-systems/lyne-components/issues/1731)) ([85c9162](https://github.com/sbb-design-systems/lyne-components/commit/85c91628e8d9a8571c211adfdb14d57b30eaefba))

### [0.33.13](https://github.com/sbb-design-systems/lyne-components/compare/v0.33.12...v0.33.13) (2023-05-03)

### Bug Fixes

- **sbb-button:** fix icon only detection with whitespaces in slot ([85e6999](https://github.com/sbb-design-systems/lyne-components/commit/85e6999dfde964f142c5be37b76008f8e7922fb0))

### [0.33.12](https://github.com/sbb-design-systems/lyne-components/compare/v0.33.11...v0.33.12) (2023-05-03)

### Bug Fixes

- **sbb-tooltip:** fix Safari outline on trigger after closing ([#1727](https://github.com/sbb-design-systems/lyne-components/issues/1727)) ([24ed9a1](https://github.com/sbb-design-systems/lyne-components/commit/24ed9a18f4ac98be5d61941953211d030aca32d3))
- **sbb-tooltip:** stabilize closing animation ([#1728](https://github.com/sbb-design-systems/lyne-components/issues/1728)) ([104a1e9](https://github.com/sbb-design-systems/lyne-components/commit/104a1e9df565207db4eceed5ed5fe29204ae7bfe))

### [0.33.11](https://github.com/sbb-design-systems/lyne-components/compare/v0.33.10...v0.33.11) (2023-04-27)

### Features

- **sbb-chip:** initial implementation ([#1721](https://github.com/sbb-design-systems/lyne-components/issues/1721)) ([ac4bc7c](https://github.com/sbb-design-systems/lyne-components/commit/ac4bc7c3af1e9fec84ac41f2bf89b0a2cd4eba33))

### [0.33.10](https://github.com/sbb-design-systems/lyne-components/compare/v0.33.9...v0.33.10) (2023-04-24)

### Bug Fixes

- **sbb-timetable-row:** use sr-only span for icon label ([#1717](https://github.com/sbb-design-systems/lyne-components/issues/1717)) ([c5adc39](https://github.com/sbb-design-systems/lyne-components/commit/c5adc39da522336554bc16be922b43c9a8517c12))

### [0.33.9](https://github.com/sbb-design-systems/lyne-components/compare/v0.33.8...v0.33.9) (2023-04-18)

### Bug Fixes

- fix story bundling for lyne-documentation ([1e249ec](https://github.com/sbb-design-systems/lyne-components/commit/1e249ecf837e54754a7f3b3208ae58582db41e8b))

### [0.33.8](https://github.com/sbb-design-systems/lyne-components/compare/v0.33.7...v0.33.8) (2023-04-17)

### Bug Fixes

- add support for .mjs in nginx ([1b286f3](https://github.com/sbb-design-systems/lyne-components/commit/1b286f322b508eb53151c554d9b5b1e1088af28a))

### [0.33.7](https://github.com/sbb-design-systems/lyne-components/compare/v0.33.6...v0.33.7) (2023-04-17)

### Bug Fixes

- don't remove mjs files for container ([d3b9db2](https://github.com/sbb-design-systems/lyne-components/commit/d3b9db27cc1983986684087377df109036b1fcfd))

### [0.33.6](https://github.com/sbb-design-systems/lyne-components/compare/v0.33.5...v0.33.6) (2023-04-17)

### Bug Fixes

- ensure .mjs files can be served in our preview image ([f234059](https://github.com/sbb-design-systems/lyne-components/commit/f234059e9409ba919bacada5a1162c7f257b7e81))

### [0.33.5](https://github.com/sbb-design-systems/lyne-components/compare/v0.33.4...v0.33.5) (2023-04-17)

### Bug Fixes

- **sbb-datepicker:** fix focus outline in safari on selection ([#1715](https://github.com/sbb-design-systems/lyne-components/issues/1715)) ([dc3d44e](https://github.com/sbb-design-systems/lyne-components/commit/dc3d44e8aa2b454d78333a267f6928b8047982d2))

### [0.33.4](https://github.com/sbb-design-systems/lyne-components/compare/v0.33.3...v0.33.4) (2023-04-14)

### Features

- **sbb-datepicker:** component implementation ([#1630](https://github.com/sbb-design-systems/lyne-components/issues/1630)) ([5022195](https://github.com/sbb-design-systems/lyne-components/commit/50221957565f886b48b7b2b2a2959cea6fca5000))

### [0.33.3](https://github.com/sbb-design-systems/lyne-components/compare/v0.33.2...v0.33.3) (2023-04-13)

### Documentation

- **sbb-header:** add readme section about scroll-padding-top ([#1714](https://github.com/sbb-design-systems/lyne-components/issues/1714)) ([ed0de04](https://github.com/sbb-design-systems/lyne-components/commit/ed0de044abb7db1526451a63bed6bad3cf77c216))

### [0.33.2](https://github.com/sbb-design-systems/lyne-components/compare/v0.33.1...v0.33.2) (2023-04-13)

### Bug Fixes

- **sbb-train-formation:** render label correctly if empty ([#1712](https://github.com/sbb-design-systems/lyne-components/issues/1712)) ([1db55fb](https://github.com/sbb-design-systems/lyne-components/commit/1db55fb561f4bf68c962a571a8f842ae4839a05f))

### [0.33.1](https://github.com/sbb-design-systems/lyne-components/compare/v0.33.0...v0.33.1) (2023-04-12)

### Features

- **sbb-map-container:** provide scroll up button ([#1702](https://github.com/sbb-design-systems/lyne-components/issues/1702)) ([7942b12](https://github.com/sbb-design-systems/lyne-components/commit/7942b12cea5ddd98003bf686a14c4db08c52d536))

## [0.33.0](https://github.com/sbb-design-systems/lyne-components/compare/v0.32.0...v0.33.0) (2023-04-11)

### ⚠ BREAKING CHANGES

- **sbb-button:** `tranclucent` variant was removed and replaced by
  a new `tertiary` button variant.

### Features

- **sbb-button:** replace variant `translucent` by `tertiary` ([#1708](https://github.com/sbb-design-systems/lyne-components/issues/1708)) ([90b2328](https://github.com/sbb-design-systems/lyne-components/commit/90b23283ceaf158269c25b44c48a27b686fd578d))

## [0.32.0](https://github.com/sbb-design-systems/lyne-components/compare/v0.31.2...v0.32.0) (2023-04-11)

### ⚠ BREAKING CHANGES

- - renamed SASS mixin `scrollbar` to `scrollbar-rules` which mainly is intended for internal use

* renamed SASS mixin `scrollbar-light` to parameterized SASS mixin `scrollbar`
* renamed SASS mixin `scrollbar-dark` to parameterized SASS mixin `scrollbar($negative: true)`

### Features

- introduce new scrollbar variants `size` and `track-visible` ([#1688](https://github.com/sbb-design-systems/lyne-components/issues/1688)) ([78dd3bd](https://github.com/sbb-design-systems/lyne-components/commit/78dd3bdd9655ef08cb4f33388bf747d46aa465d6)), closes [#1627](https://github.com/sbb-design-systems/lyne-components/issues/1627)

### Bug Fixes

- glob import ([649d635](https://github.com/sbb-design-systems/lyne-components/commit/649d6352abf6155c15bea521091317b3e6764a83))

### [0.31.2](https://github.com/sbb-design-systems/lyne-components/compare/v0.31.1...v0.31.2) (2023-04-06)

### Documentation

- **sbb-map-container:** fix story ([#1701](https://github.com/sbb-design-systems/lyne-components/issues/1701)) ([f0afa99](https://github.com/sbb-design-systems/lyne-components/commit/f0afa9938172082a2ad9310c40e12d7d5edc28e0))

### [0.31.1](https://github.com/sbb-design-systems/lyne-components/compare/v0.31.0...v0.31.1) (2023-04-05)

### Bug Fixes

- **sbb-dialog:** fix fullscreen mode in Safari ([#1700](https://github.com/sbb-design-systems/lyne-components/issues/1700)) ([1138e49](https://github.com/sbb-design-systems/lyne-components/commit/1138e4907cdcfa95ee37bf97c50b130df9b01256))

## [0.31.0](https://github.com/sbb-design-systems/lyne-components/compare/v0.30.10...v0.31.0) (2023-04-05)

### ⚠ BREAKING CHANGES

- **sbb-train-formation:** - Component `sbb-wagon` was renamed to `sbb-train-wagon`

* Component `sbb-wagon-blocked-passage` was renamed to `sbb-train-blocked-passage`
* Component `sbb-sector` was completely removed. Now you have to set the sector as property / attribute on `sbb-train-wagon` and additionally now only the letter should be provided and not the word "sector".
* Property `customAccessibilityText` of `sbb-train-wagon` has been removed without replacement.

### Bug Fixes

- **sbb-train-formation:** fix accessibility and overlapping sectors ([#1674](https://github.com/sbb-design-systems/lyne-components/issues/1674)) ([8a09083](https://github.com/sbb-design-systems/lyne-components/commit/8a0908323348e8ab33b003ff491849815ec03465)), closes [#1570](https://github.com/sbb-design-systems/lyne-components/issues/1570) [#1638](https://github.com/sbb-design-systems/lyne-components/issues/1638)

### [0.30.10](https://github.com/sbb-design-systems/lyne-components/compare/v0.30.9...v0.30.10) (2023-04-04)

### Bug Fixes

- improve focus trap class mechanism ([#1654](https://github.com/sbb-design-systems/lyne-components/issues/1654)) ([29f02aa](https://github.com/sbb-design-systems/lyne-components/commit/29f02aa099167e0e875cf047edf2810e7e19c8a6))

### [0.30.9](https://github.com/sbb-design-systems/lyne-components/compare/v0.30.8...v0.30.9) (2023-04-04)

### Features

- **sbb-map-container:** initial implementation ([#1691](https://github.com/sbb-design-systems/lyne-components/issues/1691)) ([9404ade](https://github.com/sbb-design-systems/lyne-components/commit/9404aded08b16bdd5c47faa8c31dd92a53d9e1f5))

### [0.30.8](https://github.com/sbb-design-systems/lyne-components/compare/v0.30.7...v0.30.8) (2023-04-04)

### Documentation

- **sbb-form-field:** fix wrong logic in error-space stories ([#1699](https://github.com/sbb-design-systems/lyne-components/issues/1699)) ([f4b7c94](https://github.com/sbb-design-systems/lyne-components/commit/f4b7c94d575294d66d7d7c3d5d75278211b597e3))

### [0.30.7](https://github.com/sbb-design-systems/lyne-components/compare/v0.30.6...v0.30.7) (2023-04-04)

### Refactorings

- adapt language change and named slot change to new repository pattern ([#1692](https://github.com/sbb-design-systems/lyne-components/issues/1692)) ([f9439eb](https://github.com/sbb-design-systems/lyne-components/commit/f9439ebd1d384f0738f26873ab1ae2747872e618))

### [0.30.6](https://github.com/sbb-design-systems/lyne-components/compare/v0.30.5...v0.30.6) (2023-04-04)

### Bug Fixes

- **sbb-pearl-chain-vertical:** improve spacing and a11y ([#1694](https://github.com/sbb-design-systems/lyne-components/issues/1694)) ([b54b167](https://github.com/sbb-design-systems/lyne-components/commit/b54b167382c08a2c6fb07e4cf9b711ef0b2eed13))
- **sbb-pearl-chain:** fix high contrast mode for lines and bullets ([#1693](https://github.com/sbb-design-systems/lyne-components/issues/1693)) ([ca05a8c](https://github.com/sbb-design-systems/lyne-components/commit/ca05a8c318becc5ca1dfb0ded44d88115392016a))
- **sbb-timetable-row:** improve a11y text for himcus icons ([#1698](https://github.com/sbb-design-systems/lyne-components/issues/1698)) ([54ea913](https://github.com/sbb-design-systems/lyne-components/commit/54ea913fd1248ce1a82d1c72b77a192cae7e07a3))

### [0.30.5](https://github.com/sbb-design-systems/lyne-components/compare/v0.30.4...v0.30.5) (2023-03-30)

### Bug Fixes

- only dispatch click on anchor when it is available ([#1690](https://github.com/sbb-design-systems/lyne-components/issues/1690)) ([b79825f](https://github.com/sbb-design-systems/lyne-components/commit/b79825f8cc9e20f3170e16cf4f88f3eead6c240b))

### [0.30.4](https://github.com/sbb-design-systems/lyne-components/compare/v0.30.3...v0.30.4) (2023-03-29)

### Bug Fixes

- **sbb-card:** change sbb-card-badge order ([#1687](https://github.com/sbb-design-systems/lyne-components/issues/1687)) ([694786d](https://github.com/sbb-design-systems/lyne-components/commit/694786d16ff9e2d5acd1e233c7eedba55048be6d))

### [0.30.3](https://github.com/sbb-design-systems/lyne-components/compare/v0.30.2...v0.30.3) (2023-03-29)

### Bug Fixes

- **sbb-timetable-row:** add spacings for sr-only text ([#1686](https://github.com/sbb-design-systems/lyne-components/issues/1686)) ([50338fa](https://github.com/sbb-design-systems/lyne-components/commit/50338fafa60a3d4366bfc510094a73c7d1ed5c5e))

### [0.30.2](https://github.com/sbb-design-systems/lyne-components/compare/v0.30.1...v0.30.2) (2023-03-28)

### Bug Fixes

- refine accessibility changes on host elements ([#1685](https://github.com/sbb-design-systems/lyne-components/issues/1685)) ([70f33c1](https://github.com/sbb-design-systems/lyne-components/commit/70f33c15d789d408e4544031a6b45ef3138aa23b))

### [0.30.1](https://github.com/sbb-design-systems/lyne-components/compare/v0.30.0...v0.30.1) (2023-03-28)

### Bug Fixes

- stabilize positioning function ([#1684](https://github.com/sbb-design-systems/lyne-components/issues/1684)) ([bb17e05](https://github.com/sbb-design-systems/lyne-components/commit/bb17e059eb65401ec22354a05fb7d9cd779fbf8f))

## [0.30.0](https://github.com/sbb-design-systems/lyne-components/compare/v0.29.1...v0.30.0) (2023-03-24)

### ⚠ BREAKING CHANGES

- Almost all accessibility-label attributes were removed in favor of just using aria-label (exceptions are `<sbb-alert>`, `<sbb-dialog>`, `<sbb-logo>`, `<sbb-navigation>`, `<sbb-navigation-section>`, `<sbb-signet>` and `<sbb-train>`).

Co-authored-by: Jeri Peier <jeremias.peier@sbb.ch>

### Features

- refactor accessibility features to reflect state on host ([#1670](https://github.com/sbb-design-systems/lyne-components/issues/1670)) ([b149e8a](https://github.com/sbb-design-systems/lyne-components/commit/b149e8ade3131229a0c4714c3a5864750a50a6d6)), closes [#1611](https://github.com/sbb-design-systems/lyne-components/issues/1611)

### [0.29.1](https://github.com/sbb-design-systems/lyne-components/compare/v0.29.0...v0.29.1) (2023-03-23)

### Bug Fixes

- **sbb-icon:** empty icon on Safari ([#1681](https://github.com/sbb-design-systems/lyne-components/issues/1681)) ([0975b00](https://github.com/sbb-design-systems/lyne-components/commit/0975b007139d644da784a40ccf287f92f3822e70))

## [0.29.0](https://github.com/sbb-design-systems/lyne-components/compare/v0.28.6...v0.29.0) (2023-03-22)

### ⚠ BREAKING CHANGES

- **sbb-form-field:** It is now required to use a `<label>` to label an input in a `<sbb-form-field>`.

### Bug Fixes

- **sbb-form-field:** always use label to link to input ([#1680](https://github.com/sbb-design-systems/lyne-components/issues/1680)) ([c416f68](https://github.com/sbb-design-systems/lyne-components/commit/c416f68da95b9fd96c111c944a1c74fd6f0a39f6))

### [0.28.6](https://github.com/sbb-design-systems/lyne-components/compare/v0.28.5...v0.28.6) (2023-03-21)

### Bug Fixes

- **sbb-timetable-row:** improve accessibility ([#1677](https://github.com/sbb-design-systems/lyne-components/issues/1677)) ([d374853](https://github.com/sbb-design-systems/lyne-components/commit/d37485389642d565bb44b44dd3511aab4bdfbd9c))

### [0.28.5](https://github.com/sbb-design-systems/lyne-components/compare/v0.28.4...v0.28.5) (2023-03-21)

### Refactorings

- **sbb-timetable:** use GetTripsQuery for types and interfaces ([#1678](https://github.com/sbb-design-systems/lyne-components/issues/1678)) ([3476aff](https://github.com/sbb-design-systems/lyne-components/commit/3476aff5e2a13cbca42321bf00b99149b00eb625))

### [0.28.4](https://github.com/sbb-design-systems/lyne-components/compare/v0.28.3...v0.28.4) (2023-03-13)

### Features

- **sbb-pearl-chain-time:** add extended transfer render logic ([#1651](https://github.com/sbb-design-systems/lyne-components/issues/1651)) ([776dbb0](https://github.com/sbb-design-systems/lyne-components/commit/776dbb060b1e2f1da04e22f1dd75d9b25e019c82))

### Bug Fixes

- **sbb-pearl-chain-time:** fix time formatting ([#1672](https://github.com/sbb-design-systems/lyne-components/issues/1672)) ([9bc8f81](https://github.com/sbb-design-systems/lyne-components/commit/9bc8f81198daf83e7b2c928b224bbcdd1a5b98ba))

### [0.28.3](https://github.com/sbb-design-systems/lyne-components/compare/v0.28.2...v0.28.3) (2023-03-09)

### Bug Fixes

- **sbb-header:** fix stroke width of icons ([#1669](https://github.com/sbb-design-systems/lyne-components/issues/1669)) ([ecd402f](https://github.com/sbb-design-systems/lyne-components/commit/ecd402f078679543ae8e667e67eeeda017909e27))

### [0.28.2](https://github.com/sbb-design-systems/lyne-components/compare/v0.28.1...v0.28.2) (2023-03-08)

### Documentation

- added new issue templates, removed old templates ([#1663](https://github.com/sbb-design-systems/lyne-components/issues/1663)) ([4eca35c](https://github.com/sbb-design-systems/lyne-components/commit/4eca35c98f324ed35ba7cbd7f1b042f84ca57b34))

### [0.28.1](https://github.com/sbb-design-systems/lyne-components/compare/v0.28.0...v0.28.1) (2023-03-07)

### Bug Fixes

- **sbb-logo,sbb-signet:** allow label of image to be defined ([#1665](https://github.com/sbb-design-systems/lyne-components/issues/1665)) ([37a4956](https://github.com/sbb-design-systems/lyne-components/commit/37a4956ea5f3adc52f0d53c3534f22622e7fa15b))

## [0.28.0](https://github.com/sbb-design-systems/lyne-components/compare/v0.27.1...v0.28.0) (2023-03-07)

### ⚠ BREAKING CHANGES

- This changes the behavior of `<sbb-action-group>` and `<sbb-link-list>`, as they now overwrite properties of nested `<sbb-link>` (`variant`, `size` (renamed from `text-size`)) and `<sbb-button>` (`size`).

### Features

- add property sync functionality for group components ([#1629](https://github.com/sbb-design-systems/lyne-components/issues/1629)) ([27bf32a](https://github.com/sbb-design-systems/lyne-components/commit/27bf32aec44acffadafc84abba04b9b2bc06651f))

### [0.27.1](https://github.com/sbb-design-systems/lyne-components/compare/v0.27.0...v0.27.1) (2023-03-07)

### Bug Fixes

- **sbb-header-action:** fix styling after orientation change on iOS ([#1664](https://github.com/sbb-design-systems/lyne-components/issues/1664)) ([e30db05](https://github.com/sbb-design-systems/lyne-components/commit/e30db05b455ebae7d19a4c74d0ff5d2153933ecb))

## [0.27.0](https://github.com/sbb-design-systems/lyne-components/compare/v0.26.23...v0.27.0) (2023-03-06)

### ⚠ BREAKING CHANGES

- **sbb-tag:** - Exclusive mode is now the default mode. To change to multiple, set the new `multiple` property to true.

* You should always set value property of the `sbb-tag` to work correctly in the `sbb-tag-group`.

### Bug Fixes

- **sbb-header:** change stroke width of icons from 0.5px to 1.2px ([#1661](https://github.com/sbb-design-systems/lyne-components/issues/1661)) ([a7de8cc](https://github.com/sbb-design-systems/lyne-components/commit/a7de8ccc7ed93a95b836ca57e103e40f111bf665))
- **sbb-tab-group:** remove unwanted space between tabs ([#1662](https://github.com/sbb-design-systems/lyne-components/issues/1662)) ([d2c3a2a](https://github.com/sbb-design-systems/lyne-components/commit/d2c3a2a53b0bc87b2b72abc46fa06f7b7b29ca8e))
- **sbb-tag:** fix accessibility by using buttons instead of checkboxes ([#1647](https://github.com/sbb-design-systems/lyne-components/issues/1647)) ([35a2ba5](https://github.com/sbb-design-systems/lyne-components/commit/35a2ba5ddfc70cc61834d4b7419cd30ef035ebb1))

### [0.26.23](https://github.com/sbb-design-systems/lyne-components/compare/v0.26.22...v0.26.23) (2023-03-02)

### Bug Fixes

- **sbb-header:** always read header action label to screen readers ([#1658](https://github.com/sbb-design-systems/lyne-components/issues/1658)) ([5289c50](https://github.com/sbb-design-systems/lyne-components/commit/5289c50c483312187033d3e12fb8900e274facad))

### [0.26.22](https://github.com/sbb-design-systems/lyne-components/compare/v0.26.21...v0.26.22) (2023-03-02)

### Bug Fixes

- **sbb-toggle:** fix min-width of toggle option ([#1659](https://github.com/sbb-design-systems/lyne-components/issues/1659)) ([808aa32](https://github.com/sbb-design-systems/lyne-components/commit/808aa32859d6931b6bee4bec92783e2199e83f4f))

### [0.26.21](https://github.com/sbb-design-systems/lyne-components/compare/v0.26.20...v0.26.21) (2023-03-02)

### Bug Fixes

- **sbb-footer:** define default font styles and fix accessibility ([#1656](https://github.com/sbb-design-systems/lyne-components/issues/1656)) ([234df26](https://github.com/sbb-design-systems/lyne-components/commit/234df26bd4005c800225c341975d790323188e1e))

### [0.26.20](https://github.com/sbb-design-systems/lyne-components/compare/v0.26.19...v0.26.20) (2023-03-02)

### Bug Fixes

- add ts files in code coverage calculation ([#1657](https://github.com/sbb-design-systems/lyne-components/issues/1657)) ([2b6f5a8](https://github.com/sbb-design-systems/lyne-components/commit/2b6f5a85e27c1b74bf272858fcea58ffe6a59db5))
- **sbb-dialog:** observe dialog content resizing ([#1650](https://github.com/sbb-design-systems/lyne-components/issues/1650)) ([1211776](https://github.com/sbb-design-systems/lyne-components/commit/1211776720eb264e2b68e965f96fac093ce41e38))
- **sbb-navigation:** set correct dimension on mobile ([#1646](https://github.com/sbb-design-systems/lyne-components/issues/1646)) ([08b6b9d](https://github.com/sbb-design-systems/lyne-components/commit/08b6b9d0c76deab049f4d2a3935c5adb550db23f))

### [0.26.19](https://github.com/sbb-design-systems/lyne-components/compare/v0.26.18...v0.26.19) (2023-02-23)

### Documentation

- change storybook components to a flat structure ([#1628](https://github.com/sbb-design-systems/lyne-components/issues/1628)) ([7ad5558](https://github.com/sbb-design-systems/lyne-components/commit/7ad55582ebb17ccafcf2bee5d0609e99ac9d3d7d))

### [0.26.18](https://github.com/sbb-design-systems/lyne-components/compare/v0.26.17...v0.26.18) (2023-02-23)

### Bug Fixes

- fix CSS specificity of `outline: none` ([#1644](https://github.com/sbb-design-systems/lyne-components/issues/1644)) ([f362d71](https://github.com/sbb-design-systems/lyne-components/commit/f362d71eea8397dbd4cc7d5529d85c62cdf4f7da))

### [0.26.17](https://github.com/sbb-design-systems/lyne-components/compare/v0.26.16...v0.26.17) (2023-02-23)

### Bug Fixes

- **sbb-toggle-check:** scroll into view when focused via tab key ([#1643](https://github.com/sbb-design-systems/lyne-components/issues/1643)) ([4f073d0](https://github.com/sbb-design-systems/lyne-components/commit/4f073d09304023ef1a76e853f44be10d70180fd3))
- **sbb-toggle:** send event on keyboard selection ([#1642](https://github.com/sbb-design-systems/lyne-components/issues/1642)) ([df85046](https://github.com/sbb-design-systems/lyne-components/commit/df85046d40245ebbdd2cf196c6bebd4c1fa4600a)), closes [#1641](https://github.com/sbb-design-systems/lyne-components/issues/1641)

### [0.26.16](https://github.com/sbb-design-systems/lyne-components/compare/v0.26.15...v0.26.16) (2023-02-23)

### Refactorings

- improve scroll handling mechanism ([#1634](https://github.com/sbb-design-systems/lyne-components/issues/1634)) ([7222c56](https://github.com/sbb-design-systems/lyne-components/commit/7222c56c1cc34a252692f0a70306e1ec74bd9a77))

### [0.26.15](https://github.com/sbb-design-systems/lyne-components/compare/v0.26.14...v0.26.15) (2023-02-23)

### Features

- **sbb-icon:** reserve dimensions for default icons during loading ([#1636](https://github.com/sbb-design-systems/lyne-components/issues/1636)) ([a6e8aee](https://github.com/sbb-design-systems/lyne-components/commit/a6e8aee3eac1064bad5d80776c60ca4f405d2a8a))

### [0.26.14](https://github.com/sbb-design-systems/lyne-components/compare/v0.26.13...v0.26.14) (2023-02-23)

### Bug Fixes

- **sbb-image:** avoid importing all tokens ([#1637](https://github.com/sbb-design-systems/lyne-components/issues/1637)) ([f5c5f2b](https://github.com/sbb-design-systems/lyne-components/commit/f5c5f2be899d73e0d2ea15f8ee4bf0644cf3a717))

### [0.26.13](https://github.com/sbb-design-systems/lyne-components/compare/v0.26.12...v0.26.13) (2023-02-23)

### Refactorings

- **sbb-link:** expose gap as CSS var ([#1640](https://github.com/sbb-design-systems/lyne-components/issues/1640)) ([82327e6](https://github.com/sbb-design-systems/lyne-components/commit/82327e60df81de70128bd0cd97d71a5dfb9f8eba))

### [0.26.12](https://github.com/sbb-design-systems/lyne-components/compare/v0.26.11...v0.26.12) (2023-02-22)

### Bug Fixes

- **sbb-timetable-row:** fix skeleton animation on content on Safari ([#1635](https://github.com/sbb-design-systems/lyne-components/issues/1635)) ([afe0503](https://github.com/sbb-design-systems/lyne-components/commit/afe0503e41d4e2548da5063b3fe87e3417370790))

### [0.26.11](https://github.com/sbb-design-systems/lyne-components/compare/v0.26.10...v0.26.11) (2023-02-21)

### Bug Fixes

- **badge:** set color of badge ([#1632](https://github.com/sbb-design-systems/lyne-components/issues/1632)) ([8955517](https://github.com/sbb-design-systems/lyne-components/commit/8955517c7fdb318068e8c0759aa73541ea192693))

### [0.26.10](https://github.com/sbb-design-systems/lyne-components/compare/v0.26.9...v0.26.10) (2023-02-21)

### Bug Fixes

- **sbb-header:** allow z-index to be configured by CSS var ([#1631](https://github.com/sbb-design-systems/lyne-components/issues/1631)) ([9b87f60](https://github.com/sbb-design-systems/lyne-components/commit/9b87f60cb120fcf19899d43601c9f86e01a4da23))

### [0.26.9](https://github.com/sbb-design-systems/lyne-components/compare/v0.26.8...v0.26.9) (2023-02-21)

### Bug Fixes

- **sbb-menu:** disable page scroll on mobile ([#1614](https://github.com/sbb-design-systems/lyne-components/issues/1614)) ([dc7e48c](https://github.com/sbb-design-systems/lyne-components/commit/dc7e48c094e6e1ccab89fd56a9cfad2d58e3c465))

### [0.26.8](https://github.com/sbb-design-systems/lyne-components/compare/v0.26.7...v0.26.8) (2023-02-21)

### Bug Fixes

- **sbb-header:** prevent unwanted hiding and use transform for the animation ([#1621](https://github.com/sbb-design-systems/lyne-components/issues/1621)) ([85b4ebd](https://github.com/sbb-design-systems/lyne-components/commit/85b4ebd147dff81fda8a3df486b806c1a6f55d5d))

### [0.26.7](https://github.com/sbb-design-systems/lyne-components/compare/v0.26.6...v0.26.7) (2023-02-16)

### Features

- **sbb-tooltip-trigger:** add disable state ([#1623](https://github.com/sbb-design-systems/lyne-components/issues/1623)) ([f147fdf](https://github.com/sbb-design-systems/lyne-components/commit/f147fdf23ef708224f9a5e302c742e8756b55798))

### [0.26.6](https://github.com/sbb-design-systems/lyne-components/compare/v0.26.5...v0.26.6) (2023-02-15)

### Bug Fixes

- **sbb-header:** fix hiding transition ([#1619](https://github.com/sbb-design-systems/lyne-components/issues/1619)) ([529a266](https://github.com/sbb-design-systems/lyne-components/commit/529a26691bb78f20a77148fe000d59679541f19c))

### [0.26.5](https://github.com/sbb-design-systems/lyne-components/compare/v0.26.4...v0.26.5) (2023-02-15)

### Refactorings

- use more descriptive border radius for infinity border-radius ([#1620](https://github.com/sbb-design-systems/lyne-components/issues/1620)) ([aa503cd](https://github.com/sbb-design-systems/lyne-components/commit/aa503cdb39d865c15d4147dd3108f73001380a7d))

### [0.26.4](https://github.com/sbb-design-systems/lyne-components/compare/v0.26.3...v0.26.4) (2023-02-14)

### Bug Fixes

- **sbb-button:** support transparent picture with lqip ([#1617](https://github.com/sbb-design-systems/lyne-components/issues/1617)) ([3ddbdf7](https://github.com/sbb-design-systems/lyne-components/commit/3ddbdf773249475ca63dc8ab3557ca774f80da2c)), closes [#1546](https://github.com/sbb-design-systems/lyne-components/issues/1546)

### [0.26.3](https://github.com/sbb-design-systems/lyne-components/compare/v0.26.2...v0.26.3) (2023-02-14)

### Bug Fixes

- **timetable:** apply change requests ([#1612](https://github.com/sbb-design-systems/lyne-components/issues/1612)) ([ea7e5e5](https://github.com/sbb-design-systems/lyne-components/commit/ea7e5e533bfb16d8299b75252d6f1db05aa840a0))

### [0.26.2](https://github.com/sbb-design-systems/lyne-components/compare/v0.26.1...v0.26.2) (2023-02-13)

### Bug Fixes

- fix hydrated loading state hiding ([#1618](https://github.com/sbb-design-systems/lyne-components/issues/1618)) ([5d2b3b4](https://github.com/sbb-design-systems/lyne-components/commit/5d2b3b4e2078d2b5dc6faff751362af0ff5d1ff3))

### [0.26.1](https://github.com/sbb-design-systems/lyne-components/compare/v0.26.0...v0.26.1) (2023-02-09)

### Bug Fixes

- release ([6d93864](https://github.com/sbb-design-systems/lyne-components/commit/6d938649a3af64fc33152a07a4040a913726846e))

## [0.26.0](https://github.com/sbb-design-systems/lyne-components/compare/v0.25.15...v0.26.0) (2023-02-09)

### ⚠ BREAKING CHANGES

- **sbb-header:** - The shadow property has been removed, and the component now applies automatically the box-shadow on scroll;
  any open overlay (menu, dialog..) with trigger in the header will be automatically closed on scroll.

Co-authored-by: Davide Mininni <davide.mininni@finconsgroup.com>
Co-authored-by: Jeremias Peier <jeremias.peier@sbb.ch>

### Features

- **sbb-header:** hide on scroll behavior ([#1580](https://github.com/sbb-design-systems/lyne-components/issues/1580)) ([542204c](https://github.com/sbb-design-systems/lyne-components/commit/542204cfd3e8e617492b70510787e741d38c03ca)), closes [#1518](https://github.com/sbb-design-systems/lyne-components/issues/1518)

### [0.25.15](https://github.com/sbb-design-systems/lyne-components/compare/v0.25.14...v0.25.15) (2023-02-09)

### Bug Fixes

- **sbb-checkbox, sbb-radio-button:** fix windows high contrast styles ([#1607](https://github.com/sbb-design-systems/lyne-components/issues/1607)) ([91c27ed](https://github.com/sbb-design-systems/lyne-components/commit/91c27edcb2f610033659a4526f890c513ae455af))

### [0.25.14](https://github.com/sbb-design-systems/lyne-components/compare/v0.25.13...v0.25.14) (2023-02-09)

### Bug Fixes

- provide CSS variables to set `z-index` for overlay components ([#1606](https://github.com/sbb-design-systems/lyne-components/issues/1606)) ([803f634](https://github.com/sbb-design-systems/lyne-components/commit/803f6343d094e8cf6d4920747594a42cdce9535d))

### [0.25.13](https://github.com/sbb-design-systems/lyne-components/compare/v0.25.12...v0.25.13) (2023-02-09)

### Bug Fixes

- **sbb-header:** header action animation on hover ([#1585](https://github.com/sbb-design-systems/lyne-components/issues/1585)) ([7138127](https://github.com/sbb-design-systems/lyne-components/commit/7138127d6584b0497920c37d511e1c5f7dfc3b89))

### [0.25.12](https://github.com/sbb-design-systems/lyne-components/compare/v0.25.11...v0.25.12) (2023-02-09)

### Features

- **sbb-header:** style slotted link of sbb-logo ([#1605](https://github.com/sbb-design-systems/lyne-components/issues/1605)) ([95fd652](https://github.com/sbb-design-systems/lyne-components/commit/95fd652f4931e7c295b979a06f07e68118ac33dd))

### [0.25.11](https://github.com/sbb-design-systems/lyne-components/compare/v0.25.10...v0.25.11) (2023-02-08)

### Bug Fixes

- **sbb-checkbox:** sync indeterminate state to native input ([#1604](https://github.com/sbb-design-systems/lyne-components/issues/1604)) ([34d7024](https://github.com/sbb-design-systems/lyne-components/commit/34d7024f739a7aa216d8ad2c13a946d2604dc69d))

### [0.25.10](https://github.com/sbb-design-systems/lyne-components/compare/v0.25.9...v0.25.10) (2023-02-08)

### Refactorings

- **sbb-button:** use data attribute instead of classes ([#1600](https://github.com/sbb-design-systems/lyne-components/issues/1600)) ([f78a838](https://github.com/sbb-design-systems/lyne-components/commit/f78a838b16f767d4ddf432aa6b7b0751cf96047b))

### [0.25.9](https://github.com/sbb-design-systems/lyne-components/compare/v0.25.8...v0.25.9) (2023-02-08)

### Documentation

- expose input event in storybook ([#1603](https://github.com/sbb-design-systems/lyne-components/issues/1603)) ([63aafb0](https://github.com/sbb-design-systems/lyne-components/commit/63aafb0a2cbe8109a6194c3645f0560c065129f3))

### [0.25.8](https://github.com/sbb-design-systems/lyne-components/compare/v0.25.7...v0.25.8) (2023-02-08)

### Refactorings

- improve overlay components styles and state handling ([#1574](https://github.com/sbb-design-systems/lyne-components/issues/1574)) ([e48cc73](https://github.com/sbb-design-systems/lyne-components/commit/e48cc738cee624a92450d7578d50a29f0e064c20))

### [0.25.7](https://github.com/sbb-design-systems/lyne-components/compare/v0.25.6...v0.25.7) (2023-02-08)

### Bug Fixes

- **sbb-teaser:** add outline for windows high contrast mode ([#1599](https://github.com/sbb-design-systems/lyne-components/issues/1599)) ([e11d303](https://github.com/sbb-design-systems/lyne-components/commit/e11d303310308822da1cd224531f889f9068e609))

### [0.25.6](https://github.com/sbb-design-systems/lyne-components/compare/v0.25.5...v0.25.6) (2023-02-07)

### Bug Fixes

- fix focus forwarding in Safari ([#1601](https://github.com/sbb-design-systems/lyne-components/issues/1601)) ([5679d0a](https://github.com/sbb-design-systems/lyne-components/commit/5679d0a58461f739b38108ec5e7805fa79e63a63))

### [0.25.5](https://github.com/sbb-design-systems/lyne-components/compare/v0.25.4...v0.25.5) (2023-02-07)

### Bug Fixes

- **sbb-teaser-hero:** add min-height to reserve space if there is no image loaded ([#1598](https://github.com/sbb-design-systems/lyne-components/issues/1598)) ([6fd129d](https://github.com/sbb-design-systems/lyne-components/commit/6fd129dd04dc427d207461759307101912651887))

### [0.25.4](https://github.com/sbb-design-systems/lyne-components/compare/v0.25.3...v0.25.4) (2023-02-07)

### Refactorings

- **sbb-toggle:** optimize event handling ([#1591](https://github.com/sbb-design-systems/lyne-components/issues/1591)) ([78cb167](https://github.com/sbb-design-systems/lyne-components/commit/78cb167c37d5cc236b3e207e1d4d49f74ca576e6))

### [0.25.3](https://github.com/sbb-design-systems/lyne-components/compare/v0.25.2...v0.25.3) (2023-02-07)

### Bug Fixes

- **sbb-footer, sbb-header:** display divider to content on windows high contrast mode ([#1597](https://github.com/sbb-design-systems/lyne-components/issues/1597)) ([dd87a6c](https://github.com/sbb-design-systems/lyne-components/commit/dd87a6c5284d8dabb126a19a0e07115f19c91658))

### [0.25.2](https://github.com/sbb-design-systems/lyne-components/compare/v0.25.1...v0.25.2) (2023-02-03)

### Bug Fixes

- integrity ([#1590](https://github.com/sbb-design-systems/lyne-components/issues/1590)) ([cf05949](https://github.com/sbb-design-systems/lyne-components/commit/cf05949b4a14a71ca73c70795b9b54c54232eb46))

### [0.25.1](https://github.com/sbb-design-systems/lyne-components/compare/v0.25.0...v0.25.1) (2023-02-02)

### Bug Fixes

- **sbb-card:** fix main slot not being rendered and animation on windows ([#1588](https://github.com/sbb-design-systems/lyne-components/issues/1588)) ([a4597d1](https://github.com/sbb-design-systems/lyne-components/commit/a4597d1464c0e7a853d143324a3bc7e1edaab082))

## [0.25.0](https://github.com/sbb-design-systems/lyne-components/compare/v0.24.2...v0.25.0) (2023-01-31)

### ⚠ BREAKING CHANGES

- **sbb-card:** - The `negative` property was replaced by the new color property.
  To migrate you should replace `negative` with `color="milk"`.
  This change had to be done as the negative property is not correct in this context.

* The components `sbb-card-product`, `sbb-timetable`, `sbb-timetable-button`,
  `sbb-timetable-cus-him` and `sbb-timetable-transportation-walk` were removed.

### Refactorings

- **sbb-card:** refactor structure ([#1562](https://github.com/sbb-design-systems/lyne-components/issues/1562)) ([98c2d73](https://github.com/sbb-design-systems/lyne-components/commit/98c2d73f12d341783691cb4f1488ed95697af843))

### [0.24.2](https://github.com/sbb-design-systems/lyne-components/compare/v0.24.1...v0.24.2) (2023-01-31)

### Bug Fixes

- **sbb-pearl-chain-vertical:** fix disabling animation ([#1586](https://github.com/sbb-design-systems/lyne-components/issues/1586)) ([78aebd4](https://github.com/sbb-design-systems/lyne-components/commit/78aebd4823b5cc66656e53f746b372d112387b49))

### [0.24.1](https://github.com/sbb-design-systems/lyne-components/compare/v0.24.0...v0.24.1) (2023-01-31)

### Features

- **sbb-clock:** component refactoring ([#1567](https://github.com/sbb-design-systems/lyne-components/issues/1567)) ([8932688](https://github.com/sbb-design-systems/lyne-components/commit/89326888517eadab39835b40bc27756b25f3ed85))

## [0.24.0](https://github.com/sbb-design-systems/lyne-components/compare/v0.23.19...v0.24.0) (2023-01-31)

### ⚠ BREAKING CHANGES

- **typography:** Renamed CSS class `sbb-text-bold` to `sbb-text--bold` to match BEM naming.

### Bug Fixes

- **typography:** fix name of `sbb-text--bold` CSS class ([#1583](https://github.com/sbb-design-systems/lyne-components/issues/1583)) ([b0fb6fa](https://github.com/sbb-design-systems/lyne-components/commit/b0fb6fa3332579857cfb25fc8d54c24c7f5e3570))

### [0.23.19](https://github.com/sbb-design-systems/lyne-components/compare/v0.23.18...v0.23.19) (2023-01-31)

### Bug Fixes

- **layout:** ensure 100% width of page-spacing ([#1582](https://github.com/sbb-design-systems/lyne-components/issues/1582)) ([ac131dc](https://github.com/sbb-design-systems/lyne-components/commit/ac131dc57dfa0bea7fe9aad138243c4655c4e166))

### [0.23.18](https://github.com/sbb-design-systems/lyne-components/compare/v0.23.17...v0.23.18) (2023-01-31)

### Documentation

- **sbb-time-input:** use sbb-button instead of native button ([#1584](https://github.com/sbb-design-systems/lyne-components/issues/1584)) ([9baff36](https://github.com/sbb-design-systems/lyne-components/commit/9baff36bc0bd791730a9d52dbad007f54a48b08a))

### [0.23.17](https://github.com/sbb-design-systems/lyne-components/compare/v0.23.16...v0.23.17) (2023-01-31)

### Refactorings

- remove SASS mixin `stretch` ([#1581](https://github.com/sbb-design-systems/lyne-components/issues/1581)) ([de66409](https://github.com/sbb-design-systems/lyne-components/commit/de6640927515f2614d108d2aba78dee65a884733))

### [0.23.16](https://github.com/sbb-design-systems/lyne-components/compare/v0.23.15...v0.23.16) (2023-01-30)

### Bug Fixes

- **sbb-navigation-section:** place button always in new row ([#1577](https://github.com/sbb-design-systems/lyne-components/issues/1577)) ([4d4d900](https://github.com/sbb-design-systems/lyne-components/commit/4d4d90093888faf2a55ada9c72fab12bc34c2b31))

### [0.23.15](https://github.com/sbb-design-systems/lyne-components/compare/v0.23.14...v0.23.15) (2023-01-30)

### Features

- **sbb-group:** initial implementation ([#1571](https://github.com/sbb-design-systems/lyne-components/issues/1571)) ([bbbad60](https://github.com/sbb-design-systems/lyne-components/commit/bbbad60d96eb49c264f229e17b2020db9f44cbd5))

### [0.23.14](https://github.com/sbb-design-systems/lyne-components/compare/v0.23.13...v0.23.14) (2023-01-30)

### Bug Fixes

- **sbb-journey-summary:** remove unnecessary commas ([#1579](https://github.com/sbb-design-systems/lyne-components/issues/1579)) ([00521a3](https://github.com/sbb-design-systems/lyne-components/commit/00521a387312d79088c76e2b4da9d877b39fb1e0))

### [0.23.13](https://github.com/sbb-design-systems/lyne-components/compare/v0.23.12...v0.23.13) (2023-01-30)

### Bug Fixes

- prevent redefining css in all components ([#1576](https://github.com/sbb-design-systems/lyne-components/issues/1576)) ([5f83130](https://github.com/sbb-design-systems/lyne-components/commit/5f83130de71a13a4f6c74289c2323adc33b3a89c))

### [0.23.12](https://github.com/sbb-design-systems/lyne-components/compare/v0.23.11...v0.23.12) (2023-01-27)

### Bug Fixes

- **sbb-timetable:** remove unwanted notices ([#1573](https://github.com/sbb-design-systems/lyne-components/issues/1573)) ([1383904](https://github.com/sbb-design-systems/lyne-components/commit/1383904f7caa8a18a5ed04b0abd613e7d6582641))

### [0.23.11](https://github.com/sbb-design-systems/lyne-components/compare/v0.23.10...v0.23.11) (2023-01-26)

### Features

- **sbb-navigation:** handle `active` attr change on navigation actions ([#1566](https://github.com/sbb-design-systems/lyne-components/issues/1566)) ([52dcb5f](https://github.com/sbb-design-systems/lyne-components/commit/52dcb5f80f3e05c022f64245bce6593515b7aacf))

### [0.23.10](https://github.com/sbb-design-systems/lyne-components/compare/v0.23.9...v0.23.10) (2023-01-25)

### Bug Fixes

- **sbb-journey-summary:** minor fixes ([#1565](https://github.com/sbb-design-systems/lyne-components/issues/1565)) ([75cd274](https://github.com/sbb-design-systems/lyne-components/commit/75cd2740c6673e160573b5c1e5503738841843c8))

### [0.23.9](https://github.com/sbb-design-systems/lyne-components/compare/v0.23.8...v0.23.9) (2023-01-24)

### Features

- **sbb-time-input:** add sbb-time-input component ([#1527](https://github.com/sbb-design-systems/lyne-components/issues/1527)) ([1f1b1ff](https://github.com/sbb-design-systems/lyne-components/commit/1f1b1ff4d4300a9e9d0c40da6d1f378112a85765))

### [0.23.8](https://github.com/sbb-design-systems/lyne-components/compare/v0.23.7...v0.23.8) (2023-01-24)

### Bug Fixes

- **sbb-footer:** align clock to right on wide and ultra breakpoints ([#1561](https://github.com/sbb-design-systems/lyne-components/issues/1561)) ([ac04bf8](https://github.com/sbb-design-systems/lyne-components/commit/ac04bf8eeee2d8066276b88b73de871a4c9a1746))

### [0.23.7](https://github.com/sbb-design-systems/lyne-components/compare/v0.23.6...v0.23.7) (2023-01-23)

### Bug Fixes

- **sbb-dialog:** avoid unwanted scroll on mobile ([#1558](https://github.com/sbb-design-systems/lyne-components/issues/1558)) ([757cb2d](https://github.com/sbb-design-systems/lyne-components/commit/757cb2d0b13de1610684a6be24029ba957d227c3))

### [0.23.6](https://github.com/sbb-design-systems/lyne-components/compare/v0.23.5...v0.23.6) (2023-01-23)

### Refactorings

- prefer CSS variables to tokens ([#1556](https://github.com/sbb-design-systems/lyne-components/issues/1556)) ([f0c07c9](https://github.com/sbb-design-systems/lyne-components/commit/f0c07c90e2dc4a53f22b4275c3af88a58247a190))

### [0.23.5](https://github.com/sbb-design-systems/lyne-components/compare/v0.23.4...v0.23.5) (2023-01-23)

### Bug Fixes

- **sbb-toggle, sbb-checkbox:** add missing click handlers ([#1555](https://github.com/sbb-design-systems/lyne-components/issues/1555)) ([8203dd0](https://github.com/sbb-design-systems/lyne-components/commit/8203dd0d4aff8b21029c3458c09a202ee3bf7963))

### [0.23.4](https://github.com/sbb-design-systems/lyne-components/compare/v0.23.3...v0.23.4) (2023-01-23)

### [0.23.3](https://github.com/sbb-design-systems/lyne-components/compare/v0.23.2...v0.23.3) (2023-01-23)

### Refactorings

- reduce amount of media queries for variables ([#1557](https://github.com/sbb-design-systems/lyne-components/issues/1557)) ([f7e8f6c](https://github.com/sbb-design-systems/lyne-components/commit/f7e8f6c6be7a42a0ba37695e88f0013e3ba6bfe9))
- **sbb-tooltip:** optimize positioning and add `hideCloseButton` prop ([#1553](https://github.com/sbb-design-systems/lyne-components/issues/1553)) ([b8d33ea](https://github.com/sbb-design-systems/lyne-components/commit/b8d33ea2d5d2954df371b0779e547bfdb330e2da))

### [0.23.2](https://github.com/sbb-design-systems/lyne-components/compare/v0.23.1...v0.23.2) (2023-01-23)

### Bug Fixes

- **sbb-toggle:** fix tests ([616069f](https://github.com/sbb-design-systems/lyne-components/commit/616069fe8b4b9e9d99cc44e3477d91e759d593b4))

### Refactorings

- **sbb-toggle:** remove obsolete tabindex ([ccf7430](https://github.com/sbb-design-systems/lyne-components/commit/ccf74304f7e16b964c5e25f0728de5e5a7f8148c))

### [0.23.1](https://github.com/sbb-design-systems/lyne-components/compare/v0.23.0...v0.23.1) (2023-01-23)

### Bug Fixes

- **sbb-dialog:** stabilize dialog content position ([#1554](https://github.com/sbb-design-systems/lyne-components/issues/1554)) ([5c51fe9](https://github.com/sbb-design-systems/lyne-components/commit/5c51fe9d37e0e5af39f87cfdcddd59096fc6e0d1))
- **sbb-title:** fix scroll spacing if an id is set ([#1552](https://github.com/sbb-design-systems/lyne-components/issues/1552)) ([9add9a0](https://github.com/sbb-design-systems/lyne-components/commit/9add9a09203bba101e57348ef7202600f6aa66ee))

### Refactorings

- **sbb-teaser:** use title interface for title level ([#1550](https://github.com/sbb-design-systems/lyne-components/issues/1550)) ([bc6cd28](https://github.com/sbb-design-systems/lyne-components/commit/bc6cd28960261c18e4c73170729f3b8249fa232a))

## [0.23.0](https://github.com/sbb-design-systems/lyne-components/compare/v0.22.6...v0.23.0) (2023-01-23)

### ⚠ BREAKING CHANGES

- **sbb-journey-header:** - 'appearance' prop has been removed;

* 'isRoundTrip' prop has been renamed to 'roundTrip';
* 'markup' prop has been renamed to 'level' and values has been changed;
* 'negative' prop has been added;
* 'size' has now 'm' and 'l' as values instead then '5' and '4'.

### Features

- **sbb-journey-header:** component refactoring ([#1539](https://github.com/sbb-design-systems/lyne-components/issues/1539)) ([be4082f](https://github.com/sbb-design-systems/lyne-components/commit/be4082f22c4ca59194a333419ed8161e8599f6e2))

### [0.22.6](https://github.com/sbb-design-systems/lyne-components/compare/v0.22.5...v0.22.6) (2023-01-23)

### Bug Fixes

- **layout:** use xxs token for expanded page spacing ([#1551](https://github.com/sbb-design-systems/lyne-components/issues/1551)) ([3a80943](https://github.com/sbb-design-systems/lyne-components/commit/3a809437778cc00696a6efd1fb72decbfbb49d46))

### [0.22.5](https://github.com/sbb-design-systems/lyne-components/compare/v0.22.4...v0.22.5) (2023-01-23)

### Features

- **sbb-tooltip:** add sbb-tooltip-trigger ([#1528](https://github.com/sbb-design-systems/lyne-components/issues/1528)) ([758ac49](https://github.com/sbb-design-systems/lyne-components/commit/758ac490425feca88e6221cd26fd3dbcfa1e3d75))

### [0.22.4](https://github.com/sbb-design-systems/lyne-components/compare/v0.22.3...v0.22.4) (2023-01-19)

### Features

- dynamically react to language change ([#1545](https://github.com/sbb-design-systems/lyne-components/issues/1545)) ([ec67be2](https://github.com/sbb-design-systems/lyne-components/commit/ec67be2b88d4a997f0cce0fa6122367786b0e12c))

### [0.22.3](https://github.com/sbb-design-systems/lyne-components/compare/v0.22.2...v0.22.3) (2023-01-19)

### Refactorings

- **sbb-teaser:** remove obsolete calc in css ([c638ad4](https://github.com/sbb-design-systems/lyne-components/commit/c638ad4679a7fc6c9276da573ccd8f8792a4bab3))

### [0.22.2](https://github.com/sbb-design-systems/lyne-components/compare/v0.22.1...v0.22.2) (2023-01-18)

### Bug Fixes

- **sbb-card-badge:** fix height for negative variant ([#1543](https://github.com/sbb-design-systems/lyne-components/issues/1543)) ([1031dcc](https://github.com/sbb-design-systems/lyne-components/commit/1031dcc6fef4175dfe3b90ad020e43482cd0642a))

### [0.22.1](https://github.com/sbb-design-systems/lyne-components/compare/v0.22.0...v0.22.1) (2023-01-18)

### Bug Fixes

- **sbb-teaser:** fix hover state ([#1541](https://github.com/sbb-design-systems/lyne-components/issues/1541)) ([4c3b977](https://github.com/sbb-design-systems/lyne-components/commit/4c3b977b4db5a7545f2fe39f1ff2da9de569b039))
- **sbb-timetable-row:** fix notices issue ([#1542](https://github.com/sbb-design-systems/lyne-components/issues/1542)) ([eddfa3b](https://github.com/sbb-design-systems/lyne-components/commit/eddfa3b77b68d0a991d6878ad80239e8ac43b143))

## [0.22.0](https://github.com/sbb-design-systems/lyne-components/compare/v0.21.1...v0.22.0) (2023-01-18)

### ⚠ BREAKING CHANGES

- **layout:** - `sbb-grid`, `sbb-section` and `sbb-stack` were removed. `sbb-stack` and `sbb-section` can easily be replaced by css flex or grid on consumer side. As replacement of the `sbb-grid` component there is now a css class and sass mixin. Additionally css classes and mixins for page-spacing were introduced.

* Renamed `wide` property of `sbb-header` and `sbb-footer` to `expanded`.

### Refactorings

- **layout:** provide grid CSS classes and SCSS mixin and remove layout components ([#1526](https://github.com/sbb-design-systems/lyne-components/issues/1526)) ([4bf6404](https://github.com/sbb-design-systems/lyne-components/commit/4bf640442519be0c98be226d31c170c564ffdf3c))

### [0.21.1](https://github.com/sbb-design-systems/lyne-components/compare/v0.21.0...v0.21.1) (2023-01-18)

### Features

- **sbb-navigation:** handle scrolling behaviour on navigation open ([#1537](https://github.com/sbb-design-systems/lyne-components/issues/1537)) ([0f48761](https://github.com/sbb-design-systems/lyne-components/commit/0f48761bd37c5c77e4f14e84bd47de0fc843c9a8))

## [0.21.0](https://github.com/sbb-design-systems/lyne-components/compare/v0.20.21...v0.21.0) (2023-01-18)

### ⚠ BREAKING CHANGES

- **sbb-toggle-check:** Rename property `icon` to `icon-name` to be consistent with all other components.

### Refactorings

- **sbb-toggle-check:** introduce new design ([#1534](https://github.com/sbb-design-systems/lyne-components/issues/1534)) ([50d389b](https://github.com/sbb-design-systems/lyne-components/commit/50d389b2812ae42a91fdbe8d23c4fa0391c97d26))

### [0.20.21](https://github.com/sbb-design-systems/lyne-components/compare/v0.20.20...v0.20.21) (2023-01-16)

### Bug Fixes

- clean correct file for container images ([d8ac165](https://github.com/sbb-design-systems/lyne-components/commit/d8ac16503b8aba25f8b79508cd4a36b16b083235))

### [0.20.20](https://github.com/sbb-design-systems/lyne-components/compare/v0.20.19...v0.20.20) (2023-01-16)

### Bug Fixes

- container permission ([b5e8891](https://github.com/sbb-design-systems/lyne-components/commit/b5e889159f4aa605af79d351b97d4928f483f4ba))

### [0.20.19](https://github.com/sbb-design-systems/lyne-components/compare/v0.20.18...v0.20.19) (2023-01-12)

### Bug Fixes

- use correct version for artifacts ([5826331](https://github.com/sbb-design-systems/lyne-components/commit/5826331bed182f73bda71958ff63c0fad208098f))

### [0.20.18](https://github.com/sbb-design-systems/lyne-components/compare/v0.20.17...v0.20.18) (2023-01-12)

### Bug Fixes

- fix timetable interfaces ([#1533](https://github.com/sbb-design-systems/lyne-components/issues/1533)) ([061e2a3](https://github.com/sbb-design-systems/lyne-components/commit/061e2a33a5f2ee5311208eda8ec01769a8078524))

### [0.20.17](https://github.com/sbb-design-systems/lyne-components/compare/v0.20.16...v0.20.17) (2023-01-12)

### Bug Fixes

- boolean properties handling ([#1531](https://github.com/sbb-design-systems/lyne-components/issues/1531)) ([2eee3b9](https://github.com/sbb-design-systems/lyne-components/commit/2eee3b99ab02d59bebb738b02329c51f3a0d0c07))

### [0.20.16](https://github.com/sbb-design-systems/lyne-components/compare/v0.20.15...v0.20.16) (2023-01-10)

### Bug Fixes

- **sbb-card:** fix active style for badge ([#1530](https://github.com/sbb-design-systems/lyne-components/issues/1530)) ([afd8c2b](https://github.com/sbb-design-systems/lyne-components/commit/afd8c2ba65f6f12f19dca6ba27a029cac2efd910))

### [0.20.15](https://github.com/sbb-design-systems/lyne-components/compare/v0.20.14...v0.20.15) (2023-01-10)

### Features

- **sbb-toggle:** introduce toggle component ([#1481](https://github.com/sbb-design-systems/lyne-components/issues/1481)) ([8cfc53b](https://github.com/sbb-design-systems/lyne-components/commit/8cfc53b8d27190dcdbf744381961cefd5f2303b1))

### [0.20.14](https://github.com/sbb-design-systems/lyne-components/compare/v0.20.13...v0.20.14) (2023-01-06)

### Features

- **typography:** add sbb-description-list ([#1524](https://github.com/sbb-design-systems/lyne-components/issues/1524)) ([9ef06ed](https://github.com/sbb-design-systems/lyne-components/commit/9ef06ed5dccb60bae46eb3d1ae966d14d07f6cd7))

### [0.20.13](https://github.com/sbb-design-systems/lyne-components/compare/v0.20.12...v0.20.13) (2023-01-05)

### Bug Fixes

- **sbb-title:** fix spacing between sbb-title and paragraph ([#1522](https://github.com/sbb-design-systems/lyne-components/issues/1522)) ([bb0bd68](https://github.com/sbb-design-systems/lyne-components/commit/bb0bd68929f1ff0c4b5374a99d998d5eed2a321b))

### [0.20.12](https://github.com/sbb-design-systems/lyne-components/compare/v0.20.11...v0.20.12) (2023-01-05)

### Features

- **typography:** expose legend style as css class ([#1521](https://github.com/sbb-design-systems/lyne-components/issues/1521)) ([1d1a26f](https://github.com/sbb-design-systems/lyne-components/commit/1d1a26f06b4433ad53f202655114304d4fa71f10))

### [0.20.11](https://github.com/sbb-design-systems/lyne-components/compare/v0.20.10...v0.20.11) (2023-01-04)

### Bug Fixes

- **sbb-tag:** fix styles ([#1516](https://github.com/sbb-design-systems/lyne-components/issues/1516)) ([83c9b86](https://github.com/sbb-design-systems/lyne-components/commit/83c9b86cea1fe171053b6ee18d30d245a8382155))

### [0.20.10](https://github.com/sbb-design-systems/lyne-components/compare/v0.20.9...v0.20.10) (2023-01-04)

### Features

- **sbb-header, sbb-footer:** introduce wide / full width variant ([#1508](https://github.com/sbb-design-systems/lyne-components/issues/1508)) ([6911ea9](https://github.com/sbb-design-systems/lyne-components/commit/6911ea9d9c4e3865cf1318879388f45ee05df8ce)), closes [#1500](https://github.com/sbb-design-systems/lyne-components/issues/1500)

### [0.20.9](https://github.com/sbb-design-systems/lyne-components/compare/v0.20.8...v0.20.9) (2023-01-04)

### Bug Fixes

- **sbb-teaser:** fix focus visible border-radius ([#1519](https://github.com/sbb-design-systems/lyne-components/issues/1519)) ([5b3f9a9](https://github.com/sbb-design-systems/lyne-components/commit/5b3f9a9ff89d09042a9da8cf01b30d41d12dd58d))

### [0.20.8](https://github.com/sbb-design-systems/lyne-components/compare/v0.20.7...v0.20.8) (2023-01-04)

### Bug Fixes

- **sbb-pearl-chain-vertical:** fix possibility to disable animation ([#1520](https://github.com/sbb-design-systems/lyne-components/issues/1520)) ([565248c](https://github.com/sbb-design-systems/lyne-components/commit/565248cdf24ac025ca21c39bd0a4831e1e567314))

### [0.20.7](https://github.com/sbb-design-systems/lyne-components/compare/v0.20.6...v0.20.7) (2023-01-03)

### Bug Fixes

- **sbb-timetable-row:** enhance icon mapping ([#1517](https://github.com/sbb-design-systems/lyne-components/issues/1517)) ([bafb4b6](https://github.com/sbb-design-systems/lyne-components/commit/bafb4b6de067abed6c37b550f72dda76981cad79))

### [0.20.6](https://github.com/sbb-design-systems/lyne-components/compare/v0.20.5...v0.20.6) (2023-01-03)

### Bug Fixes

- enhance timezone helper ([#1515](https://github.com/sbb-design-systems/lyne-components/issues/1515)) ([c59f18e](https://github.com/sbb-design-systems/lyne-components/commit/c59f18e886b361819441c9966de97e1f5f2493d6))

### [0.20.5](https://github.com/sbb-design-systems/lyne-components/compare/v0.20.4...v0.20.5) (2022-12-23)

### Features

- **sbb-navigation:** introduce navigation component ([#1480](https://github.com/sbb-design-systems/lyne-components/issues/1480)) ([953d0f4](https://github.com/sbb-design-systems/lyne-components/commit/953d0f43ca51394471fffc1cbdd9336c786bb9c2))

### [0.20.4](https://github.com/sbb-design-systems/lyne-components/compare/v0.20.3...v0.20.4) (2022-12-22)

### Bug Fixes

- **sbb-timetable-row:** improve notices ([#1513](https://github.com/sbb-design-systems/lyne-components/issues/1513)) ([666aa54](https://github.com/sbb-design-systems/lyne-components/commit/666aa54c4521c1e3004d77a128830f21b87da426))

### [0.20.3](https://github.com/sbb-design-systems/lyne-components/compare/v0.20.2...v0.20.3) (2022-12-22)

### Features

- **sbb-tag:** initial implementation ([#1494](https://github.com/sbb-design-systems/lyne-components/issues/1494)) ([cad9b0a](https://github.com/sbb-design-systems/lyne-components/commit/cad9b0a7f6007b90b2ae1894c0ea2d7676bb0d53)), closes [#1467](https://github.com/sbb-design-systems/lyne-components/issues/1467)

### [0.20.2](https://github.com/sbb-design-systems/lyne-components/compare/v0.20.1...v0.20.2) (2022-12-22)

### Features

- add link, legend, sub and sup mixins ([#1506](https://github.com/sbb-design-systems/lyne-components/issues/1506)) ([e9e92a1](https://github.com/sbb-design-systems/lyne-components/commit/e9e92a1d6dcb01240c6eaaebfe889e89ea670664)), closes [#1505](https://github.com/sbb-design-systems/lyne-components/issues/1505)

### Bug Fixes

- **sbb-train-formation:** minor fixes ([#1512](https://github.com/sbb-design-systems/lyne-components/issues/1512)) ([041b3c6](https://github.com/sbb-design-systems/lyne-components/commit/041b3c63ac577f064493e2e21c2de9979e96a3e1))

### [0.20.1](https://github.com/sbb-design-systems/lyne-components/compare/v0.20.0...v0.20.1) (2022-12-21)

### Bug Fixes

- **sbb-button:** fix active state and secondary colors ([#1507](https://github.com/sbb-design-systems/lyne-components/issues/1507)) ([80a5c7f](https://github.com/sbb-design-systems/lyne-components/commit/80a5c7f909dd12814fc3fc8845d053ac2a882c92)), closes [#1499](https://github.com/sbb-design-systems/lyne-components/issues/1499)

## [0.20.0](https://github.com/sbb-design-systems/lyne-components/compare/v0.19.7...v0.20.0) (2022-12-20)

### ⚠ BREAKING CHANGES

- Title mixins and <sbb-title>-component now have a default margin block to meet design specs. In the mixin you can opt out by passing the flag $exclude-spacing with true (e.g. @include text-1($exclude-spacing: true)).
  In the sbb-title component you can just set any margin from outside on the <sbb-title> itself, e.g. <sbb-title style='margin:0'>.

### Features

- add default title margins ([#1476](https://github.com/sbb-design-systems/lyne-components/issues/1476)) ([78cb161](https://github.com/sbb-design-systems/lyne-components/commit/78cb1618cd63711c1c7979e334de62df63e2e785))

### [0.19.7](https://github.com/sbb-design-systems/lyne-components/compare/v0.19.6...v0.19.7) (2022-12-20)

### Bug Fixes

- **sbb-train-formation:** fix colors, icon size and translations ([#1502](https://github.com/sbb-design-systems/lyne-components/issues/1502)) ([c2a26bd](https://github.com/sbb-design-systems/lyne-components/commit/c2a26bda728e1bf7a17e73eb23eb1cf381b30f44))

### [0.19.6](https://github.com/sbb-design-systems/lyne-components/compare/v0.19.5...v0.19.6) (2022-12-20)

### Bug Fixes

- **sbb-pearl-chain:** use min-width to prevent squeezing ([#1504](https://github.com/sbb-design-systems/lyne-components/issues/1504)) ([80965d0](https://github.com/sbb-design-systems/lyne-components/commit/80965d0a4117a9db80702c944cf21281fc9aaa31))

### [0.19.5](https://github.com/sbb-design-systems/lyne-components/compare/v0.19.4...v0.19.5) (2022-12-19)

### Refactorings

- **sbb-pearl-chain:** add bullet to pearl-chain ([#1503](https://github.com/sbb-design-systems/lyne-components/issues/1503)) ([6010eca](https://github.com/sbb-design-systems/lyne-components/commit/6010eca8a0caf6825f1d4d37d2ad65a650d2f926))

### [0.19.4](https://github.com/sbb-design-systems/lyne-components/compare/v0.19.3...v0.19.4) (2022-12-19)

### Refactorings

- **sbb-timetable-row:** enhance a11y and design ([#1501](https://github.com/sbb-design-systems/lyne-components/issues/1501)) ([9a23a16](https://github.com/sbb-design-systems/lyne-components/commit/9a23a160d8db2113431e71402807451db82f7b8b))

### [0.19.3](https://github.com/sbb-design-systems/lyne-components/compare/v0.19.2...v0.19.3) (2022-12-19)

### Refactorings

- extract pearl chain bullet to mixin ([#1492](https://github.com/sbb-design-systems/lyne-components/issues/1492)) ([a22fb2a](https://github.com/sbb-design-systems/lyne-components/commit/a22fb2abd44f3d2fab8e0b6f6de03a97fa4c1fdb))

### [0.19.2](https://github.com/sbb-design-systems/lyne-components/compare/v0.19.1...v0.19.2) (2022-12-15)

### Bug Fixes

- exclude chromatic stories for documentation ([#1498](https://github.com/sbb-design-systems/lyne-components/issues/1498)) ([ee94370](https://github.com/sbb-design-systems/lyne-components/commit/ee94370a3b8c424ed2b90f7b5435155b1675ade8))

### [0.19.1](https://github.com/sbb-design-systems/lyne-components/compare/v0.19.0...v0.19.1) (2022-12-15)

### Features

- **sbb-train-formation:** initial implementation ([#1462](https://github.com/sbb-design-systems/lyne-components/issues/1462)) ([343f510](https://github.com/sbb-design-systems/lyne-components/commit/343f510d3593860fbae0aba12a90b823c8c062a6)), closes [#1428](https://github.com/sbb-design-systems/lyne-components/issues/1428)

## [0.19.0](https://github.com/sbb-design-systems/lyne-components/compare/v0.18.4...v0.19.0) (2022-12-15)

### ⚠ BREAKING CHANGES

- As it is not possible from shadow DOM to reach the light DOM by id values, we removed all id, accessibility-labelledby, accessibility-describedby and accessibility-controls properties because they were usless.

Co-authored-by: Jeremias Peier <jeremias.peier@sbb.ch>

### Bug Fixes

- remove obsolete id references ([#1493](https://github.com/sbb-design-systems/lyne-components/issues/1493)) ([f442283](https://github.com/sbb-design-systems/lyne-components/commit/f4422830a74816fe76180394dc80561403746d47))

### [0.18.4](https://github.com/sbb-design-systems/lyne-components/compare/v0.18.3...v0.18.4) (2022-12-14)

### Bug Fixes

- **sbb-timetable-row:** fix px-to-rem usage ([#1497](https://github.com/sbb-design-systems/lyne-components/issues/1497)) ([4f53b70](https://github.com/sbb-design-systems/lyne-components/commit/4f53b70e92f8cc611cc4122852f1cb704329ba2f))

### [0.18.3](https://github.com/sbb-design-systems/lyne-components/compare/v0.18.2...v0.18.3) (2022-12-14)

### Bug Fixes

- **sbb-form-field:** fix border radius for size L ([#1496](https://github.com/sbb-design-systems/lyne-components/issues/1496)) ([120c507](https://github.com/sbb-design-systems/lyne-components/commit/120c5076e1695abca07a52e1e46c5b96d3f40d70))

### [0.18.2](https://github.com/sbb-design-systems/lyne-components/compare/v0.18.1...v0.18.2) (2022-12-13)

### Bug Fixes

- **sbb-card:** stretch height to host ([#1495](https://github.com/sbb-design-systems/lyne-components/issues/1495)) ([fdb0ba8](https://github.com/sbb-design-systems/lyne-components/commit/fdb0ba86c862f3e64e7ddc77ae2d3da2406ba29d))

### [0.18.1](https://github.com/sbb-design-systems/lyne-components/compare/v0.18.0...v0.18.1) (2022-12-12)

### Bug Fixes

- arrow navigation refactoring ([#1485](https://github.com/sbb-design-systems/lyne-components/issues/1485)) ([160bd21](https://github.com/sbb-design-systems/lyne-components/commit/160bd21e716d0a6e4a61f1490c6971dc6043f95f))

## [0.18.0](https://github.com/sbb-design-systems/lyne-components/compare/v0.17.0...v0.18.0) (2022-12-12)

### ⚠ BREAKING CHANGES

- Text line-height (--sbb-typo-line-height-body-text) has changed from 1.7 to 1.75

### Bug Fixes

- change line-height from 1.7 to 1.75 ([#1484](https://github.com/sbb-design-systems/lyne-components/issues/1484)) ([1e26b15](https://github.com/sbb-design-systems/lyne-components/commit/1e26b15e940f8027fd385bd515a226c599aab51e))

## [0.17.0](https://github.com/sbb-design-systems/lyne-components/compare/v0.16.2...v0.17.0) (2022-12-08)

### ⚠ BREAKING CHANGES

- In order to standardize mixin names, all mixin names were renamed to kebab-case style.
  E.g. `ifForcedColors` became `if-forced-colors`.

### Refactorings

- rename all mixins to kebab-case notation ([#1489](https://github.com/sbb-design-systems/lyne-components/issues/1489)) ([c867749](https://github.com/sbb-design-systems/lyne-components/commit/c867749846751c85f31b06c714bdf643ea3cd91c))

### [0.16.2](https://github.com/sbb-design-systems/lyne-components/compare/v0.16.1...v0.16.2) (2022-12-07)

### Bug Fixes

- fix times for chromatic tests ([#1490](https://github.com/sbb-design-systems/lyne-components/issues/1490)) ([baf9556](https://github.com/sbb-design-systems/lyne-components/commit/baf9556483b17cb02a4bffc1b6524ee4991a360a))

### [0.16.1](https://github.com/sbb-design-systems/lyne-components/compare/v0.16.0...v0.16.1) (2022-12-07)

### Bug Fixes

- **sbb-journey-summary:** enable configuration of current date ([#1487](https://github.com/sbb-design-systems/lyne-components/issues/1487)) ([1c72cc4](https://github.com/sbb-design-systems/lyne-components/commit/1c72cc4c89973f53e82086b839d29a3bed99033d))

## [0.16.0](https://github.com/sbb-design-systems/lyne-components/compare/v0.15.9...v0.16.0) (2022-12-06)

### ⚠ BREAKING CHANGES

- Previously the sass code could be used via `@import`.
  This is no longer possible as we refactored the sass code to switch
  from `@import` to `@use` (see https://sass-lang.com/documentation/at-rules/use).
  You should now be able to use the following code to import
  our sass code: `@use '@sbb-esta/lyne-components' as sbb;`.

### Refactorings

- adapt sass to [@use](https://github.com/use) instead of [@import](https://github.com/import) ([#1482](https://github.com/sbb-design-systems/lyne-components/issues/1482)) ([219d68c](https://github.com/sbb-design-systems/lyne-components/commit/219d68c101a746a1671f9a8ff9c8dba63018f63f))

### [0.15.9](https://github.com/sbb-design-systems/lyne-components/compare/v0.15.8...v0.15.9) (2022-12-06)

### Bug Fixes

- fix timetable data ([#1474](https://github.com/sbb-design-systems/lyne-components/issues/1474)) ([5bba303](https://github.com/sbb-design-systems/lyne-components/commit/5bba3038b83dbf5e17e9bcfcce52cf417c0248d5))

### [0.15.8](https://github.com/sbb-design-systems/lyne-components/compare/v0.15.7...v0.15.8) (2022-12-05)

### Refactorings

- **sbb-link-list:** adapt to coding standards ([#1483](https://github.com/sbb-design-systems/lyne-components/issues/1483)) ([60d4826](https://github.com/sbb-design-systems/lyne-components/commit/60d48262bbb91144984868743be98965ccac7950))

### [0.15.7](https://github.com/sbb-design-systems/lyne-components/compare/v0.15.6...v0.15.7) (2022-12-01)

### Bug Fixes

- **sbb-toggle-check:** fix toggle vertical alignment ([#1461](https://github.com/sbb-design-systems/lyne-components/issues/1461)) ([e59239c](https://github.com/sbb-design-systems/lyne-components/commit/e59239c89deee8727e83cff0148097ec111ca006))

### Documentation

- **sbb-dialog:** add an example of sbb-dialog-close attribute ([#1475](https://github.com/sbb-design-systems/lyne-components/issues/1475)) ([13d7f09](https://github.com/sbb-design-systems/lyne-components/commit/13d7f09196608013ad8f04ff21278b72fb3cf84f))

### [0.15.6](https://github.com/sbb-design-systems/lyne-components/compare/v0.15.5...v0.15.6) (2022-12-01)

### Bug Fixes

- provide didChange event for react consumers ([#1472](https://github.com/sbb-design-systems/lyne-components/issues/1472)) ([de71bda](https://github.com/sbb-design-systems/lyne-components/commit/de71bdab7513359dda9d75c8bee2f52cc4132a88))

### [0.15.5](https://github.com/sbb-design-systems/lyne-components/compare/v0.15.4...v0.15.5) (2022-11-29)

### [0.15.4](https://github.com/sbb-design-systems/lyne-components/compare/v0.15.3...v0.15.4) (2022-11-29)

### Bug Fixes

- remove Firefox focus outline rule from normalize ([#1471](https://github.com/sbb-design-systems/lyne-components/issues/1471)) ([3b61a40](https://github.com/sbb-design-systems/lyne-components/commit/3b61a40923463db12edfb87509c7e7f25ad3df5f))

### Documentation

- fix snippets in readme ([#1470](https://github.com/sbb-design-systems/lyne-components/issues/1470)) ([0b62fc5](https://github.com/sbb-design-systems/lyne-components/commit/0b62fc5c33b5cfa81aa1343f064653fedbf03601))

### [0.15.3](https://github.com/sbb-design-systems/lyne-components/compare/v0.15.2...v0.15.3) (2022-11-29)

### Features

- **styles:** list styles ([#1450](https://github.com/sbb-design-systems/lyne-components/issues/1450)) ([b6b696e](https://github.com/sbb-design-systems/lyne-components/commit/b6b696e023d78ec3be6995701f2b5fea2fafb439))

### [0.15.2](https://github.com/sbb-design-systems/lyne-components/compare/v0.15.1...v0.15.2) (2022-11-28)

### Refactorings

- **sbb-form-field:** adapt coding standards ([#1468](https://github.com/sbb-design-systems/lyne-components/issues/1468)) ([26f9cd6](https://github.com/sbb-design-systems/lyne-components/commit/26f9cd6c001e09d8e3275bad2f09b3d4b23db083))

### [0.15.1](https://github.com/sbb-design-systems/lyne-components/compare/v0.15.0...v0.15.1) (2022-11-28)

### Bug Fixes

- **sbb-radio-button:** remove red dot on low resolution screens ([#1469](https://github.com/sbb-design-systems/lyne-components/issues/1469)) ([8854dc0](https://github.com/sbb-design-systems/lyne-components/commit/8854dc0c029de614ee12d5f5128d2ed31279eecc))

## [0.15.0](https://github.com/sbb-design-systems/lyne-components/compare/v0.14.5...v0.15.0) (2022-11-28)

### ⚠ BREAKING CHANGES

- Event name prefixes are removed (e.g `sbb-alert-group_did-dismiss-alert` was renamed to `did-dismiss-alert`). If it is necessary to determine which element is the event origin, check the event context (e.g. event.target).

### Features

- remove event name prefixes ([#1466](https://github.com/sbb-design-systems/lyne-components/issues/1466)) ([cdb5962](https://github.com/sbb-design-systems/lyne-components/commit/cdb59620e07582e3c6887feaecca4f30bfbcaffa))

### [0.14.5](https://github.com/sbb-design-systems/lyne-components/compare/v0.14.4...v0.14.5) (2022-11-24)

### Features

- **sbb-icon:** add pictogram namespace ([#1463](https://github.com/sbb-design-systems/lyne-components/issues/1463)) ([fcd2750](https://github.com/sbb-design-systems/lyne-components/commit/fcd275003cf57ccb4b88e0faa616ccef5732470b))

### [0.14.4](https://github.com/sbb-design-systems/lyne-components/compare/v0.14.3...v0.14.4) (2022-11-23)

### Features

- **sbb-checkbox:** component implementation ([#1294](https://github.com/sbb-design-systems/lyne-components/issues/1294)) ([3599d6e](https://github.com/sbb-design-systems/lyne-components/commit/3599d6e0d208bd085d9656b34293f6152dc73b19))

### [0.14.3](https://github.com/sbb-design-systems/lyne-components/compare/v0.14.2...v0.14.3) (2022-11-18)

### Features

- **sbb-radio-button-group:** introduce radio-button-group component ([#1431](https://github.com/sbb-design-systems/lyne-components/issues/1431)) ([3296198](https://github.com/sbb-design-systems/lyne-components/commit/32961986f0431763d8b5d029f3ad1d17b9e1bbfe))

### [0.14.2](https://github.com/sbb-design-systems/lyne-components/compare/v0.14.1...v0.14.2) (2022-11-17)

### Bug Fixes

- **sbb-timetable-row:** handle occupancy error ([#1460](https://github.com/sbb-design-systems/lyne-components/issues/1460)) ([2456430](https://github.com/sbb-design-systems/lyne-components/commit/2456430df1f656eb5ade62d417ddb6125d12b3a0))

### [0.14.1](https://github.com/sbb-design-systems/lyne-components/compare/v0.14.0...v0.14.1) (2022-11-17)

### Bug Fixes

- set color in button-reset mixin to avoid iOS blue color ([#1459](https://github.com/sbb-design-systems/lyne-components/issues/1459)) ([f868190](https://github.com/sbb-design-systems/lyne-components/commit/f8681904c25d49b1efdbc1d9f9af1d26f8e8d993))

## [0.14.0](https://github.com/sbb-design-systems/lyne-components/compare/v0.13.2...v0.14.0) (2022-11-17)

### ⚠ BREAKING CHANGES

- **sbb-signet:** - sbb-logo no longer has different color variants

* sbb-signet no longer white-on-black variant

### Refactorings

- **sbb-signet:** adapt to coding standards ([#1457](https://github.com/sbb-design-systems/lyne-components/issues/1457)) ([d9ca1a4](https://github.com/sbb-design-systems/lyne-components/commit/d9ca1a4b3499b9e9cc5dbf2f32986ba4078ddd9f))

### [0.13.2](https://github.com/sbb-design-systems/lyne-components/compare/v0.13.1...v0.13.2) (2022-11-17)

### Refactorings

- **sbb-logo:** adapt to coding standards ([#1453](https://github.com/sbb-design-systems/lyne-components/issues/1453)) ([dfb4cde](https://github.com/sbb-design-systems/lyne-components/commit/dfb4cde3c8f7afe7e319385d56500e8e9b0ee118))

### [0.13.1](https://github.com/sbb-design-systems/lyne-components/compare/v0.13.0...v0.13.1) (2022-11-16)

### Features

- **sbb-slider:** component implementation ([#1426](https://github.com/sbb-design-systems/lyne-components/issues/1426)) ([4ad9ef9](https://github.com/sbb-design-systems/lyne-components/commit/4ad9ef9ef53e17548952fccc2df566928ee2eef4))

## [0.13.0](https://github.com/sbb-design-systems/lyne-components/compare/v0.12.19...v0.13.0) (2022-11-15)

### ⚠ BREAKING CHANGES

- **sbb-menu:** \*\*
  Use `open` for opening overlays and `close` for closing overlays. The methods `present()` and `dismiss()` become `open()` and `close()`; the tooltip properties `showDelay` and `hideDelay` become `openDelay` and `closeDelay`.

### Refactorings

- **sbb-menu:** rename opening and closing methods ([#1456](https://github.com/sbb-design-systems/lyne-components/issues/1456)) ([50e7120](https://github.com/sbb-design-systems/lyne-components/commit/50e712047709cdd261be5daf760b23afd883a80c))

### [0.12.19](https://github.com/sbb-design-systems/lyne-components/compare/v0.12.18...v0.12.19) (2022-11-15)

### Bug Fixes

- **sbb-pearl-chain-vertical:** add width to columns ([#1455](https://github.com/sbb-design-systems/lyne-components/issues/1455)) ([9943ba9](https://github.com/sbb-design-systems/lyne-components/commit/9943ba9050847f2fd5f196a916b6f56ede6bb606))

### [0.12.18](https://github.com/sbb-design-systems/lyne-components/compare/v0.12.17...v0.12.18) (2022-11-14)

### Features

- **sbb-dialog:** add `sbb-dialog-close` attribute option to close the dialog ([#1454](https://github.com/sbb-design-systems/lyne-components/issues/1454)) ([92200a5](https://github.com/sbb-design-systems/lyne-components/commit/92200a500124659502541893a572c7735a40ce14))

### [0.12.17](https://github.com/sbb-design-systems/lyne-components/compare/v0.12.16...v0.12.17) (2022-11-11)

### Features

- **sbb-tooltip:** introduce sbb-tooltip component ([#1425](https://github.com/sbb-design-systems/lyne-components/issues/1425)) ([ceadf7f](https://github.com/sbb-design-systems/lyne-components/commit/ceadf7f8d63280765286c96de383f763e7681247))

### [0.12.16](https://github.com/sbb-design-systems/lyne-components/compare/v0.12.15...v0.12.16) (2022-11-09)

### Features

- **sbb-pearl-chain-vertical:** initial implementation ([#1366](https://github.com/sbb-design-systems/lyne-components/issues/1366)) ([d36a40f](https://github.com/sbb-design-systems/lyne-components/commit/d36a40fdb0ff2d8aedd349a116fbf71dc8b001e7))

### [0.12.15](https://github.com/sbb-design-systems/lyne-components/compare/v0.12.14...v0.12.15) (2022-11-08)

### Refactorings

- use pearl-chain-time in journey-summary ([#1446](https://github.com/sbb-design-systems/lyne-components/issues/1446)) ([680d514](https://github.com/sbb-design-systems/lyne-components/commit/680d5140710e19474c7c64bd2929e821d71ab650))

### [0.12.14](https://github.com/sbb-design-systems/lyne-components/compare/v0.12.13...v0.12.14) (2022-11-08)

### Features

- **sbb-dialog:** introduce sbb-dialog component ([#1413](https://github.com/sbb-design-systems/lyne-components/issues/1413)) ([3cce10e](https://github.com/sbb-design-systems/lyne-components/commit/3cce10ed35e49193057fce49af5a628a43af12d9))

### [0.12.13](https://github.com/sbb-design-systems/lyne-components/compare/v0.12.12...v0.12.13) (2022-11-07)

### Refactorings

- **sbb-menu:** adapt styles to guidelines ([#1447](https://github.com/sbb-design-systems/lyne-components/issues/1447)) ([07cd7ef](https://github.com/sbb-design-systems/lyne-components/commit/07cd7ef95d5707e18aa7a3586ea2493b73090ae6))

### [0.12.12](https://github.com/sbb-design-systems/lyne-components/compare/v0.12.11...v0.12.12) (2022-11-04)

### Refactorings

- **sbb-menu:** improve menu events and positioning ([#1430](https://github.com/sbb-design-systems/lyne-components/issues/1430)) ([0a12ef6](https://github.com/sbb-design-systems/lyne-components/commit/0a12ef6040ae36b191f7e026060748e9027825a7))

### [0.12.11](https://github.com/sbb-design-systems/lyne-components/compare/v0.12.10...v0.12.11) (2022-11-03)

### Refactorings

- **sbb-divider:** move styles to inner element ([#1445](https://github.com/sbb-design-systems/lyne-components/issues/1445)) ([fb07d68](https://github.com/sbb-design-systems/lyne-components/commit/fb07d68183bbac7f9041ecde8581295dcf385022))

### [0.12.10](https://github.com/sbb-design-systems/lyne-components/compare/v0.12.9...v0.12.10) (2022-11-03)

### Bug Fixes

- wait for ready for storybook interactions ([#1443](https://github.com/sbb-design-systems/lyne-components/issues/1443)) ([36c7979](https://github.com/sbb-design-systems/lyne-components/commit/36c79790501ae807f5ac76b21f9772628f65f0a7))

### [0.12.9](https://github.com/sbb-design-systems/lyne-components/compare/v0.12.8...v0.12.9) (2022-11-03)

### Bug Fixes

- typescript error ([#1444](https://github.com/sbb-design-systems/lyne-components/issues/1444)) ([46226fc](https://github.com/sbb-design-systems/lyne-components/commit/46226fcb82e497c62183b627517ae16a8820e70b))

### [0.12.8](https://github.com/sbb-design-systems/lyne-components/compare/v0.12.7...v0.12.8) (2022-11-01)

### Refactorings

- interface and markup trip ([#1440](https://github.com/sbb-design-systems/lyne-components/issues/1440)) ([a514787](https://github.com/sbb-design-systems/lyne-components/commit/a51478732043130a27165288e3ddc008fa4b98a1))

### [0.12.7](https://github.com/sbb-design-systems/lyne-components/compare/v0.12.6...v0.12.7) (2022-11-01)

### Features

- **sbb-journey-summary:** initial implementation ([#1359](https://github.com/sbb-design-systems/lyne-components/issues/1359)) ([138d1b2](https://github.com/sbb-design-systems/lyne-components/commit/138d1b241b00e4a424473bd3de8e372e5b6c9c01))

### [0.12.6](https://github.com/sbb-design-systems/lyne-components/compare/v0.12.5...v0.12.6) (2022-11-01)

### Bug Fixes

- fix layout offset for micro size ([#1441](https://github.com/sbb-design-systems/lyne-components/issues/1441)) ([a5aeebb](https://github.com/sbb-design-systems/lyne-components/commit/a5aeebbf294a7972f5f1e0ade5090794c5a5aaae))

### [0.12.5](https://github.com/sbb-design-systems/lyne-components/compare/v0.12.4...v0.12.5) (2022-10-31)

### Features

- enhance timetable-row and pearl-chain ([5479769](https://github.com/sbb-design-systems/lyne-components/commit/5479769f544e0fb3e58f1818c54da66bda7e4040))

### Bug Fixes

- add app permission for release ([5fee7fa](https://github.com/sbb-design-systems/lyne-components/commit/5fee7fa7fddd9797ac95bda15352bc02d4f4aef3))
- use correct output for release ([19cf257](https://github.com/sbb-design-systems/lyne-components/commit/19cf25735e9910bd4a27bce39a3b577eed8c8c3c))

### Refactorings

- **sbb-header:** various improvements ([#1439](https://github.com/sbb-design-systems/lyne-components/issues/1439)) ([53eaa30](https://github.com/sbb-design-systems/lyne-components/commit/53eaa30e72a3b173cdd8d1beb2372122e5839c5b))

### [0.12.4](https://github.com/sbb-design-systems/lyne-components/compare/v0.12.3...v0.12.4) (2022-10-28)

### [0.12.3](https://github.com/sbb-design-systems/lyne-components/compare/v0.12.2...v0.12.3) (2022-10-28)

### Bug Fixes

- **sbb-clock:** avoid using unset properties ([#1438](https://github.com/sbb-design-systems/lyne-components/issues/1438)) ([6ef7e18](https://github.com/sbb-design-systems/lyne-components/commit/6ef7e188f46bc2c0254bc288a4a9d047da41deaa))
- **sbb-footer:** fix visual gaps ([#1436](https://github.com/sbb-design-systems/lyne-components/issues/1436)) ([d743267](https://github.com/sbb-design-systems/lyne-components/commit/d743267f84ccdb1ab6f8dbf99e72d63110b6222f))

### [0.12.2](https://github.com/sbb-design-systems/lyne-components/compare/v0.12.1...v0.12.2) (2022-10-28)

### Bug Fixes

- **sbb-button:** fix border size for size m variant ([#1437](https://github.com/sbb-design-systems/lyne-components/issues/1437)) ([7fcd384](https://github.com/sbb-design-systems/lyne-components/commit/7fcd384036f4cb131d2dc238b05be8f4c9b99a99))

### Documentation

- **sbb-menu:** increase delay and waiting time to avoid chromatic flickering ([#1434](https://github.com/sbb-design-systems/lyne-components/issues/1434)) ([617bd64](https://github.com/sbb-design-systems/lyne-components/commit/617bd640af979480b1f30f2e621b7b27fc51e703))
- **sbb-timetable-row:** avoid chromatic flickering by setting current time of stories ([#1433](https://github.com/sbb-design-systems/lyne-components/issues/1433)) ([50d6bfe](https://github.com/sbb-design-systems/lyne-components/commit/50d6bfeb931cadc9fe9ba9ae3f99054fdf778d14))

### [0.12.1](https://github.com/sbb-design-systems/lyne-components/compare/v0.12.0...v0.12.1) (2022-10-26)

### Features

- **sbb-header:** component implementation ([#1357](https://github.com/sbb-design-systems/lyne-components/issues/1357)) ([1b847ab](https://github.com/sbb-design-systems/lyne-components/commit/1b847ab92d8abb06f3fafd2b432ddd07d41f9136))

## [0.12.0](https://github.com/sbb-design-systems/lyne-components/compare/v0.11.2...v0.12.0) (2022-10-26)

### ⚠ BREAKING CHANGES

- **sbb-footer:** Removed column and bottom slot. The footer has now 2 variations. Default and clock-columns. Default displays every slotted content as blocks and clock-columns use a css-grid.

### Refactorings

- **sbb-footer:** general refactoring ([#1409](https://github.com/sbb-design-systems/lyne-components/issues/1409)) ([be1e8cc](https://github.com/sbb-design-systems/lyne-components/commit/be1e8cc59291f23aeecf79ed151744d564696f88))

### [0.11.2](https://github.com/sbb-design-systems/lyne-components/compare/v0.11.1...v0.11.2) (2022-10-26)

### Refactorings

- allow current time to be configured ([#1429](https://github.com/sbb-design-systems/lyne-components/issues/1429)) ([b0d60a6](https://github.com/sbb-design-systems/lyne-components/commit/b0d60a6d5eb5675bedda2ed99b673ff2fd43e5e7))

### [0.11.1](https://github.com/sbb-design-systems/lyne-components/compare/v0.11.0...v0.11.1) (2022-10-26)

### Refactorings

- **sbb-title:** implement styles as described in coding standards ([#1422](https://github.com/sbb-design-systems/lyne-components/issues/1422)) ([07ce5d8](https://github.com/sbb-design-systems/lyne-components/commit/07ce5d8374f5e3d0f5094759d2758d15ea965102))

## [0.11.0](https://github.com/sbb-design-systems/lyne-components/compare/v0.10.1...v0.11.0) (2022-10-26)

### ⚠ BREAKING CHANGES

- Custom click events on action elements were removed
  (e.g. `sbb-button_click`, `sbb-link_click`, ...).
  Please read the property target of the emitted event if you are interested from where an event was triggered.

### Features

- forward focus on host and remove redundant click events ([#1427](https://github.com/sbb-design-systems/lyne-components/issues/1427)) ([52b230f](https://github.com/sbb-design-systems/lyne-components/commit/52b230fc9f62e193b1eee27b6bb383674f003b3f))

### [0.10.1](https://github.com/sbb-design-systems/lyne-components/compare/v0.10.0...v0.10.1) (2022-10-25)

### Bug Fixes

- **sbb-pearl-chain, sbb-pearl-chain-time:** relative datetime in stories ([#1423](https://github.com/sbb-design-systems/lyne-components/issues/1423)) ([5d21890](https://github.com/sbb-design-systems/lyne-components/commit/5d218900687aa81e7b1d64119fc3774608d98d49))

## [0.10.0](https://github.com/sbb-design-systems/lyne-components/compare/v0.9.16...v0.10.0) (2022-10-25)

### ⚠ BREAKING CHANGES

- Every property called idValue was renamed to ${componentName}Id
  as documented in CODING_STANDARDS.md. The following components
  are affected: sbb-button, sbb-card, sbb-card-product, sbb-link, sbb-teaser-hero.

### Refactorings

- rename idValue properties to specific names ([#1421](https://github.com/sbb-design-systems/lyne-components/issues/1421)) ([181735d](https://github.com/sbb-design-systems/lyne-components/commit/181735d40be4f4d213c30db6f52bf64e7025f3f7))

### [0.9.16](https://github.com/sbb-design-systems/lyne-components/compare/v0.9.15...v0.9.16) (2022-10-25)

### Refactorings

- **sbb-divider:** implement styles as described in coding standards ([#1419](https://github.com/sbb-design-systems/lyne-components/issues/1419)) ([97c1f0c](https://github.com/sbb-design-systems/lyne-components/commit/97c1f0c98beb25c7b4894a36ae19f48c19f8dcea))

### [0.9.15](https://github.com/sbb-design-systems/lyne-components/compare/v0.9.14...v0.9.15) (2022-10-24)

### Refactorings

- **sbb-link-list:** use cleaner object destructuring in stories ([#1418](https://github.com/sbb-design-systems/lyne-components/issues/1418)) ([3139433](https://github.com/sbb-design-systems/lyne-components/commit/313943324dd13707a970d5cebe3e3abf21e33e0f))

### [0.9.14](https://github.com/sbb-design-systems/lyne-components/compare/v0.9.13...v0.9.14) (2022-10-21)

### Bug Fixes

- **sbb-action-group:** fix gap for vertical orientation ([#1415](https://github.com/sbb-design-systems/lyne-components/issues/1415)) ([752d888](https://github.com/sbb-design-systems/lyne-components/commit/752d888918a9cb4f1672cddaa8cfac2ac1049fdf))
- typescript compilation error ([#1416](https://github.com/sbb-design-systems/lyne-components/issues/1416)) ([ee15959](https://github.com/sbb-design-systems/lyne-components/commit/ee159599b79f51467320f40b230cb7ed8f6ba511))

### [0.9.13](https://github.com/sbb-design-systems/lyne-components/compare/v0.9.12...v0.9.13) (2022-10-19)

### Features

- add experimental sass output ([#1412](https://github.com/sbb-design-systems/lyne-components/issues/1412)) ([3ab884f](https://github.com/sbb-design-systems/lyne-components/commit/3ab884fdd05a68547f2a8db9bccd6176c14aa1bf))

### [0.9.12](https://github.com/sbb-design-systems/lyne-components/compare/v0.9.11...v0.9.12) (2022-10-18)

### Features

- **sbb-menu:** introduce sbb-menu component ([#1378](https://github.com/sbb-design-systems/lyne-components/issues/1378)) ([4ee0c78](https://github.com/sbb-design-systems/lyne-components/commit/4ee0c781a52cfbe13ab03d8cb790b3cb85ffd208))

### [0.9.11](https://github.com/sbb-design-systems/lyne-components/compare/v0.9.10...v0.9.11) (2022-10-18)

### Bug Fixes

- avoid finding element itself in `hostContext()` method ([#1405](https://github.com/sbb-design-systems/lyne-components/issues/1405)) ([b0caab6](https://github.com/sbb-design-systems/lyne-components/commit/b0caab66fd7ac4338bd786ef32c12ec19c9deea6))

### [0.9.10](https://github.com/sbb-design-systems/lyne-components/compare/v0.9.9...v0.9.10) (2022-10-12)

### Refactorings

- **sbb-timetable-row/sbb-pearl-chain:** major refactoring ([#1331](https://github.com/sbb-design-systems/lyne-components/issues/1331)) ([5e3c301](https://github.com/sbb-design-systems/lyne-components/commit/5e3c3013574b133577304c25ca1cabdc7a368db8))

### [0.9.9](https://github.com/sbb-design-systems/lyne-components/compare/v0.9.8...v0.9.9) (2022-10-12)

### Features

- **sbb-action-group:** initial implementation ([#1391](https://github.com/sbb-design-systems/lyne-components/issues/1391)) ([e9be87f](https://github.com/sbb-design-systems/lyne-components/commit/e9be87fb9401f52a6b22016454f93fc9e3a7ddd6)), closes [#1368](https://github.com/sbb-design-systems/lyne-components/issues/1368)

### [0.9.8](https://github.com/sbb-design-systems/lyne-components/compare/v0.9.7...v0.9.8) (2022-10-12)

### Features

- **sbb-teaser:** allow image size to be configured ([#1407](https://github.com/sbb-design-systems/lyne-components/issues/1407)) ([7894d00](https://github.com/sbb-design-systems/lyne-components/commit/7894d00455a8cb0c52a8f273d2d30f257d4e07eb))

### [0.9.7](https://github.com/sbb-design-systems/lyne-components/compare/v0.9.6...v0.9.7) (2022-10-11)

### Features

- add possibility to submit forms with sbb-button/sbb-link ([#1403](https://github.com/sbb-design-systems/lyne-components/issues/1403)) ([52cdd0f](https://github.com/sbb-design-systems/lyne-components/commit/52cdd0f3786b3adb2bbb460ea28f9bd0aa1bc6d4))

### [0.9.6](https://github.com/sbb-design-systems/lyne-components/compare/v0.9.5...v0.9.6) (2022-10-10)

### Refactorings

- **sbb-teaser:** use LinkProperties interface ([#1404](https://github.com/sbb-design-systems/lyne-components/issues/1404)) ([328c85d](https://github.com/sbb-design-systems/lyne-components/commit/328c85d95134182973f4d542cfb318ed61141fa7))

### [0.9.5](https://github.com/sbb-design-systems/lyne-components/compare/v0.9.4...v0.9.5) (2022-10-07)

### Features

- improvement in LinkButtonProperties interface ([#1398](https://github.com/sbb-design-systems/lyne-components/issues/1398)) ([433fddc](https://github.com/sbb-design-systems/lyne-components/commit/433fddcd4df24e3325ae0b291a849547ca1e0139))

### [0.9.4](https://github.com/sbb-design-systems/lyne-components/compare/v0.9.3...v0.9.4) (2022-10-07)

### Features

- add removeTimezoneFromDate as a helper function ([#1402](https://github.com/sbb-design-systems/lyne-components/issues/1402)) ([06850c8](https://github.com/sbb-design-systems/lyne-components/commit/06850c8bb8f04a2f21f3e604d9e8245d64762ca7))

### [0.9.3](https://github.com/sbb-design-systems/lyne-components/compare/v0.9.2...v0.9.3) (2022-10-06)

### Refactorings

- remove `pointer-events: none` from action elements ([#1401](https://github.com/sbb-design-systems/lyne-components/issues/1401)) ([3797b1b](https://github.com/sbb-design-systems/lyne-components/commit/3797b1b1fec9ae85d23e92769953f86e4a196e29))

### [0.9.2](https://github.com/sbb-design-systems/lyne-components/compare/v0.9.1...v0.9.2) (2022-10-06)

### Bug Fixes

- **sbb-link:** expand clickable area in block variant ([#1394](https://github.com/sbb-design-systems/lyne-components/issues/1394)) ([b0fe962](https://github.com/sbb-design-systems/lyne-components/commit/b0fe962b3b3f8689af46ef692aca71f51c3e5926)), closes [#1387](https://github.com/sbb-design-systems/lyne-components/issues/1387)

### [0.9.1](https://github.com/sbb-design-systems/lyne-components/compare/v0.9.0...v0.9.1) (2022-10-06)

### Refactorings

- forward click on host to inner action element ([#1399](https://github.com/sbb-design-systems/lyne-components/issues/1399)) ([7697f4c](https://github.com/sbb-design-systems/lyne-components/commit/7697f4cc8c42ba76de7ad92bef8685d1ee7d0e45))

## [0.9.0](https://github.com/sbb-design-systems/lyne-components/compare/v0.8.0...v0.9.0) (2022-10-05)

### ⚠ BREAKING CHANGES

- **sbb-alert:** Property `inanimate` of sbb-alert was renamed to `disable-animation`.

### Refactorings

- **sbb-alert:** rename property `inanimate` to `disable-animation` ([#1397](https://github.com/sbb-design-systems/lyne-components/issues/1397)) ([1bc4a31](https://github.com/sbb-design-systems/lyne-components/commit/1bc4a31016f2496cdfbd6515095bd1a7254c2fd4))

## [0.8.0](https://github.com/sbb-design-systems/lyne-components/compare/v0.7.6...v0.8.0) (2022-10-05)

### ⚠ BREAKING CHANGES

- **sbb-button:** - API of sbb-button changed.

* sbb-link-button removed

Co-authored-by: Sébastien Closs <sebastien.closs@one-inside.com>
Co-authored-by: Hendrik Wernze <hendrik.wernze@sbb.ch>
Co-authored-by: Lukas Spirig <lukas.spirig@sbb.ch>
Co-authored-by: Jeremias Peier <jeremias.peier@sbb.ch>

### Refactorings

- **sbb-button:** cleanup and adapt to new api ([#1328](https://github.com/sbb-design-systems/lyne-components/issues/1328)) ([b2c41f5](https://github.com/sbb-design-systems/lyne-components/commit/b2c41f5d75089563b56d6bd9a26f0d944910e5f7)), closes [#1131](https://github.com/sbb-design-systems/lyne-components/issues/1131)

### [0.7.6](https://github.com/sbb-design-systems/lyne-components/compare/v0.7.5...v0.7.6) (2022-10-05)

### Bug Fixes

- **sbb-logo:** display logo on Safari ([#1395](https://github.com/sbb-design-systems/lyne-components/issues/1395)) ([9fee782](https://github.com/sbb-design-systems/lyne-components/commit/9fee782ba0774958bddf301a263677452479c676))

### [0.7.5](https://github.com/sbb-design-systems/lyne-components/compare/v0.7.4...v0.7.5) (2022-10-03)

### Refactorings

- **sbb-card:** define negative variant style less specific ([#1393](https://github.com/sbb-design-systems/lyne-components/issues/1393)) ([3907a28](https://github.com/sbb-design-systems/lyne-components/commit/3907a2824f8deb76222c6ef4494a3c4abfd7ee4a))

### [0.7.4](https://github.com/sbb-design-systems/lyne-components/compare/v0.7.3...v0.7.4) (2022-09-29)

### Bug Fixes

- **sbb-card:** correct animation duration ([#1390](https://github.com/sbb-design-systems/lyne-components/issues/1390)) ([5972346](https://github.com/sbb-design-systems/lyne-components/commit/5972346e2dcdf63db2f5d22b80296e886fce9bb4))

### [0.7.3](https://github.com/sbb-design-systems/lyne-components/compare/v0.7.2...v0.7.3) (2022-09-29)

### Refactorings

- introduce possibility to observe host for named slot changes ([#1375](https://github.com/sbb-design-systems/lyne-components/issues/1375)) ([8c37af6](https://github.com/sbb-design-systems/lyne-components/commit/8c37af65da0d860bda72265dca9c8448e3b7bd67))

### [0.7.2](https://github.com/sbb-design-systems/lyne-components/compare/v0.7.1...v0.7.2) (2022-09-28)

### Features

- **sbb-card:** component implementation ([#1358](https://github.com/sbb-design-systems/lyne-components/issues/1358)) ([a36a050](https://github.com/sbb-design-systems/lyne-components/commit/a36a050a3353c67342958f9b135e18fa33e7740b)), closes [#1216](https://github.com/sbb-design-systems/lyne-components/issues/1216)

### Bug Fixes

- **sbb-card:** use correct import in story ([7f92b67](https://github.com/sbb-design-systems/lyne-components/commit/7f92b67112cd69f9d4557ce7cc3c1072415a0431))

### Documentation

- adapt review process ([67e34c9](https://github.com/sbb-design-systems/lyne-components/commit/67e34c9ca13234c1cf74df0941070c19e47c7821))
- add review guidelines ([#1386](https://github.com/sbb-design-systems/lyne-components/issues/1386)) ([0542e44](https://github.com/sbb-design-systems/lyne-components/commit/0542e4431dacce4fa3569fcd27bd11e7022f8759))

### [0.7.1](https://github.com/sbb-design-systems/lyne-components/compare/v0.7.0...v0.7.1) (2022-09-22)

### Features

- **sbb-alert:** initial implementation ([#1284](https://github.com/sbb-design-systems/lyne-components/issues/1284)) ([5b0309c](https://github.com/sbb-design-systems/lyne-components/commit/5b0309c6d8395d40347bf1ac143851723f4f5dc7))

## [0.7.0](https://github.com/sbb-design-systems/lyne-components/compare/v0.6.8...v0.7.0) (2022-09-21)

### ⚠ BREAKING CHANGES

- **sbb-link-list:** - rename prop titleText to titleContent

* rename prop listDirection to horizontalFrom
* replace old approach for negativ variant with new pattern (boolean instead of variant)
* add a named slot of title to sbb-link-list to either pass markup or text content to the containing sbb-title component
* rework the internal slotted sbb-link instances handling completely
* remove button slot from link-list

### Documentation

- fix description of host vs inner styling ([#1382](https://github.com/sbb-design-systems/lyne-components/issues/1382)) ([fc41db8](https://github.com/sbb-design-systems/lyne-components/commit/fc41db83a01d555d02b8c58f054c3b1cb96dabb8))

### Refactorings

- **sbb-link-list:** review/refactor ([#1329](https://github.com/sbb-design-systems/lyne-components/issues/1329)) ([bd6f091](https://github.com/sbb-design-systems/lyne-components/commit/bd6f091d907a10f32bc43b924f709bba148c75fa)), closes [#1238](https://github.com/sbb-design-systems/lyne-components/issues/1238)

### [0.6.8](https://github.com/sbb-design-systems/lyne-components/compare/v0.6.7...v0.6.8) (2022-09-21)

### Features

- add new text size l ([#1383](https://github.com/sbb-design-systems/lyne-components/issues/1383)) ([fd1b915](https://github.com/sbb-design-systems/lyne-components/commit/fd1b915c6252aad1deae85718649900da94f8d96))

### [0.6.7](https://github.com/sbb-design-systems/lyne-components/compare/v0.6.6...v0.6.7) (2022-09-16)

### Bug Fixes

- distribute the react package as commonjs ([532280c](https://github.com/sbb-design-systems/lyne-components/commit/532280c4ba3c1d6360dab40067eedab874bb59ad))

### [0.6.6](https://github.com/sbb-design-systems/lyne-components/compare/v0.6.5...v0.6.6) (2022-09-16)

### Bug Fixes

- add type module for react package ([5d5ff5e](https://github.com/sbb-design-systems/lyne-components/commit/5d5ff5e12c087d258a21fe0166db2e3a429653cd))

### [0.6.5](https://github.com/sbb-design-systems/lyne-components/compare/v0.6.4...v0.6.5) (2022-09-15)

### Refactorings

- **sbb-teaser-hero:** rework structure ([#1264](https://github.com/sbb-design-systems/lyne-components/issues/1264)) ([d619fac](https://github.com/sbb-design-systems/lyne-components/commit/d619fac2c7e2254bb8845ce112954bed48cea099))

### [0.6.4](https://github.com/sbb-design-systems/lyne-components/compare/v0.6.3...v0.6.4) (2022-09-15)

### Refactorings

- **sbb-link:** add new underline hover style ([#1377](https://github.com/sbb-design-systems/lyne-components/issues/1377)) ([1ddc610](https://github.com/sbb-design-systems/lyne-components/commit/1ddc61047a9b4a5dfd519a0a571da88e4f4278ed))

### [0.6.3](https://github.com/sbb-design-systems/lyne-components/compare/v0.6.2...v0.6.3) (2022-09-15)

### Bug Fixes

- adapt release process ([3e83e81](https://github.com/sbb-design-systems/lyne-components/commit/3e83e81edadc28d9045120ad6751b7f46d332796))
- correct ci script ([7c1d684](https://github.com/sbb-design-systems/lyne-components/commit/7c1d684890e05dc15690937a582cfbf403f968d1))
- disable library ts check ([cfccb0d](https://github.com/sbb-design-systems/lyne-components/commit/cfccb0d77be7489f385baa003d08469628702781))
- pre-install netlify cli ([8ea4744](https://github.com/sbb-design-systems/lyne-components/commit/8ea4744069173647d93a8c850ed5304ebfb7deb3))
- use correct jsx factory for react output target ([#1376](https://github.com/sbb-design-systems/lyne-components/issues/1376)) ([9448381](https://github.com/sbb-design-systems/lyne-components/commit/9448381ba690492a0bd0b78d25e9b5137999d4f5))

### [0.6.2](https://github.com/sbb-design-systems/lyne-components/compare/v0.6.1...v0.6.2) (2022-09-06)

### Bug Fixes

- **sbb-link:** fix accessibility of external links ([#1372](https://github.com/sbb-design-systems/lyne-components/issues/1372)) ([e371af8](https://github.com/sbb-design-systems/lyne-components/commit/e371af8a9058c04e3c206fa5b4dc3508d1381367))

### [0.6.1](https://github.com/sbb-design-systems/lyne-components/compare/v0.6.0...v0.6.1) (2022-09-06)

### Bug Fixes

- **sbb-link:** fix placement of slotted icon ([#1371](https://github.com/sbb-design-systems/lyne-components/issues/1371)) ([d70e1f8](https://github.com/sbb-design-systems/lyne-components/commit/d70e1f8a257121724164470007f9f618bd97d626))

## [0.6.0](https://github.com/sbb-design-systems/lyne-components/compare/v0.5.4...v0.6.0) (2022-09-05)

### ⚠ BREAKING CHANGES

- The link does not anymore himself decides to set target="\_blank". It's now up to the consumer to decide if a link should be opened in a new window.

### Refactorings

- refine link button properties interfaces ([#1367](https://github.com/sbb-design-systems/lyne-components/issues/1367)) ([d0b30aa](https://github.com/sbb-design-systems/lyne-components/commit/d0b30aa1fbf019b70b96291e53206e6a4faf332c))

### [0.5.4](https://github.com/sbb-design-systems/lyne-components/compare/v0.5.3...v0.5.4) (2022-09-01)

### Bug Fixes

- define compilation target for bundled storybook stories ([e3b2494](https://github.com/sbb-design-systems/lyne-components/commit/e3b2494e21635c02a52bcbe10b283c9a05dcaef5))

### [0.5.3](https://github.com/sbb-design-systems/lyne-components/compare/v0.5.1...v0.5.3) (2022-09-01)

### Features

- add @sbb-esta/lyne-components-react for react consumers ([#1360](https://github.com/sbb-design-systems/lyne-components/issues/1360)) ([5a02ba0](https://github.com/sbb-design-systems/lyne-components/commit/5a02ba04468a9a3bd2698aa072b8c98ff587f08c))

### Bug Fixes

- create release ([4848646](https://github.com/sbb-design-systems/lyne-components/commit/4848646c779f24176c06e4e15b58e0090b7cd2e7))
- **sbb-link:** fix normalize button styles to not interfere with sbb-link in Safari ([#1365](https://github.com/sbb-design-systems/lyne-components/issues/1365)) ([2b417f1](https://github.com/sbb-design-systems/lyne-components/commit/2b417f102b16f767d6bb7491f25cbad457fc0bec))

### Documentation

- add guidelines for storybook stories ([#1362](https://github.com/sbb-design-systems/lyne-components/issues/1362)) ([ab9f2a0](https://github.com/sbb-design-systems/lyne-components/commit/ab9f2a0f24ccfdcae19bb19da7d68406c67d2958))
- fix typo in CODING_STANDARDS.md ([a994268](https://github.com/sbb-design-systems/lyne-components/commit/a994268940b605eb0fd124e45ecdf25795f7c2cf))

### [0.5.1](https://github.com/sbb-design-systems/lyne-components/compare/v0.5.0...v0.5.1) (2022-08-30)

### Bug Fixes

- **sbb-form-field:** enable click on select arrow ([#1356](https://github.com/sbb-design-systems/lyne-components/issues/1356)) ([91a52a7](https://github.com/sbb-design-systems/lyne-components/commit/91a52a70d4c0e5d42ebca731d381c25667b53cfe))

## [0.5.0](https://github.com/sbb-design-systems/lyne-components/compare/v0.4.0...v0.5.0) (2022-08-30)

### ⚠ BREAKING CHANGES

- **sbb-form-field:** - Removes the `sbb-input-text` and replaces it with `sbb-form-field`

* Removes the `sbb-input-error` and replaces it with `sbb-form-error`

### Features

- **sbb-form-field:** initial implementation ([#1303](https://github.com/sbb-design-systems/lyne-components/issues/1303)) ([b2ec4f0](https://github.com/sbb-design-systems/lyne-components/commit/b2ec4f0a853536ed2f867efcce42f69ea59b8629))

## [0.4.0](https://github.com/sbb-design-systems/lyne-components/compare/v0.3.2...v0.4.0) (2022-08-25)

### ⚠ BREAKING CHANGES

- **sbb-link:** rename isIconAtEnd property to iconPlacement

### Bug Fixes

- **sbb-link:** rename property isIconAtEnd to iconPlacement and fix stories ([#1350](https://github.com/sbb-design-systems/lyne-components/issues/1350)) ([10962ec](https://github.com/sbb-design-systems/lyne-components/commit/10962ec4b28ed8fec1926277c77c640e96708b6e))

### [0.3.2](https://github.com/sbb-design-systems/lyne-components/compare/v0.3.1...v0.3.2) (2022-08-24)

### Refactorings

- **sbb-tab-group:** improve tabs selection ([#1349](https://github.com/sbb-design-systems/lyne-components/issues/1349)) ([e962ba7](https://github.com/sbb-design-systems/lyne-components/commit/e962ba7050c06960e3d71ec943ab3a4087f7cb27))

### [0.3.1](https://github.com/sbb-design-systems/lyne-components/compare/v0.3.0...v0.3.1) (2022-08-23)

### Features

- **sbb-tab-group:** introduce new tab group component ([#1088](https://github.com/sbb-design-systems/lyne-components/issues/1088)) ([31ec9ec](https://github.com/sbb-design-systems/lyne-components/commit/31ec9ec920f0318d3ea266ef6d9fe5f92668c855))

## [0.3.0](https://github.com/sbb-design-systems/lyne-components/compare/v0.2.6...v0.3.0) (2022-08-22)

### ⚠ BREAKING CHANGES

- **sbb-image:** removed properties: 'hideFromScreenreader', 'variant', 'imageSrcExample'

### Refactorings

- **sbb-image:** various refactorings ([#1305](https://github.com/sbb-design-systems/lyne-components/issues/1305)) ([d57859c](https://github.com/sbb-design-systems/lyne-components/commit/d57859c32a338abe4fb7cb4ba7da91860773f5b0))

### [0.2.6](https://github.com/sbb-design-systems/lyne-components/compare/v0.2.5...v0.2.6) (2022-08-22)

### Bug Fixes

- **sbb-teaser:** add png loader to story bundler ([#1347](https://github.com/sbb-design-systems/lyne-components/issues/1347)) ([dd35929](https://github.com/sbb-design-systems/lyne-components/commit/dd35929a90867f510e705f95e1e53e79ab54d002))
- **sbb-teaser:** inline image in story to prevent chromatic issues ([#1346](https://github.com/sbb-design-systems/lyne-components/issues/1346)) ([3979815](https://github.com/sbb-design-systems/lyne-components/commit/3979815f57c2bac5df1cb859f6ae07c57168f117))

### [0.2.5](https://github.com/sbb-design-systems/lyne-components/compare/v0.2.4...v0.2.5) (2022-08-19)

### Features

- **sbb-link:** implement LinkButtonProperties interface ([#1344](https://github.com/sbb-design-systems/lyne-components/issues/1344)) ([77e15cf](https://github.com/sbb-design-systems/lyne-components/commit/77e15cfcf27d54e820208738cb233160792c90b4))

### [0.2.4](https://github.com/sbb-design-systems/lyne-components/compare/v0.2.3...v0.2.4) (2022-08-17)

### Bug Fixes

- **sbb-link:** handle icon slot and icon placement correctly ([#1340](https://github.com/sbb-design-systems/lyne-components/issues/1340)) ([69bd54b](https://github.com/sbb-design-systems/lyne-components/commit/69bd54b9141bf0c53cca1936f4c4d2c4eb4fb4c4))

### [0.2.3](https://github.com/sbb-design-systems/lyne-components/compare/v0.2.2...v0.2.3) (2022-08-17)

### Bug Fixes

- **sbb-button:** button doesn't emit eventId ([#1332](https://github.com/sbb-design-systems/lyne-components/issues/1332)) ([b2abf37](https://github.com/sbb-design-systems/lyne-components/commit/b2abf3723457ab64b79c8bc99e669cdd428c0d9a))

### [0.2.2](https://github.com/sbb-design-systems/lyne-components/compare/v0.2.1...v0.2.2) (2022-08-17)

### Bug Fixes

- add event to link button ([#1327](https://github.com/sbb-design-systems/lyne-components/issues/1327)) ([8cfcd50](https://github.com/sbb-design-systems/lyne-components/commit/8cfcd509a5ee9551d1827be595db622fa9ca2ec2))

### [0.2.1](https://github.com/sbb-design-systems/lyne-components/compare/v0.2.0...v0.2.1) (2022-08-11)

### Refactorings

- add common interface for link/button cases ([#1330](https://github.com/sbb-design-systems/lyne-components/issues/1330)) ([3856419](https://github.com/sbb-design-systems/lyne-components/commit/3856419676be7a6b8c0354cd7b8b78ace7793417))

## [0.2.0](https://github.com/sbb-design-systems/lyne-components/compare/v0.1.19...v0.2.0) (2022-07-29)

### ⚠ BREAKING CHANGES

- **sbb-link:** - the text is now set via slot (default slot)

* the aria-label has its own property instead of the former text property
* iconFlip has been removed

### Features

- **sbb-link:** refactor sbb-link according to new specification ([#1292](https://github.com/sbb-design-systems/lyne-components/issues/1292)) ([108310a](https://github.com/sbb-design-systems/lyne-components/commit/108310aac4540f32bcf57febf364e3aae6cf7672))

### [0.1.19](https://github.com/sbb-design-systems/lyne-components/compare/v0.1.18...v0.1.19) (2022-07-28)

### Bug Fixes

- **sbb-teaser:** remove unwanted space and fix stories ([#1321](https://github.com/sbb-design-systems/lyne-components/issues/1321)) ([490b6f4](https://github.com/sbb-design-systems/lyne-components/commit/490b6f44d1680b35dcedaa58e5195c59e1f15008))

### [0.1.18](https://github.com/sbb-design-systems/lyne-components/compare/v0.1.17...v0.1.18) (2022-07-28)

### Features

- **sbb-divider:** initial implementation ([#1309](https://github.com/sbb-design-systems/lyne-components/issues/1309)) ([7dcf833](https://github.com/sbb-design-systems/lyne-components/commit/7dcf8333cfe074fad78aaebb1e113558c9db893c))

### [0.1.17](https://github.com/sbb-design-systems/lyne-components/compare/v0.1.16...v0.1.17) (2022-07-28)

### Bug Fixes

- **sbb-toggle-check:** fix story path ([625d90b](https://github.com/sbb-design-systems/lyne-components/commit/625d90bdc096e9a16d7b06d839ea2536b1d7c53b))

### [0.1.16](https://github.com/sbb-design-systems/lyne-components/compare/v0.1.15...v0.1.16) (2022-07-27)

### Bug Fixes

- **sbb-title:** remove unused type definition ([#1318](https://github.com/sbb-design-systems/lyne-components/issues/1318)) ([7a8c613](https://github.com/sbb-design-systems/lyne-components/commit/7a8c613f9a653d744f309b51857e4365957394e3))
- **sbb-toggle-check:** fix various issues ([#1317](https://github.com/sbb-design-systems/lyne-components/issues/1317)) ([e13c447](https://github.com/sbb-design-systems/lyne-components/commit/e13c44716c1b8b49f95ac518c8e48d53438b947e))

### [0.1.15](https://github.com/sbb-design-systems/lyne-components/compare/v0.1.14...v0.1.15) (2022-07-27)

### Refactorings

- introduce AccessibilityProperties interface ([#1316](https://github.com/sbb-design-systems/lyne-components/issues/1316)) ([ac6c245](https://github.com/sbb-design-systems/lyne-components/commit/ac6c2453074b9383bdcdb037b1057ed37388d382))

### [0.1.14](https://github.com/sbb-design-systems/lyne-components/compare/v0.1.13...v0.1.14) (2022-07-26)

### Bug Fixes

- **sbb-toggle-check:** prevent the toggle from freezing on double-click ([#1315](https://github.com/sbb-design-systems/lyne-components/issues/1315)) ([98a8d1a](https://github.com/sbb-design-systems/lyne-components/commit/98a8d1afc352670cee11ddf7328e9a67c1a703ef))

### [0.1.13](https://github.com/sbb-design-systems/lyne-components/compare/v0.1.12...v0.1.13) (2022-07-26)

### Features

- **teaser:** initial implementation of teaser thumbnail ([#1209](https://github.com/sbb-design-systems/lyne-components/issues/1209)) ([653f144](https://github.com/sbb-design-systems/lyne-components/commit/653f144ff1d8522a5b7f915215c011f2de30fb7a))

### Documentation

- add documentation to definition of done ([3e5b690](https://github.com/sbb-design-systems/lyne-components/commit/3e5b6904967253a90a752a616115aa1d83699775))
- add note about scss & rule concatenation ([#1311](https://github.com/sbb-design-systems/lyne-components/issues/1311)) ([8ad0784](https://github.com/sbb-design-systems/lyne-components/commit/8ad07841c803a78cc546cb2999990655d3d26d49))

### Refactorings

- **styles:** simplify global font style application ([#1313](https://github.com/sbb-design-systems/lyne-components/issues/1313)) ([52243d1](https://github.com/sbb-design-systems/lyne-components/commit/52243d14562110e4f0131365d6117376c7dff5f1))

### [0.1.12](https://github.com/sbb-design-systems/lyne-components/compare/v0.1.11...v0.1.12) (2022-07-21)

### Features

- **sbb-toggle-check:** initial implementation ([#1283](https://github.com/sbb-design-systems/lyne-components/issues/1283)) ([8db48df](https://github.com/sbb-design-systems/lyne-components/commit/8db48df27f2cc9fa4674d78757605b8d6c459dfc))

### Documentation

- adapt pull request template ([398f62c](https://github.com/sbb-design-systems/lyne-components/commit/398f62cd9ef63c95f4c494e70fc21e137cb65616))
- add context detection section to CODING_STANDARDS.md ([#1304](https://github.com/sbb-design-systems/lyne-components/issues/1304)) ([6359e62](https://github.com/sbb-design-systems/lyne-components/commit/6359e62f6ab18c844100f535cb3ba71c1202722b))

### [0.1.11](https://github.com/sbb-design-systems/lyne-components/compare/v0.1.10...v0.1.11) (2022-07-19)

### Bug Fixes

- **button:** use new design tokens for size ([#1306](https://github.com/sbb-design-systems/lyne-components/issues/1306)) ([21f20aa](https://github.com/sbb-design-systems/lyne-components/commit/21f20aa429b38f501bdc8be0764d129d57e73121))

### [0.1.10](https://github.com/sbb-design-systems/lyne-components/compare/v0.1.9...v0.1.10) (2022-07-18)

### Refactorings

- **sbb-title:** refactor sbb-title according to new specification ([#1289](https://github.com/sbb-design-systems/lyne-components/issues/1289)) ([a1cadbf](https://github.com/sbb-design-systems/lyne-components/commit/a1cadbf2b1a7a0b0d7384f13e24b49ccd7072478))

### [0.1.9](https://github.com/sbb-design-systems/lyne-components/compare/v0.1.8...v0.1.9) (2022-07-18)

### Features

- **sbb-icon:** add width and height CSS variables and refactor ([#1297](https://github.com/sbb-design-systems/lyne-components/issues/1297)) ([fc15052](https://github.com/sbb-design-systems/lyne-components/commit/fc150521e6abc77ed5113e450572778dcc1cfd0e))

### Documentation

- add note to CONTRIBUTING.md about rebasing ([#1300](https://github.com/sbb-design-systems/lyne-components/issues/1300)) ([66e71b4](https://github.com/sbb-design-systems/lyne-components/commit/66e71b4c24296826de9d488b2d381734f7bc0309))
- add notice about supported browsers and screen readers ([#1290](https://github.com/sbb-design-systems/lyne-components/issues/1290)) ([5d0af0d](https://github.com/sbb-design-systems/lyne-components/commit/5d0af0d46cdf0dad619fe53c6ba7055e5c87e540))
- extend CODING_STANDARDS with aria forwarding and id handling ([#1295](https://github.com/sbb-design-systems/lyne-components/issues/1295)) ([2c43b3e](https://github.com/sbb-design-systems/lyne-components/commit/2c43b3e97899484da11503598f85d35a40fb17f7))
- mark all unfinished components accordingly in storybook ([#1287](https://github.com/sbb-design-systems/lyne-components/issues/1287)) ([069447e](https://github.com/sbb-design-systems/lyne-components/commit/069447ea206e9232458f59d47d8448ffef2d6ddf))
- update link to new npm package ([e654af6](https://github.com/sbb-design-systems/lyne-components/commit/e654af6ab74c1c197876e33bd9c54418dff98f92))

### [0.1.8](https://github.com/sbb-design-systems/lyne-components/compare/v0.1.7...v0.1.8) (2022-07-08)

### Features

- **sbb-icon:** introduce sbb-icon component ([#1286](https://github.com/sbb-design-systems/lyne-components/issues/1286)) ([e10adb3](https://github.com/sbb-design-systems/lyne-components/commit/e10adb3671a91fbe1e4f704b3a3ecdfc76f8ea38))

### Documentation

- fix links in github templates ([#1285](https://github.com/sbb-design-systems/lyne-components/issues/1285)) ([18e001b](https://github.com/sbb-design-systems/lyne-components/commit/18e001b1e3573b15c293038a52fbf560280d5143))

### [0.1.7](https://github.com/sbb-design-systems/lyne-components/compare/v0.1.6...v0.1.7) (2022-07-07)

### Bug Fixes

- fix focus outline override ([60ea2b0](https://github.com/sbb-design-systems/lyne-components/commit/60ea2b0d837ac931bc857c6dcd3d5b2aef1dc19d))

### [0.1.6](https://github.com/sbb-design-systems/lyne-components/compare/v0.1.5...v0.1.6) (2022-07-07)

### Refactorings

- remove scss standalone mode ([#1281](https://github.com/sbb-design-systems/lyne-components/issues/1281)) ([7d0b1e3](https://github.com/sbb-design-systems/lyne-components/commit/7d0b1e32856a9625f27bf6512d863b6ede66afd6))

### [0.1.5](https://github.com/sbb-design-systems/lyne-components/compare/v0.1.4...v0.1.5) (2022-07-04)

### Bug Fixes

- remove engine config as it blocks consumers ([99e80db](https://github.com/sbb-design-systems/lyne-components/commit/99e80db9ce98ae9c7cfcffda445485dd15e55484))

### Documentation

- create CODING_STANDARDS.md and update DEVELOPER.md ([#1279](https://github.com/sbb-design-systems/lyne-components/issues/1279)) ([8448cf8](https://github.com/sbb-design-systems/lyne-components/commit/8448cf8eac7f13bb8f4fc2a295d75a74ee54c6c3))

### [0.1.4](https://github.com/sbb-design-systems/lyne-components/compare/v0.1.3...v0.1.4) (2022-06-28)

### Refactorings

- rename global tokens according to design tokens ([#1276](https://github.com/sbb-design-systems/lyne-components/issues/1276)) ([b9087e2](https://github.com/sbb-design-systems/lyne-components/commit/b9087e2bd85a8182e2f88134304cf12b896a567d))

### [0.1.3](https://github.com/sbb-design-systems/lyne-components/compare/v0.1.2...v0.1.3) (2022-06-28)

### Features

- **link:** add new inline variant ([#1248](https://github.com/sbb-design-systems/lyne-components/issues/1248)) ([b02e614](https://github.com/sbb-design-systems/lyne-components/commit/b02e614b5aa55a6b7dc4d9749f6905fdd6f87b79))

### [0.1.2](https://github.com/sbb-design-systems/lyne-components/compare/v0.1.1...v0.1.2) (2022-06-27)

### Refactorings

- fail release when unable to publish ([6832a66](https://github.com/sbb-design-systems/lyne-components/commit/6832a66f002d894be4930ca95434cdf62980d691))

### [0.1.1](https://github.com/sbb-design-systems/lyne-components/compare/v0.1.0...v0.1.1) (2022-06-27)

### Bug Fixes

- remove quotes when set STORYBOOK_COMPONENTS_VERSION variable ([#1274](https://github.com/sbb-design-systems/lyne-components/issues/1274)) ([ef04fdb](https://github.com/sbb-design-systems/lyne-components/commit/ef04fdbb87a2991da32b9c1e3d2c052798860480))

```

```
