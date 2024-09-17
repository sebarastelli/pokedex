import { getPokemonDetails } from "./pokemonApi.js";
export function createCard(pokemon) {
  const cardTemplate = `
    <img src="${pokemon.sprites}" alt="${pokemon.name}" class="card-img-top">
    <div class="card-body">
      <h3 class="card-title text-center h1">${pokemon.name}</h3>
    </div>
  `;

  const $card = document.createElement("div");
  $card.innerHTML = cardTemplate;
  $card.className = "card shadow-sm";

  $card.addEventListener("click", async () => {
    const pokemonDetails = await getPokemonDetails(pokemon.name);
    displayCardModel(pokemonDetails);
  });

  return $card;
}

export function displayCardModel(pokemonDetails) {
  const typeClasses = {
    grass: "bg-success",
    fire: "bg-danger",
    water: "bg-primary",
    poison: `bg-purple text-light`,
    flying: `bg-orange`,
    fairy: `bg-pink`,
    normal: `bg-secondary`,
    electric: `bg-info`,
    ground: `bg-dark text-light`,
    bug: `bg-brown text-light`,
    steel: `bg-steel`,
    psychic: `bg-psychic`,
    ghost: `bg-ghost`,
    ice: `bg-ice`,
    fighting: `bg-fighting`,
    rock: `bg-rock`,
    dark: `bg-black text-white`,
    dragon: `bg-dragon`,
  };

  const pokemonTypes = pokemonDetails.types.map((typeObj) => typeObj.type.name);
  const statsList = pokemonDetails.stats
    .map(
      (stat) =>
        `<li class="col-md-6">${stat.stat.name}: <span class="fw-bold">${stat.base_stat}</span></li>`
    )
    .join("");

  const cardModel = `
    <div class="d-flex flex-column">
      <img src="${pokemonDetails.sprites.front_default}" alt="${
    pokemonDetails.name
  }"/>
      <div class="type d-flex justify-content-center align-items-center p-5">
        <h1>${pokemonDetails.name}</h1> 
        ${pokemonTypes
          .map(
            (type) =>
              `<span class="mx-2 rounded px-1 ${
                typeClasses[type] || ""
              }">${type}</span>`
          )
          .join("")}
      </div>
      <div>
        <ul class="row list-unstyled text-center">${statsList}</ul>
      </div>
    </div>
  `;

  const $modelContainer = document.getElementById("modelContainer");
  $modelContainer.innerHTML = cardModel;
  $(window).scrollTop(0);
}
