// load first screen by default
window.onload = () => getScreen(0);

/**
 * API Manager for getting screen data from setupController
 * @param {string} id number (1-5)
 */
function getScreen(id) {
  fetch("/api/setup/screen/" + id).then((res) => {
    res.json().then((data) => {
      updateDiv(data);

      if (id === 4) confirmSetup();
    });
  });
}

// change the DOM with new data
function updateDiv(req) {
  const setupDiv = document.getElementById("setup-content");
  setupDiv.innerHTML = req;
}

// read user input and call setup API
window.addEventListener("keydown", (event) => {
  if (stepCount === 0) {
    if (keyOnePressed(event)) {
      saveProfession("Banker");
    } else if (event.code === "Digit2" || event.code === "Numpad2") {
      saveProfession("Carpenter");
    } else if (event.code === "Digit3" || event.code === "Numpad3") {
      saveProfession("Farmer");
    }
  }

  // steps 1 and 2 handled by getElementById
  else if (stepCount === 3) {
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
 * Helper to shorten post requests
 * @param {*} bodyParams
 * @returns
 */
const postOptions = (bodyParams) => ({
  method: "post",
  headers: {
    "Content-type": "application/json; charset=UTF-8",
  },
  body: JSON.stringify(bodyParams),
});

/**
 * Read html input and send to gameData
 * @param {string} professionName value from HTML field
 */
function saveProfession(professionName) {
  fetch(
    `/api/setup/profession/${professionName}`,
    postOptions(professionName)
  ).then((res) => {
    console.log(res);

    stepCount++;
    getScreen(stepCount);
  });
}

// read html input and send to gameData
function saveWagonLeader() {
  const player = document.getElementById("leader").value;

  fetch(`/api/setup/leader/${player}`).then((res) => {
    console.log("lead");

    console.log(res);
    console.log(res.json());
    console.log(res.text());

    stepCount++;
    getScreen(stepCount);
  });
}

// read html input and send to gameData
function saveWagonMembers() {
  const players = [
    { id: 1, name: document.getElementById("player1").value },
    { id: 2, name: document.getElementById("player2").value },
    { id: 3, name: document.getElementById("player3").value },
    { id: 4, name: document.getElementById("player4").value },
  ];

  players.forEach((player) => {
    fetch(`/api/setup/member/${player.id}`).then((res) => {
      console.log("prof");
      console.log(res);
      console.log(res.json());
      console.log(res.text());
    });
  });
  stepCount++;
  getScreen(stepCount);
}

function saveMonth(month) {
  fetch(`/api/setup/month/${month}`).then(function (res) {
    stepCount++;
    getScreen(stepCount);
  });
}

function startGame() {
  window.location.href = "/trail";
}

/**
 * Get data from gameController
 * Send a json response back
 */
function confirmSetup() {
  fetch("/api/game/data/").then((res) => {
    console.log("Confirm setup");
    console.log(res);
    console.log(res.json());

    // sends a JSON response. This method sends a response (with the correct content-type) that is the parameter converted to a JSON string using JSON.stringify().
    // the parameter can be any JSON type, including object, array, string, Boolean, number, or null, and you can also use it to convert other values to JSON.
    res.json().then((data) => {
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

const checkAPICall = (resStatus) => {
  if (resStatus !== 200) {
    console.error(`${res.url} => ${resStatus}`);
    return;
  }
  console.log(`${res.url} => ${resStatus}`);
};
