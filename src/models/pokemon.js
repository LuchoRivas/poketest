const mongoose = require('mongoose');
const BaseSchema = require('./base');

/**
 * task model schema (simple example).
 */
const taskSchema = new BaseSchema({
    name: {
        type: String,
        required: [true, 'task-name-required']
    },
    description: { type: String, required: false },
    consumableName: { type: String, required: false },
    consumableId: { type: String, required: false },
    consumableAmount: {
        type: Number,
        required: false,
        cast: 'task-consumableAmount-invalid'
    },
    workForceAmount: {
        type: Number,
        required: false,
        cast: 'task-workForceAmount-invalid'
    },
    workForceHours: {
        type: Number,
        required: false,
        cast: 'task-workForceHours-invalid'
    },
    type: { type: String, required: false },
    maintenancePlans: { type: String, required: false },
    workForceFee: { type: Number, required: false },
    consumableFee: { type: Number, required: false },
    consumableAmountPlusFee: { type: Number, required: false },
    workForceAmountPlusFee: { type: Number, required: false },
    clientGroup: {
        type: mongoose.Schema.ObjectId,
        ref: 'clientGroup',
        required: false
    },
    organization: {
        type: mongoose.Schema.ObjectId,
        ref: 'organization',
        required: false
    }
});

module.exports = mongoose.model('task', taskSchema);