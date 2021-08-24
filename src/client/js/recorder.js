import {createFFmpeg, fetchFile} from "@ffmpeg/ffmpeg";
const startBtn = document.querySelector("#startBtn");
const video = document.getElementById("preview");

let stream;
let recorder;
let videoFile;
const handleDownload = async () => {
    //############### 브라우저가 아닌 컴퓨터에서 작동되는 코드 ##################
    const ffmpeg = createFFmpeg({log: true});
    console.log("sadfasdf");
    // 사용자가 ffmpeg 소프트웨어를 사용
    await ffmpeg.load();
    //ffmpeg에 파일 생성
    // 읽기 / 쓰기, ffmpeg에 만들 파일명, 만들 바이너리 데이터
    ffmpeg.FS("writeFile", "recording.webm", await fetchFile(videoFile));
    // 만든 recording.webm 인풋하겠따다 -> 아우풋으로 output.mp4를 생성
    await ffmpeg.run("-i", "recording.webm", "-r", "60", "output.mp4");

    const mp4File = ffmpeg.FS("readFile", "output.mp4");
    console.log(mp4File);
    //######################################################
    const a = document.createElement("a");
    a.href = videoFile;
    a.download = "Recording.webm";
    document.body.appendChild(a);
    a.click();
};
const handleStop = () => {
    startBtn.innerText = "Download Recording";
    startBtn.removeEventListener("click", handleStop);
    startBtn.addEventListener("click", handleDownload);
    recorder.stop();
};

const handleStart = () => {
    startBtn.innerText = "Stop Recording";
    startBtn.removeEventListener("click", handleStart);
    startBtn.addEventListener("click", handleStop);
    recorder = new MediaRecorder(stream);
    recorder.ondataavailable = (event) => {
        videoFile = URL.createObjectURL(event.data);
        video.srcObject = null;
        video.src = videoFile;
        video.loop = true;
        video.play();
    };
    recorder.start();
};

const init = async () => {
    stream = await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: true,
    });
    video.srcObject = stream;
    video.play();
};

init();

startBtn.addEventListener("click", handleStart);

//######AUDIO CONTROLL########

// const audio = document.getElementById("preview");
// const startBtn = document.getElementById("startBtn");

// let stream;
// let recorder;
// let audioFile;

// const handleDownload = () => {
//   const a = document.createElement("a");
//   a.href = audioFile;
//   a.download = "Recording.webm";
//   document.body.appendChild(a);
//   a.click();
// };

// const handleStop = () => {
//   startBtn.innerHTML = "Download recording";

//   startBtn.removeEventListener("click", handleStop);
//   startBtn.addEventListener("click", handleDownload);

//   recorder.stop();
// };

// const handleStart = () => {
//   startBtn.innerHTML = "Stop recording";
//   startBtn.removeEventListener("click", handleStart);
//   startBtn.addEventListener("click", handleStop);
//   recorder = new MediaRecorder(stream);

//   recorder.ondataavailable = (event) => {
//     audioFile = URL.createObjectURL(event.data);
//     audio.srcObject = null;
//     audio.src = audioFile;
//     audio.loop = true;
//     audio.play();
//   };

//   recorder.start();

//   setTimeout(() => {
//     handleStop();
//   }, 5000);
// };

// const init = async () => {
//   stream = await navigator.mediaDevices.getUserMedia({
//     video: false,
//     audio: true
//   });

//   audio.srcObject = stream;

//   audio.play();
// };

// init();
// startBtn.addEventListener("click", handleStart);
