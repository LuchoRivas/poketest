// const pokeService = require('../services/pokemon');
const Pokedex = require('pokedex-promise-v2');
const P = new Pokedex();

// https://github.com/PokeAPI/pokedex-promise-v2

/**
 * Obtiene un pokemon a partir del nombre con getPokemonByName()
 * Obtiene info adicional con getPokemonSpeciesByName() 
 * donde obtiene datos de pokedex (filtro por idioma español) y evolution_chain
*/
module.exports.getPokeByName = async (req, res, next) => {
    try {
        let pokemonEvol;
        const pokemonSearch = req.params.pokemon.toLowerCase();
        const pokemon = await P.getPokemonByName(pokemonSearch);
        const pokemon_getSpecies = await P.getPokemonSpeciesByName(pokemonSearch);
        if (pokemon_getSpecies.evolution_chain)
            pokemonEvol = await getPokemonEvolutions(pokemon_getSpecies.evolution_chain.url);
            
        const pokemon_es_description = pokemon_getSpecies && pokemon_getSpecies.flavor_text_entries.filter(p => p.language.name === "es");
        pokemon.species = pokemon_es_description;
        pokemon.variations = pokemon_getSpecies;
        pokemon.evolutions = pokemonEvol;
        return res.json(pokemon);
    }
    catch (err) {
        return next(err);
    }
};

/**
 * Obtiene las evoluciones de un pokemon en getPokeByName
*/
async function getPokemonEvolutions(evolutionChainUrl) {
    const pokemon_evolution_chain_names = [];
    const pokemon_evolution = [];
    const get_evol_chain_id = evolutionChainUrl.split('/');
    const evol_chain_id = parseInt(get_evol_chain_id[6]);
    const pokemon_evoluton_chain = await P.getEvolutionChainById(evol_chain_id);
    if (pokemon_evoluton_chain.chain.evolves_to.length === 0)
        return;

    for (const evolution of pokemon_evoluton_chain.chain.evolves_to) {
        if (evolution.evolves_to.length > 0) {
            for (const evol of evolution.evolves_to) {
                pokemon_evolution_chain_names.push(evol.species.name)
            }
        }
        pokemon_evolution_chain_names.push(evolution.species.name);
    }
    for (const pokemon of pokemon_evolution_chain_names) {
        const result = await P.getPokemonByName(pokemon);
        result && pokemon_evolution.push(result);
    }
    return pokemon_evolution;
};