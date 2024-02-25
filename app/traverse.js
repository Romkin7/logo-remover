const fs = require('fs');
const path = require('path');

async function traverse(inputPath, editFile) {
    const items = fs.readdirSync(inputPath);
    await Promise.all(
        items.filter((item) => !item.includes('MEASURES')).map(async (item) => {
            console.log(item);
            // Construct the full path of the item
            const fullPath = path.join(inputPath, item);

            // Check if the item is a file or a folder
            const isFile = fs.statSync(fullPath).isFile();
            const isDirectory = fs.statSync(fullPath).isDirectory();
            if (isFile) {
                    await editFile(fullPath, item);
                } else if (isDirectory) {
                    traverse(fullPath, editFile);
                } else {
                    return;
                }
        }),
    );
}

module.exports = traverse;
