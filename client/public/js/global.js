/**
 * have music play here rather than html so it does not skip when we navigate pages
 * commented out music because it annoys me while i work. will uncomment when i make final commit
 * set audio to true in mainmenu, but keep retreive it and store it here and keep it on in all tabs
 */

const menuAudioSrc = "/music/menu.mp3";

// possible bug
let audio = new Audio(menuAudioSrc);

// create only one audio instance
audio.play();

sessionStorage.setItem("audio", "true");

// store state of seconds elapsed
sessionStorage.setItem("seconds", 0);

/**
 * function to control audio which will later be acessed with keypress event
 * @param {boolean} audioState 
 */
function toggleAudio(audioState) {

  console.log(`toggleAudio => ${audioState}`);

  //if sound is on (true) turn it off
  if (audioState) {
    audio.pause();
  }
  //if sound is off turn it on!
  else if (!audioState) {
    audio.play();
  }

  sessionStorage.setItem("audio", !audioState);
}

//global method for a fading text
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

const keyOnePressed = (keyCode) => (keyCode === "Digit1" || keyCode === "Numpad1");
const keyTwoPressed = (keyCode) => (keyCode === "Digit2" || keyCode === "Numpad2");
