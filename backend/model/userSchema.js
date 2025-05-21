const mongodb = require("mongoose");

const Users = new mongodb.Schema({
  name: String,
  email: String,
  country: String,
  phone: Number,
  password: String,
  profileImage: {
    url: String,
    public_id: String,
  },
});

module.exports = mongodb.model("users", Users);
