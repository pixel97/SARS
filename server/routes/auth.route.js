const express = require("express");
const authController = require("../controller/auth.controller");
const router = express.Router();
const auth = require("../middleware/auth");

// /api/auth/hello...
router.post("/register", authController.register);
router.post("/signin", authController.signin);
router.get("/isauth", auth(), authController.isauth);

module.exports = router;
