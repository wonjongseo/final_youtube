import express from "express";
import {
    finishGithubLogin,
    getEdit,
    logout,
    postEdit,
    remove,
    see,
    startGithubLogin,
} from "../controllers/userController";
import {protectorMiddleware, pulbicOnlyMiddleware} from "../models/middleware";
const userRouter = express.Router();

userRouter.get("/github/start", pulbicOnlyMiddleware, startGithubLogin);
userRouter.get("/github/finish", pulbicOnlyMiddleware, finishGithubLogin);
userRouter.get("/logout", protectorMiddleware, logout);
userRouter.route("/edit").all(protectorMiddleware).get(getEdit).post(postEdit);
userRouter.get("/remove", remove);
userRouter.get(":id", see);

export default userRouter;
