
import PokemonButton from './Components/PokemonButton/PokemonButton';
import pokemonMapping from './data/pokemonMapping.json';
import PokemonTree from './util/TrieTree';
import { useCallback, useState, useEffect } from 'react';
import './App.css';

function App() {
  const [input, setInput] = useState('');
  const [pokemonResults, setPokemonResults] = useState([]);
  const [copyable, setCopyable] = useState('');

  useEffect(() => {
    const pokemonResults = PokemonTree.getPokemonStartingWith(input);
    // if the user hasn't typed anything yet, don't show every possible pokemon
    // if we don't have any pokemon results, meaning there are no pokemon starting with the supplied string, set the results to be a blank array
    if (input === '' || !pokemonResults) {
      setPokemonResults([]);
      return;
    }
    setPokemonResults(pokemonResults);
  }, [input]);

  const handleTextChange = useCallback((e) => {
    if (e.target.name === 'searchPokemon') {
      setInput(e.target.value);
    } else if (e.target.name === 'pokemonDexNumbers') {
      setCopyable(e.target.value);
    }
  }, []);

  // passed to pokemon buttons to allow them to modify the copyable input state
  const handleClick = useCallback((e) => {
    const clickedPokemon = e.target.value;
    const pokedexNumber = pokemonMapping[clickedPokemon];
    if (copyable === '') {
      setCopyable(pokedexNumber);
    } else {
      setCopyable(copyable + ', ' + pokedexNumber);
    }
  }, [copyable]);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(copyable);
  }, [copyable]);

  return (
    <div>
      <div>
        <input value={copyable} onChange={handleTextChange} name="pokemonDexNumbers" className="copyable"></input>
      </div>
      <button onClick={handleCopy} className="copy">
        Copy dex numbers
      </button>
      <input value={input} onChange={handleTextChange} name="searchPokemon"></input>
      {pokemonResults.map((e) => {
        return (
          <PokemonButton
            handleClick={handleClick}
            pokemonName={e}
          />);
      })}
    </div>
  );
}

export default App;
