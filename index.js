const express = require("express");
const cors = require("cors");
const app = express();
const mongoConnect = require("./mongoconnect/mongoconnect");
const topic = require("./routes/topic/Topic");
const thread = require("./routes/thread/Thread");

const dotenv = require("dotenv");
dotenv.config();

app.use(cors());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000"); // Replace with your React app's URL
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});
app.use(express.json());
app.use("/api/topic", topic);
app.use("/api/thread", thread);

app.listen(process.env.PORT || 8000, (err) => {
  if (err) {
    console.log(err);
  } else {
    mongoConnect();
    console.log(`Listening open PORT ${process.env.PORT}`);
  }
});
