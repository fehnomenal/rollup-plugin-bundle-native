import { currentTarget } from '@neon-rs/load';
import MagicString from 'magic-string';

/** @returns {import('rollup').Plugin} */
export function resolveLibsql() {
  const target = currentTarget();

  return {
    name: 'resolve-libsql',

    async transform(code) {
      if (code.includes('require(`@libsql/${target}`)')) {
        const str = new MagicString(code).replace(
          'require(`@libsql/${target}`)',
          `require('@libsql/${target}').default`,
        );

        return { code: str.toString(), map: str.generateMap() };
      }
    },
  };
}
