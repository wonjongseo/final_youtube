/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/client/js/videoPlayer.js":
/*!**************************************!*\
  !*** ./src/client/js/videoPlayer.js ***!
  \**************************************/
/***/ (() => {

eval("var video = document.querySelector(\"video\");\nvar playBtn = document.getElementById(\"play\");\nvar muteBtn = document.getElementById(\"mute\");\nvar volumnRange = document.getElementById(\"volume\");\nvar currentTime = document.getElementById(\"currentTime\");\nvar totalTime = document.getElementById(\"totalTime\");\nvar timeline = document.getElementById(\"timeline\");\nvar videoContainer = document.getElementById(\"videoContainer\");\nvar fullscreenBtn = document.getElementById(\"fullScreen\");\nvar VALUMN = \"valumn\";\nvar userValumn = localStorage.getItem(VALUMN);\nvar volumeValue = 0.5;\n\nif (userValumn != null) {\n  volumeValue = userValumn;\n}\n\nvideo.volume = volumeValue;\nvolumnRange.value = volumeValue;\n\nvar formatTile = function formatTile(second) {\n  return new Date(second * 1000).toISOString().substr(14, 5);\n};\n\nvar handlePlayClick = function handlePlayClick() {\n  if (video.paused) {\n    video.play();\n  } else {\n    video.pause();\n  }\n\n  playBtn.innerText = video.paused ? \"Play\" : \"Pause\";\n};\n\nvar handleMuteClick = function handleMuteClick() {\n  if (video.muted) {\n    video.muted = false;\n  } else {\n    video.muted = true;\n  }\n\n  muteBtn.innerHTML = video.muted ? \"Unmute\" : \"Mute\";\n  volumnRange.value = video.muted ? 0 : volumeValue;\n};\n\nvar handleChangeRange = function handleChangeRange(event) {\n  var value = event.target.value;\n\n  if (video.muted) {\n    video.muted = false;\n    muteBtn.innerText = \"Mute\";\n  }\n\n  volumeValue = value;\n  video.volume = value;\n  localStorage.setItem(VALUMN, volumeValue);\n};\n\nvar handleLoadedMetadata = function handleLoadedMetadata() {\n  totalTime.innerText = formatTile(Math.floor(video.duration));\n  timeline.max = Math.floor(video.duration);\n};\n\nvar hanldTimeUpdate = function hanldTimeUpdate() {\n  currentTime.innerText = formatTile(Math.floor(video.currentTime));\n};\n\nvar handleTimelineChagne = function handleTimelineChagne(event) {\n  var value = event.target.value;\n  video.currentTime = value;\n};\n\nvar handleFullScreen = function handleFullScreen() {\n  var fullscreen = document.fullscreenElement; // full screen인 요소가 있는지 없는지를 반환\n\n  console.log(videoContainer);\n\n  if (fullscreen) {\n    document.exitFullscreen(); //\n\n    fullscreenBtn.innerText = \"Enter Full Screen\";\n  } else {\n    videoContainer.requestFullscreen(); // videoConatiner 안의 모든 것들은 풀스크린화\n\n    fullscreenBtn.innerText = \"Exit Full Screen\";\n  }\n};\n\nplayBtn.addEventListener(\"click\", handlePlayClick);\nmuteBtn.addEventListener(\"click\", handleMuteClick);\nvolumnRange.addEventListener(\"input\", handleChangeRange);\nvideo.addEventListener(\"loadedmetadata\", handleLoadedMetadata);\nvideo.addEventListener(\"timeupdate\", hanldTimeUpdate);\ntimeline.addEventListener(\"input\", handleTimelineChagne);\nfullscreenBtn.addEventListener(\"click\", handleFullScreen);\n\n//# sourceURL=webpack://wetube/./src/client/js/videoPlayer.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/client/js/videoPlayer.js"]();
/******/ 	
/******/ })()
;