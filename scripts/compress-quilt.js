const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const imgPath = path.join(process.cwd(), "public/images/categories/quilts.jpg");
const tempPath = path.join(process.cwd(), "public/images/categories/quilts_temp.jpg");

async function processImage() {
  try {
    console.log("Processing quilts.jpg...");
    await sharp(imgPath)
      .resize(1600, null, { withoutEnlargement: true })
      .jpeg({ quality: 80 })
      .toFile(tempPath);
    
    // Replace original
    fs.renameSync(tempPath, imgPath);
    console.log("quilts.jpg successfully resized and compressed.");
  } catch (error) {
    console.error("Error processing image:", error);
  }
}

processImage();
