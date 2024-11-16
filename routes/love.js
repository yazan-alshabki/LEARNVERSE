const { Router } = require("express");
const router = Router();
const { protect, protectAdmin, protectTeacher } = require("../middlewares/authMiddleware.js");
const loveController = require("../controllers/love.js");

//  ======================  Add love ====================
router.post("/add-love", protect, loveController.addLove);

//  ====================== Get User's Loves ====================
router.get("/get-all-loves", protect, loveController.getLoveForUser);

//  ======================  Remove love ====================
router.delete("/delete-love/:id", protect, loveController.removeLove);

//  ======================  Find Love For This Video ====================
router.post("/find-love-for-this-video", protect, loveController.getLoveForVideo);
module.exports = router;
