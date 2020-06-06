/**
 * Adds the createdBy/updatedBy property to the req.body in POST or PUT requests.
 */
module.exports.audit = async (req, res, next) => {
    try {
        if (req.method === 'POST') {
            req.body.createdBy = req.userClaims.email;
        }

        if (req.method === 'PUT' || req.method === 'DELETE') {
            req.body.updatedBy = req.userClaims.email;
            req.body.updatedAt = Date.now();
        }

        next();
    }
    catch (err) {
        next(err);
    }
};