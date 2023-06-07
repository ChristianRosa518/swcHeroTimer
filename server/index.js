require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const miniboss = require("./routes/miniboss");
const baphomet = require("./routes/baphomet");

const app = express();
const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use(express.json());

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server live on ${port}`));

app.get("/", (req, res) => {
  res.json({ msg: "SWC Hero Timer Server Live" });
});
//trying to redeploy

app.use("/miniboss", miniboss);
// dbjhasiedf
app.use("/baphomet", baphomet);

mongoose
  .connect(process.env.MONGODB_USER, {
    useNewurlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to Db");
  })
  .catch(console.error);
