const dotenv = require("dotenv");
const mongoose = require("mongoose");
const fs = require("fs");

dotenv.config({ path: "../.env" });

//connect to database
mongoose.connect(process.env.MONGO_URI);

// Load model
const User = require("./models/User.model");

//Data file
const users = JSON.parse(
  fs.readFileSync("./testing/seeder/users.json", "utf-8")
);

//insert into database
const insertData = async () => {
  try {
    await User.create(users);
    console.log("data has been inserted");
    process.exit;
  } catch (err) {
    console.log(err);
  }
};

//delete all data in database
const deleteData = async () => {
  try {
    await User.deleteMany();
    console.log("all data deleted.");
    process.exit;
  } catch (err) {
    console.log(err);
  }
};
