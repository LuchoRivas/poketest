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
        return res.json(pokemon);
    }
    catch (err) {
        return next(err);
    }
};