const { Router } = require("express");
const router = Router();
const { protect, protectAdmin, protectTeacher } = require("../middlewares/authMiddleware.js");
const courseController = require("../controllers/course.js");
const { validationHandler } = require("../helpers/validation.js");
const { add_update_course_validator } = require("../middlewares/validator.js");
const upload = require("../utils/fileUpload.js");

//  ====================== Add Course ====================
router.post("/add-course", protectTeacher, upload.array("photo", 1)
    , validationHandler(add_update_course_validator), courseController.addCourse);

//  ====================== Update Course ====================
router.patch("/update-course", protectTeacher, upload.array("photo", 1)
    , validationHandler(add_update_course_validator), courseController.updateCourse);

//  ====================== Delete Course ====================
router.delete("/delete-course/:id", protectTeacher, courseController.deleteCourse);

//  ====================== Get All Courses ====================
router.get("/", courseController.getAllCourses);

module.exports = router;
