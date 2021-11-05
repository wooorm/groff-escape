# groff-escape

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Size][size-badge]][size]

Map of non-ASCII characters to Groff commands.

## Contents

*   [What is this?](#what-is-this)
*   [When should I use this?](#when-should-i-use-this)
*   [Install](#install)
*   [Use](#use)
*   [API](#api)
    *   [`groffEscape`](#groffescape)
*   [Types](#types)
*   [Compatibility](#compatibility)
*   [Security](#security)
*   [Related](#related)
*   [Contribute](#contribute)
*   [License](#license)

## What is this?

This package maps non-ASCII characters to Groff commands.
For example, it maps `'≠'` to `'!='` (which you’ll need to wrap like so `\[!=]`
to use in Groff).

## When should I use this?

You can use this package if you’re writing stuff that compiles to Groff / man
pages.

## Install

This package is [ESM only][esm].
In Node.js (version 12.20+, 14.14+, or 16.0+), install with [npm][]:

```sh
npm install groff-escape
```

In Deno with [Skypack][]:

```js
import {groffEscape} from 'https://cdn.skypack.dev/groff-escape@2?dts'
```

In browsers with [Skypack][]:

```html
<script type="module">
  import {groffEscape} from 'https://cdn.skypack.dev/groff-escape@2?min'
</script>
```

## Use

```js
import {groffEscape} from 'groff-escape'

console.log(groffEscape)
```

Yields:

```js
{ '≠': '!=',
  'À': '`A',
  'Á': '\'A',
  'Â': '^A',
  'Ã': '~A',
  // …
  '♥': 'HE',
  '♦': 'DI',
  '✓': 'OK',
  '⟨': 'la',
  '⟩': 'ra' }
```

## API

This package exports the following identifiers: `groffEscape`.
There is no default export.

### `groffEscape`

Map of non-ASCII characters to Groff commands (`Record<string, string>`).

## Types

This package is fully typed with [TypeScript][].
There are no extra types exported.

## Compatibility

This package is at least compatible with all maintained versions of Node.js.
As of now, that is Node.js 12.20+, 14.14+, and 16.0+.
It also works in Deno and modern browsers.

## Security

This package is safe.

## Related

*   [`remarkjs/remark-man`](https://github.com/remarkjs/remark-man)
    — turn markdown into man pages

## Contribute

Yes please!
See [How to Contribute to Open Source][contribute].

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definitions -->

[build-badge]: https://github.com/wooorm/groff-escape/workflows/main/badge.svg

[build]: https://github.com/wooorm/groff-escape/actions

[coverage-badge]: https://img.shields.io/codecov/c/github/wooorm/groff-escape.svg

[coverage]: https://codecov.io/github/wooorm/groff-escape

[downloads-badge]: https://img.shields.io/npm/dm/groff-escape.svg

[downloads]: https://www.npmjs.com/package/groff-escape

[size-badge]: https://img.shields.io/bundlephobia/minzip/groff-escape.svg

[size]: https://bundlephobia.com/result?p=groff-escape

[npm]: https://docs.npmjs.com/cli/install

[skypack]: https://www.skypack.dev

[license]: license

[author]: https://wooorm.com

[esm]: https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c

[typescript]: https://www.typescriptlang.org

[contribute]: https://opensource.guide/how-to-contribute/
