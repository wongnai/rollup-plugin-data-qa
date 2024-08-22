# Rollup Plugin Data-QA

[![npm](https://img.shields.io/npm/dm/rollup-plugin-data-qa.svg)](https://www.npmjs.com/package/rollup-plugin-data-qa)
[![semantic-release](https://img.shields.io/badge/semantic-release-e10079.svg?logo=semantic-release)](https://github.com/semantic-release/semantic-release)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
![ts](https://badgen.net/badge/Built%20With/TypeScript/blue)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

rollup plugin of react and styled-component that can injection `data-qa` attribute to DOM that can display/hide with ENV flag.

inspired by

- [babel-plugin-transform-react-styled-components-qa](https://www.npmjs.com/package/babel-plugin-transform-react-styled-components-qa)
- [babel-plugin-transform-react-qa-classes](https://www.npmjs.com/package/babel-plugin-transform-react-qa-classes)

## Installation

```sh
  yarn add -D rollup-plugin-data-qa
```

## Usage

- on rollup.config.js

```sh
  import { injectDataQa } from 'rollup-plugin-data-qa'

  export default [{
    ...,
    plugins:[
      injectDataQa()
    ]
  }]
```

- on script

```sh
  E2E_ENABLED=true yarn build
```

- however if you are using rollup to build the library, you should set the env flag `E2E_ENABLED=true` in your main project instead.

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

## Parameters
```ts
interface InjectDataQaParams {
	// by default inject-data-qa will use input that rollup retrieved
	include?: string[] = null
	exclude?: string[] = null
	// this lib using [change-case](https://www.npmjs.com/package/change-case) to format data-qa attribute value.
	format?: 'paramCase' | 'camelCase' | ... = 'paramCase'
	options?: Options
}

interface Options {
	// if you don't want to use styled-component, should set to be true
	disabledStyledComponent?: boolean
	disabledReactFunctionComponent?: boolean
}
```
