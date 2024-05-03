const express = require('express');
const router = express.Router();
const {createProject,updateProject,deleteProject, getProject,getAllProjects} = require ("../controller/projectController")
 

router.route("/").post(createProject)
router.route("/:id").put(updateProject)
router.route("/:id").delete(deleteProject)
router.route("/:id").get(getProject)
router.route("/all").get(getAllProjects)


module.exports = router