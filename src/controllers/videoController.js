export const trending = (req, res) => {
    const videos = [
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
            id: 1,
        },
        {
            title: "Thrid Video",
            rating: 5,
            comments: 2,
            createdAt: "2 minutes age",
            views: 59,
            id: 1,
        },
    ];

    return res.render("home", {videos});
};
export const see = (req, res) => res.render("watch", {titlePage: "Watch"});
export const edit = (req, res) => res.render("edit", {titlePage: "Edit"});
export const search = (req, res) => res.send("Search");
export const remove = (req, res) => res.send("Delete Video");
export const upload = (req, res) => res.send("Upload");
export const deleteVideo = (req, res) => res.send("Delete Video");
