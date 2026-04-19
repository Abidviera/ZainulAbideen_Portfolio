import sharp from 'sharp';
import { readdir, mkdir } from 'fs/promises';
import { join, resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const rootDir = resolve(dirname(fileURLToPath(import.meta.url)), '..');

const CONVERSIONS = [
  { input: 'public/herosection', output: 'public/herosection/webp', pattern: /ezgif-frame-(\d+)\.png/ },
  { input: 'public/footerhero', output: 'public/footerhero/webp', pattern: /ezgif-frame-(\d+)\.png/ },
];

async function convertFrame(inputPath, outputPath) {
  await mkdir(dirname(outputPath), { recursive: true });
  await sharp(inputPath)
    .resize(1920, null, { withoutEnlargement: true })
    .webp({ quality: 80 })
    .toFile(outputPath);
}

async function main() {
  for (const { input, output, pattern } of CONVERSIONS) {
    const inputDir = join(rootDir, input);
    const outputDir = join(rootDir, output);

    try {
      const files = await readdir(inputDir);
      const pngFiles = files.filter((f) => pattern.test(f));

      console.log(`Converting ${pngFiles.length} frames in ${input}...`);

      let count = 0;
      for (const file of pngFiles) {
        const match = file.match(pattern);
        if (!match) continue;
        const num = match[1].padStart(3, '0');
        const inputPath = join(inputDir, file);
        const outputPath = join(outputDir, `frame-${num}.webp`);
        await convertFrame(inputPath, outputPath);
        count++;
        if (count % 50 === 0) {
          console.log(`  ${count}/${pngFiles.length} converted`);
        }
      }
      console.log(`  Done: ${count} WebP files in ${output}`);
    } catch (err) {
      if (err.code === 'ENOENT') {
        console.log(`Skipping ${input} - directory not found`);
      } else {
        throw err;
      }
    }
  }
}

main().catch((err) => {
  console.error('Frame conversion failed:', err);
  process.exit(1);
});
