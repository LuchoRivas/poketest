'use strict';

const errorLogService = require('../services/error-log');
const config = require('../config').get();

/**
 * Error handling middleware.
 * Will be called after any requests that throws an Error.
 */
module.exports = (err, req, res, next) => {
    console.log(err.message);
    console.log(err.stack);
    // If the status code is not defined this is an unhandled error.
    if (!err.statusCode) {
        err.statusCode = 500;
        err.message = 'Unexpected (but handled) error: ' + err.message;
    }

    // Register error into errorLog collection.
    errorLogService
        .create({
            name: err.name,
            message: err.message,
            stack: err.stack,
            code: err.statusCode,
            createdBy: req.userClaims ? req.userClaims.username : null
        })
        .catch(errorLogErr => {
            // Print both errors on the console.
            console.log('There was a problem logging the error.');
            console.log(errorLogErr);
            console.log(err);
        })
        .then(() => {
            // Hide the stack according to the environment config.
            if (!config.errorHandling.showStack) err.stack = null;

            // Return response with the appropiate status code.
            res.status(err.statusCode).json({ error: err, stack: err.stack });
        });
};