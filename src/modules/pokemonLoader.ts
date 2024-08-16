import { getPokemon } from './pokemonApi';
import { createCard } from './card';
import Pokemon from '../clases/pokemon';

export async function loadPokemons(offset: number, quantity: number): Promise<void> {
  const $pokemonContainer = document.querySelector<HTMLDivElement>("#pokemonContainer");
  if (!$pokemonContainer) return;

  $pokemonContainer.innerHTML = "";

  for (let i = 1; i <= quantity; i++) {
    try {
      const pokemonResponse = await getPokemon(i, offset);

      if (pokemonResponse) {
        const pokemon = new Pokemon(
          pokemonResponse.name,
          pokemonResponse.sprites,
          pokemonResponse.weight,
          pokemonResponse.height,
          pokemonResponse.stats,
          pokemonResponse.types
        );
        console.log(pokemon);

        const $card = createCard(pokemon);
        $pokemonContainer.appendChild($card);
      } else {
        console.error(
          "La estructura de la respuesta del Pokémon no es la esperada:",
          pokemonResponse
        );
      }
    } catch (error) {
      console.error("Error al obtener el Pokémon:", error);
    }
  }
}