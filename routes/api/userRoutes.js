const router = require("express").Router();
const {
  getUsers,
  getUserById,
  addUser,
  adjustUser,
  deleteUser,
  addFriend,
  deleteFriend
} = require("../../controllers/userController.js");

// /api/users
router.route("/").get(getUsers).post(addUser);

// /api/users/:userId
router.route("/:userId").get(getUserById).put(adjustUser).delete(deleteUser);

// /api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId').post(addFriend).delete(deleteFriend);

module.exports = router;
