
















function pickAWinningItem() {
    var winner = Math.random();
    var threshold = 0;
    for (let i = 0; i < data.length; i++) {
        threshold += parseFloat(weatherArray[i].weatherProbability);
        if (threshold > winner) {
            return data[i]

        }
    }
}