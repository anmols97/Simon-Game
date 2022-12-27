// $(document).on("click", function(){
//   alert("hello");
// })
var buttonColors = ["red","blue","green","yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

$(document).on("keypress",function(){
  if(!started){
    $("h1").text("Level "+ level);
    nextSequence();
    started = true;
  }
});

$(".btn").on("click", function(){
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  //console.log(userClickedPattern);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  //Calling checkanswer() to validate the gamepattern against the userclickedpattern
  //Call checkAnswer() after a user has clicked and chosen their answer, passing in the index of the last answer in the user's sequence.
  checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel){
  if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
    //console.log("true");
    if(userClickedPattern.length === gamePattern.length){
      setTimeout(function(){
        nextSequence();
      }, 1000);
    }
  }else{
    var sound = new Audio("sounds/wrong.mp3");
    sound.play();

    $("body").addClass("game-over");

    setTimeout(function(){
      $("body").removeClass("game-over");
    }, 200);

    $("h1").text("Game Over, Press Any Key to Restart");
    //console.log("false");
    startOver();
  }

}

function startOver(){
  level = 0;
  gamePattern = [];
  started = false;
}

function nextSequence(){
  userClickedPattern = [];

  level++;
  $("h1").text("Level "+ level);

  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  $("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);

}
//nextSequence();


function playSound(name) {

  var sound = new Audio("sounds/"+name+".mp3");
  sound.play();

}

function animatePress(currentColor){
  $("#"+currentColor).addClass("pressed");
  setTimeout(function(){
    $("#"+currentColor).removeClass("pressed");
  }, 100);
}


// $("#green").on("click",function(){
//   var sound = new Audio("sounds/green.mp3");
//   sound.play();
// });
