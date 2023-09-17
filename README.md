# Rollup Plugin inject data-qa

[![semantic-release](https://img.shields.io/badge/semantic-release-e10079.svg?logo=semantic-release)](https://github.com/semantic-release/semantic-release)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
![ts](https://badgen.net/badge/Built%20With/TypeScript/blue) [![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

rollup plugin of react and styled-component that can injection `data-qa` attribute to DOM that can display/hide with ENV flag.

## Installation

```sh
  yarn add -D @lmwn/rollup-data-qa
```

## Usage

- on rollup.config.js

```sh
  import { injectDataQa } from '@lmwn/rollup-plugin-inject-data-qa'

  export default [{
    ...,
    plugins:[
      injectDataQa()
    ]
  }]
```

- on script

```sh
  E2E_ENABLED=true && yarn build
```

- however if you using rollup to build lib you should set env flag `E2E_ENABLED=true` in your main project instead.

**input**

```js
  const StyledA = styled.div`...`

  const ComponentA = () => (
    <div>
      <StyledA>...</StyledA>
    </div>
  )
```

**output**

```js
  const ComponentA = () => (
    <div data-qa="component-a">
      <div className="styled-xxx" data-qa="styled-a">
        ...
      </div>
    </div>
  )
```

## Params

### `include`

- Type: String[]
- Default: null

### `exclude`

- Type: String[]
- Default: null

### `format`

- Type: 'paramCase' | 'camelCase' | ..
- Default: 'paramCase'

this lib using [change-case](https://www.npmjs.com/package/change-case) to format data-qa attribute value.

### `options`

- Type: Object
- Default: null

options for configure plugin setting

**`disabledStyledComponent`**

- Type: Boolean
- Default: false

if you are not using styled-component it should set to be true

**`disabledReactFunctionComponent`**

- Type: Boolean
- Default: false
