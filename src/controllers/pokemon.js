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
        const pokemon_evolutions = pokemon_getSpecies.evolution_chain && await getPokemonEvolutions(pokemon_getSpecies.evolution_chain.url, pokemon_getSpecies.name);
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
async function getPokemonEvolutions(evolutionChainUrl, pokemon) {
    try {
        const pokemon_evolution_chain_names = [];
        const pokemon_evolution = [];
        const get_evol_chain_id = evolutionChainUrl.split('/');
        const evol_chain_id = parseInt(get_evol_chain_id[6]);
        const pokemon_evoluton_chain = await P.getEvolutionChainById(evol_chain_id);
        if (pokemon_evoluton_chain.chain.evolves_to.length === 0)
            return;

        // Pushea a un array los nombres de los pokemon de la evol chain
        const getEvolutionSpecies = async (arr) => {
            if (typeof(arr) == "object") {
                for (let i = 0; i < arr.evolves_to.length; i++) {
                    getEvolutionSpecies(arr.evolves_to[i]);
                }
            }
            pokemon_evolution_chain_names.unshift(arr.species.name);
        };
            
        await getEvolutionSpecies(pokemon_evoluton_chain.chain)
        // Sirve para obtener todas las evol menos el pokemon actual
        for (const pokemonToGet of pokemon_evolution_chain_names) {
            let result;
            if (pokemonToGet !== pokemon)
                result = await P.getPokemonByName(pokemonToGet);

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
