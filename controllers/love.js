const Love = require("../models/Love.js");
const Video = require('../models/Video.js');

//  ====================== Add Love ====================

const addLove = async (req, res) => {
    const videoId = req.body.videoId;
    const userId = req.user._id;
    try {
        const video = await Video.findById(videoId);
        if (!video) {
            return res.status(404).json({
                success: false,
                message: `Video not found !`,
            });
        }
        const loveFind = await Love.find({
            videoId: videoId,
            userId: userId
        });
        if (loveFind.length == 0) {
            const love = await Love.create({
                videoId: videoId,
                userId: userId
            });
        }

        return res.status(201).json({
            success: true,
            message: `Love added successfully !`,
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong, try again later.",
        });
    }
}

//  ====================== Remove Love ====================

const removeLove = async (req, res) => {
    const videoId = req.params.id;
    const userId = req.user._id;

    try {
        const love = await Love.find({ videoId: videoId, userId: userId });
        if (love.length == 0) {
            return res.status(404).json({
                success: false,
                message: `love not found !`,
            });
        }

        let deleteLove = await Love.findByIdAndDelete(love[0]._id);
        return res.status(201).json({
            success: true,
            message: `The love has deleted successfully !`,
        });


    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong, try again later.",
        });
    }
}

//  ====================== Get User's Loves ====================

const getLoveForUser = async (req, res) => {
    const userId = req.user._id;
    try {
        const loves = await Love.find({ userId: userId }).populate("videoId");
        return res.status(200).json({
            success: true,
            message: `All videos in your love bag `,
            data: loves,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong, try again later.",
        });
    }
}

//  ======================  Find Love For This Video ====================

const getLoveForVideo = async (req, res) => {
    const videoId = req.body.videoId;
    const userId = req.user._id;
    try {
        const love = await Love.find({ videoId: videoId, userId: userId });
        if (love.length == 0) {
            return res.status(404).json({
                success: false,
                message: `You have't added this video to your loves !`,
            });
        } else {
            return res.status(201).json({
                success: true,
                message: `You have added this video to your loves ! !`,
            });
        }

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong, try again later.",
        });
    }
}


const loveController = {
    addLove,
    removeLove,
    getLoveForUser,
    getLoveForVideo,
};
module.exports = loveController;
