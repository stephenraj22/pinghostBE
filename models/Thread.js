const mongoose = require("mongoose");

const ThreadSchema = mongoose.Schema(
  {
    topicName: {
      type: String,
      required: true,
      unique: true,
    },
    topicId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Topic",
      required: true,
    },
    content: [
      {
        type: String,
      },
    ],
    count: {
      type: Number,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Thread", ThreadSchema);
