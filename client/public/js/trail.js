var trailStats = function(){
  fetch('/api/game/data')
  .then(function(response){
    if(response.status !== 200) {
      console.log('Issue! status:' + response.status);
      return;
    }

  //this trailstats is struggling to fetch miles traveled and health
  response.json().then(function(data) {
    var wagon = data.milesTraveled / 5; 

   
    //move this back to bottom later
    document.getElementById('pace').innerHTML = data.currentPace.paceName;
    document.getElementById('days').innerHTML = data.daysOnTrail;
    document.getElementById('terrainImage').innerHTML = data.currentTerrain.terrainImage; 
    document.getElementById('money').innerHTML = data.playerMoney;
    document.getElementById('profession').innerHTML = data.playerProfession;
    document.getElementById('miles').innerHTML = data.milesTraveled;
    document.getElementById('weather').innerHTML = data.currentWeather.weatherName;
    document.getElementById('health').innerHTML = data.groupHealth;
    document.getElementById('terrain').innerHTML = data.currentTerrain.terrainName;
    document.getElementById('members').innerHTML = data.playerStatus;

   
    if(data.messeges == null || data.messeges == undefined){
      document.getElementById('messeges').innerHTML = "";
      console.log("undefined msg!")
    }else{
      document.getElementById('messeges').innerHTML = data.messeges;
    }
    //move the wagon
    //document.getElementById("movingwagon").style.right="\"data.milesTraveled\"" + 'px';
  })
  })
}



function nextDay(){
  fetch('/api/game/updateGame')
  .then(function(response) {
    if (response.status !== 200) {
      return;
    }
    response.json().then(function(data){
    });
  });
}

function changePace(id){
  fetch('/api/pace/' + id,
  {
    method: 'post',
    headers:
    {
      "Content-type": "application/json; charset=UTF-8"
    },
  }).then(function(response) {
    if (response.status !== 200) {
      console.log('ok' + response.status +"msg: ");
      return;
    }else if(response == undefined){
      window.alert('Select a pace before you start');
      return;
    }
  response.json().then(function(data){
    document.getElementById('pace').innerHtml = data.name
    });
  });
}

//changePace(0);

//during the game if the user presses 1,2,3 or 4 change the pace
window.addEventListener("keydown", function userPaceChange(e){

  //navigate home if we press delete
  //fix and make sure
  if(e.key == "delete"){
    window.location.href = "/mainmenu"

  //if user presses 1 change pace steady
  }else if (e.key == "1"){
    changePace(0);

  //if user presses 2 change pace to strenuos
  }else if (e.key == "2"){
    changePace(1);

  //if user presses 3 change pace to grueling
  }else if (e.key == "3"){
    changePace(2);

  //if user presses 4 change pace to resting
  }else if (e.key == "4"){
    changePace(3);

  //if the user presses space advance the day  
  }else if (e.key == " "){
    nextDay();
    trailStats();
  }
});