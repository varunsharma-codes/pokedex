import axios from 'axios';
import {
  GET_PAGINATED_POKEMONS_URL,
  GET_POKEMON_BY_ID_OR_NAME_URL,
} from './uri';

export class PokedexApi {
  /**
   * @param {number} offset Start index of the pokemon
   * @param {number} limit Number of pokemons to fetch
   * @description Get the paginated list of pokemon based on offset and limit
   */
  static async getPaginatedPokemonList(offset = 0, limit = 20) {
    try {
      const response = await axios.get(
        GET_PAGINATED_POKEMONS_URL(offset, limit)
      );
      const pokemonList = response.data.results.map(i => ({
        name: i.name,
        id: i.url.substring(34, i.url.length - 1),
      }));
      return pokemonList;
    } catch (e) {
      console.error('Error occured while fetching list of pokemons: ', e);
    }
  }

  /**
   * @param {string} idOrName ID or Name of the pokemon
   * @description Get the pokemon by its pokedex id or name
   */
  static async getPokemon(idOrName) {
    try {
      const response = await axios.get(GET_POKEMON_BY_ID_OR_NAME_URL(idOrName));
      return response.data;
    } catch (e) {
      console.error('Error occured while fetching pokemon: ', e);
    }
  }
}
