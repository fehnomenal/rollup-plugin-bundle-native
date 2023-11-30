import MagicString from 'magic-string';

/** @type {import('.').esmShim} */
export function esmShim() {
  const requireRegex = /require\s*\(|require\s*.\s*resolve\s*\(/m;

  return {
    name: 'esm-shim',

    renderChunk(code, _chunk, opts) {
      if (opts.format === 'es' && !code.includes('__esm_shim__')) {
        const needsDirname = code.includes('__dirname');
        const needsFilename = needsDirname || code.includes('__filename');
        const needsRequire = requireRegex.test(code);

        /** @type {Record<string, Record<string, string>>} */
        const shims = {};

        if (needsFilename) {
          shims['__filename'] = { url: 'fileURLToPath(import.meta.url)' };
        }

        if (needsDirname) {
          shims['__dirname'] = { path: 'dirname(__filename)' };
        }

        if (needsRequire) {
          shims['require'] = { module: 'createRequire(import.meta.url)' };
        }

        if (Object.keys(shims).length > 0) {
          const imports = Object.values(shims)
            .flatMap((code) => Object.keys(code))
            .sort()
            .map(
              (module) =>
                `import __esm_shim__${module}__ from 'node:${module}';`,
            )
            .join('\n');

          const assignments = Object.entries(shims)
            .map(([varName, code]) => {
              const [module, callee] = Object.entries(code)[0];

              return `const ${varName} = __esm_shim__${module}__.${callee};`;
            })
            .join('\n');

          const str = new MagicString(code);

          str.prepend(`${imports}\n\n${assignments}\n\n`);

          return { code: str.toString(), map: str.generateMap() };
        }
      }

      return null;
    },
  };
}
