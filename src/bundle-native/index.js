import { readFile } from 'node:fs/promises';
import { basename, dirname, resolve } from 'node:path';
import { esmShim } from '../esm-shim/index.js';

const PREFIX = '\0bundle-native:';

/** @type {import('.').bundleNative} */
export function bundleNative() {
  return [esmShim(), native()];
}

/** @returns {import('rollup').Plugin} */
export function native() {
  /** @type {string[]} */
  let nativeFileRefs = [];

  return {
    name: 'bundle-native',

    buildStart() {
      nativeFileRefs = [];
    },

    resolveId(id, importer) {
      if (id.endsWith('.node')) {
        if (importer) {
          id = resolve(dirname(importer), id);
        }

        return PREFIX + id;
      }
    },

    async load(id) {
      if (id.startsWith(PREFIX)) {
        const ref = this.emitFile({
          type: 'asset',
          name: basename(id),
          source: await readFile(id.slice(PREFIX.length)),
        });

        nativeFileRefs.push(ref);

        return {
          code: `export default require(import.meta.ROLLUP_FILE_URL_${ref});`,
        };
      }
    },

    resolveFileUrl: {
      order: 'pre',
      handler({ referenceId, relativePath }) {
        if (nativeFileRefs.includes(referenceId)) {
          if (!relativePath.startsWith('.')) {
            relativePath = `./${relativePath}`;
          }

          return JSON.stringify(relativePath);
        }
      },
    },
  };
}
