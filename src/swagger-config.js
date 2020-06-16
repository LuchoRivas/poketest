const swaggerJSDoc = require('swagger-jsdoc');

// Swagger definition
const swaggerDefinition = {
    info: {
        title: 'Pokedex', // Title of the documentation
        version: '0.0.1', // Version of the app
        description: 'This is garbage' // short description of the app
    },
    basePath: '/api' // the basepath of your endpoint
};

// options for the swagger docs
const options = {
    // import swaggerDefinitions
    swaggerDefinition,
    // path to the API docs
    apis: ['./swagger/**/*.yaml']
};
// initialize swagger-jsdoc
module.exports = swaggerJSDoc(options);