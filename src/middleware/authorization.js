const accountService = require('../services/account');

/**
 * Validates authentication token and verifies that the user has the required role.
 * Adds userClaims to the request object (in case is needed by any later middlewares).
 */
module.exports.authorize = function (roles) {
    return async (req, res, next) => {
        try {
            const token = req.headers.authorization;
            const userClaims = await accountService.authUser(token, roles);

            req.userClaims = userClaims;
            next();
        }
        catch (err) {
            next(err);
        }
    };
};