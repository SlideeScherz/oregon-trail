//start 

//init stepCpunt to zero, Inc every time user advances in menu
var stepCount = 0;

sessionStorage.setItem("audio", "true");
audio.play();

getScreen(0);

function getScreen(screenId) {
  fetch('/api/setup/screen/' + screenId).then(function (response) {
    if (response.status !== 200) {
      console.log('pick setup screen' + response.status + "msg: " + response.value);
      return;
    }

    response.text().then(function (data) {
      gameContainer.innerHTML = data;
      if (screenId == 5) {
        returnStats();
      }
    })
  });
}

window.addEventListener("keypress", pressProfession, false);
function pressProfession(e) {

  if (stepCount == 0) {

    if (e.key == "1") {
      saveProfession("Banker");
      stepCount++;
    }

    else if (e.key == "2") {
      saveProfession("Carpenter");
      stepCount++;
    }

    else if (e.key == "3") {

      saveProfession("Farmer");
      stepCount++;
    }
  }
}


function saveProfession(playerProfession) {

  fetch('/api/setup/profession/' + playerProfession, {
    method: 'post',
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    },
    body: '{"profession": "' + playerProfession + '"}'
  }).then(function (response) {

    if (response.status !== 200) {
      console.log('ok' + response.status + "msg: " + response.value);
      return;
    } else {
      getScreen(stepCount);
    }

    console.log("profession" + playerProfession + " saved! ");

  });
}


function saveWagonLeader() {
  var name1 = document.getElementById("player0").value

  fetch('/api/setup/wagonLeader/' + name1, {
    method: 'post',
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    },
    body: '{"name1": "' + name1 + '"}'
  }).then(function (response) {
    if (response.status !== 200) {
      console.log('ok' + response.status + "msg: " + response.value);
      return;
    }
    else {
      stepCount++;
      getScreen(stepCount);
    }
    console.log("wagon leader " + name1 + " is saved");
  });
}

function saveWagonMembers() {
  var name1 = document.getElementById("player1").value
  var name2 = document.getElementById("player2").value
  var name3 = document.getElementById("player3").value
  var name4 = document.getElementById("player4").value

  fetch('/api/setup/member/' + name1 + '/' + name2 + '/' + name3 + '/' + name4,
    {
      method: 'post',
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }

    }).then(function (response) {
      if (response.status !== 200) {
        console.log('ok' + response.status + "msg: " + response.value);
        return;
      } else {
        stepCount++;
        getScreen(stepCount);
      }
      console.log("wagon members saved");
    });
}

function saveMonth(startMonth) {

  //send data to setup
  fetch('/api/setup/month/' + startMonth, {
    method: 'post',
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    },
    body: '{"month": "' + startMonth + '"}'
  }).then(function (response) {

    if (response.status !== 200) {
      console.log('ok' + response.status + "msg: " + response.value);
      return;
    }
    else {
      getScreen(4);
      returnStats();
    }

    console.log("month" + startMonth + " saved! ");
  });
}

window.addEventListener("keypress", pickMonth, false);
function pickMonth(e) {
  if (e.key == "1") {
    if (stepCount == 3) {
      saveMonth("March");
      stepCount++;
    }
  }

  else if (e.key == "2") {
    if (stepCount == 3) {
      saveMonth("April");
      stepCount++;
    }
  }
  else if (e.key == "3") {
    if (stepCount == 3) {
      saveMonth("May");
      stepCount++;
    }
  }

  else if (e.key == "4") {
    if (stepCount == 3) {
      saveMonth("June");
      stepCount++;
    }
  }

  else if (e.key == "5") {
    if (stepCount == 3) {
      saveMonth("July");
      stepCount++;
    }
  }

  else if (e.key == " ") {

    if (stepCount == 5) {
      window.location.href = "/trail"
    }
  }
}

var returnStats = function () {
  stepCount++;
  fetch('/api/game/data/')
    .then(function (response) {
      if (response.status !== 200) {
        return;
      }

      //display the data the user has entered
      response.json().then(function (data) {
        document.getElementById('rProfession').innerHTML = "<p> Your Profession: </p>" + data.playerProfession;
        document.getElementById('rMoney').innerHTML = "<p> Bank Account: </p>" + data.playerMoney;
        document.getElementById('rPlayer1Name').innerHTML = "<p> Wagon Leader: </p>" + data.playerNames[0];
        document.getElementById('rPlayer2Name').innerHTML = "<p> Wagon Member 1: </p>" + data.playerNames[1];
        document.getElementById('rPlayer3Name').innerHTML = "<p> Wagon Member 2: </p>" + data.playerNames[2];
        document.getElementById('rPlayer4Name').innerHTML = "<p> Wagon Member 3: </p>" + data.playerNames[3];
        document.getElementById('rMonth').innerHTML = "<p> Start Month: </p>" + data.startMonth;

        console.log('data saved. proceeding');
        console.log(data);
      })
    })
}



