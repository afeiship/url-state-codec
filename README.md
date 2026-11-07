# url-state-codec
> A tiny codec for serializing JSON state into shareable URL-safe strings.

[![version][version-image]][version-url]
[![license][license-image]][license-url]
[![download][download-image]][download-url]

## installation
```shell
pnpm add @jswork/url-state-codec
```

## usage
```js
import { encodeState, decodeState, decodeStateWithVersion } from '@jswork/url-state-codec';

const settings = { v: 1, layout: 'grid', zoom: 1.5, title: '蛋白质筛选' };

// object -> URL-safe string (put it in ?state=...)
const encoded = encodeState(settings);
// -> "eyJ2IjoxLCJsYXlvdXQiOiJncmlkIiwiem9vbSI6MS41LCJ0aXRsZSI6Iuibi-eZvei0qOetm-mAiX0"

// URL-safe string -> object (null when absent or corrupted)
const restored = decodeState(encoded); // => settings

// with version check: null when the `v` field mismatches (e.g. old links)
const safe = decodeStateWithVersion(encoded, 1); // => settings
```

## api
- `encodeState(state)` — JSON → base64url string (URL-safe, no padding, non-ASCII friendly).
- `decodeState(raw)` — base64url string → object, returns `null` for absent/corrupted input.
- `decodeStateWithVersion(raw, currentVersion = 1)` — like `decodeState`, but also requires the state's `v` field to match.

## license
Code released under [the MIT license](https://github.com/afeiship/url-state-codec/blob/main/LICENSE.txt).

[version-image]: https://img.shields.io/npm/v/@jswork/url-state-codec
[version-url]: https://npmjs.org/package/@jswork/url-state-codec

[license-image]: https://img.shields.io/npm/l/@jswork/url-state-codec
[license-url]: https://github.com/afeiship/url-state-codec/blob/main/LICENSE.txt

[download-image]: https://img.shields.io/npm/dm/@jswork/url-state-codec
[download-url]: https://www.npmjs.com/package/@jswork/url-state-codec
