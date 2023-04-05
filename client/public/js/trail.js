window.onload = () => {
  fetch('/api/game/data/').then((res) => {
    if (!responseIsValid(res)) {
      console.log('Invalid res');
      return;
    }

    res.json().then((data) => {
      document.getElementById('p1-name').innerHTML = data.playerNames[1];
      document.getElementById('p2-name').innerHTML = data.playerNames[2];
      document.getElementById('p3-name').innerHTML = data.playerNames[3];
      document.getElementById('p4-name').innerHTML = data.playerNames[4];
    });
  });
};

/**
 * Send a next day request to the server
 * @param req null
 * @returns res
 */
const nextDay = () => {
  fetch('/api/game/advanceDay').then((res) => {
    if (!responseIsValid(res)) return;

    res.json().then((data) => {
      // note: handled in changePace() but needed if starting without pressing num
      document.getElementById('pace').innerHTML = data.pace.name;
      document.getElementById('pace-health-effect').innerHTML = data.pace.healthEffect;
      document.getElementById('pace-mileage-effect').innerHTML = data.pace.mileage;

      document.getElementById('days').innerHTML = data.daysOnTrail;
      document.getElementById('terrainImg').innerHTML = data.terrain.image;
      document.getElementById('money').innerHTML = data.money;
      document.getElementById('profession').innerHTML = data.profession;
      document.getElementById('miles').innerHTML = data.milesTraveled;
      document.getElementById('weather').innerHTML = data.weather.name;
      document.getElementById('health').innerHTML = data.groupHealth;
      document.getElementById('health-bar').value = data.groupHealth;
      document.getElementById('terrain').innerHTML = data.terrain.name;
      // temp: document.getElementById('messeges').innerHTML = data.messeges[0];

      if (data.weather.name === 'Snow') {
      }
    });
  });
};

// in game user control
window.addEventListener('keydown', (event) => {
  // go home
  if (event.code === 'Delete') {
    window.location.href = '/mainmenu';
  }
  // pace
  else if (event.code === 'Digit1' || event.code === 'Numpad1') {
    changePace(0);
    document.getElementById('pace').innerHTML = 'Resting';
  }
  // pace
  else if (event.code === 'Digit2' || event.code === 'Numpad2') {
    changePace(1);
    document.getElementById('pace').innerHTML = 'Steady';
  }
  // pace
  else if (event.code === 'Digit3' || event.code === 'Numpad3') {
    changePace(2);
    document.getElementById('pace').innerHTML = 'Strenuous';
  }
  // pace
  else if (event.code === 'Digit4' || event.code === 'Numpad4') {
    changePace(3);
    document.getElementById('pace').innerHTML = 'Grueling';
  }
  // pace
  else if (event.code === 'Space') {
    nextDay();
  }
});

// all we need to export is the number pressed.
const changePace = (args) => {
  fetch(`/api/game/data/pace/${args}`, {
    method: 'post',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  }).then((res) => {
    if (!responseIsValid(res)) return;
  });
};
