const dotenv = require("dotenv");
const mongoose = require("mongoose");
const fs = require("fs");

dotenv.config({ path: "../.env" });

//connect to database
mongoose.connect(process.env.MONGO_URI);

//insert into database
const insertData = async (Model, data) => {
  try {
    await Model.create(data);
    console.log("data has been inserted");
    mongoose.connection.close();
    process.exit;
  } catch (err) {
    console.log(err);
  }
};

//delete all data in database
const deleteData = async (Model) => {
  try {
    await Model.deleteMany();
    console.log("all data deleted.");
    mongoose.connection.close();
    process.exit;
  } catch (err) {
    console.log(err);
  }
};

// description:
// insert data:   node seeder -i Users
// delete data:   node seeder -d Users
//                node seeder 2   3
const command = process.argv[2];
const table = process.argv[3];

//Data file
const tableLower = table.toLocaleLowerCase();
const data = JSON.parse(
  fs.readFileSync(`./testing/seeder/${tableLower}.json`, "utf-8")
);

// Load model
const modelName = table.charAt(0).toUpperCase() + table.slice(1);
const Model = require(`./models/${modelName}Models`);

if (process.argv[2] === "-i") {
  insertData(Model, data);
} else if (process.argv[2] === "-d") {
  deleteData(Model);
}
