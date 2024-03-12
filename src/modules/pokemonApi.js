const URL = "https://pokeapi.co/api/v2";

export async function getPokemon(id, offset = 0) {
    const pokemonURL = `${URL}/pokemon/${id + offset}/`;
    try {
      const response = await fetch(pokemonURL);
      const pokemon = await response.json();
      return pokemon;
    } catch (error) {
      console.error(error);
    }
  }