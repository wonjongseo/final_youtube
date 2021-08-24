import express from "express";
import {
    registerView,
    deleteComment,
    createComment,
} from "../controllers/videoController";

const apiRouter = express.Router();

apiRouter.post("/videos/:id([0-9a-f]{24})/view", registerView);
apiRouter
    .route("/videos/:id([0-9a-f]{24})/comment")
    .post(createComment)
    .delete(deleteComment);

export default apiRouter;
