const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the schema for users
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+\@.+\..+/, "Please enter a valid email address"],
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Thought",
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    // enable the use of getters when converting the user document to JSON
    toJSON: {
      getters: true,
    },
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;


