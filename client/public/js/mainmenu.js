window.onload = async function () {
  fadeout();
};

// function to navigate the mainmenu
window.addEventListener("keydown", function navigateMainMenu(event) {
  //navigate to setup if we press 1 (travel the trail)
  if (event.code === "Digit1" || event.code === "Numpad1") {
    window.location.href = "/setup";
  } else if (event.code === "Digit2" || event.code === "Numpad2") {
    console.log("Coming soon");
  }

  //toggle audio
  else if (event.code === "Digit3" || event.code === "Numpad3") {
    
    const audioText = document.getElementById("audioText");
    const audioPlaying = sessionStorage.getItem("audio");

    if (audioPlaying) {
      audioText.innerHTML = "3. Turn Sound (Off)";
    } else if (!audioPlaying) {
      audioText.innerHTML = "3. Turn Sound (On)";
    }
    toggleAudio(audioPlaying);
  }
});
