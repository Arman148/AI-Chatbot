require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const checkJwt = require("./middleware/auth");
const Message = require("./models/Message");
const UserProfile = require("./models/UserProfile");
const app = express();

app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

const PORT = process.env.PORT || 5000;
const mongoDBURL = process.env.MONGODB_URI;

mongoose
  .connect(mongoDBURL)
  .then(() => console.log("Connected to MongoDB!"))
  .catch((err) => console.error("Connection Error:", err));

app.get("/", (req, res) => {
  res.send("API is running and connected to MongoDB!");
});

// Helper to wrap routes with JWT check and logging
function withAuth(handler) {
  return (req, res, next) => {
    checkJwt(req, res, (err) => {
      if (err) {
        console.error("JWT error on", req.method, req.path, ":", err);
        return res.status(err.status || 401).json({ error: err.message });
      }
      handler(req, res, next);
    });
  };
}

// Get messages for a specific topic
app.get(
  "/api/messages",
  withAuth(async (req, res) => {
    try {
      const userId = req.auth?.payload?.sub;
      const { topicId } = req.query;

      if (!userId) {
        return res.status(401).json({ error: "No user id on token" });
      }
      if (!topicId) {
        return res.status(400).json({ error: "topicId is required" });
      }

      const messages = await Message.find({ userId, topicId }).sort({
        timestamp: 1,
      });
      res.json(messages);
    } catch (err) {
      console.error("Error fetching messages:", err);
      console.error(err.stack);
      res
        .status(500)
        .json({ error: "Failed to fetch messages.", details: err.message });
    }
  }),
);

// Save a new message for a specific topic
app.post(
  "/api/messages",
  withAuth(async (req, res) => {
    try {
      const userId = req.auth?.payload?.sub;
      const { content, role, topicId } = req.body;

      if (!userId) {
        return res.status(401).json({ error: "No user id on token" });
      }
      if (!content || !role || !topicId) {
        return res
          .status(400)
          .json({ error: "content, role, and topicId are required." });
      }

      const message = new Message({ userId, topicId, content, role });
      const saved = await message.save();
      res.status(201).json(saved);
    } catch (err) {
      console.error("Error saving message:", err);
      res.status(400).json({ error: "Failed to save message." });
    }
  }),
);

// Get or create the user's profile
app.get(
  "/api/profile",
  withAuth(async (req, res) => {
    try {
      const userId = req.auth?.payload?.sub;
      if (!userId) {
        return res.status(401).json({ error: "No user id on token" });
      }

      let profile = await UserProfile.findOne({ userId });
      if (!profile) {
        profile = await UserProfile.create({ userId });
      }

      res.json(profile);
    } catch (err) {
      console.error("Error fetching profile:", err);
      res.status(500).json({ error: "Failed to fetch profile." });
    }
  }),
);

app.patch(
  "/api/profile/topics/:topicId",
  withAuth(async (req, res) => {
    try {
      const userId = req.auth?.payload?.sub;
      const { topicId } = req.params;
      const { mastery, status, formulasKnown, examplesSolved } = req.body;

      if (!userId) {
        return res.status(401).json({ error: "No user id on token" });
      }

      let profile = await UserProfile.findOne({ userId });
      if (!profile) {
        profile = await UserProfile.create({ userId });
      }

      // Convert existing Mongoose subdoc to a plain object
      const existing = profile.topics.get(topicId);
      const existingPlain = existing
        ? existing.toObject
          ? existing.toObject()
          : { ...existing }
        : {};

      // Start from existing data, preserve every field
      const merged = {
        status: existingPlain.status || "notstarted",
        mastery: existingPlain.mastery || 0,
        concepts: existingPlain.concepts || {},
        formulasKnown: existingPlain.formulasKnown || [],
        examplesSolved: existingPlain.examplesSolved || [],
        lastUpdated: new Date(),
      };

      // Overwrite scalar fields only when explicitly provided
      if (mastery !== undefined) merged.mastery = mastery;
      if (status !== undefined) merged.status = status;

      // Merge formulasKnown — append new entries, deduplicate
      if (Array.isArray(formulasKnown) && formulasKnown.length > 0) {
        const knownSet = new Set(merged.formulasKnown);
        formulasKnown.forEach((f) => knownSet.add(f));
        merged.formulasKnown = Array.from(knownSet);
      }

      // Append new examplesSolved entries — skip IDs already present
      if (Array.isArray(examplesSolved) && examplesSolved.length > 0) {
        const existingIds = new Set(merged.examplesSolved.map((e) => e.id));
        examplesSolved.forEach((entry) => {
          if (!existingIds.has(entry.id)) {
            merged.examplesSolved.push({
              id: entry.id,
              difficulty: entry.difficulty || "medium",
              success: entry.success === true,
            });
            existingIds.add(entry.id);
          }
        });
      }

      profile.topics.set(topicId, merged);

      // Without markModified Mongoose silently skips saving nested changes inside a Map-typed field.
      profile.markModified("topics");

      await profile.save();

      console.log(
        `>>> Profile saved: userId=${userId}, topicId=${topicId}, ` +
          `mastery=${merged.mastery}, status=${merged.status}, ` +
          `examplesSolved=${merged.examplesSolved.length}`,
      );

      res.json(profile);
    } catch (err) {
      console.error("Error updating topic progress:", err);
      res.status(400).json({
        error: "Failed to update topic progress.",
        details: err.message,
      });
    }
  }),
);

app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});
