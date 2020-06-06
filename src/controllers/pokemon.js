const pokeService = require('../services/pokemon');
const Pokedex = require('pokedex-promise-v2');
const P = new Pokedex();
/**
 * Retrieves all tasks.
 */
module.exports.getPokeByName = async (req, res, next) => {
    try {
        const pokemon = 'snorlax';
        P.getPokemonByName(pokemon)
        .then(function(response) {
            console.log(response);
            return res.json(response);
          })
          .catch(function(error) {
            console.log('There was an ERROR: ', error);
            return;
          });
        
    }
    catch (err) {
        return next(err);
    }
};

// /**
//  * Creates a new import request into the database.
//  * The import request object is defined in req.file
//  */
// module.exports.file = async (req, res, next) => {
//     try {
//         const importReq = await importRequestService.create(req.file, IMPORT_TYPE.tasks, req.userClaims);
//         return res.json(importReq);
//     }
//     catch (err) {
//         return next(err);
//     }
// };

// /**
//  * Retrieves a task by id.
//  * The task id is defined in req.params.id
//  */
// module.exports.getById = async (req, res, next) => {
//     try {
//         const task = await taskService.getById(req.params.id);
//         return res.json(task);
//     }
//     catch (err) {
//         return next(err);
//     }
// };

// /**
//  * Retrieves a stage by Groupid.
//  * The stage id is defined in req.params.id
//  */
// module.exports.getByStage = async (req, res, next) => {
//     try {
//         const result = await taskService.getStageByTask(req.params.id);

//         return res.json(result);
//     }
//     catch (err) {
//         return next(err);
//     }
// };

// /**
//  * Retrieves a stage by Groupid.
//  * The stage id is defined in req.params.id
//  */
// module.exports.getTaskWithoutPlans = async (req, res, next) => {
//     try {
//         const result = await taskService.getTaskWithoutPlans(req.userClaims);

//         return res.json(result);
//     }
//     catch (err) {
//         return next(err);
//     }
// };

// /**
//  * Saves new task into the database and organization ID.
//  * The task object is defined in req.body
//  * Organization ID is defined in req.userClaims
//  */
// module.exports.create = async (req, res, next) => {
//     try {
//         const task = await taskService.create(req.body, req.userClaims);
//         return res.json(task);
//     }
//     catch (err) {
//         return next(err);
//     }
// };

// /**
//  * Removes a task by id.
//  * The task id is defined in req.params.id
//  */
// module.exports.remove = async (req, res, next) => {
//     try {
//         const taskToRemove = await taskService.remove(req.params.id);
//         return res.json(taskToRemove);
//     }
//     catch (err) {
//         return next(err);
//     }
// };

// /**
//  * Downloads excel.
//  */
// module.exports.export = async (req, res, next) => {
//     try {
//         const file = await taskService.getUploadedFile(req.params.id);
//         res.setHeader('Content-disposition', `attachment; filename=${file.fileName}`);
//         res.setHeader('Content-type', 'application/xls');
//         res.download(file.filePath);
//     }
//     catch (err) {
//         return next(err);
//     }
// };

// // /**
// //  * Removes a task by id.
// //  * The task id is defined in req.params.id
// //  */
// // module.exports.removeImportRequest = async (req, res, next) => {
// //     try {
// //         const taskToRemove = await taskService.remove(req.params.id);
// //         return res.json(taskToRemove);
// //     }
// //     catch (err) {
// //         return next(err);
// //     }
// // };

// /**
//  * Update a task by id.
//  * The task id is defined in req.params.id
//  * The task object is defined in req.body
//  */
// module.exports.update = async (req, res, next) => {
//     try {
//         await taskService.update(req.params.id, req.body);
//         return res.json({ message: 'Success!' });
//     }
//     catch (err) {
//         return next(err);
//     }
// };

// /**
//  * Search clients by term.
//  * The current page is defined in req.body.page
//  * The page size is defined in req.body.pageSize
//  * The search term is defined in req.body.searchTerm
//  * The sort direction is defined in req.body.sortDir
//  */
// module.exports.search = async (req, res, next) => {
//     try {
//         const result = await taskService.search(
//             req.body.page !== -1 ? req.body.page : 0,
//             req.body.pageSize !== 0 ? req.body.pageSize : 10,
//             req.body.filtered,
//             req.body.columns,
//             req.userClaims,
//             req.userClaims.roles
//         );
//         return res.json(result);
//     }
//     catch (err) {
//         return next(err);
//     }
// };