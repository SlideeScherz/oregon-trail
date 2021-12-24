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