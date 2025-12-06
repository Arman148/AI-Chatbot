const mongoose = require("mongoose");

const conceptSchema = new mongoose.Schema(
  {
    mastery: { type: Number, min: 0, max: 1, default: 0 },
  },
  { _id: false }
);

const topicProgressSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      enum: ["not_started", "in_progress", "mastered"],
      default: "not_started",
    },
    mastery: { type: Number, min: 0, max: 1, default: 0 },
    concepts: { type: Map, of: conceptSchema, default: {} },
    formulasKnown: { type: [String], default: [] },
    examplesSolved: {
      type: [
        {
          id: String,
          difficulty: String,
          success: Boolean,
        },
      ],
      default: [],
    },
    lastUpdated: { type: Date, default: Date.now },
  },
  { _id: false }
);

const userProfileSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  topics: {
    type: Map,
    of: topicProgressSchema,
    default: {},
  },
});

module.exports = mongoose.model("UserProfile", userProfileSchema);
