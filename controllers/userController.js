const User = require('../models/User');

const userController = {
  // Get all users
  getUsers: async (req, res) => {
    try {
      const users = await User.find({});
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Create a new user
  addUser: async (req, res) => {
    try {
      const newUser = await User.create(req.body);
      res.json(newUser);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Get a user by their ID, and populate their thoughts and friends fields
  getUserById: async (req, res) => {
    try {
      const user = await User.findById(req.params.userId).populate(
        "thoughts friends"
      );
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Update a user by their ID
  adjustUser: async (req, res) => {
    try {
      const user = await User.findById(req.params.userId);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const updateUser = await User.findByIdAndUpdate(
        req.params.userId,
        req.body,
        {
          new: true,
        }
      );

      res.json(updateUser);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Delete a user by their ID
  deleteUser: async (req, res) => {
    try {
      const deletedUser = await User.findByIdAndDelete(req.params.userId);

      if (!deletedUser) {
        return res.status(404).json({ message: "User not found" });
      }

      res.json({ message: "User deleted" });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Add a friend to a user's friends array by their ID
  addFriend: async (req, res) => {
    try {
      const currentUser = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.params.friendId } },
        { new: true }
      );

      if (!currentUser) {
        return res.status(404).json({ message: "User not found" });
      }

      res.json({ message: "Friend added" });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Remove a friend from a user's friends array by their ID
  deleteFriend: async (req, res) => {
    try {
      const currentUser = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } },
        { new: true }
      );

      if (!currentUser) {
        return res.status(404).json({ message: "User not found" });
      }

      res.json({ message: "Friend removed" });
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

module.exports = userController;