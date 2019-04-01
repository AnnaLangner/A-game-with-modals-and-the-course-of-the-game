'use strict';

/* referencje do html-a */
var btnPaper = document.getElementById('btnPaper');
var btnRock = document.getElementById('btnRock');
var btnScissors = document.getElementById('btnScissors');
var output = document.getElementById('output');
var result = document.getElementById('result');
var newGameOutput = document.getElementById('newGameOutput');
var newBtn = document.getElementById('newBtn');

/* zmienne globalne */
var winsPlayer = 0;
var winsComputer = 0;
var numberOfRounds = 999;
var gameOver = false;
var options = ['paper', 'rock', 'scissors'];

var randomNumber = function() {
  var number = Math.floor((Math.random() * 3) + 1);
  return number;
};

var decideWinner = function(playerChoice, computerChoice) {
  if (playerChoice === computerChoice) return "No one wins, repeat the game <br>" ;
  else if ((playerChoice === 1 && computerChoice === 2) || (playerChoice === 2 && computerChoice === 3) || (playerChoice === 3 && computerChoice === 1)) {
      winsPlayer += 1;
      return 'YOU WIN: you played ' + options[playerChoice-1] +' computer played ' + options[computerChoice-1] +' <br>'
  } else {
      winsComputer += 1;
      return 'YOU LOST: you played ' + options[playerChoice-1] +' computer played ' + options[computerChoice-1] +' <br>'
  }
};

var playerMovePaper = function(){
  handlePlayerMove(1);
};

var playerMoveRock = function(){
  handlePlayerMove(2);
};

var playerMoveScissors = function(){
  handlePlayerMove(3);
};

var handlePlayerMove = function (playerChoice) {
  if (gameOver == false) {
    var computerChoice = randomNumber();
    var resultText = decideWinner(playerChoice, computerChoice);
    output.innerHTML += resultText;
    result.innerHTML = winsPlayer + '-' + winsComputer;
    if (winsPlayer >= numberOfRounds) {
      output.innerHTML += '<br> YOU WON THE ENTIRE GAME! <br>';
      gameOver = true;
    } else if (winsComputer >= numberOfRounds) {
      output.innerHTML += '<br> COMPUTER WON THE ENTIRE GAME! <br>';
      gameOver = true;
    }
  } else {
    output.innerHTML += '<br> Game over, please press the new game button! <br>';
  }
};

btnPaper.addEventListener('click', playerMovePaper);
btnRock.addEventListener('click', playerMoveRock);
btnScissors.addEventListener('click', playerMoveScissors);

newBtn.addEventListener('click', function() {  
  var value = window.prompt('Enter the number of rounds won, which ends the game'); 
  
  if (isNaN(value) || value === ''){
	 newGameOutput.innerHTML = 'the correct number has not been entered <br><br>' +  newGameOutput.innerHTML;
 } else if(value !== null) {
      numberOfRounds = value;
      gameOver = false;
      winsPlayer = 0;
      winsComputer = 0;
      output.innerHTML = '';
      newGameOutput.innerHTML =  'After ' + value + ' rounds, game is over <br><br>' + newGameOutput.innerHTML;
  };
  
});