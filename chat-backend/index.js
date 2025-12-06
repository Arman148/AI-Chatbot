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

// Get messages for a specific topic
app.get("/api/messages", checkJwt, async (req, res) => {
  try {
    const userId = req.auth?.payload?.sub;
    const { topicId } = req.query; // Read topicId from query params

    if (!userId) {
      return res.status(401).json({ error: "No user id on token" });
    }

    if (!topicId) {
      return res.status(400).json({ error: "topicId is required" });
    }

    // Filter by BOTH userId and topicId
    const messages = await Message.find({ userId, topicId }).sort({
      timestamp: 1,
    });
    res.json(messages);
  } catch (err) {
    console.error("Error fetching messages:", err);
    res.status(500).json({ error: "Failed to fetch messages." });
  }
});

// Save a new message for a specific topic
app.post("/api/messages", checkJwt, async (req, res) => {
  try {
    const userId = req.auth?.payload?.sub;
    const { content, role, topicId } = req.body; // Read topicId from body

    if (!userId) {
      return res.status(401).json({ error: "No user id on token" });
    }

    if (!content || !role || !topicId) {
      return res
        .status(400)
        .json({ error: "content, role, and topicId are required." });
    }

    const message = new Message({
      userId,
      topicId,
      content,
      role,
    });

    const saved = await message.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error("Error saving message:", err);
    res.status(400).json({ error: "Failed to save message." });
  }
});

// Get or create the user's profile
app.get("/api/profile", checkJwt, async (req, res) => {
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
});

// Update progress for a single topic
app.patch("/api/profile/topics/:topicId", checkJwt, async (req, res) => {
  try {
    const userId = req.auth?.payload?.sub;
    const { topicId } = req.params;
    const updates = req.body;

    if (!userId) {
      return res.status(401).json({ error: "No user id on token" });
    }

    let profile = await UserProfile.findOne({ userId });
    if (!profile) {
      profile = await UserProfile.create({ userId });
    }

    const existingTopic = profile.topics.get(topicId) || {};
    const merged = {
      ...(existingTopic.toObject ? existingTopic.toObject() : existingTopic),
      ...updates,
      lastUpdated: new Date(),
    };

    profile.topics.set(topicId, merged);
    await profile.save();

    res.json(profile);
  } catch (err) {
    console.error("Error updating topic progress:", err);
    res.status(400).json({ error: "Failed to update topic progress." });
  }
});

app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});
