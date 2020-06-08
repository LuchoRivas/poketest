const mongoose = require('mongoose');
const BaseSchema = require('./base');

/**
 * pokemon schema.
 */
const pokemonSchema = new BaseSchema({
    name: {
        type: String,
        required: true
    },
    description: { type: String, required: false }
});

module.exports = mongoose.model('pokemon', pokemonSchema);