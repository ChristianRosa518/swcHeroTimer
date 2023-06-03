const express = require("express");
const router = express.Router();
const miniBoss = require("../models/mini");

//tester
router.get("/tester", (req, res) => {
  //   const { hours } = req.body;
  const newTime = 3 * 60 * 60 * 1000;
  res.json({ newTimeTest: newTime });
});

router.post("/updateMiniBoss", (req, res) => {
  const { hours } = req.body;
  const newTime = 3 * 60 * 60 * 1000;
  res.json({ newTimeTest: newTime });
});

router.get("/getTimes", (req, res) => {
  console.log("getting times for");

  const [years, months, days, hours, minutes, seconds] = getReturnValues(date);
  res.json({
    year: years,
    month: months,
    day: days,
    hours: hours,
    minutes: minutes,
    seconds: seconds,
  });
});

const getReturnValues = (countDown) => {
  years = countDown.getFullYear();
  months = countDown.getMonth();
  days = countDown.getDay();
  hours = countDown.getHours();
  minutes = countDown.getMinutes();
  seconds = countDown.getSeconds();

  // Date.setHours(hours, minutes, seconds, ms)

  return [years, months, days, hours, minutes, seconds];
};

router.post("/newMB", (req, res) => {
  console.log(req.body);
  const minibossTime = new miniBoss({
    continent: req.body.continent,
    currentYear: req.body.currentYear,
    currentMonth: req.body.currentMonth,
    currentDay: req.body.currentDay,
    currentHour: req.body.currentHour,
    currentMinute: req.body.currentMinute,
    nextYear: req.body.nextYear,
    nextMonth: req.body.nextMonth,
    nextDay: req.body.nextDay,
    nextHour: req.body.nextHour,
    nextMinute: req.body.nextMinute,
  });

  minibossTime.save();

  res.json(minibossTime);
});

module.exports = router;
