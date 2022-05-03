/**
 * init stepCpunt to zero, Inc every time user advances in menu
 * 0: profession
 * 1: leader
 * 2: members
 * 3: start month
 * 4: show selections
 */
var stepCount = 0;

window.onload = function () {
  // load first screen by default
  getScreen(0);
}

/**
 * API Manager for getting screen data from setupController
 * @param {string} screenId number (1-5)
 */
function getScreen(screenId) {
  console.log(`fetching => ${screenId}`);

  fetch("/api/setup/screen/" + screenId).then(function (response) {
    if (response.status !== 200) {
      console.error(`getScreen => ${response.status}`);
      return;
    }
    response.text().then(function (data) {
      console.log(`getScreen => ${response.status} step: ${stepCount}`);

      updateDiv(data);

      if (screenId === 4) {
        confirmSetup();
      }
    });
  });
}

// change the DOM with new data
function updateDiv(strData) {
  const setupDiv = document.getElementById("setup-content");
  setupDiv.innerHTML = strData;
}

window.addEventListener("keypress", function setupListener(event) {
  if (stepCount === 0) {
    if (event.code === "Digit1" || event.code === "Numpad1") {
      saveProfession("Banker");
    } else if (event.code === "Digit2" || event.code === "Numpad2") {
      saveProfession("Carpenter");
    } else if (event.code === "Digit3" || event.code === "Numpad3") {
      saveProfession("Farmer");
    }
  } else if (stepCount === 3) {
    if (event.code === "Digit1" || event.code === "Numpad1") {
      saveMonth("March");
    } else if (event.code === "Digit2" || event.code === "Numpad2") {
      saveMonth("April");
    } else if (event.code === "Digit3" || event.code === "Numpad3") {
      saveMonth("May");
    } else if (event.code === "Digit4" || event.code === "Numpad4") {
      saveMonth("June");
    } else if (event.code === "Digit5" || event.code === "Numpad5") {
      saveMonth("July");
    }
  } else if (stepCount === 4 && event.code == "Space") {
    startGame();
  }
});

/**
 * Read html input and send to gameData
 * @param {string} playerProfession value from HTML field
 */
function saveProfession(playerProfession) {
  fetch("/api/setup/profession/" + playerProfession, {
    method: "post",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
    body: '{"profession": "' + playerProfession + '"}',
  }).then(function (response) {
    if (response.status !== 200) {
      console.error(`saveProfession => ${response.status}`);
      return;
    }
    console.log(`saveProfession => ${response.status}`);
    stepCount++;
    getScreen(stepCount);
  });
}

// read html input and send to gameData
function saveWagonLeader() {
  var name1 = document.getElementById("player0").value;

  fetch("/api/setup/wagonLeader/" + name1, {
    method: "post",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
    body: '{"name1": "' + name1 + '"}',
  }).then(function (response) {
    if (response.status !== 200) {
      console.error(`saveWagonLeader => ${response.status}`);
      return;
    }
    console.log(`saveWagonLeader => ${response.status}`);
    stepCount++;
    getScreen(stepCount);
  });
}

// read html input and send to gameData
function saveWagonMembers() {
  var name1 = document.getElementById("player1").value;
  var name2 = document.getElementById("player2").value;
  var name3 = document.getElementById("player3").value;
  var name4 = document.getElementById("player4").value;

  fetch(
    "/api/setup/member/" + name1 + "/" + name2 + "/" + name3 + "/" + name4,
    {
      method: "post",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }
  ).then(function (response) {
    if (response.status !== 200) {
      console.error(`saveWagonMembers => ${response.status}`);
      return;
    }
    console.log(`saveWagonMembers => ${response.status}`);
    stepCount++;
    getScreen(stepCount);
  });
}

function saveMonth(startMonth) {
  //send data to setup
  fetch("/api/setup/month/" + startMonth, {
    method: "post",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
    body: startMonth,
  }).then(function (response) {
    if (response.status !== 200) {
      console.error(`saveMonth => ${response.status}`);
      return;
    }

    console.log(`saveMonth => ${response.status}`);
    stepCount++;
    getScreen(stepCount);
  });
}

function startGame() {
  window.location.href = "/trail";
}

function confirmSetup() {
  fetch("/api/game/data/").then(function (response) {
    if (response.status !== 200) {
      console.error(`confirmSetup => ${response.status}`);
      return;
    }

    console.log(`confirmSetup => ${response.status}`);

    //display the data the user has entered
    response.json().then(function (data) {
      document.getElementById(
        "rProfession"
      ).innerHTML = `<p> Your Profession: </p>${data.playerProfession}`;
      document.getElementById(
        "rMoney"
      ).innerHTML = `<p> Bank Account: </p>${data.playerMoney}`;
      document.getElementById(
        "rPlayer1Name"
      ).innerHTML = `<p> Wagon Leader: </p>${data.playerNames[0]}`;
      document.getElementById(
        "rPlayer2Name"
      ).innerHTML = `<p> Wagon Member 1: </p>${data.playerNames[1]}`;
      document.getElementById(
        "rPlayer3Name"
      ).innerHTML = `<p> Wagon Member 2: </p>${data.playerNames[2]}`;
      document.getElementById(
        "rPlayer4Name"
      ).innerHTML = `<p> Wagon Member 3: </p>${data.playerNames[3]}`;
      document.getElementById(
        "rMonth"
      ).innerHTML = `<p> Start Month: </p>${data.startMonth}`;
    });
  });
}
