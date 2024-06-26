const express = require("express");
const dotenv = require("dotenv").config()
const connectDB = require("./config/connection")
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

app.use (cors())
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api/kanban",require("./router/progressRouter"));
app.use("/api/kanban/task/assign",require("./router/assignRouter"));
app.use("/api/kanban/project",require("./router/projectRouter"))
app.use("/api/kanban/project/user",require("./router/userRouter"))


const port = process.env.PORT ||8000;

app.listen(port,() => {
    connectDB();
    console.log(`Server is running on http://localhost:${port}`);
});