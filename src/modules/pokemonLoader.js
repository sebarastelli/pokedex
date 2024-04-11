import { getPokemon } from './pokemonApi.js';
import { createCard } from './card.js';
import Pokemon from "../clases/pokemon.js";

export async function loadPokemons(offset, quantity) {
  const $pokemonContainer = document.querySelector("#pokemonContainer");
  $pokemonContainer.innerHTML = "";
  for (let i = 1; i <= quantity; i++) {
    await getPokemon(i, offset).then((pokemonResponse) => {
      if (pokemonResponse) {
        const pokemon = new Pokemon(
          pokemonResponse.name,
          pokemonResponse.sprites,
          pokemonResponse.weight,
          pokemonResponse.height,
          pokemonResponse.stats,
          pokemonResponse.types
        );
        console.log(pokemon)
        const $card = createCard(pokemon);
        $pokemonContainer.appendChild($card);
      } else {
        console.error(
          "La estructura de la respuesta del Pokémon no es la esperada:",
          pokemonResponse
        );
      }
    });
  }
}