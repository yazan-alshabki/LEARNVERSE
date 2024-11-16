const Subscribe = require("../models/Subscribe.js");
const Course = require('../models/Course.js');
const User = require('../models/User.js')
//  ====================== Add Subscribe ====================

const addSubscribe = async (req, res) => {
    const courseId = req.body.courseId;
    const userId = req.user._id;
    try {
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({
                success: false,
                message: `Course not found !`,
            });
        }
        const subscribeFind = await Subscribe.find({
            courseId: courseId,
            userId: userId
        });
        if (subscribeFind.length == 0) {
            const subscribe = await Subscribe.create({
                courseId: courseId,
                userId: userId
            });
            const course = await Course.findByIdAndUpdate(
                courseId,
                { $inc: { likes: 1 } }, // Use the $inc operator to increment the likes field by 1
                { new: true }
            );
        }
        return res.status(201).json({
            success: true,
            message: `Subscribe added successfully !`,
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong, try again later.",
        });
    }
}

//  ====================== Remove Subscribe ====================

const removeSubscribe = async (req, res) => {
    const courseId = req.params.id;
    const userId = req.user._id;

    try {
        const subscribe = await Subscribe.find({ courseId: courseId, userId: userId });
        if (subscribe.length == 0) {
            return res.status(404).json({
                success: false,
                message: `Subscribe not found !`,
            });
        }
        let deleteSubscribe = await Subscribe.findByIdAndDelete(subscribe[0]._id);
        const course = await Course.findByIdAndUpdate(
            courseId,
            { $inc: { likes: -1 } }, // Use the $inc operator to increment the likes field by 1
            { new: true }
        );
        return res.status(201).json({
            success: true,
            message: `The Subscribe has deleted successfully !`,
        });


    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong, try again later.",
        });
    }
}

//  ====================== Get User's Subscribes ====================


const getSubscribeForUser = async (req, res) => {
    const userId = req.user._id;
    try {
        let subscribes = await Subscribe.find({ userId: userId }).populate("courseId");
        for (let i = 0; i < subscribes.length; i++) {
            subscribes[i]["courseId"]["teacherId"] = await User.findById(subscribes[i]["courseId"]["teacherId"]);
        }
        return res.status(200).json({
            success: true,
            message: `All courses in your Subscribe bag `,
            data: subscribes,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong, try again later.",
        });
    }
}

//  ======================  Find Subscribe For This Course ====================

const getSubscribeForCourse = async (req, res) => {
    const courseId = req.body.courseId;
    const userId = req.user._id;
    try {
        const subscribe = await Subscribe.find({ courseId: courseId, userId: userId });
        if (subscribe.length == 0) {
            return res.status(404).json({
                success: false,
                message: `You have't added this course to your subscribes !`,
            });
        } else {
            return res.status(201).json({
                success: true,
                message: `You have added this course to your subscribes ! !`,
            });
        }

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong, try again later.",
        });
    }
}


const SubscribeController = {
    addSubscribe,
    removeSubscribe,
    getSubscribeForUser,
    getSubscribeForCourse
};
module.exports = SubscribeController;
