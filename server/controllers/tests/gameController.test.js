const Game = require('../gameController');
const GameData = require('../../models/gameData');

describe('logic and utils', () => {
  test('simulateWeather even distribution', () => {
    const iterations = 100000;
    const errorTolerance = 220;
    const data = GameData.weathers.map((value) => ({
      ...value,
      count: 0,
      expected: value.probability * iterations,
    }));

    for (var i = 0; i < iterations; i++) {
      const weather = Game.simulateWeather();
      const index = data.findIndex((value) => value.id === weather.id);
      data[index].count++;
    }

    // plot difference
    data.forEach((value) => (value.error = value.count - value.expected));

    console.table(data.sort((a, b) => a.count > b.count));

    expect(Math.abs(data[0].error)).toBeLessThanOrEqual(errorTolerance);
    expect(Math.abs(data[1].error)).toBeLessThanOrEqual(errorTolerance);
    expect(Math.abs(data[2].error)).toBeLessThanOrEqual(errorTolerance);
    expect(Math.abs(data[3].error)).toBeLessThanOrEqual(errorTolerance);
    expect(Math.abs(data[4].error)).toBeLessThanOrEqual(errorTolerance);
    expect(Math.abs(data[5].error)).toBeLessThanOrEqual(errorTolerance);
    expect(Math.abs(data[6].error)).toBeLessThanOrEqual(errorTolerance);
    expect(Math.abs(data[7].error)).toBeLessThanOrEqual(errorTolerance);
    expect(Math.abs(data[8].error)).toBeLessThanOrEqual(errorTolerance);
    expect(Math.abs(data[9].error)).toBeLessThanOrEqual(errorTolerance);
    expect(Math.abs(data[10].error)).toBeLessThanOrEqual(errorTolerance);
  });
});
