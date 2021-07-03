import User from "../models/User";
import bcrypt from "bcrypt";
import fetch from "node-fetch";
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
    const user = await User.findOne({username, socialOnly: false});

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
    req.session.loggedIn = true;
    req.session.user = user;

    return res.redirect("/");
};

export const startGithubLogin = (req, res) => {
    const baseUrl = "https://github.com/login/oauth/authorize";
    const config = {
        client_id: process.env.GH_CLIENT,
        allow_signup: false,
        scope: "read:user user:email",
    };
    const params = new URLSearchParams(config).toString();
    const finalUrl = `${baseUrl}?${params}`;

    return res.redirect(finalUrl);
};

export const finishGithubLogin = async (req, res) => {
    const baseUrl = "https://github.com/login/oauth/access_token";
    const config = {
        client_id: process.env.GH_CLIENT,
        client_secret: process.env.GH_SECRET,
        code: req.query.code,
    };
    const params = new URLSearchParams(config).toString();
    const finalUrl = `${baseUrl}?${params}`;
    const tokenRequest = await (
        await fetch(finalUrl, {
            method: "POST",
            headers: {
                Accept: "application/json",
            },
        })
    ).json();
    if ("access_token" in tokenRequest) {
        const {access_token} = tokenRequest;
        const apiUrl = "https://api.github.com";
        const userData = await (
            await fetch(`${apiUrl}/user`, {
                headers: {
                    Authorization: `token ${access_token}`,
                },
            })
        ).json();

        const emailData = await (
            await fetch(`${apiUrl}/user/emails`, {
                headers: {
                    Authorization: `token ${access_token}`,
                },
            })
        ).json();
        const emailOjb = emailData.find(
            (email) => email.primary === true && email.verified === true
        );
        if (!emailOjb) {
            return res.redirect("/login");
        }
        let user = await User.findOne({email: emailOjb.email});
        if (!user) {
            user = await User.create({
                avatarUrl: userData.avatar_url,
                email: userData.email,
                username: userData.login,
                password: "",
                name: userData.name,
                socialOnly: true,
                location: userData.location,
            });
        }
        req.session.loggedIn = true;
        req.session.user = user;
        return res.redirect("/");
    } else {
        return res.redirect("/login");
    }
};

export const logout = (req, res) => {
    req.session.destroy();
    return res.redirect("/");
};
export const see = (req, res) => res.send("See user");

export const postEdit = async (req, res) => {
    const {
        session: {
            user: {_id},
            user: {username: currentUsername, email: currentEmail},
        },
        body: {name, email: changedEmail, location, username: changeUsername},
    } = req;

    if (currentUsername !== changeUsername) {
        const exists = await User.exists({username: changeUsername});
        if (exists) {
            return res.status(400).render("edit", {
                errorMessage: "This username is used",
            });
        }
    }
    if (currentEmail !== changedEmail) {
        const exists = await User.exists({email: changedEmail});
        if (exists) {
            return res.status(400).render("edit", {
                errorMessage: "This email is used",
            });
        }
    }
    const updatedUser = await User.findByIdAndUpdate(
        _id,
        {
            name,
            email: changedEmail,
            location,
            username: changeUsername,
        },
        {new: true}
    );
    req.session.user = updatedUser;

    return res.redirect("edit");
};
export const getEdit = (req, res) => {
    return res.render("edit", {titlePage: "Edit"});
};
export const remove = (req, res) => res.send("Remove");
