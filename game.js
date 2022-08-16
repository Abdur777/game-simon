var userClickedPattern = [];
var gamePattern=[];
var buttonColours= ["red","blue","green","yellow"];
var randomNumber;
var level = 0;
var randomChosenColour;
function nextSequence(){
    randomNumber = Math.floor(Math.random()*4);
    randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    console.log(randomNumber);
    $("#"+randomChosenColour).fadeOut(50).fadeIn(50);
    $("h1").text("Level "+level);
    level++;
}
$("#"+randomChosenColour).click(function(){
    $("#"+randomChosenColour).fadeOut(50).fadeIn(50);
    playSound(randomChosenColour);
});
var userChosenColour;
$(".btn").click(function handler(event){
    userChosenColour = event.target.id;
    userClickedPattern.push(userChosenColour);
    console.log(userClickedPattern);
    playSound(event.target.id);
    animatePress(event.target.id);
    checkAnswer(userClickedPattern.length);
});
function playSound(name){
   switch(name){
       case "green":
        var greens = new Audio("sounds/green.mp3");
        greens.play();
        break;
       case "red":
        var reds = new Audio("sounds/red.mp3");
        reds.play();
        break;
       case "blue":
        var blues = new Audio("sounds/blue.mp3");
        blues.play();
        break;
       case "yellow":
        var yellows = new Audio("sounds/yellow.mp3");
        yellows.play();
        break;
       default:
        break;
   }
}
function animatePress(currentColour){
    var activebutton = $("#"+currentColour);
    activebutton.addClass("pressed");
    setTimeout(function() {
        activebutton.removeClass("pressed");
    },100);
}
var start = 0;
$(document).keydown(function(){
    if(start===0)
    {nextSequence();
    start++;}
});
 
function checkAnswer(currentLevel){
  if(gamePattern[currentLevel-1]===userClickedPattern[currentLevel-1])
  {
      if(gamePattern.length===userClickedPattern.length)
      {
          userClickedPattern = [];
          setTimeout(function() {
            nextSequence();
        },1000);
      }
  }
  else
  {
    var wrongs = new Audio("sounds/wrong.mp3");
    wrongs.play(); 
    $(document.body).addClass("game-over");
      setTimeout(function() {
        $(document.body).removeClass("game-over");;
    },200);
    $("h1").text("Game Over, Press Any Key to Restart");
    start=0; 
    level=0;
    gamePattern = [];
    userClickedPattern = [];
  }
}
