# url-state-codec
> A tiny codec for serializing JSON state into shareable URL-safe strings.

[![version][version-image]][version-url]
[![license][license-image]][license-url]
[![download][download-image]][download-url]

## installation
```shell
yarn add @jswork/url-state-codec
```

## usage
```js
import urlStateCodex from '@jswork/url-state-codec';

urlStateCodex(1024);

// [1000, 0, 20, 4]
```

## license
Code released under [the MIT license](https://github.com/afeiship/url-state-codec/blob/main/LICENSE.txt).

[version-image]: https://img.shields.io/npm/v/@jswork/url-state-codec
[version-url]: https://npmjs.org/package/@jswork/url-state-codec

[license-image]: https://img.shields.io/npm/l/@jswork/url-state-codec
[license-url]: https://github.com/afeiship/url-state-codec/blob/main/LICENSE.txt

[download-image]: https://img.shields.io/npm/dm/@jswork/url-state-codec
[download-url]: https://www.npmjs.com/package/@jswork/url-state-codec
