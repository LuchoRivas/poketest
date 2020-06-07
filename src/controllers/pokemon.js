// const pokeService = require('../services/pokemon');
const Pokedex = require('pokedex-promise-v2');
const P = new Pokedex();

// https://github.com/PokeAPI/pokedex-promise-v2

/**
 * Retrieves a pokemon by name.
 */
module.exports.getPokeByName = async (req, res, next) => {
    try {
        const pokemonSearch = req.params.pokemon.toLowerCase();
        const pokemon = await P.getPokemonByName(pokemonSearch);
        const pokemon_getSpecies = await P.getPokemonSpeciesByName(pokemonSearch);
        const evol_chain_get_id = pokemon_getSpecies.evolution_chain && pokemon_getSpecies.evolution_chain.url.split('/')
        const evol_chain_id = parseInt(evol_chain_get_id[6]);
        const pokemon_evoluton_chain = await P.getEvolutionChainById(evol_chain_id);
        const pokemon_es_description = pokemon_getSpecies && pokemon_getSpecies.flavor_text_entries.filter(p => p.language.name === "es");
        pokemon.species = pokemon_es_description;
        pokemon.evolutions = pokemon_evoluton_chain;
        return res.json(pokemon);
    }
    catch (err) {
        return next(err);
    }
};