const express = require("express");
const cors = require("cors");
const app = express();
const mongoConnect = require("./mongoconnect/mongoconnect");
const topic = require("./routes/topic/Topic");
const thread = require("./routes/thread/Thread");

const dotenv = require("dotenv");
dotenv.config();

const allowedOrigins = ['http://localhost:3000', 'https://site.com'];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
  })
);
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
