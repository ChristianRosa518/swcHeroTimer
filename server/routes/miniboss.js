const express = require("express");
const router = express.Router();
const miniBoss = require("../models/mini");

router.put("/update", async (req, res) => {
  const name = req.body.name;
  const offset = req.body.offset;
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
  console.log("mb timer");
  const updatedData = checkUpdate(newDate, data, offset);
  res.send(updatedData);
  console.log("");
});

const checkUpdate = (newDate, data, offset) => {
  console.log("Server off set", offset);

  const mathedDate = newDate.getTime() - Date.now() + offset;
  console.log("The Time : ", mathedDate);

  if (mathedDate < 0) {
    while (mathedDate < 0) {
      newDate.setHours(newDate.getHours() + 3);
      const mathedDate = newDate.getTime() - Date.now() + offset;
      console.log(mathedDate);
      const [years, months, days, hours, minutes, seconds] =
        getReturnValues(newDate);

      // update values
      data.nextYear = years;
      data.nextMonth = months;
      data.nextDay = days;
      data.nextHour = hours;
      data.nextMinute = minutes;

      data.save();
      console.log("times updated");
      // console.log(`${data.continent} Miniboss times updated`);
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
  console.log("Fetching MB times");
  const data = await miniBoss.find();
  res.send({ data: data });
});

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
