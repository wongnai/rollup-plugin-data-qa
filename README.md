# Rollup Plugin Data-QA

[![npm](https://img.shields.io/npm/dm/rollup-plugin-data-qa.svg)](https://www.npmjs.com/package/rollup-plugin-data-qa)
[![semantic-release](https://img.shields.io/badge/semantic-release-e10079.svg?logo=semantic-release)](https://github.com/semantic-release/semantic-release)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
![ts](https://badgen.net/badge/Built%20With/TypeScript/blue)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A Rollup plugin that injects `data-qa` attributes into React JSX and styled-components at build time. Attributes are only applied when `E2E_ENABLED=true`, so they can be omitted from production bundles.

Inspired by:

- [babel-plugin-transform-react-styled-components-qa](https://www.npmjs.com/package/babel-plugin-transform-react-styled-components-qa)
- [babel-plugin-transform-react-qa-classes](https://www.npmjs.com/package/babel-plugin-transform-react-qa-classes)

## Installation

```sh
yarn add -D rollup-plugin-data-qa
```

## Quick start

```js
import { injectDataQa } from 'rollup-plugin-data-qa'

export default {
  // ...
  plugins: [injectDataQa()],
}
```

Enable injection at build time:

```sh
E2E_ENABLED=true yarn build
```

If you publish a library built with Rollup, set `E2E_ENABLED=true` in the consuming application instead of only in the library build.

## How it works

**Input**

```tsx
const StyledA = styled.div`...`

const ComponentA = () => (
  <div>
    <StyledA>...</StyledA>
  </div>
)
```

**Output** (when `E2E_ENABLED=true`)

```js
const ComponentA = () => (
  <div {...(process.env.E2E_ENABLED === 'true' && { 'data-qa': 'component-a' })}>
    <StyledA>...</StyledA>
  </div>
)

const StyledA = styled.div.attrs(props => ({
  ...(process.env.E2E_ENABLED === 'true' && { 'data-qa': 'styled-a' }),
  ...props,
}))`...`
```

The plugin uses conditional spreads so `data-qa` is stripped when E2E mode is off.

## Options

```ts
interface InjectDataQaParams {
  include?: string[]
  exclude?: string[]
  format?: 'paramCase' | 'camelCase' | 'kebabCase' | /* change-case keys */ = 'paramCase'
  childOverrideParent?: boolean
  options?: InjectDataQaOptions
}

interface InjectDataQaOptions {
  disabledStyledComponent?: boolean
  disabledReactFunctionComponent?: boolean
  styledComponentNames?: string[]
}
```

| Option | Default | Description |
|--------|---------|-------------|
| `include` | `[]` | Glob patterns for files to transform |
| `exclude` | `[]` | Glob patterns for files to skip |
| `format` | `'paramCase'` | Naming format for `data-qa` values ([change-case](https://www.npmjs.com/package/change-case)) |
| `childOverrideParent` | `false` | Inject `data-qa` after spread props so it overrides parent values |
| `options.disabledStyledComponent` | `false` | Skip styled-components transformation |
| `options.disabledReactFunctionComponent` | `false` | Skip React function component transformation |
| `options.styledComponentNames` | `['styled']` | Import names treated as styled-component factories |

### `childOverrideParent`

By default, `data-qa` is injected **before** existing props. Parent spread props can override it:

```tsx
// default — parent props win
<div {...(E2E && { 'data-qa': 'child' })} {...props} />
```

Set `childOverrideParent: true` to inject `data-qa` **last**, so the child value always wins:

```js
injectDataQa({ childOverrideParent: true })
```

```tsx
// childOverrideParent — child data-qa wins
<div {...props} {...(E2E && { 'data-qa': 'child' })} />
```

This also applies to styled-components `.attrs()`:

```js
// default
styled.div.attrs(props => ({ ...(E2E && { 'data-qa': 'styled-a' }), ...props }))

// childOverrideParent
styled.div.attrs(props => ({ ...props, ...(E2E && { 'data-qa': 'styled-a' }) }))
```
