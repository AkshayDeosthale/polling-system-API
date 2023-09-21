const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const port = 3000;
const cors = require("cors");

require("dotenv").config();

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

// Middleware to parse JSON payloads
app.use(express.json());

app.use("/questions", require("./routes/questions"));
app.use("/options", require("./routes/answers"));

async function DBCONNECT() {
  return mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

app.listen(process.env.PORT, async () => {
  try {
    await DBCONNECT();
    console.log("Connected To MongoDB");
    console.log(
      `⚡️[server]: Server is running at http://localhost:${process.env.PORT}`
    );
  } catch (error) {
    console.log("Error connecting to MongoDB");
    return;
  }
});
