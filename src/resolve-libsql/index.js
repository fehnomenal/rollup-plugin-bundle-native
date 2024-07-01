import { currentTarget } from '@neon-rs/load';
import MagicString from 'magic-string';

/** @type {import('.').resolveLibsql} */
export function resolveLibsql() {
  const target = currentTarget();

  const finalRequire = 'require(`@libsql/${target}`);';
  const modernRequire = 'requireNative();';

  const resolvedRequire = `require('@libsql/${target}').default;`;

  return {
    name: 'resolve-libsql',

    async transform(code) {
      if (code.includes(finalRequire)) {
        const str = new MagicString(code);

        str
          .replaceAll(finalRequire, resolvedRequire)
          .replaceAll(modernRequire, resolvedRequire);

        return { code: str.toString(), map: str.generateMap() };
      }
    },
  };
}
