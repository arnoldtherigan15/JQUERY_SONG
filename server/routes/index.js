const router = require("express").Router();
const userRouter = require("./userRouter");
const songRouter = require("./songRouter");

router.use("/users", userRouter);
router.use("/songs", songRouter);

module.exports = router;
