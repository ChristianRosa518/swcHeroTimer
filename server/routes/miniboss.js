const express = require("express");
const router = express.Router();
const miniBoss = require("../models/mini");

//tester
router.get("/tester", (req, res) => {
  //   const { hours } = req.body;
  const newTime = 3 * 60 * 60 * 1000;
  res.json({ newTimeTest: newTime });
});

router.put("/updateMiniBoss", async (req, res) => {
  const name = req.body.name;
  const data = await miniBoss.findOne({ continent: name });
  //22
  const newDate = new Date(
    data.nextYear,
    data.nextMonth,
    data.nextDay,
    // data.nextHour,
    19,
    data.nextMinute,
    0,
    0
  );

  newDate.setHours(newDate.getHours() + 3);

  res.send(newDate);
});

router.get("/getTimes", async (req, res) => {
  console.log("Times got");
  const data = await miniBoss.find();

  res.send(data);
  // console.log(date);

  // const [years, months, days, hours, minutes, seconds] = getReturnValues(date);
  // res.json({
  //   year: years,
  //   month: months,
  //   day: days,
  //   hours: hours,
  //   minutes: minutes,
  //   seconds: seconds,
  // });
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

router.put("/updateTime", async (req, res) => {
  const name = await miniBoss.findOne(req.body.name);
  console.log("hi");
});

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
