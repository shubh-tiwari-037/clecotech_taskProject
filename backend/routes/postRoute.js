import express from "express";
import PostController from "../controllers/postController.js";
import verifyJWT from "../middlewares/auth.middleware.js";

const postRouter = express.Router();


postRouter.use((req, res, next) => {
  console.log("Post Router Hit:", req.method, req.url);
  next();
});

postRouter.post("/create", verifyJWT, PostController.createPost);
postRouter.get("/get",PostController.getAllPosts);
postRouter.get("/:id", PostController.getPostById);
postRouter.patch("/:id", verifyJWT, PostController.updatePost);
postRouter.delete("/:id", verifyJWT, PostController.deletePost);

export default postRouter;