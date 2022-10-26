
const express = require("express");
const multer = require("multer");
const path = require("path");

const app = express();
const port = 3000;

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
    if (file.mimetype == 'text/plain') { // checking the MIME type of the uploaded file
        cb(null, true);
    } else {
        cb(null, false);
    }
}

const upload = multer({
    fileFilter,
    storage
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/index.html"));
});

app.post("/uploadFile", upload.single("file"), (req, res, next) => { 
    const file = req.file;
    console.log(req.headers);

  if (!file) {
    const error = new Error("Please upload a file");
    error.httpStatusCode = 400;
    return next(error);
  }
  const multerText = Buffer.from(file.buffer).toString("utf-8");

  const result = {
    fileText: multerText,
  };

  res.send(result);
});

app.listen(port, () => console.log(`App listening on port ${port}!`));