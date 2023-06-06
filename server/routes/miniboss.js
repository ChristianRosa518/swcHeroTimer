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

  const updatedData = checkUpdate(newDate, data);
  res.send(updatedData);
});

const checkUpdate = (newDate, data) => {
  const serverOffset = new Date().getTimezoneOffset() * 60 * 1000;

  console.log("Fetched Time : ", newDate);
  console.log("CurrentTime : ", new Date());
  console.log(
    "measured time : ",
    newDate.getTime() - (Date.now() + serverOffset)
  );
  let mathedDate = newDate.getTime() - (Date.now() + serverOffset);

  if (mathedDate < 0) {
    newDate.setHours(newDate.getHours() + 3);
    console.log("Updated Time : ", newDate);

    console.log("TimeZone OffSet: ", newDate.getTimezoneOffset());
    console.log(
      "measured time after addition : ",
      newDate.getTime() - Date.now()
    );
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
  const years = countDown.getFullYear();
  const months = countDown.getMonth();
  const days = countDown.getDate();
  const hours = countDown.getHours();
  const minutes = countDown.getMinutes();
  const seconds = countDown.getSeconds();

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
  console.log("Fetching times");
  const data = await miniBoss.find();
  res.send(data);
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
