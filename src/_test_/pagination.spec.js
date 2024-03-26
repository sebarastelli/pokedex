import { updatePagination, setPage } from '../modules/pagination';
import {jest} from "@jest/globals";
import { loadPokemons } from '../modules/pokemonLoader';


let currentPage;

describe('Pagination Functions', () => {
  beforeEach(() => {
    // Crea los elementos HTML necesarios para las pruebas
    document.body.innerHTML = `
      <div class="pagination">
        <button id="prevPage"></button>
        <button id="nextPage"></button>
      </div>
    `;
  });

  test('updatePagination should update pagination elements correctly', () => {
    // Configura el estado inicial
    currentPage = 0;

    // Llama a la función que quieres probar
    updatePagination();

    // Realiza las afirmaciones (assertions) sobre los cambios esperados en el DOM
    expect(document.querySelectorAll('.page-item').length).toBe(7); // 7 pages + prev + next
    expect(document.querySelector('.active').textContent).toBe('1'); // currentPage = 0

    // Aquí puedes agregar más aserciones según sea necesario
  });

  test('setPage should update currentPage and call loadPokemons with correct parameters', () => {
    // Configura el estado inicial

    jest.mock("../modules/pokemonLoader")
    currentPage = 0;
    const mockOffset = 0;
    const mockPerPage = 20;

    // Simula loadPokemons para verificar si se llama con los parámetros correctos
    
    const loadPokemonsMock = loadPokemons()
    console.log(loadPokemonsMock)
    // Llama a la función que quieres probar
    setPage(1);

    // Realiza las afirmaciones (assertions)
    expect(currentPage).toBe(1); // currentPage actualizado

    // Verifica si loadPokemons fue llamado con los parámetros correctos
    expect(loadPokemonsMock).toHaveBeenCalledWith(mockOffset + mockPerPage, mockPerPage);

    // Restaura el espía después de la prueba
    loadPokemonsMock.mockRestore();

    // Aquí puedes agregar más aserciones según sea necesario
  });
});