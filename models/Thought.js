const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const reactionSchema = require("./Reaction");

const thoughtsSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema],
  },
  {
   // enable the use of getters when converting the thought document to JSON
    toJSON: {
      getters: true,
    },
  }
);

thoughtsSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

const Thought = mongoose.model("Thought", thoughtsSchema);

module.exports = Thought;
