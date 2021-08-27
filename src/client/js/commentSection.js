import {async} from "regenerator-runtime";

const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("commentForm");
const video__comment = document.querySelector(".video__comments");
const delBtn = video__comment.querySelectorAll("button");

const addComment = (text, commentId, name) => {
    const commentContainer = document.querySelector(".video__comments ul");
    const div = document.createElement("div");
    const li = document.createElement("li");
    li.dataset.id = commentId;
    li.classList = "video__comment";
    const i = document.createElement("i");
    i.className = "fas fa-comment";
    const span = document.createElement("span");
    const span2 = document.createElement("button");
    span2.id = "delBtn";
    span2.innerText = "❌";
    span2.classList = "del__btn";
    span.innerHTML = `   ${name} :  ${text}`;
    div.appendChild(i);
    div.appendChild(span);

    li.appendChild(div);
    li.appendChild(span2);
    commentContainer.prepend(li);
    span2.addEventListener("click", async () => {
        const deleteReponse = await deleteComment(commentId);
        if (deleteReponse.status === 200) {
            li.remove();
        }
    });
};

const deleteComment = async (id) => {
    return fetch(`/api/videos/${id}/comment`, {
        method: "DELETE",
    });
};
delBtn.forEach((item) => {
    item.addEventListener("click", async (event) => {
        const {path} = event;
        const id = path[1].dataset.id;
        const deleteReponse = await deleteComment(id);

        if (deleteReponse.status === 200) {
            path[1].remove();
        }
    });
});

if (form) {
    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        const textarea = form.querySelector("textarea");

        const text = textarea.value;
        const videoId = videoContainer.dataset.id;

        if (textarea.value === "") {
            return;
        }
        const postResponse = await fetch(`/api/videos/${videoId}/comment`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({text}),
        });
        if (postResponse.status === 201) {
            textarea.value = "";
            const {commentId, name} = await postResponse.json();
            console.log(name);
            addComment(text, commentId, name);
        }
    });
}
