let canvas;
let world;
let keyboard = new Keyboard();
let sound = false
let fullScreen = false
let CLICK_AUDIO = new Audio('audio/BUTTON_CLICK.mp3');

let a = 2
let b = 4
function tester1() {
  addTester('tester', (nameVonNeueFunc) => {
    c = a + b
    console.log(c)
  }, "1231231");
}

function addTester(d,f,g) {
  console.log(d,f,g)
}
/**
 * Initializes the game by setting up the canvas and world.
 */
function init() {
  setNewWorld();
}


/**
 * Sets up the canvas and creates a new instance of World class.
 */
function setNewWorld() {
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);
  setIcons('soundON', 'soundOFF', sound);
  setIcons('fullscreenClose', 'fullscreenOpen', fullScreen);
  hiddenIconsByStartedGame();
}


/**
 * Hides icons that should not be displayed when the game starts.
 */
function hiddenIconsByStartedGame() {
  const soundLoop = setInterval(() => {
    if (!world.gameStarted) {
      switchStartAndRestartBtns()
      return;
    } else if (world.gameStarted) {
      iconIsHidden();
      clearInterval(soundLoop);
    }
  }, 100);
}


/**
 * Switches the visibility of start and restart buttons.
 */
function switchStartAndRestartBtns() {
  let startButton = document.getElementById("startButton");
  startButton.classList.remove('d-none');
  let restartButton = document.getElementById("restartButton");
  restartButton.classList.add('d-none');
}


/**
 * Starts the game and plays a click sound.
 */
function start() {
  world.startGame()
  CLICK_AUDIO.play()
}


/**
 * Resets the game and plays a click sound.
 */
function reStart() {
  world.resetGame()
  CLICK_AUDIO.play()
}


/**
 * Closes the "How to play" explanation and resumes the game.
 */
function closeHTP() {
  let explain = document.getElementById("explane-container");
  explain.classList.add('d-none');
  gameResume()
  CLICK_AUDIO.play()
}


/**
 * Opens the "How to play" explanation and pauses the game.
 */
function openHTP() {
  let explain = document.getElementById("explane-container");
  explain.classList.remove('d-none');
  gamePause()
  CLICK_AUDIO.play()
}
