const URL = "https://pokeapi.co/api/v2";

export async function getPokemons(offset = 0, limit = 20) {
  const pokemonsURL = `${URL}/pokemon?limit=${limit}&offset=${offset}`;
  try {
    const response = await fetch(pokemonsURL);
    const data = await response.json();
    const pokemonBasicData = data.results.map((pokemonSummary, index) => {
      const pokemonId = offset + index + 1;
      return {
        name: pokemonSummary.name,
        sprites: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`, // Usamos la URL base para la imagen
        types: [],
      };
    });
    return pokemonBasicData;
  } catch (error) {
    console.error(error);
  }
}

export async function getPokemonDetails(pokemonName) {
  try {
    const response = await fetch(`${URL}/pokemon/${pokemonName}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}
