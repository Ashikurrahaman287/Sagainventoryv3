const { build } = require('esbuild');
const fs = require('fs');
const path = require('path');

async function bundle() {
  // produce server-specific dist so packaging can include `server/dist/**/*`
  const outdir = path.resolve(__dirname, '..', 'server', 'dist');
  await build({
    entryPoints: [path.resolve(__dirname, '..', 'server', 'start.ts')],
    bundle: true,
    platform: 'node',
    target: ['node16'],
    format: 'esm',
    outdir,
    external: ['sqlite3', 'better-sqlite3'],
    sourcemap: true,
    minify: false,
  });

  // ensure app data folder and copy db.json if present
  const srcDb = path.resolve(__dirname, '..', 'server', 'data', 'db.json');
  const destDataDir = path.join(outdir, 'app', 'data');
  try {
    if (fs.existsSync(srcDb)) {
      fs.mkdirSync(destDataDir, { recursive: true });
      fs.copyFileSync(srcDb, path.join(destDataDir, 'db.json'));
      console.log('Copied db.json to', path.join(destDataDir, 'db.json'));
    } else {
      console.log('No server/data/db.json found; skipping copy');
    }
  } catch (err) {
    console.error('Failed to copy db.json', err);
    process.exit(1);
  }
}

bundle().catch((err) => { console.error(err); process.exit(1); });
