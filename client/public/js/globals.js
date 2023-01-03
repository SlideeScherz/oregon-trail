const audio = new Audio('/music/trail.mp3');

// for fade fx
const fadeDuration = 10;
var opacity = 0;
var intervalID = 0;

function fadeout() {
  setInterval(hide, fadeDuration);
}

function hide() {
  var fadeEl = document.getElementById('fade');
  opacity = Number(window.getComputedStyle(fadeEl).getPropertyValue('opacity'));

  if (opacity > 0) {
    opacity = opacity - 0.01;
    fadeEl.style.opacity = opacity;
  } else {
    clearInterval(intervalID);
  }
}

audio.onpause = () => {
  console.log(`paused at ${audio.currentTime}`);
};

audio.addEventListener(
  'ended',
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
  // if sound is on (true) turn it off
  if (!audio.paused) {
    audio.pause();
    document.getElementById('audioText').innerHTML = '3. Turn Sound (On)';
  }
  // if sound is off turn it on!
  else if (audio.paused) {
    audio.play();
    document.getElementById('audioText').innerHTML = '3. Turn Sound (Off)';
  }
};

// global.js method for a fading text
const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

// fetch api to reset the game
const resetGame = () => {
  fetch('/api/game/reset').then((res) => {
    if (!resOk(res)) return;

    // success
    console.log('reset game');
  });
};
