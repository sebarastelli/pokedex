const URL = "https://pokeapi.co/api/v2";
let pokePerPage = 20;
let currentPage = 0;

async function getPokemons(id, offset = 0) {
  const pokemonURL = `${URL}/pokemon/${id + offset}/`;
  try {
    const response = await fetch(pokemonURL);
    const pokemon = await response.json();
    return pokemon;
  } catch (error) {
    console.error(error);
  }
}
function createCard(pokemonName, pokemonUrl, pokemonTypes) {
  const typeClasses = {
    grass: 'bg-success',
    fire: 'bg-danger',
    water: 'bg-primary',
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
  };

  const cardBone = `<img src="${pokemonUrl}" alt="${pokemonName}" class="card-img-top">
        <div class="card-body">
            <h3 class="card-title text-center h1">${pokemonName}</h3>
            <h4 class="card-subtitle h5 text-center">
                ${pokemonTypes.map((type) => `<span class=" mx-2 rounded px-1 ${typeClasses[type] || ''}">${type}</span>`).join('')}
            </h4>
        </div>`;
        
  const $card = document.createElement("div");
  $card.innerHTML = cardBone;
  $card.className = `card shadow-sm`;
  
  return $card;
}
async function loadPokemons(offset, quantity) {
  const $pokemonContainer = document.querySelector("#pokemonContainer");
  $pokemonContainer.innerHTML = "";
  for (let i = 1; i <= quantity; i++) {
    await getPokemons(i, offset).then((pokemonResponse) => {
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
        } = pokemonResponse;

        const $card = createCard(
          pokemonName,
          pokemonUrl,
          pokemonTypes.map((item) => item.type.name)
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

function updatePagination() {
  const $prevPage = document.getElementById("prevPage");
  const $nextPage = document.getElementById("nextPage");
  $prevPage.classList.toggle("disabled", currentPage === 0);
  const totalPages = Math.ceil(1000 / pokePerPage);
  $nextPage.classList.toggle("disabled", currentPage === totalPages - 1);
}
function setPage(page) {
  currentPage = page;
  const offset = currentPage * pokePerPage;
  loadPokemons(offset, pokePerPage);
  updatePagination();
}
document.getElementById("prevPage").addEventListener("click", () => {
  if (currentPage > 0) {
    setPage(currentPage - 1);
  }
});
document.getElementById("nextPage").addEventListener("click", () => {
  const totalPages = Math.ceil(1000 / pokePerPage);
  if (currentPage < totalPages - 1) {
    setPage(currentPage + 1);
  }
});

setPage(currentPage);
