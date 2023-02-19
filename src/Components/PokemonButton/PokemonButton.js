import pokemonMapping from '../../data/pokemonMapping.json';
export default function PokemonButton({ pokemonName }) {

  const handleClick = (e) => {
    const clickedPokemon = e.target.value;
    const pokedexNumber = pokemonMapping[clickedPokemon];
    console.log(pokedexNumber)
  }

  return (
    <button
      key={pokemonName}
      value={pokemonName}
      onClick={handleClick}
    >
      {pokemonName}
    </button>
  );
}