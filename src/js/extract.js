const fs = require('fs');
const lines = fs.readFileSync('index.html', 'utf-8').split('\n');

const cssLines = lines.slice(29, 1197);
fs.writeFileSync('style.css', cssLines.join('\n'));

const jsLines = lines.slice(1626, 3535);
fs.writeFileSync('app.js', jsLines.join('\n'));
