window.onload = async function () {
  fadeout();
};

// function to navigate the mainmenu
window.addEventListener("keydown", function (event) {
  //navigate to setup if we press 1 (travel the trail)
  if (event.code === "Digit1" || event.code === "Numpad1") {
    window.location.href = "/setup";
  } else if (event.code === "Digit2" || event.code === "Numpad2") {
    console.log("Coming soon");
  }

  //toggle audio
  else if (event.code === "Digit3" || event.code === "Numpad3") {
    toggleAudio(musicPlaying());
  }
});
