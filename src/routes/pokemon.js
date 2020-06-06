const express = require('express');
const router = express.Router();
const pokemonController = require('../controllers/pokemon');

/**
 * Retrieves a pokemon.
 */
router.get('/pokemonSearch/:pokemon', pokemonController.getPokeByName);


module.exports = router;