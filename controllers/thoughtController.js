const Thought = require("../models/Thought");
const User = require("../models/User");


const thoughtController = {
  // Get all thoughts
  getThoughts: async (req, res) => {
    try {
      const thoughts = await Thought.find({});
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },


  addThought: async (req, res) => {
    try {
      const { thoughtText, username } = req.body;

      // Create the thought
      const newThought = await Thought.create({ thoughtText, username });

      // Find the user and add the thought to their thoughts array
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      user.thoughts.push(newThought._id);
      await user.save();

      res.json(newThought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  

  // Get a thought by its ID
  getThoughtById: async (req, res) => {
    try {
      const thought = await Thought.findById(req.params.thoughtId);
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Update a thought by its ID
  adjustThought: async (req, res) => {
    try {
      const updatedThought = await Thought.findByIdAndUpdate(
        req.params.thoughtId,
        req.body,
        { new: true }
      );
      res.json(updatedThought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Delete a thought by its ID
  deleteThought: async (req, res) => {
    try {
      const deletedThought = await Thought.findByIdAndDelete(req.params.thoughtId);

      if (!deletedThought) {
        return res.status(404).json({ error: "Thought not found" });
      }

      // Find the user and remove the thought from their thoughts array
      const user = await User.findOne({ username: deletedThought.username });
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      user.thoughts.pull(deletedThought._id);
      await user.save();

      res.json({ message: "Thought deleted" });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Add a reaction to a thought by ID
  addReaction: async (req, res) => {
    try {
      const updatedThought = await Thought.findByIdAndUpdate(
        req.params.thoughtId,
        { $push: { reactions: req.body } },
        { new: true }
      );
      res.status(201).json(updatedThought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Remove a reaction from a thought by its ID and the reaction's ID
  deleteReaction: async (req, res) => {
    try {
      const updatedThought = await Thought.findByIdAndUpdate(
        req.params.thoughtId,
        { $pull: { reactions: { _id: req.params.reactionId } } },
        { new: true }
      );
      res.status(200).json(updatedThought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

module.exports = thoughtController;
