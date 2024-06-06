import { getPokemon } from "../modules/pokemonApi.js";
import { jest } from "@jest/globals";

global.jest = jest;

describe("getPokemon function", () => {
  test("should fetch a Pokemon from the API", async () => {
    const mockResponse = {
      id: 25,
      name: "Pikachu",
      types: [{ type: { name: "Electric" } }],
    };

    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockResponse),
    });

    const pokemon = await getPokemon(25);

    expect(pokemon).toEqual(mockResponse);

    expect(fetch).toHaveBeenCalledWith("https://pokeapi.co/api/v2/pokemon/25/");
  });
});
