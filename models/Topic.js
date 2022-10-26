const mongoose = require("mongoose");

const TopicSchema = mongoose.Schema(
  {
    topicName: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Topic', TopicSchema)
