/**
 * Class representing a timer manager to manage various timers.
 */
class TimerManager {
  /**
 * Creates an instance of TimerManager.
 */
  constructor() {
    this.timers = new Map(); // map to store the timers
    this.paused = false; // flag to determine if the game is paused or not
  }


  /**
   * Adds an interval timer to the timer manager.
   * @param {string} id - The ID of the timer.
   * @param {function} func - The function to execute on each interval.
   * @param {number} delay - The delay between each interval.
   */
  addInterval(id, func, delay) {
    this.addTimer(id, func, delay, true); // add the timer to the timer manager
  }


  /**
   * Adds an interval timer to the timer manager.
   * @param {string} id - The ID of the timer.
   * @param {function} func - The function to execute on each interval.
   * @param {number} delay - The delay between each interval.
   */
  addAnimationFrame(id, func) {
    const loop = (timestamp) => { // timestamp is the time in milliseconds since the start of the browser (requestAnimationFrame () is a function)
      if (!this.paused) { // if the game is not paused, execute the function
        func(timestamp); // execute function
      }
      this.timers.get(id) && requestAnimationFrame(loop); // if the timer is still in the timer manager, call the function again
    };
    requestAnimationFrame(loop); // call the function
    this.timers.set(id, loop); // add the timer to the timer manager
  }


  /**
   * Adds a timer to the timer manager.
   * @param {string} id - The ID of the timer.
   * @param {function} func - The function to execute on each interval.
   * @param {number} delay - The delay between each interval.
   * @param {boolean} isInterval - A flag to determine if the timer is an interval timer or not.
   */
  addTimer(id, func, delay, isInterval) { 
    let lastExecution = performance.now(); //  count the time in milliseconds since the start of the browser (performance.now () is a function)  
    const loop = (timestamp) => { // timestamp is the time in milliseconds since the start of the browser (requestAnimationFrame () is a function)
      if (!this.paused) { 
        const elapsed = timestamp - lastExecution; // milliseconds elapsed since lastExecution
        if (elapsed >= delay) { // check if enough time has elapsed
          func(); // execute function
          lastExecution = timestamp; // update lastExecution
          if (!isInterval) { // if not an interval timer, remove it from the timer manager
            this.timers.delete(id); // remove timer from timer manager
          }
        }
      }
      this.timers.get(id) && requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
    this.timers.set(id, loop); // add the timer to the timer manager
  }


  /**
   * Removes a timer from the timer manager.
   * @param {string} id - The ID of the timer to remove.
   */
  removeTimer(id) {
    this.timers.delete(id);
  }


  /**
   * Pauses all timers in the timer manager.
   */
  pauseAllTimers() {
    this.paused = true;
  }


  /**
   * Resumes all timers in the timer manager.
   */
  resumeAllTimers() {
    this.paused = false;
  }
}

