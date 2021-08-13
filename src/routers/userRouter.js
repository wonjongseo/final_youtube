import express from "express";
import {
    getEdit,
    postEdit,
    logout,
    see,
    startGithubLogin,
    finishGithubLogin,
    getChangePassword,
    postChangePassword,
} from "../controllers/userController";
import {
    protectorMiddleware,
    publicOnlyMiddleware,
    avatarUpload,
} from "../middlewares";

const userRouter = express.Router();

userRouter.get("/logout", protectorMiddleware, logout);
userRouter
    .route("/edit")
    .all(protectorMiddleware)
    .get(getEdit)
    // multer 사용하는 예시
    // single: 파일 하나만 처리하겠다
    // input 의 name : avatar
    // input으로 아파타를 받아
    // 그 파일을 uploads 폴터에 저장 후
    //  그 파일 정보를 postEdit에 전달
    // 이렇게 postEdit에 전달을 하면 req.file 이 추가됨
    .post(avatarUpload.single("avatar"), postEdit);
userRouter
    .route("/change-password")
    .all(protectorMiddleware)
    .get(getChangePassword)
    .post(postChangePassword);

userRouter.get("/github/start", publicOnlyMiddleware, startGithubLogin);
userRouter.get("/github/finish", publicOnlyMiddleware, finishGithubLogin);

userRouter.get("/:id", see);

export default userRouter;
