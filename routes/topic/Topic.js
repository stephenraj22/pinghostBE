const express = require("express");
const SubTopic = require("../../models/SubTopic");
const Topic = require("../../models/Topic");
const router = express.Router();

router.post("/addTopic", async (req, res) => {
  try {
    console.log("adding topic");
    const topic = new Topic({
      topicName: req.body.topicName,
    });
    const topicResult = await topic.save();
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    return res.status(200).json({
      result: topicResult,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      result: "failure - Error creating new topic",
    });
  }
});

router.post("/addSubTopic", async (req, res) => {
  try {
    console.log("adding sub topic");
    const subTopic = new SubTopic({
      subTopicName: req.body.subTopicName,
      topicId: req.body.topicId,
    });
    const subTopicResult = await subTopic.save();
    return res.status(200).json({
      result: subTopicResult,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      result: "failure - Error creating new sub topic",
    });
  }
});

router.get("/getTopics", async (req, res) => {
  try {
    const topicResult = await Topic.find().sort({ createdAt: -1 });
    return res.status(200).json({ result: topicResult });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      result: "failure - Error getting topics",
    });
  }
});

router.get("/getSubTopics", async (req, res) => {
  try {
    console.log(req);
    const subTopicResult = await SubTopic.find({
      topicId: req.query.topicId,
    }).sort({
      createdAt: -1,
    });
    return res.status(200).json({ result: subTopicResult });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      result: "failure - Error getting sub topics",
    });
  }
});

router.post("/dummy", async (req, res) => {
  try {
    console.log(req.body);
    console.log(req.file);
    console.log(req.ste);
    return res.status(200).json({ result: "done" });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      result: "failure - Error getting sub topics",
    });
  }
});

module.exports = router;
