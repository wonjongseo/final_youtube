import {async} from "regenerator-runtime";

const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("commentForm");
const video__comment = document.querySelector(".video__comments");
console.log(video__comment);
const delBtn = video__comment.querySelectorAll("button");
console.log(delBtn);
const addComment = (text, commentId) => {
    const commentContainer = document.querySelector(".video__comments ul");
    const li = document.createElement("li");
    li.dataset.id = commentId;
    li.classList = "video__comment";
    const i = document.createElement("i");
    i.className = "fas fa-comment";
    const span = document.createElement("span");
    const span2 = document.createElement("button");
    span2.id = "delBtn";
    span2.innerText = "❌";
    span.innerHTML = ` ${text}`;

    li.appendChild(i);
    li.appendChild(span);
    li.appendChild(span2);
    commentContainer.prepend(li);
};

// [].forEach.call(delBtn, function (col) {
//     col.addEventListener("click", (event) => {
//         const {path} = event;
//         console.log(path[1].dataset.id);
//     });
// });
delBtn.forEach((item) => {
    item.addEventListener("click", async () => {
        const {path} = event;
        const id = path[1].dataset.id;

        const deleteReponse = await fetch(`/api/videos/${id}/comment`, {
            method: "DELETE",
        });
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
            const {commentId} = await postResponse.json();
            addComment(text, commentId);
        }
    });
}
