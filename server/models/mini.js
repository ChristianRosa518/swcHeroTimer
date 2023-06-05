const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const miniBossSchema = new Schema({
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

const miniBoss = mongoose.model("miniBoss", miniBossSchema);

module.exports = miniBoss;
