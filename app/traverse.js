const fs = require('fs');
const path = require('path');

async function traverse(inputPath, editFile) {
    console.log(inputPath);
    const items = fs.readdirSync(inputPath);
    console.dir(items);
    for(let item in items) {
        console.log(items[item]);
        // Construct the full path of the item
    const fullPath = path.join(inputPath, items[item]);

    // Check if the item is a file or a folder
    const isFile = fs.statSync(fullPath).isFile();
    const isDirectory = fs.statSync(fullPath).isDirectory();
        if(isFile) {
            return await editFile(fullPath);
        } else if(isDirectory) {
            traverse(fullPath, editFile);
        } else {
            return;
        }
    }
}

module.exports = traverse;
