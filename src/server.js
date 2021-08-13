import express from "express";
import morgan from "morgan";
import session from "express-session";
import MongoStore from "connect-mongo";
import rootRouter from "./routers/rootRouter";
import videoRouter from "./routers/videoRouter";
import userRouter from "./routers/userRouter";
import {localsMiddleware} from "./middlewares";

const app = express();
const logger = morgan("dev");

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
app.use(logger);
app.use(express.urlencoded({extended: true}));
app.use(
    session({
        secret: process.env.COOKIE_SECRET,
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({mongoUrl: process.env.DB_URL}),
    })
);
app.use(localsMiddleware);
//브라우저가 upload 폴더에 있는 내용을 볼 수 있게 해줘야 한다
// /uploads 로 시작하는 url로 가면 uploads폴더에 있는 내용을 브라우저가 볼 권한을 준다 static(노출 시키고 싶은 폴더)
app.use("/uploads", express.static("uploads"));
app.use("/static", express.static("assets"));
app.use("/", rootRouter);
app.use("/videos", videoRouter);
app.use("/users", userRouter);

export default app;
