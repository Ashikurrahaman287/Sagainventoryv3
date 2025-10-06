import { build } from 'esbuild';

async function bundle() {
  await build({
    entryPoints: ['./start.ts'],
    bundle: true,
    platform: 'node',
    target: ['node16'],
    format: 'esm',
    outfile: 'dist/index.js',
    external: ['express', 'dotenv'],
    sourcemap: true,
    minify: false
  });
}

bundle().catch(err => {
  console.error(err);
  process.exit(1);
});