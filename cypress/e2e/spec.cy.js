const URL = "http://192.168.100.82:8080";

context("validarPokedex", ()=>{
  beforeEach(()=>{
    cy.visit(URL)
  })
  describe("validacion pokedex", () => {
    it("validar que aparezcan los sprites de los pokemons en pantalla", () => {
      cy.wait(7000)
      cy.get("#pokemonContainer .card").should("have.length",20)

    });
    it("validar que aparezcan modelo al hacer click", () => {
      cy.get("#pokemonContainer .card").first().click()
      cy.wait(5000)
      cy.get("#modelContainer .d-flex").should("exist");
      cy.get("#modelContainer li").should("have.length", 6)
    })
    it("comprobar que se borran los sprites al pasar página", ()=>{
      let spritesOriginales = [];
      let spritesNuevos = [];
      cy.wait(5000)
      cy.get("#pokemonContainer .card img").then((sprites)=>{
        
        sprites.each((i, spr)=>{
          spritesOriginales.push(spr.getAttribute("src"))
        })
      })

      cy.wait(12000)
      cy.get("#nextPage").click()
      cy.wait(8000)
      cy.get("#pokemonContainer .card img").then((sprites)=>{
        
        sprites.each((i, spr)=>{
          spritesNuevos.push(spr.getAttribute("src"))
        })
      })

      cy.wrap(spritesOriginales).should("not.deep.equals", spritesNuevos)
    })
    it("Comprobar modelo en segunda página", ()=>{
      cy.get('#pokemonContainer').eq(0).click()
      cy.get("#modelContainer").should("exist")      
    })
   });
})