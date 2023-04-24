const Document = require("../models/documentModel");

const ErrorHandler = require("../utils/errorHandler");

exports.createDocument = async(req, res, next) => {
    try {
        const curUser = req.user;
        const {content, title} = req.body;

        const documentBody = {content, title, ownerId: curUser._id};

        const document = await Document.create(documentBody);

        return res.status(200).json(document);
    } catch (e) {
        console.log(e);
        return res.status(500).json({message: "Something went wrong"});
    }
};

exports.getDocuments = async(req, res, next) => {
    try {
        const curUser = req.user;
        const documents = await Document.find({ownerId: curUser._id});

        return res.status(200).json(documents);
    } catch (e) {
        return res.status(500).json({message: "Something went wrong"});
    }
};

