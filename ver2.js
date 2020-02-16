/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var namePlayer1, namePlayer2;
namePlayer1 = prompt("What is the name of player one?");
namePlayer2 = prompt("What is the name of player two?");

var score, roundScore, activePlayer, gamePlaying, scoreWin;

function init() {
  score = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  gamePlaying = true;

  document.getElementById("dice-1").style.display = "none";
  document.getElementById("dice-2").style.display = "none";

  document.getElementById("score-0").textContent = "0";
  document.getElementById("current-0").textContent = "0";
  document.getElementById("score-1").textContent = "0";
  document.getElementById("current-1").textContent = "0";
  document.getElementById("name-0").textContent = namePlayer1;
  document.getElementById("name-1").textContent = namePlayer2;
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
  document.getElementById("dice-1").style.display = "none";
  document.getElementById("dice-2").style.display = "none";
}

//New game
document.querySelector(".btn-new").addEventListener("click", init);

//Roll
document.querySelector(".btn-roll").addEventListener("click", () => {
  if (gamePlaying) {
    //Make dice
    var dice1 = Math.floor(Math.random() * 6 + 1);
    var dice2 = Math.floor(Math.random() * 6 + 1);

    //Display
    var dice1DOM = document.getElementById("dice-1");
    var dice2DOM = document.getElementById("dice-2");
    dice1DOM.style.display = "block";
    dice2DOM.style.display = "block";
    dice1DOM.src = "dice-" + dice1 + ".png";
    dice2DOM.src = "dice-" + dice2 + ".png";

    //Add score
    roundScore += dice1 + dice2;

    if (dice1 !== 1 && dice2 !== 1 && roundScore !== 12) {
      document.querySelector(
        "#current-" + activePlayer
      ).textContent = roundScore;
    } else {
      score[activePlayer] = 0;
      NextPlayer();
    }
  }
});

//Hold
document.querySelector(".btn-hold").addEventListener("click", () => {
  if (gamePlaying) {
    //Update score
    score[activePlayer] += roundScore;
    document.querySelector("#score-" + activePlayer).textContent =
      score[activePlayer];

    var input = document.querySelector(".final-score").value;

    if (input) {
      scoreWin = input;
    } else {
      scoreWin = 100;
    }

    //Check
    if (score[activePlayer] >= scoreWin) {
      document.querySelector("#name-" + activePlayer).textContent = "Winner";
      document.getElementById("dice-1").style.display = "none";
      document.getElementById("dice-2").style.display = "none";
      document.querySelector(".player-0-panel").classList.remove("active");
      document.querySelector(".player-1-panel").classList.remove("active");
      gamePlaying = false;
    } else {
      //Nextplayer
      NextPlayer();
    }
  }
});
