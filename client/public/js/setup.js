/**
 * init stepCpunt to zero, Inc every time user advances in menu
 * 0: profession
 * 1: leader
 * 2: members
 * 3: start month
 * 4: show selections
 */
var stepCount = 0;

window.onload = () => {
  // load first screen by default
  getScreen(0);
};

/**
 * API Manager for getting screen data from setupController
 * type: GET
 * setupController.js --> setup.js
 * @param {string} args screen id (1-5)
 */
const getScreen = (args) => {
  fetch(`/api/setup/screen/${args}`).then((res) => {
    if (!resOk(res)) return;

    res.text().then((data) => {
      updateDiv(data);

      if (args === 4) {
        confirmSetup();
      }
    });
  });
};

// todo pass in elem ID
// change the DOM with new data
const updateDiv = (args) => {
  const setupDiv = document.getElementById("setup-content");
  setupDiv.innerHTML = args;
};

window.addEventListener("keydown", (event) => {
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
const saveProfession = (args) => {
  fetch(`/api/setup/profession/${args}`, {
    method: "post",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
    body: '{"profession": "' + args + '"}',
  }).then((res) => {
    if (!resOk(res)) return;

    stepCount++;
    getScreen(stepCount);
  });
};

const saveWagonLeader = () => {
  const leader = document.getElementById("leader").value;

  fetch(`/api/setup/wagonLeader/${leader}`, {
    method: "post",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
    body: '{"name1": "' + leader + '"}',
  }).then((res) => {
    if (!resOk(res)) return;

    stepCount++;
    getScreen(stepCount);
  });
};

// read html input and send to gameData
const saveWagonMembers = () => {
  const player1 = document.getElementById("player1").value;
  const player2 = document.getElementById("player2").value;
  const player3 = document.getElementById("player3").value;
  const player4 = document.getElementById("player4").value;

  const membersURL = `/api/setup/member/${player1}/${player2}/${player3}/${player4}`;

  fetch(membersURL, {
    method: "post",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  }).then((res) => {
    if (!resOk(res)) return;
    stepCount++;
    getScreen(stepCount);
  });
};

const saveMonth = (args) => {
  fetch(`/api/setup/month/${args}`, {
    method: "post",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
    body: args,
  }).then((res) => {
    if (!resOk(res)) return;
    stepCount++;
    getScreen(stepCount);
  });
};

const startGame = () => {
  window.location.href = "/trail";
};

const confirmSetup = () => {
  fetch("/api/game/data/").then((res) => {
    if (!resOk(res)) return;

    // json format response to go in div
    res.json().then((data) => {
      document.getElementById("rProfession"
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
};
