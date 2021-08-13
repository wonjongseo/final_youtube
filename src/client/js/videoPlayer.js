// ############################################

const videoContainer = document.getElementById("videoContainer");
const video = document.querySelector("video");

const playBtn = document.getElementById("play");

const muteBtn = document.getElementById("mute");
const volumnRange = document.getElementById("volume");
const currentTime = document.getElementById("currentTime");

const totalTime = document.getElementById("totalTime");
const timeline = document.getElementById("timeline");

const fullscreenBtn = document.getElementById("fullScreen");

//변수 ############################################

const VALUMN = "valumn";
let globalValumn = 0.5;

// ############################################

const userValumn = localStorage.getItem(VALUMN);

if (userValumn != null) {
    globalValumn = userValumn;
}
video.volume = globalValumn;
volumnRange.value = globalValumn;

// 플레이 버튼 이벤트
const handlePlayClick = () => {
    if (video.paused) {
        video.play();
    } else {
        video.pause();
    }
    playBtn.innerText = video.paused ? "Play" : "Pause";
};

// 음속어  버튼 이벤트
const handleMuteClick = () => {
    if (video.muted) {
        video.muted = false;
    } else {
        video.muted = true;
    }
    muteBtn.innerHTML = video.muted ? "Unmute" : "Mute";
    volumnRange.value = video.muted ? 0 : globalValumn;
};

//사운드 레인지 변경 이벤트
const handleChangeRange = (event) => {
    const {
        target: {value},
    } = event;
    if (video.muted) {
        video.muted = false;
        muteBtn.innerText = "Mute";
    }
    globalValumn = value;
    video.volume = value;
    localStorage.setItem(VALUMN, globalValumn);
};

const formatTime = (second) =>
    new Date(second * 1000).toISOString().substr(14, 5);

const handleLoadedMetadata = () => {
    // 비디오 전체 시간 계산
    totalTime.innerText = formatTime(Math.floor(video.duration));
    timeline.max = Math.floor(video.duration);
};

const hanldTimeUpdate = () => {
    currentTime.innerText = formatTime(Math.floor(video.currentTime));
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
