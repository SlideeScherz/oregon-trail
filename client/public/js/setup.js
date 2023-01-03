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

      if (args === 4) confirmSetup();
    });
  });
};

// todo pass in elem ID
// change the DOM with new data
const updateDiv = (args) => {
  const setupDiv = document.getElementById('setup-content');
  setupDiv.innerHTML = args;
};

window.addEventListener('keydown', (event) => {
  if (stepCount === 0) {
    switch (event.code) {
      case 'Digit1' || 'Numpad1':
        saveProfession('Banker');
        break;

      case 'Digit2' || 'Numpad2':
        saveProfession('Carpenter');
        break;

      case 'Digit3' || 'Numpad3':
        saveProfession('Farmer');
        break;
    }
  } else if (stepCount === 3) {
    switch (event.code) {
      case 'Digit1' || 'Numpad1':
        saveMonth('March');
        break;

      case 'Digit2' || 'Numpad2':
        saveMonth('April');
        break;

      case 'Digit3' || 'Numpad3':
        saveMonth('May');
        break;

      case 'Digit4' || 'Numpad4':
        saveMonth('June');
        break;

      case 'Digit5' || 'Numpad5':
        saveMonth('July');
        break;
    }
  } else if (stepCount === 4 && event.code == 'Space') {
    startGame();
  }
});

/**
 * Read html input and send to gameData
 * @param {string} profession value from HTML field
 */
const saveProfession = (args) => {
  fetch(`/api/setup/profession/${args}`, {
    method: 'post',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: '{"profession": "' + args + '"}',
  }).then((res) => {
    if (!resOk(res)) return;

    stepCount++;
    getScreen(stepCount);
  });
};

const saveWagonLeader = () => {
  const leader = document.getElementById('leader').value;

  fetch(`/api/setup/leader/${leader}`, {
    method: 'post',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  }).then((res) => {
    if (!resOk(res)) return;

    stepCount++;
    getScreen(stepCount);
  });
};

// read html input and send to gameData
const saveWagonMembers = () => {
  const player1 = document.getElementById('player1').value;
  const player2 = document.getElementById('player2').value;
  const player3 = document.getElementById('player3').value;
  const player4 = document.getElementById('player4').value;

  const membersURL = `/api/setup/member/${player1}/${player2}/${player3}/${player4}`;

  fetch(membersURL, {
    method: 'post',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  }).then((res) => {
    if (!resOk(res)) return;
    stepCount++;
    getScreen(stepCount);
  });
};

const saveMonth = (args) => {
  fetch(`/api/setup/month/${args}`, {
    method: 'post',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  }).then((res) => {
    if (!resOk(res)) return;
    stepCount++;
    getScreen(stepCount);
  });
};

const startGame = () => {
  window.location.href = '/trail';
};

const confirmSetup = () => {
  fetch('/api/game/data/').then((res) => {
    if (!resOk(res)) return;

    // json format response to go in div
    res.json().then((data) => {
      document.getElementById('rProfession').innerHTML = data.profession;
      document.getElementById('rMoney').innerHTML = data.money;
      document.getElementById('rPlayer1Name').innerHTML = data.playerNames[0];
      document.getElementById('rPlayer1Name').innerHTML = data.playerNames[0];
      document.getElementById('rPlayer2Name').innerHTML = data.playerNames[1];
      document.getElementById('rPlayer3Name').innerHTML = data.playerNames[2];
      document.getElementById('rPlayer4Name').innerHTML = data.playerNames[3];
      document.getElementById('rMonth').innerHTML = data.startMonth;
    });
  });
};
