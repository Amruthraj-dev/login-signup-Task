const mongoose = require("mongoose");

const dbconnect = () => {
  mongoose
    .connect("mongodb://127.0.0.1:27017/users")
    .then(() => console.log("db connected successfully"))
    .catch((err) => console.log("failed to connect database", err.message));
};

module.exports = dbconnect;
