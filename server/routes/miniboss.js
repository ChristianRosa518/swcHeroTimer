const express = require("express");
const router = express.Router();
const miniBoss = require("../models/mini");

router.put("/updateMiniBoss", async (req, res) => {
  const name = req.body.name;
  const data = await miniBoss.findOne({ continent: name });
  //make new date to update time without large function
  const newDate = new Date(
    data.nextYear,
    data.nextMonth,
    data.nextDay,
    data.nextHour,
    data.nextMinute,
    0,
    0
  );

  // check if db time - current time is negative, if negative update new value with next value
  // add additional hours for mb update. three hour schedule.
  const currentDate = new Date();
  const mathedDate = newDate.getTime() - currentDate.getTime();
  console.log(currentDate.getTime(), "currentDate Time");
  console.log(newDate.getTime(), "newDate Time");
  console.log(mathedDate, "minused Time");

  if (mathedDate < 0) {
    console.log("times updated");
    newDate.setHours(newDate.getHours() + 3);
    const [years, months, days, hours, minutes, seconds] =
      getReturnValues(newDate);

    // update values
    data.nextYear = years;
    data.nextMonth = months;
    data.nextDay = days;
    data.nextHour = hours;
    data.nextMinute = minutes;

    data.save();
    // console.log(`${data.continent} Miniboss times updated`);
    res.json({
      years: years,
      months: months,
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds,
    });
  } else if (mathedDate > 0) {
    console.log("not saving data");
    res.json({
      years: data.nextYear,
      months: data.nextMonth,
      days: data.nextDay,
      hours: data.nextHour,
      minutes: data.nextMinute,
      seconds: data.nextSecond,
    });
  }
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
