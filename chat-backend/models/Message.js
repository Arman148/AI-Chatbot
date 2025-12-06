const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  topicId: { type: String, required: true },
  content: { type: String, required: true },
  role: { type: String, enum: ["user", "assistant"], required: true },
  timestamp: { type: Date, default: Date.now },
});

//  build an index ordered by userId, topicId, and timestamp for efficient querying
messageSchema.index({ userId: 1, topicId: 1, timestamp: 1 });

module.exports = mongoose.model("Message", messageSchema);
