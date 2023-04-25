const {default: mongoose} = require("mongoose");
const Document = require("../models/documentModel");
const User = require("../models/userModel");
const SharedKey = require("../models/sharedKey");

const ErrorHandler = require("../utils/errorHandler");

exports.createDocument = async (req, res, next) => {
    try {
        const curUser = req.user;
        const {content, title} = req.body;

        const documentBody = {content, title, ownerId: curUser._id, lastEditedAt: Date.now().toString()};

        const document = await Document.create(documentBody);

        return res.status(200).json(document);
    } catch (e) {
        console.log(e);
        return res.status(500).json({message: "Something went wrong"});
    }
};

exports.saveDocument = async (req, res, next) => {
    try {
        const curUser = req.user;
        const {content, docId} = req.body;

        const document = await Document.findOne({
            _id: docId,
            ownerId: curUser._id,
        });
        if (!document) {
            return res.status(304).json({err: "Document not found"});
        }
        document.content = content;
        document.lastEditedAt = Date.now().toString();
        await document.save();
        return res.status(200).json({success: true});
    } catch (e) {
        console.log(e);
        return res.status(500).json({message: "Something went wrong"});
    }
};

exports.getDocuments = async (req, res, next) => {
    try {
        const curUser = req.user;
        const documents = await Document.find({ownerId: curUser._id});

        return res.status(200).json(documents);
    } catch (e) {
        return res.status(500).json({message: "Something went wrong"});
    }
};

exports.getSingleDocument = async (req, res, next) => {
    try {
        const curUser = req.user;
        const {docId} = req.query;
        const document = await Document.findOne({
            ownerId: new mongoose.Types.ObjectId(curUser._id),
            _id: new mongoose.Types.ObjectId(docId),
        });
        if (!document) {
            return res.status(304).json({err: "Something went aaaa"});
        }
        return res.status(200).json(document);
    } catch (e) {
        return res.status(500).json({message: "Something went aasdfasdfasdfs"});
    }
};

exports.addCollaborator = async (req, res) => {
    try {
        const curUser = req.user;
        const {documentId, collaboratorEmail} = req.body;

        const document = await Document.findOne({
            ownerId: new mongoose.Types.ObjectId(curUser._id),
            _id: new mongoose.Types.ObjectId(documentId),
        });

        if (!document) {
            return res.status(304).json({message: "Document not found"});
        }

        const collaborator = await User.findOne({email: collaboratorEmail});
        if (!collaborator) {
            return res
                .status(304)
                .json({message: "Invalid collaborator email"});
        }

        if (document.collaborators.includes(collaborator._id)) {
            return res
                .status(302)
                .json({message: "Collaborator already added"});
        }

        document.collaborators.push(collaborator._id);
    } catch (e) {
        return res.status(500).json({message: "Something went wrong"});
    }
};
