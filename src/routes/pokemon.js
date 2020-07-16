const express = require('express');
const router = express.Router();
const pokemonController = require('../controllers/pokemon');

/**
 * Retrieves a pokemon.
 */
router.get('/pokemonSearch/:pokemon', pokemonController.getPokeByName);

/**
 * Retrieves a pokemon.
 */
router.post('/typeSearch/:type', pokemonController.getPokesByType);

module.exports = router;