import express from 'express';
// import { register } from '../controllers/userController.js';
const userRouter= express.Router()

import verifyJWT from "../middlewares/auth.middleware.js";
import UserController from '../controllers/userController.js';
import isAdmin from '../middlewares/isAdmin.js';

userRouter.use((req, res, next) => {
  console.log("User Router Hit:", req.method, req.url);
  next();
});

userRouter.post("/register", UserController.register);
userRouter.post("/login", UserController.login);
userRouter.post("/logout", verifyJWT, UserController.logout);
userRouter.post("/refresh-tocken", UserController.refreshAccessToken);

userRouter.get("/me", verifyJWT, UserController.getMe);
userRouter.get("/get", verifyJWT, isAdmin, UserController.allUsers);

userRouter.get("/:id", verifyJWT, UserController.getUserById);
userRouter.delete("/:id", verifyJWT, isAdmin, UserController.deleteUser);

export default  userRouter