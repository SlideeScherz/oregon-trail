function topScore(inName, inScore, inDate) {
    this.playerName = inName;
    this.playerScore = inScore;
    this.playerDate = inDate;
}
  
exports.addScore = function(inName, inScore, inDate) {
    var score = new topScore(inName, inScore, inDate);
    return score;
}