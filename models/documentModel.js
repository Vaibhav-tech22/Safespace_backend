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
    lastEditedAt:{
        type: String,
        default: Date.now().toString(),
    },
    collaborators:[{
        id:{

            type: mongoose.Schema.ObjectId,
            ref: "User",
        },
        role:{
            type:String, 
            enum:["editor", "viewer"],
            default:"viewer",
        } 
    }]
});

module.exports = mongoose.model("Document", documentSchema);
