// mongoosejs.com

import Video from "../models/Video";

export const home = async (req, res) => {
    try {
        const videos = await Video.find({}).sort({createAt: "desc"});
        return res.render("home", {titlePage: "Home", videos});
    } catch (error) {
        return res.status(400).render("server-error", {error});
    }
};

export const see = async (req, res) => {
    const {id} = req.params;
    const video = await Video.findById(id);
    if (!video) {
        return res.status(404).render("404", {titlePage: "Video not found."});
    }
    return res.render("watch", {titlePage: video.title, video});
};
export const getEdit = async (req, res) => {
    const {id} = req.params;
    const video = await Video.findById(id);
    if (!video) {
        return res.status(404).redirect("404", {titlePage: "Video not Found."});
    }
    return res.render("edit", {titlePage: `Edit: ${video.title}`, video});
};

export const postEdit = async (req, res) => {
    const {id} = req.params;
    const {title, description, hashtags} = req.body;
    const video = await Video.exists({_id: id});
    if (!video) {
        return res.status(404).render("404", {titlePage: "Video not Found."});
    }
    await Video.findByIdAndUpdate(id, {
        title,
        description,
        hashtags: Video.formatHashtags(hashtags),
    });
    return res.redirect(`/videos/${id}`);
};

export const getUpload = (req, res) => {
    return res.render("upload", {titlePage: "upload"});
};

export const postUpload = async (req, res) => {
    const {title, description, hashtags} = req.body;
    try {
        await Video.create({
            title,
            description,
            hashtags: Video.formatHashtags(hashtags),
        });
        return res.redirect("/");
    } catch (error) {
        return res.status(400).render("upload", {
            titlePage: "upload",
            errerMassage: error._message,
        });
    }
};
export const deleteVideo = async (req, res) => {
    const {id} = req.params;
    await Video.findByIdAndDelete(id);

    return res.redirect("/");
};

export const search = async (req, res) => {
    const {keyword} = req.query;
    let videos = [];

    if (keyword) {
        videos = await Video.find({
            title: {
                $regex: new RegExp(`^${keyword}`, "i"),
            },
        });
    }

    return res.render("search", {titlePage: "Search", videos});
};
export const remove = (req, res) => res.send("Delete Video");
