/** 
 * have music play here rather than html so it does not skip when we navigate pages
 * commented out music because it annoys me while i work. will uncomment when i make final commit
 * set audio to true in mainmenu, but keep retreive it and store it here and keep it on in all tabs
 */

// retreive data from other javascript files to store music playing or not
var isSoundOn = sessionStorage.getItem("audio");

var audio = new Audio();
audio.src = "/music/menu.mp3";

// create function to control audio which will later be acessed with keypress event
function toggleAudio() {

  //if sound is on (true) turn it off
  if (isSoundOn) {
    sessionStorage.setItem("audio", "false");
    audio.pause();
  } 
  
  //if sound is off turn it on!
  else if (!isSoundOn) {
    sessionStorage.setItem("audio", "true");
    audio.play();
  }

  isSoundOn = !isSoundOn;
}

// reset seconds to 0
sessionStorage.setItem("seconds", 0);

// default audio to play
sessionStorage.setItem("audio", "true");
audio.play();


//global method for a fading text
//if the user presses space redirect to mainmenu
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


