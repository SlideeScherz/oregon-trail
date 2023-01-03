window.onload = fadeout;

// if the user presses space redirect to mainmenu
window.addEventListener('keydown', (event) => {
  if (event.code == 'Space') {
    window.location.replace('/mainmenu');
    resetGame();
  }
});
