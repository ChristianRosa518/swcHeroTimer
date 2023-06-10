const express = require("express");
const router = express.Router();
const baphomet = require("../models/baphomet");

router.put("/update", async (req, res) => {
  const name = req.body.name;
  const offset = req.body.offset;
  const data = await baphomet.findOne({ continent: name });
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

  // console.log("Utc Time", Date.now());
  console.log(newDate.toUTCString(), "ji");
  // console.log("updating bapho times");

  const updatedData = checkUpdate(newDate, data, offset);
  res.send(updatedData);
  console.log("");
});

const checkUpdate = (newDate, data, offset) => {
  const mathedDate = newDate.getTime() - (Date.now() + offset);
  console.log("The Time : ", mathedDate);

  if (mathedDate < 0) {
    while (mathedDate < 0) {
      newDate.setDate(newDate.getDate() + 5);
      const [years, months, days, hours, minutes, seconds] =
        getReturnValues(newDate);

      console.log(days);
      // update values
      data.nextYear = years;
      data.nextMonth = months;
      data.nextDay = days;
      data.nextHour = hours;
      data.nextMinute = minutes;

      data.save();
      console.log("bapho times updated");
      return {
        years: years,
        months: months,
        days: days,
        hours: hours,
        minutes: minutes,
        seconds: seconds,
      };
    }
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

  console.log(
    "currentDateinReturnValues",
    years,
    months,
    days,
    hours,
    minutes,
    seconds
  );

  return [years, months, days, hours, minutes, seconds];
};

router.get("/getTimes", async (req, res) => {
  console.log("Bapho times");
  const data = await baphomet.find();
  res.send({ data: data });
});

router.post("/newMB", (req, res) => {
  console.log(req.body);
  const Time = new baphomet({
    continent: req.body.continent,
    nextYear: req.body.nextYear,
    nextMonth: req.body.nextMonth,
    nextDay: req.body.nextDay,
    nextHour: req.body.nextHour,
    nextMinute: req.body.nextMinute,
  });

  Time.save();

  res.json(Time);
});

module.exports = router;
