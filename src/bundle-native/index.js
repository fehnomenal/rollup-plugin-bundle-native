import { readFile } from 'node:fs/promises';
import { basename, dirname, resolve } from 'node:path';

const PREFIX = '\0bundle-native:';

/** @type {import('.').bundleNative} */
export function bundleNative() {
  /** @type {string[]} */
  const nativeFileRefs = [];

  return {
    name: 'bundle-native',

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
          code: [
            `import { createRequire } from 'node:module';`,
            `const require = createRequire(import.meta.url);`,
            `export default require(import.meta.ROLLUP_FILE_URL_${ref});`,
          ].join('\n'),
        };
      }
    },

    resolveFileUrl: {
      order: 'pre',
      handler({ referenceId, relativePath }) {
        if (nativeFileRefs.includes(referenceId)) {
          return JSON.stringify(`./${relativePath}`);
        }
      },
    },
  };
}
