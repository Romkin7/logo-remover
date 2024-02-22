const traverse = require('./app/traverse');
const editFile = require('./app/editFile');

const inputPath = './input';
traverse(inputPath, editFile);
