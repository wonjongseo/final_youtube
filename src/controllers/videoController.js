let videos = [
    {
        title: "First Video",
        rating: 5,
        comments: 2,
        createdAt: "2 minutes age",
        views: 59,
        id: 1,
    },
    {
        title: "Second Video",
        rating: 5,
        comments: 2,
        createdAt: "2 minutes age",
        views: 59,
        id: 2,
    },
    {
        title: "Thrid Video",
        rating: 5,
        comments: 2,
        createdAt: "2 minutes age",
        views: 59,
        id: 3,
    },
];

export const trending = (req, res) => {
    return res.render("home", {titlePage: "Home", videos});
};
export const see = (req, res) => {
    const {id} = req.params;
    const video = videos[id - 1];

    return res.render("watch", {titlePage: `watching ${video.id}`, video});
};
export const getEdit = (req, res) => {
    const {id} = req.params;
    const video = videos[id - 1];
    return res.render("edit", {titlePage: `Editing: ${video.id}`, video});
};

export const postEdit = (req, res) => {
    const {id} = req.params;
    const {title} = req.body;
    videos[id - 1].title = title;
    return res.redirect(`/videos/${id}`);
};

export const getUpload = (req, res) => {
    return res.render("upload");
};
export const postUpload = (req, res) => {
    const {title} = req.body;
    const newVideo = {
        title,
        rating: 0,
        comments: 0,
        createdAt: "Just Now",
        views: 0,
        id: videos.length + 1,
    };
    videos.push(newVideo);
    return res.redirect("/");
};
export const search = (req, res) => res.send("Search");
export const remove = (req, res) => res.send("Delete Video");
export const deleteVideo = (req, res) => res.send("Delete Video");
