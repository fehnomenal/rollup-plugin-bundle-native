# rollup-plugins

Collection of frequently used plugins for rollup.

Install from GitHub:

```shell
pnpm add -D 'github:fehnomenal/rollup-plugins#semver:v2.0.0'
```

## rollup-plugins/bundle-native

Plugin that includes `.node` into the bundle as assets.

```js
import { bundleNative } from 'rollup-plugins/bundle-native';
```

## rollup-plugins/esm-shim

Plugin that inserts `__dirname`, `__filename` and `require` into files if these are used.

```js
import { esmShim } from 'rollup-plugins/esm-shim';
```

## rollup-plugins/resolve-libsql

Plugin to statically resolve the correct `@libsql/` native package instead of deferring to runtime resolving.

```js
import { resolveLibsql } from 'rollup-plugins/resolve-libsql';
```
