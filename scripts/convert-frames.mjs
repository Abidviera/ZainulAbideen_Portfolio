import sharp from 'sharp';
import { mkdir, readFile } from 'fs/promises';
import { existsSync, cp } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

const sets = [
  { src: 'public/herosection', dest: 'public/herosection', total: 200, name: 'ScrollHero' },
  { src: 'public/footerhero', dest: 'public/footerhero', total: 240, name: 'FooterHero' },
];

const CONCURRENCY = 16;

async function ensureSharp() {
  try {
    require.resolve('sharp');
  } catch {
    console.log('Installing sharp (one-time)...');
    execSync('npm install sharp', { cwd: ROOT, stdio: 'pipe' });
  }
}

async function convertToWebp(srcDir, destDir, total, name) {
  if (!existsSync(destDir)) {
    await mkdir(destDir, { recursive: true });
  }

  let done = 0;
  let errors = 0;

  async function processFrame(i) {
    const num = String(i).padStart(3, '0');
    const srcPath = path.join(ROOT, srcDir, `ezgif-frame-${num}.png`);
    const outPath = path.join(ROOT, destDir, `frame-${num}.webp`);

    const buf = await readFile(srcPath);
    await sharp(buf)
      .resize(1920, null, { withoutEnlargement: true })
      .webp({ lossless: true, quality: 100 })
      .toFile(outPath);

    return i;
  }

  for (let batch = 0; batch < Math.ceil(total / CONCURRENCY); batch++) {
    const start = batch * CONCURRENCY + 1;
    const end = Math.min(start + CONCURRENCY - 1, total);
    const batchPromises = [];

    for (let i = start; i <= end; i++) {
      batchPromises.push(
        processFrame(i)
          .then(() => {
            done++;
            process.stdout.write('.');
            if (done % 40 === 0) process.stdout.write(` ${done}/${total}\n`);
          })
          .catch((err) => {
            errors++;
            console.error(`\nError on frame ${i}: ${err.message}`);
          })
      );
    }

    await Promise.all(batchPromises);
  }

  console.log(`\n[${name}] Done: ${done} converted, ${errors} errors`);
  console.log(`  Frames saved to: ${destDir}/frame-NNN.webp`);
}

async function main() {
  console.log('╔══════════════════════════════════════════════════╗');
  console.log('║  PNG → WebP Lossless Converter (FAST MODE)     ║');
  console.log('╚══════════════════════════════════════════════════╝');
  console.log('');
  console.log('  Resize to 1920px (display size) + WebP lossless');
  console.log('  No quality loss  •  16 frames in parallel');
  console.log('');

  await ensureSharp();

  for (const set of sets) {
    const start = Date.now();
    console.log(`Processing ${set.name}: ${set.total} frames...`);
    await convertToWebp(set.src, set.dest, set.total, set.name);
    const elapsed = ((Date.now() - start) / 1000).toFixed(1);
    console.log(`  Completed in ${elapsed}s\n`);
  }

  console.log('╔══════════════════════════════════════════════════╗');
  console.log('║  All conversions complete!                       ║');
  console.log('╚══════════════════════════════════════════════════╝');
  console.log('');
  console.log('Done! Refresh your browser. The new .webp frames are already');
  console.log('wired up in ScrollHero and FooterHero components.');
}

main();
