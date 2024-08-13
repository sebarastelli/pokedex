function createCard(e){let t={grass:"bg-success",fire:"bg-danger",water:"bg-primary",poison:"bg-purple text-light",flying:"bg-orange",fairy:"bg-pink",normal:"bg-secondary",electric:"bg-info",ground:"bg-dark text-light",bug:"bg-brown text-light",steel:"bg-steel",psychic:"bg-psychic",ghost:"bg-ghost",ice:"bg-ice",fighting:"bg-fighting",rock:"bg-rock",dark:"bg-black text-white",dragon:"bg-dragon"};var a=e.stats.map(e=>`<li class="col-md-6">${e.stat.name}: <span class="fw-bold">${e.base_stat}</span></li>`).join(""),s=e.types.map(e=>e.type.name),n=`<img src="${e.sprites.front_default}" alt="${e.name}" class="card-img-top">
        <div class="card-body">
            <h3 class="card-title text-center h1">${e.name}</h3>
            <h4 class="card-subtitle h5 text-center">
                ${s.map(e=>`<span class=" mx-2 rounded px-1 ${t[e]||""}">${e}</span>`).join("")}
            </h4>
        </div>`;let i=`<div class="d-flex flex-column">
  <img src="${e.sprites.front_default}" alt=""/>
  <div class="d-flex justify-content-center align-items-center p-5"><h1>${e.name}</h1> ${s.map(e=>`<span class=" mx-2 rounded px-1 ${t[e]||""}">${e}</span>`).join("")}</div>
  <div>
  <ul class="row list-unstyled text-center statsList">${a}</ul>
  </div>
  </div>`;e=document.createElement("div");return e.innerHTML=n,e.className="card shadow-sm",e.addEventListener("click",()=>displayCardModel(i)),e}function displayCardModel(e){document.getElementById("modelContainer").innerHTML=e,$(window).scrollTop(0)}export{createCard,displayCardModel};