const fs = require('fs');
const path = require('path');

const directory = 'c:/Users/Rupak/Downloads/Enqueue-website-main/Enqueue-website-main';

const replacements = [
    { old: /Enqueue/g, new: 'Enqueue' },
    { old: /enqueue/g, new: 'enqueue' },
    { old: /ENQUEUE/g, new: 'ENQUEUE' },
    { old: /RUPAK B/g, new: 'RUPAK B' },
    { old: /Mr\.P\.D\.Rupak/g, new: 'Mr. Rupak B' },
    { old: /Rupak/g, new: 'Rupak' }
];

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(function(file) {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            if (!file.includes('node_modules') && !file.includes('.git') && !file.includes('.next')) {
                results = results.concat(walk(file));
            }
        } else {
            if (file.match(/\.(ts|tsx|js|jsx|json|md|css)$/)) {
                results.push(file);
            }
        }
    });
    return results;
}

const files = walk(directory);
files.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    let newContent = content;
    replacements.forEach(r => {
        newContent = newContent.replace(r.old, r.new);
    });
    if (newContent !== content) {
        fs.writeFileSync(file, newContent, 'utf8');
        console.log('Updated ' + file);
    }
});
