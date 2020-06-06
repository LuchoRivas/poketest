'use strict';
const error = require('throw.js');
const pokemonModel = require('../models/pokemon');
const errorHandler = require('../helpers/error');
const dataTableHandler = require('../helpers/dataTable');
const mongoose = require('mongoose');

// /**
//  * Retrieves all tasks by ConsumableId.
//  */
// module.exports.getTasksByConsumableId = async (organization, consumableId) => {
//     try {
//         const tasks = await pokemonModel.find(
//             {
//                 active: true,
//                 organization: mongoose.Types.ObjectId(organization),
//                 consumableId: consumableId
//             }
//         );
//         return tasks;
//     }
//     catch (err) {
//         throw errorHandler(
//             new error.InternalServerError(
//                 'Unexpected Mongoose error while retrieving tasks'
//             ),
//             err
//         );
//     }
// };

// /**
//  * Creates worksheets in order to get an excel
//  */
// module.exports.getUploadedFile = async (id) => {
//     try {
//         const importRequest = await importRequestService.getById(id);
//         const filepath = await gridFSHelper.downloadToTemp(importRequest.file.filename);
//         const fileToSend = {
//             filePath: filepath,
//             fileName: importRequest.file.filename
//         };
//         return fileToSend;
//     }
//     catch (err) {
//         throw errorHandler(
//             new error.InternalServerError(
//                 'Unexpected Mongoose error while retrieving solicitudes'
//             ),
//             err
//         );
//     }
// };

// /**
//  * Retrieves all tasks.
//  */
// module.exports.getAll = async (userClaims) => {
//     try {
//         const tasks = await pokemonModel
//             .findActive({
//                 organization: mongoose.Types.ObjectId(userClaims.organization)
//             });
//         return tasks;
//     }
//     catch (err) {
//         throw errorHandler(
//             new error.InternalServerError(
//                 'Unexpected Mongoose error while retrieving tasks'
//             ),
//             err
//         );
//     }
// };

// /**
//  * Retrieves a task by id.
//  * @param {String} id task unique identifier
//  */
// module.exports.getById = async id => {
//     try {
//         const task = await pokemonModel.findActiveById(id);
//         return task;
//     }
//     catch (err) {
//         throw errorHandler(
//             new error.InternalServerError(
//                 'Unexpected Mongoose error while retrieving task by id'
//             ),
//             err
//         );
//     }
// };

// /**
//  * Get task by stages.
//  * @param {Object} stageId Updated stage
//  */
// module.exports.getStageByTask = async stageId => {
//     const task = await pokemonModel.findActive({
//         stage: stageId !== 'null' ? stageId : null
//     });
//     return task;
// };

// /**
//  * Executes a complex query to filter, paginate, sort and project (select) the client collection.
//  * @param {number} page Current page
//  * @param {number} pageSize Page max size
//  * @param {number} searchTerms Term to search
//  * @param {number} sortTerms Sort directions as objects {"col" : direction} (asc or desc)
//  */
// module.exports.search = async (page, pageSize, searchTerms, columns, userClaims, roles) => {
//     try {
//         const filterProperties = [
//             { type: 'id', param: 'organization', path: 'organization._id' }
//         ];
//         const search = await dataTableHandler.basicSearch(
//             page,
//             pageSize,
//             searchTerms,
//             columns,
//             userClaims,
//             roles,
//             filterProperties,
//             pokemonModel
//         );
//         return {
//             totalCount: search.totalCount,
//             rows: search.rows,
//             pages: search.pages,
//             pageSize: pageSize
//         };
//     }
//     catch (err) {
//         throw errorHandler(
//             new error.InternalServerError(
//                 'Unexpected Mongoose error while searching clients'
//             ),
//             err
//         );
//     }
// };