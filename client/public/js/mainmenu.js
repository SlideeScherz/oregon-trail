// main menu controlls 

// Send to gameData
const audioPlaying = sessionStorage.getItem("audio");

window.onload = async function () {
  
  fadeout();
  
  if (audioPlaying) {
    audio.play();
  }
  else if (!audioPlaying) {
    audio.pause();
  }
}

// function to navigate the mainmenu
window.addEventListener("keydown", function navigateMainMenu(event) {

  //navigate to setup if we press 1 (travel the trail)
  if (event.code === 'Digit1' || event.code === 'Numpad1') {
    window.location.href = "/setup";
  }

  else if (event.code === 'Digit2' || event.code === 'Numpad2') {
    console.log('Coming soon');
  }

  //toggle audio
  else if (event.code === 'Digit3' || event.code === 'Numpad3') {
    if(sessionStorage.getItem("audio") === "true") {
      var text = document.getElementById("audioText"); //TODO: redundant
      toggleAudio();
      text.innerHTML = "3. Turn Sound (On)"
    }
    
    else if (sessionStorage.getItem("audio") == "false") {
      var text = document.getElementById("audioText");
      toggleAudio();
      text.innerHTML = "3. Turn Sound (Off)"
    }
  }
});

// TODO: redundtant
//create the visual fade 
async function fadeout() {
  document.getElementById('fade').style.opacity = '0';
  sleep(1000).then(() => { fadein(); });
}

async function fadein() {
  document.getElementById('fade').style.opacity = '1';
  sleep(1000).then(() => { fadeout(); });
}