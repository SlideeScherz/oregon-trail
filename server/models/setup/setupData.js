const getSetupData = (playerNames, profession, money, startMonth) => {
  return {
    playerNames: playerNames,
    profession: profession,
    money: money,
    startMonth: startMonth,
  };
};

module.exports = { getSetupData };
