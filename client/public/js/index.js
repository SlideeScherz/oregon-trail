var opacity = 0;
var intervalID = 0;
window.onload = fadeIn;

function fadeIn() {
  setInterval(show, 100);
}

function show() {
  var fadeEl = document.getElementById('fade');
  opacity = Number(window.getComputedStyle(fadeEl).getPropertyValue('opacity'));
  if (opacity < 1) {
    opacity = opacity + 0.1;
    fadeEl.style.opacity = opacity;
  } else {
    clearInterval(intervalID);
  }
}

// if the user presses space redirect to mainmenu
window.addEventListener('keydown', (event) => {
  if (event.code == 'Space') {
    window.location.replace('/mainmenu');
    resetGame();
  }
});
