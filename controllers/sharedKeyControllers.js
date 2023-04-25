const SharedKey = require("../models/sharedKey");
const User = require("../models/userModel");

exports.createSharedKeyPair = async (req, res) => {
    try {
        const curUser = req.user;
        const {otherUserEmail, myKey, commonEncryptedKey} = req.body;

        const userTwo = await User.findOne({email: otherUserEmail});

        const newSharedKey = await SharedKey.create({
            userOne: curUser._id,
            userTwo: userTwo._id,
            keys: [
                {
                    user: curUser._id,
                    key: myKey,
                },
            ],
            commonEncryptedKey,
        });

        return res.status(200).json({message: "Created shared key."});
    } catch (e) {
        console.log(e);
        return res.status(500).json({message: "Something went wrong"});
    }
};

exports.completeSharedKeyPair = async (req, res) => {
    try {
        const curUser = req.user;
        const {otherUserEmail, myKey} = req.body;

        const userTwo = await User.findOne({email: otherUserEmail});

        const sharedKey = await SharedKey.findOne({
            userOne: userTwo._id,
            userTwo: curUser._id,
        });

        sharedKey.keys.push({user: curUser._id, key: myKey});
        delete sharedKey.commonEncryptedKey;
        sharedKey.complete = true;

        await sharedKey.save();

        return res.status(200).json({message: "Done"});
    } catch (e) {
        console.log(e);
        return res.status(500).json({message: "Something went wrong"});
    }
};

exports.getPendingSharedKeys = async (req, res) => {
    try {
        const curUser = req.user;
        const pendingKeyObjects = await SharedKey.find({
            userTwo: curUser._id,
            complete: false,
        }).populate("userOne");

        const pendingKeyObjectsResponse = pendingKeyObjects.map((item) => {
            return {
                email: item.userOne.email,
                commonEncryptedKey: item.commonEncryptedKey,
            };
        });

        return res.status(200).json({pendingKeyObjectsResponse});
    } catch (e) {
        console.log(e);
        return res.status(500).json({message: "Something went wrong"});
    }
};
