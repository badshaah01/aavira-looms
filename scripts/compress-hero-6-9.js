const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const rawDir = path.join(process.cwd(), "public/images/hero-raw");
const destDir = path.join(process.cwd(), "public/images/hero");

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

async function processImages() {
  try {
    for (let i = 6; i <= 9; i++) {
      const inputName = `hero-${i}.png`;
      const outputName = `hero-${i}.jpg`;
      const inputPath = path.join(rawDir, inputName);
      const outputPath = path.join(destDir, outputName);

      if (fs.existsSync(inputPath)) {
        console.log(`Processing ${inputName}...`);
        await sharp(inputPath)
          .resize(1920, null, { withoutEnlargement: true })
          .jpeg({ quality: 80 })
          .toFile(outputPath);
        console.log(`${outputName} successfully resized and compressed.`);
      } else {
        console.warn(`File not found: ${inputName}`);
      }
    }
  } catch (error) {
    console.error("Error processing images:", error);
  }
}

processImages();
