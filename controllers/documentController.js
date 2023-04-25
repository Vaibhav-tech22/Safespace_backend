const {default: mongoose} = require("mongoose");
const Document = require("../models/documentModel");

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
