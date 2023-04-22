const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter document name"],
        trim: true,
        maxLength: [100, "Document name cannot exceed 100 characters"],
    },
});

exports.documentSchema = mongoose.model(documentSchema);
