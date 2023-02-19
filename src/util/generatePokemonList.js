const fs = require('fs');

const file = fs.readFileSync('../data/data.csv', 'utf8');
const lines = file.split('\n');

const pokemonNames = [];

for (let i = 1; i < lines.length; i++) {
  const line = lines[i].split(',');
  const pokemonName = line[3].trim();
  if (!pokemonNames.includes(pokemonName) && !(pokemonName.slice(0, 5) === 'Mega ')) {
    pokemonNames.push(pokemonName);
  }
}

fs.writeFileSync('pokemonNames.json', JSON.stringify(pokemonNames), (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('pokemon names file created succesfully');
  }
});