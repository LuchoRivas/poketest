'use strict';

const error = require('throw.js');
const request = require('request-promise');
const NodeCache = require('node-cache');
const myCache = new NodeCache({ stdTTL: 1440 });
const errorHandler = require('../helpers/error');
const config = require('../config').get();

module.exports.getTranslation = async (requiredLanguage, wfkey) => {
    try {
        const locizedWfKey = requiredLanguage + '/' + wfkey;
        if (myCache.has(locizedWfKey)) {
            return myCache.get(locizedWfKey);
        }
        else {
            const options = {
                uri: config.externalServices.locize.origin +
                config.externalServices.locize.projectId +
                config.externalServices.locize.version + requiredLanguage + '/' +
                config.externalServices.locize.nameSpace,
                headers: {
                    'content-type': 'application/json',
                    Authorization: 'Bearer ' + config.externalServices.locize.apiKey
                },
                json: true // Automatically parses the JSON string in the response
            };
            const translations = await request.get(options);
            const keysToStore = [];
            for (const key in translations) {
                keysToStore.push({ key: requiredLanguage + '/' + key, val: translations[key] });
            }

            myCache.mset(keysToStore);
            return myCache.get(locizedWfKey);
        }
    }
    catch (err) {
        throw errorHandler(
            new error.InternalServerError('Unexpected error getting Translation'),
            err
        );
    }
};