import User from "../models/User";

export const getJoin = (req, res) => {
    return res.render("join", {titlePage: "Join"});
};
export const postJoin = async (req, res) => {
    const {email, username, password, name, location} = req.body;

    await User.create({
        email,
        username,
        password,
        name,
        location,
    });

    return res.redirect("/login");
};

export const edit = (req, res) => res.send("Edit");
export const remove = (req, res) => res.send("Remove");
export const login = (req, res) => res.send("Log In");
export const logout = (req, res) => res.send("Log out");
export const see = (req, res) => res.send("See user");
