// main menu controlls 

// function to navigate the mainmenu
window.addEventListener("keydown", function navigateMainMenu(e) {

  //navigate to setup if we press 1 (travel the trail)
  if (e.key == '1') {
    window.location.href = "/setup";
  }

  //press 4 for audio off, switch html to turn sound on
  else if ((e.key == '4') && (sessionStorage.getItem("audio") == "true")) {
    var text = document.getElementById("audioText");
    toggleAudio();
    text.innerHTML = "4. Turn Sound (On)"
  }

  //if audio is on and user presses 4 turn it off
  else if ((e.key = '4') && (sessionStorage.getItem("audio") == "false")) {
    var text = document.getElementById("audioText");
    toggleAudio();
    text.innerHTML = "4. Turn Sound (Off)"
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

window.onload = async function () {
  fadeout();
}