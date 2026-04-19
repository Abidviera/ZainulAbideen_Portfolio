import { readdir, rm } from 'fs/promises';
import { join, resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const distDir = join(resolve(dirname(fileURLToPath(import.meta.url)), '..'), 'dist');

const DIRS = ['herosection', 'footerhero'];

async function main() {
  for (const dir of DIRS) {
    const dirPath = join(distDir, dir);
    try {
      const files = await readdir(dirPath);
      const pngFiles = files.filter((f) => f.endsWith('.png'));
      for (const file of pngFiles) {
        await rm(join(dirPath, file), { force: true });
      }
      console.log(`Removed ${pngFiles.length} PNG files from dist/${dir}`);
    } catch (err) {
      if (err.code !== 'ENOENT') console.error(`Error cleaning dist/${dir}:`, err.message);
    }
  }
}

main();
