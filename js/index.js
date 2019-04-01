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
var params = {
  winsPlayer : 0,
  winsComputer : 0,
  numberOfRounds : 999,
  gameOver : false,
  options : ['paper', 'rock', 'scissors']
};

var randomNumber = function() {
  var number = Math.floor((Math.random() * 3) + 1);
  return number;
};

var decideWinner = function(playerChoice, computerChoice) {
  if (playerChoice === computerChoice) return "No one wins, repeat the game <br>" ;
  else if ((playerChoice === 1 && computerChoice === 2) || (playerChoice === 2 && computerChoice === 3) || (playerChoice === 3 && computerChoice === 1)) {
      params.winsPlayer += 1;
      return 'YOU WIN: you played ' + params.options[playerChoice-1] +' computer played ' + params.options[computerChoice-1] +' <br>'
  } else {
      params.winsComputer += 1;
      return 'YOU LOST: you played ' + params.options[playerChoice-1] +' computer played ' + params.options[computerChoice-1] +' <br>'
  }
};

var handlePlayerMove = function (playerChoice) {
  if (params.gameOver == false) {
    var computerChoice = randomNumber();
    var resultText = decideWinner(playerChoice, computerChoice);
    output.innerHTML += resultText;
    result.innerHTML = params.winsPlayer + '-' + params.winsComputer;
    if (params.winsPlayer >= params.numberOfRounds) {
      params.gameOver = true;
      showModal('<br> YOU WON THE ENTIRE GAME! <br>');
    } else if (params.winsComputer >= params.numberOfRounds) {
      params.gameOver = true;
      showModal('<br> COMPUTER WON THE ENTIRE GAME! <br>');
    }
  } else {
    output.innerHTML += '<br> Game over, please press the new game button! <br>';
  }
};

var playerMove = function(move) {
  console.log ('test');
  var moveNumber;
  if (move == 'paper') {
    moveNumber = 1;
  } else if (move == 'rock') {
    moveNumber = 2;
  } else if (move == 'scissors') {
    moveNumber = 3;
  }
  handlePlayerMove(moveNumber);
}

var btnChoice = document.querySelectorAll('.player-move'); 

for (var i = 0; i < btnChoice.length; i++) {
  var dataMove = btnChoice[i].getAttribute('data-move');
  btnChoice[i].addEventListener('click', function(){
    playerMove(dataMove);
  });
};

newBtn.addEventListener('click', function() {  
  var value = window.prompt('Enter the number of rounds won, which ends the game'); 
  
  if (isNaN(value) || value === ''){
	 newGameOutput.innerHTML = 'the correct number has not been entered <br><br>' +  newGameOutput.innerHTML;
 } else if(value !== null) {
      params.numberOfRounds = value;
      params.gameOver = false;
      params.winsPlayer = 0;
      params.winsComputer = 0;
      output.innerHTML = '';
      result.innerHTML = params.winsPlayer + '-' + params.winsComputer;
      newGameOutput.innerHTML =  'After ' + value + ' rounds, game is over <br><br>' + newGameOutput.innerHTML;
  };

});

var showModal = function(text){
  document.querySelector('#modal-overlay').classList.add('show');
  document.querySelector('#modal-one').classList.add('show');
  result.innerHTML = text + '<br>' + params.winsPlayer + '-' + params.winsComputer;
};

var hideModal = function(event){
  event.preventDefault();
  document.querySelector('#modal-overlay').classList.remove('show');
  document.querySelector('#modal-one').classList.remove('show');
};
  
 var closeButtons = document.querySelectorAll('.modal .close');
  
for(var i = 0; i < closeButtons.length; i++){
  closeButtons[i].addEventListener('click', hideModal);
}
  
document.querySelector('#modal-overlay').addEventListener('click', hideModal);
  
var modals = document.querySelectorAll('.modal');
  
for(var i = 0; i < modals.length; i++){
  modals[i].addEventListener('click', function(event){
  event.stopPropagation();
  }
  );
}