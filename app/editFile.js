const sharp = require('sharp');

async function editFile(inputPath) {
// Input and output file paths
const outputPath = './output/BIANCA_NATURAL_1.jpg';

const imageStats = fs.fileSync(inputPath);

const imageWidth = imageStats.width;
const imageHeight = imageStats.height;

const logoWidth = 800;
const logoHeight = 400;

// Coordinates and dimensions of the area to be removed (logo position)
const logoArea = {
  left: imageWidth - logoWidth,
  top: imageHeight - logoHeight,
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

module.export = editFile;

  