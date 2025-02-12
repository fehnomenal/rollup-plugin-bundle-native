# @fehnomenal/rollup-plugins

Collection of frequently used plugins for rollup.

Install:

```shell
pnpm add -D @fehnomenal/rollup-plugins
```

## rollup-plugins/bundle-native

Plugin that includes `.node` into the bundle as assets.

```js
import { bundleNative } from '@fehnomenal/rollup-plugins/bundle-native';
```

## rollup-plugins/esm-shim

Plugin that inserts `__dirname`, `__filename` and `require` into files if these are used.

```js
import { esmShim } from '@fehnomenal/rollup-plugins/esm-shim';
```

## rollup-plugins/resolve-libsql

Plugin to statically resolve the correct `@libsql/` native package instead of deferring to runtime resolving.

```js
import { resolveLibsql } from '@fehnomenal/rollup-plugins/resolve-libsql';
```

# Development and publishing

## Dev

```sh
> pnpm i
> git switch -c ...
> # work work work and commit stuff
> # add a changeset if it is an user-visible change
> pnpm changeset
> git add .changeset
> git commit -m "changeset"
> git push
```

## Publish

Publishing is done through the changesets bot and action.
