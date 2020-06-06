const error = require('throw.js');

/**
 * Handles error and inner error.
 */
module.exports = handleError;

/**
 * Handles mongoose Validation and Unique errors returning extra data to the client.
 * @param {Error} err Error to be handled
 * @returns {Error} Handled error with extra data if possible.
 */
module.exports.handleMongooseError = (err) => {
    let handledErr = {};
    if (err.name === 'MongoError' && err.code === 11000 && err.keyValue) {
        const uniqueField = Object.keys(err.keyValue)[0];
        const uniqueFieldValue = err.keyValue[uniqueField];

        handledErr = new error.BadRequest(`The field '${uniqueField}' with value '${uniqueFieldValue}' should be unique`);

        // Add extra data to the error.
        handledErr.uniqueError = {
            field: uniqueField,
            value: uniqueFieldValue
        };
    }
    else if (err.name === 'ValidationError') {
        handledErr = new error.BadRequest('ValidationError');
        handledErr.validationErrors = [];

        const fieldsWithError = Object.keys(err.errors);

        let auxErrorData = {};
        let auxField = '';

        // Add extra data to the error for each field that had validation issues.
        for (const key in fieldsWithError) {
            auxField = fieldsWithError[key];
            auxErrorData = err.errors[auxField];

            handledErr.validationErrors.push({
                property: auxErrorData.path,
                errorType: auxErrorData.kind,
                value: auxErrorData.value,
                message: auxErrorData.message
            });
        }
    }
    else {
        return err;
    }

    // Set inner error through the error handler.
    return handleError(handledErr, err);
};

/**
 * Handles error and inner error.
 * Merges both errors when needed.
 */
function handleError (err, innerErr) {
    // If inner error has statusCode it means the error was already handled.
    if (innerErr.statusCode)
        return innerErr;

    // Merge both stack traces.
    if (innerErr)
        err.stack = innerErr.stack.split('\n').slice(0, 2).join('\n') + '\n' + err.stack;

    return err;
}