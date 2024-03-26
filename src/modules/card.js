export function createCard(pokemonName, pokemonUrl, pokemonTypes,stats) {
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
      dragon: `bg-dragon`
    };
    const statsList = stats.map((stat) => `<li class="col-md-6">${stat.stat.name}: <span class="fw-bold">${stat.base_stat}</span></li>`).join('');
  
  
    const cardBone = `<img src="${pokemonUrl}" alt="${pokemonName}" class="card-img-top">
          <div class="card-body">
              <h3 class="card-title text-center h1">${pokemonName}</h3>
              <h4 class="card-subtitle h5 text-center">
                  ${pokemonTypes.map((type) => `<span class=" mx-2 rounded px-1 ${typeClasses[type] || ''}">${type}</span>`).join('')}
              </h4>
          </div>`;
  
    const cardModel =  `<div class="d-flex flex-column">
    <img src=${pokemonUrl} alt=""/>
    <div class="d-flex justify-content-center align-items-center"><h1>${pokemonName}</h1> ${pokemonTypes.map((type) => `<span class=" mx-2 rounded px-1 ${typeClasses[type] || ''}">${type}</span>`).join('')}</div>
    <div>
    <ul class="row list-unstyled text-center statsList">${statsList}</ul>
    </div>
    </div>`
    
    const $card = document.createElement("div");
    $card.innerHTML = cardBone;
    $card.className = `card shadow-sm`;
    $card.addEventListener(`click`, () => displayCardModel(cardModel));
    return $card;
  }
  
 export function displayCardModel(cardModel) {
    const $modelContainer = document.getElementById('modelContainer');
    $modelContainer.innerHTML = cardModel;
    $(window).scrollTop(0);
  }
