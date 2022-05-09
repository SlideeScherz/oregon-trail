const audioURL = "/music/trail.mp3";
var audio = new Audio(audioURL);

window.onload = async function () {
  fadeout();
};

audio.onpause = () => {
  console.log(`paused at ${audio.currentTime}`);
};

audio.addEventListener(
  "ended",
  () => {
    this.play();
    console.log(`music looping`);
  },
  false
);

/**
 * Check that the API call was successful.
 * @param {json} res api response object
 * @returns
 */
const resOk = (res) => {
  if (res.status === 200) {
    console.log(`${res.url} => ${res.status}`);
    return true;
  } else {
    console.error(`${res.url} => ${res.status}`);
    return false;
  }
};

/**
 * global.js
 * control audio which will later be acessed with keypress event
 */
const toggleAudio = () => {
  // music element to reference DOM
  const audioText = document.getElementById("audioText");

  // if sound is on (true) turn it off
  if (!audio.paused) {
    audio.pause();
    audioText.innerHTML = "3. Turn Sound (On)";
  }
  // if sound is off turn it on!
  else if (audio.paused) {
    audio.play();
    audioText.innerHTML = "3. Turn Sound (Off)";
  }
};

// global.js method for a fading text
const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

async function fadein() {
  document.getElementById("fade").style.opacity = "1";
  sleep(1000).then(() => {
    fadeout();
  });
}

async function fadeout() {
  document.getElementById("fade").style.opacity = "0";
  sleep(1000).then(() => {
    fadein();
  });
}

// fetch api to reset the game
const resetGame = () => {
  fetch("/api/game/reset").then((res) => {
    if (!resOk(res)) return;
  });
};

const keyOnePressed = (k) => k === "Digit1" || k === "Numpad1";
const keyTwoPressed = (k) => k === "Digit2" || k === "Numpad2";
