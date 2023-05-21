/**
* Pauses the game by setting the character's idle state to true and stopping all animations.
*/
function gamePause() {
    if (world.gameStarted) {
        world.character.longIdle = false;
        world.character.idle = true;
        world.character.idleStartTime = 0;
        world.character.LONG_IDLE_DELAY = 50000000000; //  5000 = 5s  50000000000 = 50s in hours 13.88888888888889
        world.stopAllAnimation();
    }
}

/**
* Resumes the game by setting the character's idle state to false and resuming all animations.
*/
function gameResume() {
    if (world.gameStarted) {
        world.character.idle = true;
        world.character.longIdle = false;
        world.character.idleStartTime = 0;
        world.character.LONG_IDLE_DELAY = 5000;
        world.resumeAllAnimation()
    }
}


/**
* Sets the icons based on the proof provided (true/false).
* @param {string} divIdOn - The id of the div to be turned on.
* @param {string} divIdOff - The id of the div to be turned off.
* @param {boolean} proof - True/false value indicating which icon to show.
*/
function setIcons(divIdOn, divIdOff, proof) {
    let iconON = document.getElementById(divIdOn);
    let iconOff = document.getElementById(divIdOff);
    if (proof) {
        iconIsOn(iconON, iconOff);
    } else if (!proof) {
        iconIsOff(iconOff, iconON);
    }
}


/**
* Toggles the sound icons based on the proof provided (true/false).
* @param {string} divIdOn - The id of the sound on icon.
* @param {string} divIdOff - The id of the sound off icon.
* @param {boolean} proof - True/false value indicating whether to show the sound on or off icon.
*/
function toggleSoundIMGs(divIdOn, divIdOff, proof) {
    let soundOFFIcon = document.getElementById(divIdOn);
    let soundONIcon = document.getElementById(divIdOff);
    proofSoundIcon(proof, soundOFFIcon, soundONIcon)
    toggleSound()
    CLICK_AUDIO.play()
}


/**
* Shows the sound on or off icon based on the proof provided.
* @param {boolean} proof - True/false value indicating which icon to show.
* @param {Object} soundOFFIcon - The sound off icon.
* @param {Object} soundONIcon - The sound on icon.
*/
function proofSoundIcon(proof, soundOFFIcon, soundONIcon) {
    if (proof) {
        iconIsOn(soundONIcon, soundOFFIcon);
    } else if (!proof) {
        iconIsOff(soundOFFIcon, soundONIcon);
    }
}


/**
* Toggles the full screen icons based on the proof provided (true/false).
* @param {string} divIdOn - The id of the full screen off icon.
* @param {string} divIdOff - The id of the full screen on icon.
* @param {boolean} proof - True/false value indicating which icon to show.
*/
function toggleFullScreenIMGs(divIdOn, divIdOff, proof) {
    let fullScreenIconOFF = document.getElementById(divIdOn);
    let fullScreenIconOn = document.getElementById(divIdOff);
    proofFullscreenIcon(proof, fullScreenIconOFF, fullScreenIconOn)
    toggleProofFullscreen();
    CLICK_AUDIO.play()
}


/**
* Shows the full screen on or off icon based on the proof provided.
* @param {boolean} proof - True/false value indicating which icon to show.
* @param {Object} fullScreenIconOFF - The full screen off icon.
* @param {Object} fullScreenIconOn - The full screen on icon.
*/
function proofFullscreenIcon(proof, fullScreenIconOFF, fullScreenIconOn) {
    if (proof) {
        iconIsOff(fullScreenIconOFF, fullScreenIconOn);
    } else if (!proof) {
        iconIsOn(fullScreenIconOn, fullScreenIconOFF);
    }
}


/**
* Toggles the full screen state.
*/
function toggleProofFullscreen() {
    if (fullScreen) {
        fullScreen = false;
    } else if (!fullScreen) {
        fullScreen = true;
    }
    world.fullscreenIcon.toggleFullscreen();
}


/**
 * Toggles the sound state.
 */
function toggleSound() {
    if (sound) {
        sound = false;
    } else if (!sound) {
        sound = true;
    }
    world.soundIcon.playSound();
}


/**
* Toggles the icons based on the screen resolution.
*/
function toggleIconsForMobile() {
    let explaneContainer = document.getElementById("explane-container");
    let fullscreen = document.getElementById("fullscreenCountaier");
    let sound = document.getElementById("soundCountaier");
    let score = document.getElementById("highscoreContainer");
    let htp = document.getElementById("divHTP");
    proofIsMobile(explaneContainer, fullscreen, sound, score, htp)
}


/**
 * Checks if the screen resolution meets the criteria for mobile devices and toggles the icons accordingly.
 * @param {Element} explaneContainer - The explane container element to toggle visibility of.
 * @param {Element} fullscreen - The fullscreen container element to toggle visibility of.
 * @param {Element} sound - The sound container element to toggle visibility of.
 * @param {Element} score - The score container element to toggle visibility of.
 * @param {Element} htp - The how-to-play container element to toggle visibility of.
 */
function proofIsMobile(explaneContainer, fullscreen, sound, score, htp) {
    if (resolutionForMobile()) {
        const toggleIcons = setInterval(() => {
            if (resolutionForMobile()) {
                removeIconsCountainer(score, fullscreen, sound, htp, explaneContainer);
            } else {
                reSetIconsCountainer(score, fullscreen, sound, htp);
                clearInterval(toggleIcons);
            }
        }, 100);
    }
}


/**
 * Shows the restart button by removing the "d-none" class from the restart button element.
 */
function reStartBtn() {
    let restartButton = document.getElementById("restartButton");
    restartButton.classList.remove('d-none');
}


/**
 * Hides multiple icons by adding the "d-none" class to their corresponding elements.
 * @param {Object} score - The score element to be hidden.
 * @param {Object} fullscreen - The fullscreen element to be hidden.
 * @param {Object} sound - The sound element to be hidden.
 * @param {Object} htp - The htp element to be hidden.
 * @param {Object} explaneContainer - The explane container element to be hidden.
 */
function removeIconsCountainer(score, fullscreen, sound, htp, explaneContainer) {
    score.classList.add('d-none');
    fullscreen.classList.add('d-none');
    sound.classList.add('d-none');
    htp.classList.add('d-none');
    explaneContainer.classList.add('d-none');
}


/**
 * Shows multiple icons by removing the "d-none" class from their corresponding elements.
 * @param {Object} score - The score element to be shown.
 * @param {Object} fullscreen - The fullscreen element to be shown.
 * @param {Object} sound - The sound element to be shown.
 * @param {Object} htp - The htp element to be shown.
 */
function reSetIconsCountainer(score, fullscreen, sound, htp) {
    score.classList.remove('d-none');
    fullscreen.classList.remove('d-none');
    sound.classList.remove('d-none');
    htp.classList.remove('d-none');
}


/**
 * Sets the given icon to the "on" state by adding the "d-none" class to the "off" icon element
 * and removing the "d-none" class from the "on" icon element.
 * @param {Object} iconON - The "on" icon element.
 * @param {Object} iconOff - The "off" icon element.
 */
function iconIsOn(iconON, iconOff) {
    iconOff.classList.add('d-none');
    iconON.classList.remove('d-none');
}


/**
 * Sets the given icon to the "off" state by adding the "d-none" class to the "on" icon element
 * and removing the "d-none" class from the "off" icon element.
 * @param {Object} iconOff - The "off" icon element.
 * @param {Object} iconON - The "on" icon element.
 */
function iconIsOff(iconOff, iconON) {
    iconON.classList.add('d-none');
    iconOff.classList.remove('d-none');
}


/**
 * Checks whether the current screen resolution indicates that the user is on a mobile device.
 * @returns {boolean} True if the user is on a mobile device, false otherwise.
 */
function resolutionForMobile() {
    return window.innerWidth < window.innerHeight && window.innerWidth < 930 && innerHeight > 450
}
  

/**
 * Hides the start button by adding the "d-none" class to the start button element.
 */
function iconIsHidden() {
    let startButton = document.getElementById("startButton");
    startButton.classList.add('d-none');
}


/**
 * Listens for keydown events and updates the corresponding properties of the "keyboard" object
 * based on the event's key code.
 * @param {Object} event - The keydown event object.
 */
document.addEventListener('keydown', (event) => {
    switch (event.code) {
        case "KeyA":
            keyboard.LEFT = true
            break;
        case "ArrowLeft":
            keyboard.LEFT = true
            break;
        case "KeyD":
            keyboard.RIGHT = true
            break;
        case "ArrowRight":
            keyboard.RIGHT = true
            break;
        case "Space":
            keyboard.SPACE = true
            break;
        case "KeyE":
            keyboard.E = true
            break;
        default:
    }
});


document.addEventListener('keyup', (event) => {
    switch (event.code) {
        case "KeyA":
            keyboard.LEFT = false
            break;
        case "ArrowLeft":
            keyboard.LEFT = false
            break;
        case "KeyD":
            keyboard.RIGHT = false
            break;
        case "ArrowRight":
            keyboard.RIGHT = false
            break;
        case "Space":
            keyboard.SPACE = false
            break;
        case "KeyE":
            keyboard.E = false
            break;
        default:
    }
});