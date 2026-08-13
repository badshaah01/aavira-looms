const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const rawDir = path.join(__dirname, '..', 'public', 'images', 'rooms-raw');
const outDir = path.join(__dirname, '..', 'public', 'images', 'rooms');

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

async function processImages() {
  const files = fs.readdirSync(rawDir).filter(f => f.endsWith('.png'));
  console.log(`Found ${files.length} PNGs to process.`);

  for (const file of files) {
    const rawPath = path.join(rawDir, file);
    const baseName = path.basename(file, '.png');
    const outPath = path.join(outDir, `${baseName}.jpg`);

    const info = await sharp(rawPath)
      .resize({ width: 1000, height: 1000, fit: 'inside', withoutEnlargement: true })
      .jpeg({ quality: 80 })
      .toFile(outPath);
      
    const sizeKB = (info.size / 1024).toFixed(2);
    console.log(`Processed ${baseName}.jpg - Size: ${sizeKB}KB`);
  }
}

processImages().catch(console.error);
