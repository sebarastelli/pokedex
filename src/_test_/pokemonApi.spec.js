// Importa la función getPokemon que quieres probar

import { getPokemon } from '../modules/pokemonApi.js';
import { jest } from '@jest/globals';

global.jest = jest;
// Describe el conjunto de pruebas para la función getPokemon
describe('getPokemon function', () => {
  // Define una prueba específica dentro del conjunto de pruebas
  test('should fetch a Pokemon from the API', async () => {
    // Simula la respuesta de la llamada fetch
    const mockResponse = {
      id: 25,
      name: 'Pikachu',
      types: [{ type: { name: 'Electric' } }],
      // Otros datos de prueba que esperarías recibir del servidor
    };

    // Simula la función fetch con un mock
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockResponse),
    });

    // Llama a la función que quieres probar
    const pokemon = await getPokemon(25);

    // Verifica si el resultado coincide con lo esperado
    expect(pokemon).toEqual(mockResponse);
    // Verifica si fetch fue llamado con el URL correcto
    expect(fetch).toHaveBeenCalledWith('https://pokeapi.co/api/v2/pokemon/25/');
  });
});