const router = require("express").Router();
const SongController = require("../controllers/SongController");
const authentication = require('../middlewares/authentication');
const authorization = require("../middlewares/authorization");

router.use(authentication)
router.post("/", SongController.create);
router.get("/", SongController.findAll);
// use global
router.get("/:id", authorization, SongController.findOne);
router.delete("/:id", authorization ,SongController.delete);
router.put("/:id", authorization ,SongController.update);

module.exports = router;
