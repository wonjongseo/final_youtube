import express from "express";
import {
    getJoin,
    postJoin,
    getLogin,
    postLogin,
} from "../controllers/userController";
import {search, home} from "../controllers/videoController";
import {protectorMiddleware, pulbicOnlyMiddleware} from "../models/middleware";

const rootRouter = express.Router();

rootRouter.get("/", home);
rootRouter.route("/join").all(pulbicOnlyMiddleware).get(getJoin).post(postJoin);
rootRouter
    .route("/login")
    .all(pulbicOnlyMiddleware)
    .get(getLogin)
    .post(postLogin);
rootRouter.get("/search", search);

export default rootRouter;
