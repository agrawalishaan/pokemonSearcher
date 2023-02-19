const fs = require('fs');

const file = fs.readFileSync('../data/data.csv', 'utf8');
const lines = file.split('\n');
// console.log(lines);

const pokemonMap = {};

for (let i = 1; i < lines.length; i++) {
  const line = lines[i].split(',');
  const dexNumber = line[0].trim();
  const pokemonName = line[3].trim();
  if (pokemonName.slice(0, 5) === 'Mega ') {
    continue;
  }
  pokemonMap[pokemonName.toLowerCase()] = dexNumber;
}

console.log(pokemonMap);
fs.writeFile('pokemonMapping.json', JSON.stringify(pokemonMap), (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('file written successfully');
  }
})