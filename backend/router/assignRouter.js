const express = require ("express");
const router = express.Router();
const { createAssign, deleteAssign, getUserByAssign } = require("../controller/assignController")


router.route("/").post(createAssign)
router.route("/assign").get(getUserByAssign)

router.route("/:id").delete(deleteAssign)



module.exports =router