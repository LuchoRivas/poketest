// const pokeService = require('../services/pokemon');
const Pokedex = require('pokedex-promise-v2');
const P = new Pokedex();

// https://github.com/PokeAPI/pokedex-promise-v2

/**
 * Obtiene un pokemon a partir del nombre con getPokemonByName()
 * Obtiene info adicional con getPokemonSpeciesByName() 
 * Obtiene las evoluciones del pokemon con getPokemonEvolutions()
 * A lo ultimo mapToViewmodel() recopila la info necesaria para el front
*/
module.exports.getPokeByName = async (req, res, next) => {
    try {
        const pokemonSearch = req.params.pokemon.toLowerCase();
        const get_pokemon = await P.getPokemonByName(pokemonSearch);
        const pokemon_getSpecies = await P.getPokemonSpeciesByName(pokemonSearch);
        const pokemon_evolutions = pokemon_getSpecies.evolution_chain && await getPokemonEvolutions(pokemon_getSpecies.evolution_chain.url);
        const pokemon = await mapToViewmodel(get_pokemon, pokemon_evolutions, pokemon_getSpecies);

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
    try {
        const pokemon_evolution_chain_names = [];
        const pokemon_evolution = [];
        const get_evol_chain_id = evolutionChainUrl.split('/');
        const evol_chain_id = parseInt(get_evol_chain_id[6]);
        const pokemon_evoluton_chain = await P.getEvolutionChainById(evol_chain_id);
        if (pokemon_evoluton_chain.chain.evolves_to.length === 0)
            return;
    
        for (const evolution of pokemon_evoluton_chain.chain.evolves_to) {
            pokemon_evolution_chain_names.push(evolution.species.name);
            if (evolution.evolves_to.length > 0) {
                for (const evol of evolution.evolves_to) {
                    pokemon_evolution_chain_names.push(evol.species.name)
                }
            }
        }
        for (const pokemon of pokemon_evolution_chain_names) {
            const result = await P.getPokemonByName(pokemon);
            result && pokemon_evolution.push(result);
        }
        return pokemon_evolution;
    }
    catch (err) {
        return next(err);
    }
};

/**
 * Mapea las distintas llamadas a la PokeAPI y retorna un viewmodel
*/
async function mapToViewmodel(pokemon, evolutions, species) {
    const pokemon_viewmodel = {
        id: pokemon.id,
        name: pokemon.name,
        types: pokemon.types,
        sprites: pokemon.sprites,
        evolutions: evolutions,
        height: pokemon.height,
        weight: pokemon.weight,
        species: species.flavor_text_entries.filter(p => p.language.name === "es"),
        abilities: pokemon.abilities,
        stats: pokemon.stats
    }
    return pokemon_viewmodel;
}
