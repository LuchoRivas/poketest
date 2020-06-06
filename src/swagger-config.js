const swaggerJSDoc = require('swagger-jsdoc');

// Swagger definition
const swaggerDefinition = {
    info: {
        title: 'Quadminds SMF REST API', // Title of the documentation
        version: '1.0.2', // Version of the app
        description: 'This is the REST API for SMF' // short description of the app
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