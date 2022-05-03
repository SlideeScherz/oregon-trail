// fetch api to reset the game   
function resetGame() {

  fetch('/api/game/reset').then(function (response) {
    if (response.status != 200) {
      return;
    }
  })
}

// if the user presses space redirect to mainmenu
window.addEventListener("keydown", function pressSpace(e) {
  if (e.key == ' ') {
    window.location.replace("/mainmenu");
    resetGame();
  }
});

window.onload = async function () {
  // global.js
  fadeout();
}