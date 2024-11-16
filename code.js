var wrongAudio = new Audio('sounds/wrong.mp3');
const buttons = $('.btn');   
var buttonColors = ["red", "blue", "green", "yellow"];
let randomChoosenColor = '';
let gamePattern = [];
let userClickedPattern = [];
let level = 0;
let started = false
let buttonClickCount = 0;

$(document).on('keypress',(e) => {
    if(e.key.toUpperCase() === 'A' &&  started==false){
      // start/restart game function
      started = true;
      nextSequence();
    } else if (started==false){
      started = true;
      nextSequence();
    }
});


function checkAnswer(currentLevel){
  if(gamePattern[currentLevel-1] == userClickedPattern[currentLevel-1]){
    if(currentLevel==level){
      setTimeout(nextSequence, 300);
    }
  } else {
    wrongAudio.play();
    $(`body`).addClass("game-over");
    $(`#level-title`).text(`Game Over, Press Any Key to Restart`);
    
    setTimeout(()=>{
      $(`body`).removeClass("game-over");
    },200);

    setTimeout(()=>{
      startOver();
    },600);
  }}
    
function startOver(){
  gamePattern = [];
  started = false;
  level = 0;
}

function nextSequence(){
  level +=1;
  buttonClickCount = 0;
  userClickedPattern = [];
  $(`#level-title`).text(`Level ${level}`);
  var seq = Math.random();
  seq = Math.floor(seq * 4);
  randomChoosenColor = buttonColors[seq];
  var ele =  $(`#${randomChoosenColor}`); 
  playSound(randomChoosenColor);
  animatePress(randomChoosenColor);  
  gamePattern.push(randomChoosenColor);
  console.log(`level ${level}  gamePattern: ${gamePattern}`) ;
}

$('.btn').on("click", function(e){
  userChosenColour = e.target.id;
  userClickedPattern.push(userChosenColour);
  console.log(`user clicked patttern ${userClickedPattern}`);
  buttonClickCount+=1;
  sync(userChosenColour);
  setTimeout(()=>{
    checkAnswer(buttonClickCount);
  },200);

})

function sync(chosenColor){
  playSound(chosenColor);
  animatePress(chosenColor);
}

function playSound(chosenColor){
  var buttonAudio = new Audio(`sounds/${chosenColor}.mp3`);
  buttonAudio.play();
}

function animatePress(currentColor){
  var currentBtn = $(`#${currentColor}`);
  currentBtn.addClass('pressed') ;
   //Remove the 'pressed' class after 100 milliseconds
  setTimeout(() => {
    currentBtn.removeClass('pressed') ;
  }, 100);
}








