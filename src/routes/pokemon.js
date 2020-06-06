const express = require('express');
const router = express.Router();
// const backArray = require('../consts').backofficeArray;
// const driverArray = require('../consts').driverArray;
// const clientArray = require('../consts').clientArray;
const pokemonController = require('../controllers/pokemon');
// const authMiddleware = require('../middleware/authorization');
// const auditMiddleware = require('../middleware/audit');
// const uploadMiddleware = require('../middleware/upload');
// const importRequestController = require('../controllers/import-request');
/**
 * Retrieves all tasks.
 */
router.get('/:pokemon', pokemonController.getPokeByName);

/**
 * Search tasks by task without plans.
 * Requires authentication.
 */
// router.get(
//     '/getTaskWithoutPlans',
//     authMiddleware.authorize(backArray + driverArray + clientArray),
//     taskController.getTaskWithoutPlans
// );

// /**
//  * Search tasks by term.
//  * Requires authentication.
//  */
// router.post(
//     '/search',
//     authMiddleware.authorize(backArray + clientArray),
//     taskController.search
// );

// /**
//  * Retrieves a task by id.
//  * Requires authentication.
//  */
// router.get('/:id',
//     authMiddleware.authorize(backArray + clientArray + driverArray),
//     taskController.getById
// );

// /**
//  * Saves new task into the database.
//  * Requires authentication.
//  * The user must have 'Administrator' role.
//  */
// router.post(
//     '/',
//     authMiddleware.authorize(backArray),
//     auditMiddleware.audit,
//     taskController.create
// );

// /**
//  * Removes a task by id.
//  * Requires authentication.
//  * The user must have 'Administrator' role.
//  */
// router.delete(
//     '/:id',
//     authMiddleware.authorize(backArray),
//     auditMiddleware.audit,
//     taskController.remove
// );

// /**
//  * Update a task by id.
//  * Requires authentication.
//  * The user must have 'Administrator' role.
//  */
// router.put(
//     '/:id',
//     authMiddleware.authorize(backArray),
//     auditMiddleware.audit,
//     taskController.update
// );

// router.get(
//     '/Stage/:id',
//     authMiddleware.authorize(),
//     taskController.getByStage
// );

// /**
//  * Import excel sheet file.
//  */
// router.post(
//     '/import',
//     authMiddleware.authorize(),
//     uploadMiddleware,
//     taskController.file
// );

// /**
//  * Retrieves an excel.
//  * Requires authentication.
//  */
// router.get(
//     '/createExcel/:id',
//     // authMiddleware.authorize(),
//     taskController.export
// );

// /**
//  * Remove import request
//  */
// router.delete(
//     '/deleteImport/:id',
//     authMiddleware.authorize(),
//     importRequestController.remove
// );

module.exports = router;