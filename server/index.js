require("dotenv").config();
const express = require("express");
// const mongoose = require("mongoose")
const cors = require("cors");

const app = express();
app.use(cors());

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server live on ${port}`));

app.get("/", (req, res) => {
  res.json({ msg: "SWC Hero Timer Server Live" });
});

app.post("/updateMiniBoss", (req, res) => {
  const { hours } = req.body;
  const newTime = 3 * 60 * 60 * 1000;
  res.send({ newTimeTest: newTime });
});
