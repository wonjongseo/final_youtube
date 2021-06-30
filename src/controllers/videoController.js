// mongoosejs.com

import Video from "../models/Video";

export const home = async (req, res) => {
    try {
        const videos = await Video.find({});
        return res.render("home", {titlePage: "Home", videos});
    } catch (error) {
        return res.render("server-error", {error});
    }
};

export const see = async (req, res) => {
    const {id} = req.params;
    const video = await Video.findById(id);
    if (!video) {
        return res.render("404", {titlePage: "Video not found."});
    }
    return res.render("watch", {titlePage: video.title, video});
};
export const getEdit = async (req, res) => {
    const {id} = req.params;
    const video = await Video.findById(id);
    if (!video) {
        return res.redirect("404", {titlePage: "Video not Found."});
    }
    return res.render("edit", {titlePage: `Edit: ${video.title}`, video});
};

export const postEdit = async (req, res) => {
    const {id} = req.params;
    const {title, description, hashtags} = req.body;
    const video = await Video.exists({_id: id});
    if (!video) {
        return res.render("404", {titlePage: "Video not Found."});
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
        return res.render("upload", {
            titlePage: "upload",
            errerMassage: error._message,
        });
    }
};
export const search = (req, res) => res.send("Search");
export const remove = (req, res) => res.send("Delete Video");
export const deleteVideo = (req, res) => res.send("Delete Video");
