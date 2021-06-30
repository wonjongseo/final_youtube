import express from "express";
import {edit, login, logout, remove, see} from "../controllers/userController";
const userRouter = express.Router();

userRouter.get("/logout", logout);
userRouter.get("/login", login);
userRouter.get("/edit", edit);
userRouter.get("/remove", remove);
userRouter.get(":id", see);

export default userRouter;
