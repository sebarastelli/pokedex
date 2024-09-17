describe("Pokedex", () => {
  beforeEach(() => {
    cy.intercept(
      "GET",
      "https://pokeapi.co/api/v2/pokemon?limit=20&offset=0",
      { fixture: "listado1" }
    ).as("obtenerPrimeraPagina");

    cy.visit("http://127.0.0.1:8080");
  });

  it("Carga la primer página", () => {
    const POKEMON_POR_PAGINA = 20;

    cy.get(".page-item:nth(0)").should("have.class", "disabled");

    cy.get(".page-item:last").should("not.have.class", "disabled");

    cy.get("#pokemonContainer .card").should("have.length", POKEMON_POR_PAGINA);
  });

  it("Usa el paginador", () => {
    cy.intercept(
      "GET",
      "https://pokeapi.co/api/v2/pokemon?limit=20&offset=0",
      { fixture: "listado1" }
    ).as("obtenerPrimeraPagina");

    cy.intercept(
      "GET",
      "https://pokeapi.co/api/v2/pokemon?limit=20&offset=20",
      { fixture: "listado2" }
    ).as("obtenerSegundaPagina");

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
