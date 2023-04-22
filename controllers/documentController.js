const Document = require("../models/documentModel");

const ErrorHandler = require("../utils/errorHandler");

exports.createDocument = async (req, res, next) => {
    try {
        const curUser = req.user;
        const {content, title} = req.body;

        const documentBody = {content, title, ownerId: curUser._id};

        const document = await Document.create(documentBody);

        return res.status(200).json(document);
    } catch (e) {
        return next(new ErrorHandler("Something went wrong", 500));
    }
};
