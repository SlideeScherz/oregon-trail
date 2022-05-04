// fetch api to reset the game
const resetGame = () => {
  fetch("/api/game/reset").then((res) => {
    if (!resOk(res)) return;
  });
};

// if the user presses space redirect to mainmenu
window.addEventListener("keydown", (event) => {
  if (event.code == "Space") {
    window.location.replace("/mainmenu");
    resetGame();
  }
});
