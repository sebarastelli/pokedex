import Pokemon from '../clases/pokemon';

const URL = "https://pokeapi.co/api/v2";

export async function getPokemon(id: number, offset: number = 0): Promise<Pokemon | undefined> {
  const pokemonURL = `${URL}/pokemon/${id + offset}/`;

  try {
    const response = await fetch(pokemonURL);
    const data = await response.json();

    console.log(data);

    const pokemon = new Pokemon(
      data.name,
      data.sprites,
      data.weight,
      data.height,
      data.stats,
      data.types
    );

    return pokemon;
  } catch (error) {
    console.error(error);
  }
}