# rollup-plugins

Collection of frequently used plugins for rollup.

Install from GitHub:

```shell
pnpm add -D fehnomenal/rollup-plugins
```

## rollup-plugins/bundle-native

Plugin that includes `.node` into the bundle as assets.

```js
import { bundleNative } from 'rollup-plugins/bundle-native';
```

## rollup-plugin/esh-shim

Plugin that inserts `__dirname`, `__filename` and `require` into files if these are used.

```js
import { esmShim } from 'rollup-plugins/esm-shim';
```
