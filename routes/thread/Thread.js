const express = require("express");
const router = express.Router();
const Thread = require("../../models/Thread");
const Topic = require("../../models/Topic");

router.post("/createThread", async (req, res) => {
  try {
    const thread = new Thread({
      topicName: req.body.topicName,
      topicId: req.body.topicId,
      content: req.body.content,
      count: 0,
    });
    const threadResult = await thread.save();
    return res.status(200).json({
      result: threadResult,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      result: "failure - Error creating new topic",
    });
  }
});

router.get("/getThreadsForHome", async (req, res) => {
  try {
    const threadResult = await Thread.find({}, { content: { $slice: 1 } })
      .sort({
        _id: -1,
      })
      .populate("topicId", "topicName")
      .limit(10);
    const topics = await Topic.find({}, { topicName: 1 });
    return res.status(200).json({ home: threadResult, topics: topics });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      result: "failure - Error in fetching",
    });
  }
});

router.get("/getThreadsByCategory", async (req, res) => {
  try {
    console.log(req.query.topicId)
    const threadResult = await Thread.find(
      { topicId: req.query.topicId },
      { content: { $slice: 1 } }
    ).sort({
      _id: -1,
    });
    return res.status(200).json({ home: threadResult });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      result: "failure - Error in fetching",
    });
  }
});

router.get("/getThread", async (req, res) => {
  try {
    const threadResult = await Thread.findById(req.query.id).populate("topicId", "topicName");
    console.log(req.query.id)
    return res.status(200).json({ result: threadResult });
  } catch (err) {
    return res.status(400).json({
      result: "failure - Error creating new topic",
    });
  }
});

module.exports = router;
