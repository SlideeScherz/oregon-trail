/**
 * @file globals.js
 * Do not use arrow functions since this project was from 2015 and does
 * not support >=ES5
 */

const audio = new Audio('/music/trail.mp3');

// for fade fx
const fadeDuration = 10;
var opacity = 0;
var intervalID = 0;

// redundant, should fetch from own endpoint. defined in gameController.js
const GameState = {
  InSetup: 'InSetup',
  Playing: 'Playing',
  HealthLoss: 'HealthLoss',
  ExceededDaysLoss: 'ExceededDaysLoss',
  Win: 'Win',
};

// todo: move to controllers
const MILE_GOAL = 500;
const mapPosition = {
  x: 355,
  y: 357,
};
const goalPosition = {
  x: 85,
  y: 134.25,
};

const StoreKey = {
  DaysOnTrail: 'DaysOnTrail',
};

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
function responseIsValid(res) {
  if (res.status === 200) {
    console.log(`${res.url} => ${res.status}`);
    return true;
  } else if (res.status === 201) {
    console.log(`${res.url} => ${res.status}`);
    return true;
  } else {
    console.error(`${res.url} => ${res.status}`);
    return false;
  }
}

/** control audio which will later be acessed with keypress event */
function toggleAudio() {
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
}

// global.js method for a fading text
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/** fetch resetGame from gameController.js, and return the response */
const resetGame = () => {
  fetch('/api/game/reset').then((res) => {
    if (!responseIsValid(res)) return;

    return res.json();
  });
};
