var trailStats = function () {
  fetch('/api/game/data')
    .then(function (response) {
      if (response.status !== 200) {
        console.error(`trailStats => ${response.status}`);
        return;
      }

      //this trailstats is struggling to fetch miles traveled and health
      response.json().then(function (data) {
        var wagon = data.milesTraveled / 5;

        // move this back to bottom later
        document.getElementById('pace').innerHTML = data.currentPace.name;
        document.getElementById('days').innerHTML = data.daysOnTrail;
        document.getElementById('terrainImage').innerHTML = data.currentTerrain.image;
        document.getElementById('money').innerHTML = data.playerMoney;
        document.getElementById('profession').innerHTML = data.playerProfession;
        document.getElementById('miles').innerHTML = data.milesTraveled;
        document.getElementById('weather').innerHTML = data.currentWeather.name;
        document.getElementById('health').innerHTML = data.groupHealth;
        document.getElementById('terrain').innerHTML = data.currentTerrain.name;
        document.getElementById('members').innerHTML = data.playerStatus;
        document.getElementById('messeges').innerHTML = data.messeges;

        //move the wagon
        //document.getElementById("movingwagon").style.right="\"data.milesTraveled\"" + 'px';
      })
    })
}

// calls update game
function nextDay() {
  fetch('/api/game/updateGame')
    .then(function (response) {
      if (response.status !== 200) {
        console.error(`nextDay => ${response.status}`);
        return;
      }
      response.json().then(function (data) {
      });
    });
}

// in game user control
window.addEventListener("keydown", function trailInput(event) {

  if (event.code === "Delete") {
    window.location.href = "/mainmenu"
  }
  else if (event.code === 'Digit1' || event.code === 'Numpad1') {
    changePace(0)
  }
  else if (event.code === 'Digit2' || event.code === 'Numpad2') {
    changePace(1);
  }
  else if (event.code === 'Digit3' || event.code === 'Numpad3') {
    changePace(2);
  }
  else if (event.code === 'Digit4' || event.code === 'Numpad4') {
    changePace(3);
  }
  else if (event.code == "Space") {
    nextDay();
    trailStats();
  }
});

// all we need to export is the number pressed.
function changePace(id) {
  fetch(`/api/game/data/pace/${id}`,
    {
      method: 'post',
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      },
      body: id
    }).then(function (response) {
      if (response.status !== 200) {
        console.log('problem with ajax call! ' + response.status + " msg: " + response.value);
        return;
      }
    });
}