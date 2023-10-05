const express = require("express");
const router = express.Router();

const {
  createPost,
  fetchAllPostsByUser,
  deletePost,
} = require("../controllers/api");

router.route("/posts").post(createPost);
router.route("/:user_id/posts").get(fetchAllPostsByUser);
router.route("/:user_id/posts/:post_id").delete(deletePost);

module.exports = router;
