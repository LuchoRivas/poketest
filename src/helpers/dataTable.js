const errorHandler = require('../helpers/error');
const error = require('throw.js');
const mongoose = require('mongoose');
// const driverRealm = require('../consts').driverArray;

/**
 * Executes a complex query to filter, paginate, sort and project (select) the Capacity collection.
 * @param {number} page Current page
 * @param {number} pageSize Page max size
 * @param {Object} searchTerms Term to search
 * @param {Object} sortTerms Sort directions as objects {"col" : direction} (asc or desc)
 * @param {model} model DB model for consulting data
 */
module.exports.basicSearch = async (
    page,
    pageSize,
    searchTerm,
    columns,
    userClaims,
    roles,
    filterProperties,
    model
) => {
    const defaultSort = Object.assign({ updatedAt: -1 });

    let match = {
        active: true
    };
    const query = [];

    if (filterProperties.some(property => property.type === 'id')) {
        const propertiesId = filterProperties.filter(property => property.type === 'id');
        for (const key in propertiesId) {
            match = {
                ...match,
                [propertiesId[key].path]: mongoose.Types.ObjectId(userClaims[propertiesId[key].param])
            };
        }
    }
    const propertiesId = filterProperties.filter(property => property.type !== 'id');
    for (const key in propertiesId) {
        match = {
            ...match,
            [propertiesId[key].path]: propertiesId[key].param
        };
    }

    const referencedDocs = await this.getReferencedDocs(model);
    // const referencedArrays = await this.getReferencedDocsArrays(model);

    // Constructs the query with the left joins from referenced entities.
    referencedDocs.forEach(doc => {
        if (doc === 'driver') {
            query.push(
                {
                    $lookup: {
                        from: 'users',
                        localField: doc,
                        foreignField: '_id',
                        as: doc
                    }
                },
                { $unwind: { path: '$' + doc, preserveNullAndEmptyArrays: true } }
            );
        }
        else if (doc === 'client') {
            query.push(
                {
                    $lookup: {
                        from: 'clientgroups',
                        localField: doc,
                        foreignField: '_id',
                        as: doc
                    }
                },
                { $unwind: { path: '$' + doc, preserveNullAndEmptyArrays: true } }
            );
        }
        else {
            query.push(
                {
                    $lookup: {
                        from: doc.toLowerCase() + 's',
                        localField: doc,
                        foreignField: '_id',
                        as: doc
                    }
                },
                { $unwind: { path: '$' + doc, preserveNullAndEmptyArrays: true } }
            );
        }
    });
    if (roles.some(r => r.startsWith('workshop_'))) {
        // $lookup para popular los pricequotes de las solicitudes con islast (creo...)
        // crea testing ([{}]), ver en el front
        query.push(
            {
                $lookup: {
                    from: 'pricequotes',
                    localField: 'priceQuotes',
                    foreignField: '_id',
                    as: 'testing'
                }
            },
            // deconstruye el array testing y se fija el workshop de cada pricequote y matchea
            {
                $unwind: "$testing"
            },
            {
                $unwind: "$testing.workshop"
            },
            {
                $match: {"testing.workshop": mongoose.Types.ObjectId(userClaims.workshop)}
            }
        );
    };

    if (searchTerm) {
        const regex = new RegExp(searchTerm, 'gi');
        const searchCriteria = [];
        if (columns.length !== 0) {
            columns.forEach((term, i) => {
                if (referencedDocs.some(item => item === term.field)) {
                    searchCriteria[i] = {
                        [term.field + '.name']: {
                            $regex: regex
                        }
                    };
                }
                else {
                    searchCriteria[i] = {
                        [term.field]: {
                            $regex: regex
                        }
                    };
                };
            });
        }
        match = {
            $and: [{
                ...match,
                $or: searchCriteria
            }]
        };
    }
    query.push(
        {
            $match: match
        },
        {
            // Order by field and direction.
            // $sort: sortTerms.length !== 0 ? sort : { updatedAt: 1 }
            $sort: defaultSort
        },
        {
            $facet: {
                paginatedResults: [{
                    $skip: page * pageSize
                },
                {
                    $limit: pageSize
                },
                {
                    $project: {
                        active: 0
                    }
                }
                ],
                totalCount: [{
                    $count: 'count'
                }]
            }
        }
    );

    try {
        const result = await model.aggregate(query);
        if (result[0].totalCount[0] === undefined) {
            result[0].totalCount[0] = {
                count: 0
            };
        }
        return {
            rows: result[0].paginatedResults,
            pages: Math.ceil(
                result[0].totalCount[0].count != null
                    ? result[0].totalCount[0].count / pageSize
                    : 0
            ),
            pageSize: pageSize,
            totalCount: result[0].totalCount[0].count
        };
    }
    catch (err) {
        throw errorHandler(
            new error.InternalServerError(
                'Unexpected Mongoose error while searching capacities'
            ),
            err
        );
    }
};

module.exports.getReferencedDocs = async model => {
    try {
        const refs = [];
        for (var path in model.schema.paths) {
            if (path !== '_id' && model.schema.paths[path].instance !== 'Array' && model.schema.paths[path].instance === 'ObjectID')
                refs.push(path);
        }
        return refs;
    }
    catch (err) {
        throw errorHandler(
            // eslint-disable-next-line no-undef
            new error.InternalServerError(
                'Unexpected Mongoose error while searching capacities'
            ),
            err
        );
    }
};

module.exports.getReferencedDocsArrays = async model => {
    try {
        const refs = [];
        for (var path in model.schema.paths) {
            if (
                model.schema.paths[path].instance === 'Array' &&
                path !== '_id' &&
                model.schema.paths[path].caster.instance === 'ObjectID'
            )
                refs.push(path);
        }
        return refs;
    }
    catch (err) {
        throw errorHandler(
            // eslint-disable-next-line no-undef
            new error.InternalServerError(
                'Unexpected Mongoose error while searching capacities'
            ),
            err
        );
    }
};