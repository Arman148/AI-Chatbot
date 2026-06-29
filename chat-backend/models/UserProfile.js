const mongoose = require("mongoose");

const ConceptSchema = new mongoose.Schema({
  mastery: { type: Number, min: 0, max: 1, default: 0 },
});

const TopicProgressSchema = new mongoose.Schema({
  status: {
    type: String,
    enum: ["notstarted", "inprogress", "mastered"],
    default: "notstarted",
  },
  mastery: { type: Number, min: 0, max: 1, default: 0 },
  concepts: {
    type: Map,
    of: ConceptSchema,
    default: {},
  },
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
});

const UserProfileSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  topics: {
    type: Map,
    of: TopicProgressSchema,
    default: {},
  },
});

module.exports = mongoose.model("UserProfile", UserProfileSchema);
