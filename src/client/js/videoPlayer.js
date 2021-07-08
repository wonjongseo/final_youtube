const video = document.querySelector("video");
const playBtn = document.getElementById("play");
const muteBtn = document.getElementById("mute");
const volumnRange = document.getElementById("volume");
const currentTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");
const timeline = document.getElementById("timeline");
const videoContainer = document.getElementById("videoContainer");
const fullscreenBtn = document.getElementById("fullScreen");

const VALUMN = "valumn";
const userValumn = localStorage.getItem(VALUMN);

let volumeValue = 0.5;
if (userValumn != null) {
    volumeValue = userValumn;
}
video.volume = volumeValue;
volumnRange.value = volumeValue;

const formatTile = (second) =>
    new Date(second * 1000).toISOString().substr(14, 5);
const handlePlayClick = () => {
    if (video.paused) {
        video.play();
    } else {
        video.pause();
    }
    playBtn.innerText = video.paused ? "Play" : "Pause";
};
const handleMuteClick = () => {
    if (video.muted) {
        video.muted = false;
    } else {
        video.muted = true;
    }
    muteBtn.innerHTML = video.muted ? "Unmute" : "Mute";
    volumnRange.value = video.muted ? 0 : volumeValue;
};
const handleChangeRange = (event) => {
    const {
        target: {value},
    } = event;
    if (video.muted) {
        video.muted = false;
        muteBtn.innerText = "Mute";
    }
    volumeValue = value;
    video.volume = value;
    localStorage.setItem(VALUMN, volumeValue);
};

const handleLoadedMetadata = () => {
    totalTime.innerText = formatTile(Math.floor(video.duration));
    timeline.max = Math.floor(video.duration);
};

const hanldTimeUpdate = () => {
    currentTime.innerText = formatTile(Math.floor(video.currentTime));
};

const handleTimelineChagne = (event) => {
    const {
        target: {value},
    } = event;
    video.currentTime = value;
};

const handleFullScreen = () => {
    const fullscreen = document.fullscreenElement; // full screen인 요소가 있는지 없는지를 반환
    console.log(videoContainer);
    if (fullscreen) {
        document.exitFullscreen(); //
        fullscreenBtn.innerText = "Enter Full Screen";
    } else {
        videoContainer.requestFullscreen(); // videoConatiner 안의 모든 것들은 풀스크린화

        fullscreenBtn.innerText = "Exit Full Screen";
    }
};
playBtn.addEventListener("click", handlePlayClick);
muteBtn.addEventListener("click", handleMuteClick);
volumnRange.addEventListener("input", handleChangeRange);
video.addEventListener("loadedmetadata", handleLoadedMetadata);
video.addEventListener("timeupdate", hanldTimeUpdate);
timeline.addEventListener("input", handleTimelineChagne);

fullscreenBtn.addEventListener("click", handleFullScreen);
