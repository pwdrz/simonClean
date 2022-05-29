// Array of the four possible colors in the game

var buttonColours = ["red", "blue", "green", "yellow"];

// Array for gamePattern that will be filled each level

var gamePattern = [];

// Array for userPattern that is filled each level with user input and emptied if nextSequence gets triggered

var userClickedPattern = [];

// Creating a Level tracker that is incremented in nextSequence()

var level = 0;

// Function that picks a random color out of the buttonColours array and pushes them into the gamePattern array for ongoing sequence

function nextSequence() {
  userClickedPattern = [];
  level++;
  var randomNumber = Math.floor(Math.random() * 4);

  var randomChosenColour = buttonColours[randomNumber];

  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour)
    .fadeOut(100)
    .fadeIn(100);

  playSound(randomChosenColour);

  $("#level-title").text("Level " + level);
}

// Adding Event Listener with handler function to buttons and make them play sound

$(".btn").click(function () {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);

  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);
});

// Build a function for random picked / clicked colors

function playSound(name) {
  var sound = new Audio(
    "C:/Users/fgresbrand.D3S/Documents/Udemy/The Complete 2022 Web Development Bootcamp/Section 15 - Boss Level Challenge 2 - The Simon Game/Simon Game Challenge Starting Files/sounds/" +
      name +
      ".mp3"
  );
  sound.play();
}

// Animate the button press

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");

  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

// Detect function through keyboard press only once to start the game

var started = false;

$(document).keydown(function () {
  if (!started) {
    nextSequence();
    started = true;
  }
});

// Checking the User's Answer against the Game Sequence

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (gamePattern.length === userClickedPattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    // Game over

    var wrong = new Audio(
      "C:/Users/fgresbrand.D3S/Documents/Udemy/The Complete 2022 Web Development Bootcamp/Section 15 - Boss Level Challenge 2 - The Simon Game/Simon Game Challenge Starting Files/sounds/wrong.mp3"
    );
    wrong.play();
    console.log("gameOver");

    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    $("#level-title").text("Game over! Drücke eine Taste um es erneut zu versuchen!");

    startOver();
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
