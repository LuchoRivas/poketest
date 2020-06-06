// const pokeService = require('../services/pokemon');
const Pokedex = require('pokedex-promise-v2');
const P = new Pokedex();
/**
 * Retrieves a pokemon by name.
 */
module.exports.getPokeByName = async (req, res, next) => {
    try {
        const pokemon = req.params.pokemon.toLowerCase();
        P.getPokemonByName(pokemon)
        .then(function(response) {
            console.log(response);
            return res.json(response);
          })
          .catch(function(error) {
            console.log('There was an ERROR: ', error);
            return;
          });
        
    }
    catch (err) {
        return next(err);
    }
};