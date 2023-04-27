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
            $OR: [{ownerId: curUser._id}, {collaborators: {$elemMatch: {id: curUser._id}}}],
        });
        if (!document) {
            return res.status(304).json({err: "Document not found"});
        }
        if (curUser._id in document.collaborators) {
            if (document.collaborators[curUser._id].role === "viewer") {
                return res.status(304).json({err: "You don't have permission to edit this document"});
            }
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
        const documents = await Document.find({
            _id: docId,
            $OR: [{ownerId: curUser._id}, {collaborators: {$elemMatch: {id: curUser._id}}}],
        });
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
            $OR: [{ownerId: curUser._id}, {collaborators: {$elemMatch: {id: curUser._id}}}],
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
        const {documentId, collaboratorEmail, role} = req.body;

        const document = await Document.findOne({
            $OR: [{ownerId: curUser._id}, {collaborators: {$elemMatch: {id: curUser._id}}}],
            _id: new mongoose.Types.ObjectId(documentId),
        });

        if (!document) {
            return res.status(304).json({message: "Document not found"});
        }
        if (curUser._id in document.collaborators) {
            if (document.collaborators[curUser._id].role === "viewer") {
                return res.status(304).json({message: "You don't have permission add collaborator"});
            }
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
        document.collaborators.push({id:collaborator._id, role:role});
    } catch (e) {
        return res.status(500).json({message: "Something went wrong"});
    }
};


exports.getSharedDocuments = async (req, res) =>{
        try {
            const curUser = req.user;
            const documents = await Document.find({
                _id: docId,
                collaborators: {$elemMatch: {id: curUser._id}}
            });
            return res.status(200).json(documents);
        } catch (e) {
            return res.status(500).json({message: "Something went wrong"});
        }
}

exports.getMyDocuments = async (req, res) =>{
    try {
        const curUser = req.user;
        const documents = await Document.find({
            _id: docId,
            ownerId: curUser._id
        });
        return res.status(200).json(documents);
    } catch (error) {
        return res.status(500).json({message: "Something went wrong"});
    }
}
