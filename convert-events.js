import sharp from 'sharp';
import { readdirSync, statSync, mkdirSync, existsSync } from 'fs';
import { join } from 'path';

const MAX_WIDTH = 1920;
const QUALITY = 90;

const INPUT_BASE = 'public/event';
const OUTPUT_BASE = 'public/images/events';

function optimizeImage(inputPath, outputPath) {
  const originalSize = statSync(inputPath).size;

  return sharp(inputPath)
    .resize(MAX_WIDTH, null, {
      withoutEnlargement: true,
      fit: 'inside'
    })
    .webp({ quality: QUALITY, effort: 6 })
    .toFile(outputPath)
    .then(() => {
      const optimizedSize = statSync(outputPath).size;
      const savedMB = ((originalSize - optimizedSize) / 1024 / 1024).toFixed(2);
      const percent = (((originalSize - optimizedSize) / originalSize) * 100).toFixed(1);
      console.log(`  ✓ ${inputPath.split('\\').pop()}: ${(originalSize/1024/1024).toFixed(2)}MB → ${(optimizedSize/1024).toFixed(0)}KB (${percent}%)`);
      return { original: originalSize, optimized: optimizedSize };
    })
    .catch(err => {
      console.error(`  ✗ Error: ${inputPath.split('\\').pop()}: ${err.message}`);
      return { original: 0, optimized: 0 };
    });
}

async function processEventFolder(eventName, inputFolder, outputFolder) {
  // Create output folder
  if (!existsSync(outputFolder)) {
    mkdirSync(outputFolder, { recursive: true });
  }

  const files = readdirSync(inputFolder)
    .filter(f => /\.(jpg|jpeg|png|webp)$/i.test(f));

  let totalOriginal = 0;
  let totalOptimized = 0;

  for (const file of files) {
    const inputPath = join(inputFolder, file);
    const outputPath = join(outputFolder, file.replace(/\.(jpg|jpeg|png)$/i, '.webp'));

    const result = await optimizeImage(inputPath, outputPath);
    totalOriginal += result.original;
    totalOptimized += result.optimized;
  }

  return { totalOriginal, totalOptimized, count: files.length };
}

async function main() {
  console.log('\n🎉 Event Images Optimization\n');
  console.log(`Input: ${INPUT_BASE}/`);
  console.log(`Output: ${OUTPUT_BASE}/\n`);
  console.log(`Settings: Max ${MAX_WIDTH}px width, ${QUALITY}% quality\n`);

  // Get all event folders
  const eventFolders = readdirSync(INPUT_BASE).filter(item => {
    const itemPath = join(INPUT_BASE, item);
    return statSync(itemPath).isDirectory();
  });

  let grandTotal = { totalOriginal: 0, totalOptimized: 0, count: 0 };

  for (const eventFolder of eventFolders) {
    const inputFolder = join(INPUT_BASE, eventFolder);
    const outputFolder = join(OUTPUT_BASE, eventFolder);

    console.log(`\n📁 ${eventFolder}:\n`);
    const result = await processEventFolder(eventFolder, inputFolder, outputFolder);

    grandTotal.totalOriginal += result.totalOriginal;
    grandTotal.totalOptimized += result.totalOptimized;
    grandTotal.count += result.count;

    const savedMB = ((result.totalOriginal - result.totalOptimized) / 1024 / 1024).toFixed(2);
    console.log(`\n  Summary: ${result.count} images, saved ${savedMB}MB\n`);
  }

  console.log('\n' + '='.repeat(50));
  console.log('🎉 TOTAL RESULTS:');
  console.log(`  Total events: ${eventFolders.length}`);
  console.log(`  Total images: ${grandTotal.count}`);
  console.log(`  Original size: ${(grandTotal.totalOriginal / 1024 / 1024).toFixed(2)}MB`);
  console.log(`  Optimized size: ${(grandTotal.totalOptimized / 1024 / 1024).toFixed(2)}MB`);
  console.log(`  Total saved: ${((grandTotal.totalOriginal - grandTotal.totalOptimized) / 1024 / 1024).toFixed(2)}MB`);
  console.log(`  Reduction: ${(((grandTotal.totalOriginal - grandTotal.totalOptimized) / grandTotal.totalOriginal) * 100).toFixed(1)}%`);
  console.log('='.repeat(50) + '\n');

  console.log('✅ All event images converted to WebP and optimized!\n');
  console.log('📁 Event folders created:');
  eventFolders.forEach(folder => console.log(`   - ${OUTPUT_BASE}/${folder}/`));
}

main().catch(console.error);
