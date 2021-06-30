import mongoose from "mongoose";

mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    createIndexes: true,
});

const db = mongoose.connection;

const handleError = (error) => console.log("DB Error" + error);
const handleOpen = () => console.log("Connected to DB");

db.on("errer", handleError);
db.once("open", handleOpen);
