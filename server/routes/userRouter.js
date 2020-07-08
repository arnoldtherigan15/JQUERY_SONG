const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController.js");

router.get("/", UserController.list);
router.post("/register", UserController.register);
router.post("/login", UserController.login);

module.exports = router;
