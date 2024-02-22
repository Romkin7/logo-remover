const traverse = require('./app/traverse');
const editFile = require('./app/editFile');

const inputPath = __dirname + '/input';
traverse(inputPath, editFile);
