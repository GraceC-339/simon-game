var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var level = 0;

// Use jQuery to detect keyboard key press and call nextSequence()
// create a variable to track whether the game has started
var started = false;
$(document).keypress(function () {
  if (!started) {
    $("#level-title").text("Level" + level);
    nextSequence();
    started = true;
  }
});

// create a new function called nextSequence
function nextSequence() {
  // reset userClickedPattern once this funciton is triggered
  userClickedPattern = [];

  level++;
  $("#level-title").text("Level " + level);
  // generate a new random number between 0 and 3
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  // add the random colour to the game pattern
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChosenColour);

  // check
  console.log("gamePattern:" + gamePattern);
}

//add an event listener to the buttons, update the userClickedPattern
$(".btn").click(function () {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);

  //check
  console.log("UserClickedPattern" + userClickedPattern);
});

// check the answers
function checkAnswer(currentColour) {
  if (gamePattern[currentColour] === userClickedPattern[currentColour]) {
    console.log("success");

    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("wrong");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

// Start over function
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}

// Function to play sound
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// Function to add animations to user clicks
function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}
