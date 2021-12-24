//here is all the js to control the main menu

//first thing i want to load is audio data
//this must be first in the stack to execute or one of the if statements below will, then the music will load
//set item to true here, but after this page global will hold the data for sound
sessionStorage.setItem("audio", "true");
audio.play();

    
//function to navigate the mainmenu
window.addEventListener("keydown", function navigateMainMene(e){
    
    //navigate to setup if we press 1 (travel the trail)
    if (e.key == '1') {
      window.location.href = "/setup";

    //navigate to top ten if we press 3
    }else if (e.key == '3') {
        window.location.href = "/topten";
    
    //press 4 for audio off, switch html to turn sound on
    }else if((e.key == '4') && (sessionStorage.getItem("audio") == "true")){
        var text = document.getElementById("audioText");
        toggleAudio();
        text.innerHTML = "4. Turn Sound (On)"
    
    //if audio is on and user presses 4 turn it off
    }else if ((e.key = '4') && (sessionStorage.getItem("audio") == "false")){
        var text = document.getElementById("audioText");
        toggleAudio();
        text.innerHTML = "4. Turn Sound (Off)"
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