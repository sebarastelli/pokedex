import { createCard } from "../modules/card.js";

describe("createCard function", () => {
  test("should create a card element with the provided data", () => {
    const pokemonName = "Pikachu";
    const pokemonUrl = "https://example.com/pikachu.jpg";
    const pokemonTypes = ["electric"];
    const stats = [
      { stat: { name: "speed" }, base_stat: 90 },
      { stat: { name: "attack" }, base_stat: 55 },
    ];

    const cardElement = createCard(
      pokemonName,
      pokemonUrl,
      pokemonTypes,
      stats
    );

    expect(cardElement.tagName).toBe("DIV");
    expect(cardElement.classList.contains("card")).toBe(true);
    expect(cardElement.querySelector(".card-title").textContent).toBe(
      pokemonName
    );
    expect(cardElement.querySelector(".card-img-top").getAttribute("src")).toBe(
      pokemonUrl
    );
    expect(cardElement.querySelector(".card-subtitle").textContent).toContain(
      pokemonTypes[0]
    );
  });
});
