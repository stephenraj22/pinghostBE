const mongoose = require("mongoose");

const SubTopicSchema = mongoose.Schema(
  {
    subTopicName: {
      type: String,
      required: true,
    },
    topicId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Topic",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("SubTopic", SubTopicSchema);
