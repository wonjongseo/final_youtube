import express from "express";

import {
    getEdit,
    upload,
    see,
    deleteVideo,
    postEdit,
    getUpload,
    postUpload,
} from "../controllers/videoController";
import {protectorMiddleware, videoUpload} from "../models/middleware";

const videoRouter = express.Router();

videoRouter
    .route("/upload")
    .all(protectorMiddleware)
    .get(getUpload)
    .post(videoUpload.single("video"), postUpload);
videoRouter.get("/:id([0-9a-f]{24})", see);
videoRouter
    .route("/:id([0-9a-f]{24})/edit")
    .all(protectorMiddleware)
    .get(getEdit)
    .post(postEdit);
videoRouter
    .route("/:id([0-9a-f]{24})/delete")
    .all(protectorMiddleware)
    .get(deleteVideo);

export default videoRouter;
