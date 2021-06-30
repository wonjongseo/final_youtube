import User from "../models/User";
import bcrypt from "bcrypt";

export const getJoin = (req, res) => {
    return res.render("join", {titlePage: "Join"});
};
export const postJoin = async (req, res) => {
    const {email, username, password, password2, name, location} = req.body;

    if (password !== password2) {
        return res.status(400).render("join", {
            titlePage: "Join",
            errorMessage: "The password is wrong",
        });
    }
    const exists = await User.exists({$or: [{email}, {username}]});
    if (exists) {
        return res.status(400).render("join", {
            titlePage: "Join",
            errorMessage: "The email/name is already taken",
        });
    }
    try {
        await User.create({
            email,
            username,
            password,
            name,
            location,
        });

        return res.redirect("/login");
    } catch (error) {
        return res.status(400).render("join", {
            titlePage: "Join",
            errerMassage: error._message,
        });
    }
};

export const getLogin = (req, res) => res.render("login", {titlePage: "Login"});

export const postLogin = async (req, res) => {
    const {password, username} = req.body;
    const user = await User.findOne({username});

    if (!user) {
        return res.status(400).render("login", {
            titlePage: "Login",
            errorMessage: "An account with this username does not exists.",
        });
    }
    const ok = await bcrypt.compare(password, user.password);

    if (!ok) {
        return res.status(400).render("login", {
            titlePage: "Login",
            errorMessage: "Wrong password.",
        });
    }

    return res.redirect("/");
};

export const logout = (req, res) => res.send("Log out");
export const see = (req, res) => res.send("See user");
export const edit = (req, res) => res.send("Edit");
export const remove = (req, res) => res.send("Remove");
