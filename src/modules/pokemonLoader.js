import { getPokemons } from "./pokemonApi.js";
import { createCard } from "./card.js";

export async function loadPokemons(offset, quantity) {
  const $pokemonContainer = document.querySelector("#pokemonContainer");
  $pokemonContainer.innerHTML = "";

  const pokemons = await getPokemons(offset, quantity);

  pokemons.forEach((pokemon) => {
    const $card = createCard(pokemon);
    $pokemonContainer.appendChild($card);
  });
}
