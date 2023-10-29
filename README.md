# rollup-plugin-bundle-native

Plugin for Rollup that includes `.node` into the bundle as assets.


## Installation

Install from GitHub:

```shell
pnpm add -D fehnomenal/rollup-plugin-bundle-native
```


## Usage

Import and include into plugins array:

````js
// ...
import { bundleNative } from 'rollup-plugin-bundle-native';

// ...

  plugins: [
    // ...
    bundleNative(),
    // ...
    ],

// ...
``
