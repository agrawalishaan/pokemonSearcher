export default function PokemonButton({ handleClick, pokemonName }) {

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