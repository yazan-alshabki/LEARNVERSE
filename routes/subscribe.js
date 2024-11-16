const { Router } = require("express");
const router = Router();
const { protect, protectAdmin, protectTeacher } = require("../middlewares/authMiddleware.js");
const subscribeController = require("../controllers/subscribe.js");

//  ======================  Add subscribe ====================
router.post("/add-subscribe", protect, subscribeController.addSubscribe);

//  ====================== Get User's subscribes ====================
router.get("/get-all-subscribes", protect, subscribeController.getSubscribeForUser);

//  ======================  Remove subscribe ====================
router.delete("/delete-subscribe/:id", protect, subscribeController.removeSubscribe);

//  ======================  Find Subscribe For This Course ====================
router.post("/find-subscribe-for-this-course", protect, subscribeController.getSubscribeForCourse);

module.exports = router;
