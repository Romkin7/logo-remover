const sharp = require('sharp');
const sizeOf = require('image-size');
const fs = require('fs');

async function editFile(inputPath, fileName) {
// Input and output file paths
const outputPath = `./output/${fileName}`;

const { height, width } = sizeOf(inputPath);

const logoWidth = (width * 0.28);
const logoHeight = (height * 0.12);

// Coordinates and dimensions of the area to be removed (logo position)
const logoArea = {
  left: width - logoWidth,
  top: height - logoHeight,
  width: logoWidth,
  height: logoHeight,
};

// Perform image processing
sharp(inputPath)
  .extract(logoArea)
  .extend({
    ...logoArea,
    background: { r: 255, g: 255, b: 255, alpha: 1 },
  })
  .toBuffer()
  .then((buffer) => {
    // Save the processed image without the logo
    sharp(inputPath)
      .composite([
        {
          input: buffer,
          ...logoArea
        },
      ])
      .toFile(outputPath, (err, info) => {
        if (err) {
          console.error(err);
        } else {
          console.log('Logo removed. Output saved to', outputPath);
        }
      });
  })
  .catch((err) => {
    console.error('Error processing image:', err);
  });
}

module.exports = editFile;

  