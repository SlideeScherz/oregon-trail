/**
 * Pass in pace data from a res to update the DOM
 * @param {*} paceData
 */
const renderPaceData = (paceData) => {
  console.log(`Changing pace to ${JSON.stringify(paceData)}`);
  const { name, healthEffect, mileage } = paceData;
  document.getElementById('pace').innerHTML = name;
  document.getElementById('pace-health-effect').innerHTML = healthEffect;
  document.getElementById('pace-mileage-effect').innerHTML = mileage;
};

// setup data that doesnt render each day
const renderSetupData = (data) => {
  if (!data) {
    console.error('No data form renderSetupData');
    document.getElementById('money').innerHTML = '?';
    document.getElementById('profession').innerHTML = '?';
    return;
  }

  document.getElementById('money').innerHTML = data.money;
  document.getElementById('profession').innerHTML = data.profession;
};

const renderGameData = (data) => {
  // destruct
  const { pace, terrain, weather, daysOnTrail, milesTraveled, groupHealth, messages } = data;

  // disable if first day
  if (daysOnTrail === 0) {
    document.getElementById('reset-btn').setAttribute('disabled', 'true');
  }
  // remove
  else {
    document.getElementById('reset-btn').removeAttribute('disabled');
  }

  if (!document.getElementById('pace').innerHTML) {
    console.error('Exception null pace');
  }

  document.getElementById('days').innerHTML = daysOnTrail;

  document.getElementById('terrain').innerHTML = terrain.name;
  document.getElementById('terrain-img').innerHTML = terrain.image;

  document.getElementById('miles').innerHTML = milesTraveled;
  document.getElementById('miles-bar').value = milesTraveled / MILE_GOAL;

  document.getElementById('weather').innerHTML = weather.name;
  document.getElementById('weather-health-effect').innerHTML = weather.healthEffect;
  document.getElementById('weather-mileage-effect').innerHTML = weather.mileEffect;

  document.getElementById('health').innerHTML = groupHealth;
  document.getElementById('health-bar').value = groupHealth;

  mapPosition.x -= (milesTraveled / MILE_GOAL) * 1;
  mapPosition.y -= (milesTraveled / MILE_GOAL) * 0.825;
  document.getElementById('position-node').style.left = `${mapPosition.x}px`;
  document.getElementById('position-node').style.top = `${mapPosition.y}px`;
  console.log(mapPosition);

  document.getElementById('messages').innerHTML = messages.toString();

  if (weather.name === 'Snow') {
    console.log('Snow');
  }
};

/** call all children for easier callback to global reset game */
const renderTrail = (data) => {
  renderSetupData(data);
  renderGameData(data);
  renderPaceData(data.pace);
};

// initial render. Load setup and default values
window.onload = () => {
  fetch('/api/game/data/').then((res) => {
    if (!responseIsValid(res)) return;

    res.json().then((data) => renderTrail(data));
  });
};

/** access global reset game from /trail, with DOM update */
const trailReset = () => {
  const response = resetGame();
  console.log('Trail Reset');
  renderTrail(response);
};

/**
 * Send a next day request to the server
 * @param req null
 * @returns res
 */
const nextDay = () => {
  fetch('/api/game/advanceDay').then((res) => {
    if (!responseIsValid(res)) return;

    res.json().then((data) => renderGameData(data));
  });
};

// in game user control
window.addEventListener('keydown', (event) => {
  // go home
  if (event.code === 'Delete') {
    window.location.href = '/mainmenu';
  }
  // pace
  else if (event.code === 'Digit1') {
    changePace(0);
  }
  // pace
  else if (event.code === 'Digit2') {
    changePace(1);
  }
  // pace
  else if (event.code === 'Digit3') {
    changePace(2);
  }
  // pace
  else if (event.code === 'Digit4') {
    changePace(3);
  }
  // next day
  else if (event.code === 'Space') {
    nextDay();
  } else {
    console.log('Other key pressed');
  }
});

// all we need to export is the number pressed.
const changePace = (params) => {
  fetch(`/api/game/data/pace/${params}`, {
    method: 'post',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  }).then((res) => {
    if (!responseIsValid(res)) return;

    res.json().then((data) => renderPaceData(data));
  });
};
