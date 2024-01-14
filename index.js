const express = require("express");
const cors = require("cors");
const app = express();
const mongoConnect = require("./mongoconnect/mongoconnect");
const topic = require("./routes/topic/Topic");
const thread = require("./routes/thread/Thread");

const dotenv = require("dotenv");
dotenv.config();

app.use(cors());
app.use(express.json());
app.use("/topic", topic);
app.use("/thread", thread);

app.listen(process.env.PORT || 8000, (err) => {
  if (err) {
    console.log(err);
  } else {
    mongoConnect();
    console.log(`Listening open PORT ${process.env.PORT}`);
  }
});
