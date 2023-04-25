const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema({
    ownerId: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: [true, "Please enter owner id"],
    },
    title: {
        type: String,
        required: [true, "Please enter document name"],
        trim: true,
    },
    content: {
        type: String,
        trim: true,
        default: "",
    },
});

module.exports = mongoose.model("Document", documentSchema);
