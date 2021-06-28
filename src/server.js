import express from "express"; // express에서 express가져오기
import morgan from "morgan";

//first make a express application
const app = express();
const PORT = 4000;

const logger = morgan("dev");

const home = (req, res) => {
    return res.send("I still love you");
};
const login = (req, res) => {
    return res.send("login here");
};
app.use(logger);
app.get("/", home);
app.get("/login", login);

const handleListening = () =>
    console.log(`Server listending on port http://localhost:${PORT}`);

//server is always listening PORT
app.listen(PORT, handleListening);
