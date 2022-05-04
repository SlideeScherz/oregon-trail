// fetch api to reset the game
function resetGame() {
  fetch("/api/game/reset").then((res) => {
    if (res.status != 200) {
      return;
    }
  });
}

// if the user presses space redirect to mainmenu
window.addEventListener("keydown",(event) => {
  if (event.code == "Space") {
    window.location.replace("/mainmenu");
    resetGame();
  }
});
