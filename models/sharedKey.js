const mongoose = require("mongoose");

const sharedKeySchema = new mongoose.Schema({
    userOne: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    },
    userTwo: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    },
    keys: [
        {
            user: {
                type: mongoose.Schema.ObjectId,
                ref: "User",
                required: true,
            },
            key: {
                type: String,
                required: true,
            },
        },
    ],
    complete: {
        type: Boolean,
        default: false,
    },
    commonEncryptedKey: {
        type: String,
        required: false,
    },
});

module.exports = mongoose.model("SharedKey", sharedKeySchema);
