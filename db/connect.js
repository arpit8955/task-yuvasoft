const mongoose = require("mongoose");

const connectDB = async (url) => {
  await mongoose
    .connect(url)
    .then((e) => {
      console.log("Connected db successfully");
    })
    .catch((e) => {
      console.log("error in connecting to db");
      console.log(e);
    });
};

module.exports = connectDB;
