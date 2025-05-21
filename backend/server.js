const express = require("express");
const cors = require("cors");
const path = require("path")
require("dotenv").config();
const dbconnect = require("./config/dbconnect");
const { signup, login, getData } = require("./controller/authController");
const userRoutes = require("./Routes/user");

const app = express();
dbconnect();

const PORT = 3030;



app.use(express.json());
app.use(cors());

app.post("/signup", signup);
app.post("/login", login);

app.get("/profile/:id", getData);
app.get("/",(req,res)=>{
  res.send("server started successfully")
})

app.use("/upload",userRoutes)
app.use("/uploads",express.static(path.join(__dirname,"uploads")))


app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});
