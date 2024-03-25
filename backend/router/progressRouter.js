const express = require ("express");
const router = express.Router();
const {createProgress,updateTaskStatus,updateProgress,deleteProgress,getAllProgress,getProgress, getTodo, getInProgress, getDone} = require("../controller/progressController")

router.route("/").post(createProgress)
router.route("/:id").put(updateProgress)
router.route("/:id").delete(deleteProgress)
router.route("/").get(getAllProgress)
router.route("/:id").get(getProgress)
router.route("/user/todo").get(getTodo)
router.route("/user/inProgress").get(getInProgress)
router.route("/user/done").get(getDone)
router.route("/taskStatus/:id").put(updateTaskStatus)



module.exports =router