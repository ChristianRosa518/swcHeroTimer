const express = require("express");
const router = express.Router();
const baphomet = require("../models/baphomet");

/* START OF WEEK 6/26/23, END OF WEEK 7/3/23
Conq of Abyss : 6/27/23 10:30 PM >> 6/30/23 1:30AM >> 7/4/23 10:30PM
			     + 2 Days 3 Hours >> 4 Days 21 Hours 
Conq of Flame : 6/28/23 10:30PM >> 7/1/23 10:30PM >> 7/5/23 10:30PM
			     + 3 Days >> + 4 Days
Conq of Storm : 6/29/23 10:30PM >> 7/1/23 1:30AM >> 7/6/23 10:30PM
			     + 1 Day 3 Hours >> 5 Days 21 Hours
Conq of Cold : 6/30/23 10:30PM >> 7/2/23 10:30PM >> 7/7/23 10:30PM
			     + 2 Days + 5 Days 
Conq of Radiance : 6/26/23 10:30PM >> 7/2/23 1:30AM >> 7/3/23 10:30PM
           + 6 Days 3 Hours >>  + 21 Hours */

router.put("/update", async (req, res) => {
  const name = req.body.name;
  const offset = req.body.offset;
  const data = await baphomet.findOne({ continent: name });
  const toggle = data.hoursToggle;
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

  // Each dataset has two ways to update time, pull data, check which timeset to use for update, then save for next update.
  // update time in hours
  const hoursADD = toggle ? data.hoursA : data.hoursB;
  console.log(toggle, hoursADD);

  const updatedData = checkUpdate(newDate, data, offset, hoursADD);
  res.send(updatedData);
  console.log(data.continent, "Hours Added");
});

const checkUpdate = (newDate, data, offset, hoursADD) => {
  const mathedDate = newDate.getTime() - (Date.now() + offset);
  console.log("The Time : ", mathedDate);

  if (mathedDate < 0) {
    newDate.setHours(newDate.getHours() + hoursADD);
    const [years, months, days, hours, minutes, seconds] =
      getReturnValues(newDate);

    console.log(days);
    // update values
    data.nextYear = years;
    data.nextMonth = months;
    data.nextDay = days;
    data.nextHour = hours;
    data.nextMinute = minutes;
    console.log(data.hoursToggle, "before");
    data.hoursToggle = !data.hoursToggle;
    console.log(data.hoursToggle, "after");

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
