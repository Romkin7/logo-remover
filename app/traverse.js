const fs = require('fs');
const path = require('path');

async function traverse(inputPath, editFile) {
    const items = fs.readdirSync(inputPath);
    for(let item in items) {
        // Construct the full path of the item
    const fullPath = path.join(inputPath, item);

    // Check if the item is a file or a folder
    const isFile = fs.statSync(fullPath).isFile();
    const isDirectory = fs.statSync(fullPath).isDirectory();
        if(isFile) {
            return await editFile(item);
        } else if(isDirectory) {
            traverse(item, editFile);
        } else {
            return;
        }
    }
}

module.exports = traverse;
