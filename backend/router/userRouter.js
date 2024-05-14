const express = require('express');
const router = express.Router();
const {createUser,updateUser,getUser,deleteUser, getUserByProject,} = require ("../controller/userController")
 
router.route("/project").get(getUserByProject)
router.route("/").post(createUser)
router.route("/:id").put(updateUser)
router.route("/:id").delete(deleteUser)
router.route("/:id").get(getUser)




module.exports = router