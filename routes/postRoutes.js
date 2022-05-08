const express = require("express");
const { createPost, updatePost, deletePost, getAllPost, getPostDetails } = require("../controller/postController");
const { isAuthenticatedUser } = require("../middleware/auth");
const router = express.Router();


router.route("/create").post(isAuthenticatedUser, createPost);
router.route("/update/:id").put(isAuthenticatedUser, updatePost);
router.route("/delete/:id").delete(isAuthenticatedUser, deletePost);
router.route("/").get(isAuthenticatedUser, getAllPost);
router.route("/:id").get(isAuthenticatedUser, getPostDetails);

module.exports = router;