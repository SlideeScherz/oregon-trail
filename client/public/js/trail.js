const nextDay = () => {
  fetch("/api/game/advanceDay").then((res) => {
    if (!resOk(res)) return;

    res.json().then((data) => {
      document.getElementById("pace").innerHTML = data.pace.name;
      document.getElementById("days").innerHTML = data.daysOnTrail;
      document.getElementById("terrainImg").innerHTML = data.terrain.image;
      document.getElementById("money").innerHTML = data.money;
      document.getElementById("profession").innerHTML = data.profession;
      document.getElementById("miles").innerHTML = data.milesTraveled;
      document.getElementById("weather").innerHTML = data.weather.name;
      document.getElementById("health").innerHTML = data.groupHealth;
      document.getElementById("terrain").innerHTML = data.terrain.name;
      document.getElementById("members").innerHTML = data.playerStatus;
      document.getElementById("messeges").innerHTML = data.messeges;
    });
  });
};

// in game user control
window.addEventListener("keydown", (event) => {
  if (event.code === "Delete") {
    window.location.href = "/mainmenu";
  } else if (event.code === "Digit1" || event.code === "Numpad1") {
    changePace(0);
  } else if (event.code === "Digit2" || event.code === "Numpad2") {
    changePace(1);
  } else if (event.code === "Digit3" || event.code === "Numpad3") {
    changePace(2);
  } else if (event.code === "Digit4" || event.code === "Numpad4") {
    changePace(3);
  } else if (event.code == "Space") {
    nextDay();
  }
});

// all we need to export is the number pressed.
const changePace = (args) => {
  fetch(`/api/game/data/pace/${args}`, {
    method: "post",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  }).then((res) => {
    if (!resOk(res)) return;
  });
};
