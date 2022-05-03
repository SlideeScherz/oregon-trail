const audioURL = "/music/menu.mp3";
var audio = new Audio(audioURL);

audio.addEventListener(
  "ended",
  function () {
    this.currentTime = 0;
    this.play();
    console.log(`music looping`);
  },
  false
);

// access music obj externally
const musicPlaying = () => audio.paused;
const playMusic = () => audio.play();

/**
 * global.js
 * function to control audio which will later be acessed with keypress event
 * @param {boolean} state
 */
function toggleAudio() {
  // music element to reference DOM
  const audioText = document.getElementById("audioText");

  //if sound is on (true) turn it off
  if (!audio.paused) {
    audio.pause();
    audioText.innerHTML = "3. Turn Sound (On)";
  }
  //if sound is off turn it on!
  else if (audio.paused) {
    audio.play();
    audioText.innerHTML = "3. Turn Sound (Off)";
  }
}

// global.js method for a fading text
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fadein() {
  document.getElementById("fade").style.opacity = "1";
  sleep(1000).then(() => {
    fadeout();
  });
}

// create the visual fade
async function fadeout() {
  document.getElementById("fade").style.opacity = "0";
  sleep(1000).then(() => {
    fadein();
  });
}

const keyOnePressed = (k) => k === "Digit1" || k === "Numpad1";
const keyTwoPressed = (k) => k === "Digit2" || k === "Numpad2";
