const mongoose = require('mongoose');
const util = require('util');
const Schema = mongoose.Schema;

/**
 * Base model schema.
 * Should be used to generate every auditable model schemas in the application.
 */
function BaseSchema () {
    Schema.apply(this, arguments);

    this.add({
        // Creation date.
        createdAt: { type: Date, required: true, default: Date.now },

        // Modification date.
        updatedAt: { type: Date, required: true, default: Date.now },

        // For soft delete.
        active: { type: Boolean, required: true, default: true },

        // Creator's username.
        createdBy: { type: String, required: false },

        // Last modificator's username.
        updatedBy: { type: String, required: false }
    });

    /**
     * Base method to query all the active documents.
     * @param {Object} query Conditions to narrow down the documents to retrieve.
     */
    this.statics.findActive = function (query, limit) {
        if (query) {
            query.active = true;
        }
        else {
            query = { active: true };
        }
        if (limit) {
            return this.find(query).limit(limit);
        }
        return this.find(query);
    };

    /**
     * Base method to retrieve one active document by an optional set of conditions.
     * @param {Object} query Conditions to narrow down the document to retrieve.
     */
    this.statics.findOneActive = function (query) {
        if (query) {
            query.active = true;
        }
        else {
            query = { active: true };
        }
        return this.findOne(query);
    };

    /**
     * Base method to retrieve one active document by id.
     * @param {ObjectId} id model identifier.
     */
    this.statics.findActiveById = function (id) {
        if (!mongoose.Types.ObjectId.isValid(id)) return null;

        const query = { active: true, _id: id };

        return this.findOne(query, null);
    };

    /**
     * Base method to logically remove a document by id.
     * @param {ObjectId} id model identifier.
     */
    this.statics.softDeleteByIdById = function (id) {
        return this.findByIdAndUpdate(id, { active: false });
    };

    /**
     * Base method to logically remove a document by a set of conditions.
     * @param {Object} query Conditions to narrow down the document to delete.
     */
    this.statics.softDelete = function (id, query) {
        if (query) {
            query.$set.active = false;
        }
        else {
            query = { $set: { active: false } };
        }
        return this.updateOne(
            { _id: id },
            query);
    };
}

util.inherits(BaseSchema, Schema);

module.exports = BaseSchema;