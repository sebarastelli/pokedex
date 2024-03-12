import { getPokemon } from './pokemonApi.js';
import { createCard } from './card.js';

export async function loadPokemons(offset, quantity) {
  const $pokemonContainer = document.querySelector("#pokemonContainer");
  $pokemonContainer.innerHTML = "";
  for (let i = 1; i <= quantity; i++) {
    await getPokemon(i, offset).then((pokemonResponse) => {
      if (
        pokemonResponse &&
        pokemonResponse.sprites &&
        pokemonResponse.sprites.other &&
        pokemonResponse.sprites.other["official-artwork"]
      ) {
        const {
          name: pokemonName,
          sprites: {
            other: {
              "official-artwork": { front_default: pokemonUrl },
            },
          },
          types: pokemonTypes,
          stats: stats,
        } = pokemonResponse;

        const $card = createCard(
          pokemonName,
          pokemonUrl,
          pokemonTypes.map((item) => item.type.name),
          stats,
        );
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