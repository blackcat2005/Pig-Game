/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var score, roundScore, activePlayer, gamePlaying;

function init() {
  score = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  gamePlaying = true;

  document.querySelector(".dice").style.display = "none";

  document.getElementById("score-0").textContent = "0";
  document.getElementById("current-0").textContent = "0";
  document.getElementById("score-1").textContent = "0";
  document.getElementById("current-1").textContent = "0";
  document.getElementById("name-0").textContent = "Player 0";
  document.getElementById("name-1").textContent = "Player 1";
  document.querySelector(".player-1-panel").classList.remove("winner");
  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-1-panel").classList.remove("active");
  document.querySelector(".player-0-panel").classList.add("active");
}

init();

//Next Player
function NextPlayer() {
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  roundScore = 0;

  document.getElementById("score-0").textContent = score[0];
  document.getElementById("score-1").textContent = score[1];
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";

  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");
  document.querySelector(".dice").style.display = "none";
}

//New game
document.querySelector(".btn-new").addEventListener("click", init);

//Roll
document.querySelector(".btn-roll").addEventListener("click", () => {
  //Make dice
  var random = Math.floor(Math.random() * 6 + 1);
  var diceDOM = document.querySelector(".dice");
  diceDOM.style.display = "block";
  diceDOM.src = "dice-" + random + ".png";

  //Add score
  if (random !== 1) {
    roundScore += random;
    document.querySelector("#current-" + activePlayer).textContent = roundScore;
  } else {
    score[activePlayer] = 0;
    NextPlayer();
  }
});

//Hold
document.querySelector(".btn-hold").addEventListener("click", () => {
  //Update score
  score[activePlayer] += roundScore;
  document.querySelector("#score-" + activePlayer).textContent =
    score[activePlayer];

  //Check
  if (score[activePlayer] >= 20) {
    document.querySelector("#name-" + activePlayer).textContent = "Winner";
    document.querySelector(".dice").style.display = "none";
    document.querySelector(".player-0-panel").classList.remove("active");
    document.querySelector(".player-1-panel").classList.remove("active");
  } else {
    //Nextplayer
    NextPlayer();
  }
});
