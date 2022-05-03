window.onload = async function () {
  // global.js
  fadeout();
  playMusic();
};

// fetch api to reset the game
function resetGame() {
  fetch("/api/game/reset").then(function (response) {
    if (response.status != 200) {
      return;
    }
  });
}

// if the user presses space redirect to mainmenu
window.addEventListener("keydown", function (event) {
  if (event.code == "Space") {
    window.location.replace("/mainmenu");
    resetGame();
  }
});
