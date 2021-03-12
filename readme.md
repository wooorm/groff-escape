# groff-escape

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Size][size-badge]][size]

Map of non-ASCII characters to Groff commands: `'≠'` > `'!='` (which you’ll
need to wrap like so `\[!=]` to use in Groff).

## Install

[npm][]:

```sh
npm install groff-escape
```

## Use

```js
var escape = require('groff-escape')

console.log(escape)
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

[license]: license

[author]: https://wooorm.com

[npm]: https://docs.npmjs.com/cli/install
