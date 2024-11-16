const Course = require('../models/Course.js');

const cloudinary = require("cloudinary").v2;
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});
//  ====================== Add Course ====================

const addCourse = async (req, res) => {
    const teacherId = req.user._id;
    const name = req.body.name;
    const level = req.body.level;
    const description = req.body.description;
    try {
        let course;
        let url = null;
        if (req.files.length > 0) {
            const result = await cloudinary.uploader.upload(req.files[0].path, {
                resource_type: "image",
            });
            url = result.secure_url;
            course = await Course.create({
                teacherId: teacherId,
                name: name,
                level: level,
                description: description,
                photo: url
            });
        } else {
            course = await Course.create({
                teacherId: teacherId,
                name: name,
                level: level,
                description: description,
            });
        }

        return res.status(201).json({
            success: true,
            message: "Course created successfully !",
            data: course,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong, try again later.",
        });
    }
}

//  ====================== Update Course ====================

const updateCourse = async (req, res) => {
    const courseId = req.body.courseId;
    let url = null;
    let newCourse;
    if (req.files.length > 0) {
        const result = await cloudinary.uploader.upload(req.files[0].path, {
            resource_type: "image",
        });
        url = result.secure_url;
        newCourse = {
            name: req.body.name,
            description: req.body.description,
            level: req.body.level,
            photo: url
        };
    } else {
        newCourse = {
            name: req.body.name,
            description: req.body.description,
            level: req.body.level,
        };
    }

    try {
        const courseOwner = await Course.findById(courseId);
        if (!courseOwner) {
            return res.status(404).json({
                success: false,
                message: `course not found !`,
            });
        }
        if (courseOwner.teacherId.toString() != req.user._id.toString()) {
            return res.status(400).json({
                success: false,
                message: "The course is not yours' !",
            });
        }
        const course = await Course.findByIdAndUpdate(
            courseId,
            { $set: newCourse },
            { new: true }
        );
        const courseData = {
            _id: course._id,
            name: course.name,
            description: course.description,
            level: course.level,
            photo: course.photo,
            teacherId: course.teacherId,
            createdAt: course.createdAt,
            updatedAt: course.updatedAt,
        };
        return res.status(201).json({
            success: true,
            message: "Course Updated Successfully",
            data: courseData,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong, try again later.",
        });
    }
}

//  ====================== Delete Course ====================

const deleteCourse = async (req, res) => {
    const courseId = req.params.id;
    try {
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({
                success: false,
                message: `course not found !`,
            });
        }
        const courseOwner = await Course.findById(courseId);
        if (courseOwner.teacherId.toString() != req.user._id.toString()) {
            return res.status(400).json({
                success: false,
                message: "The course is not yours' !",
            });
        }
        let deleteCourse = await Course.findByIdAndDelete(courseId);
        return res.status(200).json({
            success: true,
            message: `The course has deleted successfully !`,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong, try again later.",
        });
    }
}

//  ====================== Get All Courses ====================

const getAllCourses = async (req, res) => {
    try {
        const courses = await Course.find().populate("teacherId");
        return res.status(200).json({
            success: true,
            message: `All courses in our website  `,
            data: courses,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong, try again later.",
        });
    }
};

const courseController = {
    addCourse,
    updateCourse,
    deleteCourse,
    getAllCourses

};
module.exports = courseController;
