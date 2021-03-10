const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const employeSchema = new Schema(
  {
    firstName: String,
    lastName: String,
    age: Number,
    address: String,
    phoneNumber: String,
    employePosition: String,
    hourPerWeek: Number,
    salaryPerHour: Number,
    description: String
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Employe", employeSchema);
