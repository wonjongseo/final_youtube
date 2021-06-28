import express from "express"; // express에서 express가져오기
import morgan from "morgan";
import globalRouter from "./routers/globalRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";

//first make a express application
const app = express();
const PORT = 4000;

const logger = morgan("dev");
app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
app.use("/", globalRouter);
app.use("/videos", videoRouter);
app.use("/users", userRouter);

const handleListening = () =>
    console.log(`Server listending on port http://localhost:${PORT}`);

//server is always listening PORT
app.listen(PORT, handleListening);
