

//fetch a api to reset the game   
function resetGame (){
  fetch('/api/game/reset').then(function(response){
    if(response.status != 200) {
      return;
    }
  })
}


//if the user presses space redirect to mainmenu
window.addEventListener("keydown", function pressSpace(e){
  if (e.key == ' ') {
    window.location.replace("/mainmenu");
    resetGame();
  }
});

//create the visual fade 
async function fadeout() {
  document.getElementById('fade').style.opacity = '0';
  sleep(1000).then(() => {fadein();});
}

async function fadein() {
  document.getElementById('fade').style.opacity = '1';
  sleep(1000).then(() => {fadeout();});
}

window.onload = async function() {
  fadeout();  
}





