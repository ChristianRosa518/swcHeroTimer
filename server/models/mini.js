const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const miniBossSchema = new Schema({
  continent: {
    type: String,
    require: true,
    unique: true,
  },
  currentYear: {
    type: Number,
  },
  currentMonth: {
    type: Number,
  },
  currentDay: {
    type: Number,
  },
  currentHour: {
    type: Number,
  },
  currentMinute: {
    type: Number,
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
});

const miniBoss = mongoose.model("miniBoss", miniBossSchema);

module.exports = miniBoss;
