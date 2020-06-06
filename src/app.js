// var compression = require('compression');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const swaggerUi = require('swagger-ui-express');
const config = require('./config').get();
const environment = require('./config').getEnv();
// const errorHandler = require('./middleware/error-handler');
const swaggerSpec = require('./swagger-config');
// const seedService = require('./services/seed');
// Database connection.
// mongoose.connect(config.database.connectionString, {
//     useNewUrlParser: true
// });
// mongoose.connection.on('error', function (e) {
//     throw e;
// });

// Express.js configuration.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
// app.use(compression());

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    );
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE');

    if (req.method === 'OPTIONS') {
        res.send(200);
    }
    else {
        next();
    }
});

// Root endpoint.
app.get('/', (req, res) => {
    res.send('Environment' + process.env.NODE_ENV);
});

app.get('/health-check', (req, res) => res.sendStatus(200));

app.use('/api/pokemon', require('./routes/pokemon'));

// Error handling middleware.
// app.use(errorHandler);

// Public folder for public static assets.
app.use(express.static('public'));

// Swagger documentation specification
// app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Listen for requests on the specified port.
const port = process.env.PORT || config.port;
app.listen(port);

// Print handy environment info on the console after .
console.log(process.version);
console.log(environment);
console.log('Listening on port: ' + port);

// Execute seed.
// seedService.execute().then();