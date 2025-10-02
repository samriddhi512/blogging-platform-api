import express from "express";
import {
  createNewPost,
  deletePost,
  getAllPosts,
  getPostById,
  updatePost,
  updatePostPartially,
} from "../controllers/postController";

export const router = express.Router();

router.route("/").post(createNewPost).get(getAllPosts);

router
  .route("/:id")
  .get(getPostById)
  .put(updatePost)
  .patch(updatePostPartially)
  .delete(deletePost);
