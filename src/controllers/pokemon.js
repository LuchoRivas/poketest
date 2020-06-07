// const pokeService = require('../services/pokemon');
const Pokedex = require('pokedex-promise-v2');
const P = new Pokedex();

/**
 * Retrieves a pokemon by name.
 */
module.exports.getPokeByName = async (req, res, next) => {
    try {
        const pokemonSearch = req.params.pokemon.toLowerCase();
        const pokemon = await P.getPokemonByName(pokemonSearch);
        const pokemon_getSpecies = await P.getPokemonSpeciesByName(pokemonSearch);
        const pokemon_es_description = pokemon_getSpecies && pokemon_getSpecies.flavor_text_entries.filter(p => p.language.name === "es");
        pokemon.species = pokemon_es_description;
        return res.json(pokemon);
    }
    catch (err) {
        return next(err);
    }
};