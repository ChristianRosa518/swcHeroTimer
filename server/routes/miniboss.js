const express = require("express");
const router = express.Router();
const miniBoss = require("../models/mini");

router.put("/updateMiniBoss", async (req, res) => {
  const name = req.body.name;
  const data = await miniBoss.findOne({ continent: name });
  //make new date to update time without large function
  const newDate = new Date(
    Date.UTC(
      data.nextYear,
      data.nextMonth,
      data.nextDay,
      data.nextHour,
      data.nextMinute,
      0,
      0
    )
  );

  console.log("UTC DATE : ", newDate.getUTCDay());
  // check if db time - current time is negative, if negative update new value with next value
  // add additional hours for mb update. three hour schedule.
  const updatedData = await checkUpdate(newDate, data);
  res.send(updatedData);
});

router.get("/getTimes", async (req, res) => {
  console.log("Fetching times");
  const data = await miniBoss.find();
  res.send(data);
});

const checkUpdate = async (newDate, data) => {
  const currentDate = new Date();
  console.log("currentDATE : ", currentDate.getUTCDate());
  const mathedDate = newDate.getTime() - currentDate.getTime();

  if (mathedDate < 0) {
    newDate.setUTCHours(newDate.getUTCHours() + 3);
    const [years, months, days, hours, minutes, seconds] =
      getReturnValues(newDate);

    // update values
    data.nextYear = years;
    data.nextMonth = months;
    data.nextDay = days;
    data.nextHour = hours;
    data.nextMinute = minutes;

    data.save();
    console.log(newDate.getHours(), newDate);
    console.log(newDate, "times updated");
    // console.log(`${data.continent} Miniboss times updated`);
    return {
      years: years,
      months: months,
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds,
    };
  } else if (mathedDate > 0) {
    const [years, months, days, hours, minutes, seconds] =
      getReturnValues(newDate);

    console.log(newDate, "not updating");
    return {
      years: years,
      months: months,
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds,
    };
  }
};

const getReturnValues = (countDown) => {
  const years = countDown.getUTCFullYear();
  const months = countDown.getUTCMonth();
  const days = countDown.getUTCDate();
  const hours = countDown.getUTCHours();
  const minutes = countDown.getUTCMinutes();
  const seconds = countDown.getUTCSeconds();

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
