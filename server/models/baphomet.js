const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BaphometSchema = new Schema({
  continent: {
    type: String,
    require: true,
    unique: true,
  },
  nextYear: {
    type: Number,
  },
  nextMonth: {
    type: Number,
  },
  nextDay: {
    type: Number,
  },
  nextHour: {
    type: Number,
  },
  nextMinute: {
    type: Number,
  },
  nextSecond: {
    type: Number,
  },
});

const Baphomet = mongoose.model("baphomet", BaphometSchema);

module.exports = Baphomet;
