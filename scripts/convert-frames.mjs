import sharp from 'sharp';
import { readdir, mkdir } from 'fs/promises';
import { join, resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const rootDir = resolve(dirname(fileURLToPath(import.meta.url)), '..');

// Mobile-optimized widths for different device tiers
const MOBILE_WIDTHS = {
  mobile: 640,    // Small phones
  tablet: 1080,   // Tablets
};

const CONVERSIONS = [
  {
    input: 'public/herosection',
    output: 'public/herosection/webp',
    pattern: /ezgif-frame-(\d+)\.png/,
    widths: { desktop: 1920, ...MOBILE_WIDTHS },
    quality: { desktop: 80, mobile: 70, tablet: 75 },
  },
  {
    input: 'public/footerhero',
    output: 'public/footerhero/webp',
    pattern: /ezgif-frame-(\d+)\.png/,
    widths: { desktop: 1920, ...MOBILE_WIDTHS },
    quality: { desktop: 80, mobile: 70, tablet: 75 },
  },
];

async function convertFrame(inputPath, outputPath, width, quality) {
  await mkdir(dirname(outputPath), { recursive: true });
  await sharp(inputPath)
    .resize(width, null, { withoutEnlargement: true })
    .webp({ quality })
    .toFile(outputPath);
}

async function main() {
  for (const config of CONVERSIONS) {
    const inputDir = join(rootDir, config.input);

    try {
      const files = await readdir(inputDir);
      const pngFiles = files.filter((f) => config.pattern.test(f));

      console.log(`\nProcessing ${pngFiles.length} frames from ${config.input}...`);

      // Create output directories for each size
      for (const size of Object.keys(config.widths)) {
        const outputDir = join(rootDir, `${config.output}-${size}`);
        await mkdir(outputDir, { recursive: true });
      }

      let count = 0;
      for (const file of pngFiles) {
        const match = file.match(config.pattern);
        if (!match) continue;
        const num = match[1].padStart(3, '0');
        const inputPath = join(inputDir, file);

        // Generate frames at each size
        for (const [size, width] of Object.entries(config.widths)) {
          const quality = config.quality[size] || 80;
          const outputPath = join(
            rootDir,
            `${config.output}-${size}`,
            `frame-${num}.webp`
          );
          await convertFrame(inputPath, outputPath, width, quality);
        }

        count++;
        if (count % 20 === 0) {
          console.log(`  ${count}/${pngFiles.length} frames processed`);
        }
      }
      console.log(`  Done: ${count} frames at ${Object.entries(config.widths).map(([k, v]) => `${k}=${v}px`).join(', ')}`);
    } catch (err) {
      if (err.code === 'ENOENT') {
        console.log(`Skipping ${config.input} - directory not found`);
      } else {
        throw err;
      }
    }
  }
  console.log('\nFrame conversion complete!');
}

main().catch((err) => {
  console.error('Frame conversion failed:', err);
  process.exit(1);
});
