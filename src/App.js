
import PokemonButton from './Components/PokemonButton/PokemonButton';
import PokemonTree from './util/TrieTree';
import { useCallback, useState, useEffect } from 'react';

function App() {
  const [inputState, setInputState] = useState('');
  const [pokemonResults, setPokemonResults] = useState([]);

  useEffect(() => {
    const pokemonResults = PokemonTree.getPokemonStartingWith(inputState);
    // if the user hasn't typed anything yet, don't show every possible pokemon
    // if we don't have any pokemon results, meaning there are no pokemon starting with the supplied string, set the results to be a blank array
    if (inputState === '' || !pokemonResults) {
      setPokemonResults([]);
      return;
    }
    setPokemonResults(pokemonResults);
  }, [inputState]);

  const handleTextChange = useCallback((e) => {
    setInputState(e.target.value);
  }, []);

  return (
    <div>
      <input value={inputState} onChange={handleTextChange}></input>
      {pokemonResults.map((e) => {
        return (
          <PokemonButton
            key={e}
            pokemonName={e}
          />);
      })}
    </div>
  );
}

export default App;
