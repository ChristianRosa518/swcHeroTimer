const express = require("express");
const router = express.Router();
const miniBoss = require("../models/mini");

router.put("/updateMiniBoss", async (req, res) => {
  const name = req.body.name;
  const data = await miniBoss.findOne({ continent: name });
  //make new date to update time without large function
  console.log(data);
  const newDate = new Date(
    data.nextYear,
    data.nextMonth,
    data.nextDay,
    data.nextHour,
    // 12,
    data.nextMinute,
    0,
    0
  );

  // add additional hours for mb update. three hour schedule.
  newDate.setHours(newDate.getHours() + 3);

  //get number values
  const [years, months, days, hours, minutes, seconds] =
    getReturnValues(newDate);

  // update values

  data.nextYear = years;
  data.nextMonth = months;
  data.nextDay = days;
  data.nextHour = hours;
  data.nextMinute = minutes;

  data.save();
  // console.log("updated", data);

  console.log(`${data.continent} Miniboss times updated`);
  res.json({
    years: years,
    months: months,
    days: days,
    hours: hours,
    minutes: minutes,
    seconds: seconds,
  });
});

router.get("/getTimes", async (req, res) => {
  const data = await miniBoss.find();
  res.send(data);
});

const getReturnValues = (countDown) => {
  const years = countDown.getFullYear();
  const months = countDown.getMonth();
  const days = countDown.getDate();
  const hours = countDown.getHours();
  const minutes = countDown.getMinutes();
  const seconds = countDown.getSeconds();

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
