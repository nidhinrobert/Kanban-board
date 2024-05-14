const express = require ("express");
const router = express.Router();
const {createProgress,updateTaskStatus,updateProgress,deleteProgress,getProgress,gettodoByProject, getInProgressByProject, getDoneByProject} = require("../controller/progressController")

router.route("/").post(createProgress)
router.route("/:id").put(updateProgress)
router.route("/:id").delete(deleteProgress)

router.route("/:id").get(getProgress)
router.route("/user/todo").get(gettodoByProject)

router.route("/user/inProgress").get(getInProgressByProject)
router.route("/user/done").get(getDoneByProject)
router.route("/taskStatus/:id").put(updateTaskStatus)



module.exports =router