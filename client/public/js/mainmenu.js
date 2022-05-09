// function to navigate the mainmenu
window.addEventListener("keydown", (event) => {
  switch (event.code) {
    case "Digit1" || "Numpad1":
      window.location.href = "/setup";
      break;

    case "Digit2" || "Numpad2":
      console.log("Coming soon");
      break;

    case "Digit3" || "Numpad3":
      toggleAudio();
      break;
  }
});
