const mongoose = require("mongoose");

const documentCollaboratorSchema = new mongoose.Schema({
    documentId: {
        type: mongoose.Schema.ObjectId,
        ref: "Document",
        required: true,
    },
    collaboratorId: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    },
    sharedDocumentId: {
        type: mongoose.Schema.ObjectId,
        ref: "Document",
        required: true,
    },
});

module.exports = mongoose.model(
    "DocumentCollaborator",
    documentCollaboratorSchema
);
