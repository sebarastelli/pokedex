describe("Pokedex", () => {
  let fetchPolyfill;

  before(() => {
    const polyfillUrl = "https://unpkg.com/unfetch/dist/unfetch.umd.js";

    cy.request(polyfillUrl).then((response) => {
      fetchPolyfill = response.body;
    });

    cy.intercept(
      "GET",
      "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20",
      { fixture: "listado1" }
    ).as("obtenerPrimeraPagina");

    cy.visit("http://127.0.0.1:8080", {
      onBeforeLoad(contentWindow) {
        contentWindow.eval(fetchPolyfill);
        contentWindow.fetch = contentWindow.unfetch;
      },
    });
  });

  it("Carga la primer página", () => {
    const POKEMON_POR_PAGINA = 20;

    cy.get(".page-item:nth(0)").should("have.class", "disabled");

    cy.get(".page-item:last").should("not.have.class", "disabled");

    cy.get("#pokemonContainer .card").should("have.length", POKEMON_POR_PAGINA);
  });

  it("Usa el paginador", () => {
    cy.visit("http://127.0.0.1:8080");
    cy.intercept(
      "GET",
      "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20",
      { fixture: "listado1" }
    ).as("obtenerPrimeraPagina");

    cy.intercept(
      "GET",
      "https://pokeapi.co/api/v2/pokemon/?offset=20&limit=20",
      { fixture: "listado2" }
    ).as("obtenerSegundaPagina");

    cy.intercept(
      "GET",
      "https://pokeapi.co/api/v2/pokemon/?offset=960&limit=20",
      { fixture: "listado49" }
    ).as("obtenerUltimaPagina");

    cy.get(".pagination #prevPage")
      .as("paginaAnterior")
      .should("have.class", "disabled");
    cy.get(".pagination #nextPage").as("paginaSiguiente").click();

    cy.get("@paginaSiguiente").should("not.have.class", "disabled");

    cy.get("@paginaAnterior").should("not.have.class", "disabled");

    cy.get("@paginaAnterior").click();

    cy.get("@paginaAnterior").should("have.class", "disabled");

    cy.get(".pagination .page-link").eq(1).as("primeraPagina").click();
  });

  it("Carga un pokemon cuando se lo selecciona del índice", () => {
    const CANTIDAD_SPAN = 8;

    cy.visit("http://127.0.0.1:8080");

    cy.intercept("GET", "https://pokeapi.co/api/v2/pokemon/bulbasaur", {
      fixture: "bulbasaur",
    }).as("obtenerBulbasaur");

    cy.get("#modelContainer").as("contenedor").should("not.be.visible");

    cy.get("#pokemonContainer .card").first().click();
    cy.wait(5000);
    cy.get("#modelContainer .d-flex").should("exist");
    cy.get("#modelContainer li").should("have.length", 6);

    cy.get("@contenedor").should("be.visible");

    cy.get("@contenedor").find("span").should("have.length", CANTIDAD_SPAN);
  });
});
