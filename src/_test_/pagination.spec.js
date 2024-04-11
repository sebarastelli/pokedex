import { updatePagination, setPage } from "../modules/pagination";
import { jest } from "@jest/globals";
import { loadPokemons } from "../modules/pokemonLoader";

let currentPage;

describe("Pagination Functions", () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div class="pagination">
        <button id="prevPage"></button>
        <button id="nextPage"></button>
      </div>
    `;
  });

  test("updatePagination should update pagination elements correctly", () => {
    currentPage = 0;

    updatePagination();

    expect(document.querySelectorAll(".page-item").length).toBe(7);
    expect(document.querySelector(".active").textContent).toBe("1");
  });

  test("setPage should update currentPage and call loadPokemons with correct parameters", () => {
    jest.mock("../modules/pokemonLoader");
    currentPage = 0;
    const mockOffset = 0;
    const mockPerPage = 20;

    const loadPokemonsMock = loadPokemons();
    console.log(loadPokemonsMock);

    setPage(1);

    expect(currentPage).toBe(1);

    expect(loadPokemonsMock).toHaveBeenCalledWith(
      mockOffset + mockPerPage,
      mockPerPage
    );

    loadPokemonsMock.mockRestore();
  });
});
