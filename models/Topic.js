const mongoose = require("mongoose");

const TopicSchema = mongoose.Schema(
  {
    topicName: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Topic", TopicSchema);
