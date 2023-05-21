class World {
  level = level1;
  backgroundObjects = canvas;
  ctx;
  keyboard;
  camera_x = 0;
  throwableObject = []

  score = 0;
  highScore = new Score();

  events = new Event(this);

  timerManager = new TimerManager();
  rotatePhoneIMG = new LandscapeIMG()

  soundIcon = new Sounds()
  fullscreenIcon = new FullScreenButton()

  healthBar = new StatusBar('HealthBar', 100, { x: 10, y: -10 });
  bottleBar = new StatusBar('BottleBar', 0, { x: 10, y: 35 });
  coinBar = new StatusBar('CoinBar', 0, { x: 10, y: 80 });
  endbossBar = new StatusBar('EndbossBar', 100, { x: 460, y: 50 });

  startAndEndScreens = new SectionScreen()

  leftButton = new MobileButton(10, 405, 60, 70, '<');
  rightButton = new MobileButton(90, 405, 60, 70, '>');
  throwButton = new MobileButton(560, 405, 60, 70, 'E');
  jumpButton = new MobileButton(650, 405, 60, 70, 'Jump');

  gameStarted = false;
  mobileVersion = false
  alertLandscape = false

  offset = {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  }

  constructor(canvas, keyboard) {
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.ctx = canvas.getContext("2d");
    this.animationFrameId = null;
    this.draw();
  }


  startGame() {
    world.gameStarted = true;
    this.character = new Character(this);
    this.setWorld();
    this.level.initLevel();
    this.endboss = new Endboss()
    this.startGameLoop();
    this.startCollisionDetectionLoop();
  }


  resetGame() {
    world.soundIcon.stopSound()
    world.gameStarted = false;
    Bottle.lastX = 400
    ChickenSmall.lastX = 400
    Chicken.lastX = 600
    keyboard = new Keyboard();
    world.highScore.checkScoreLoop()
    cancelAnimationFrame(this.animationFrameId);
    setNewWorld()
  }


  setWorld() {
    this.character.world = this
  }


  startGameLoop() {
    this.timerManager.addInterval('gameLoop', () => {
      if (this.gameStarted) {
        this.checkThrowableObject()
        this.checkHitEndboss()
        this.updateMobileVersionStatus()
      }
    }, 120);
  }


  updateMobileVersionStatus() {
    this.events.ifMobileVersion()
  }


  startCollisionDetectionLoop() {
    this.timerManager.addAnimationFrame('collisionDetection', () => {
      if (this.gameStarted) {
        this.checkCollectibleBottle()
        this.checkCollectibleCoin()
        this.checkCollisions()
        this.checkCollisionsFromTop();
        this.checkEndBossAttackCollisions()
      }
    });
  }


  checkCollisionsFromTop() {
    this.level.enemies.forEach((enemy) => {
      if (world.character.hitsFromTop(enemy) && world.character.checkDistanceToEnemy(enemy)) {
        enemy.hit("chicken");
      }
    });
  }


  checkCollisions() {
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy) && !this.checkCollisionsFromTop(enemy)) {
        this.character.hit("me");
        this.healthBar.setPercentage(this.character.energy);
      }
    });
  }


  checkThrowableObject() {
    if (this.keyboard.E && this.character.bottles > 0) {
      let bottle = new ThrowableObject(this.character.x, this.character.y + 100);
      this.throwableObject.push(bottle);
      this.character.bottles--;
      this.bottleBar.setPercentage((this.character.bottles / 5) * 100);
      world.score -= 20;
    }
  }


  checkCollectibleBottle() {
    this.level.bottles.forEach((bottle) => {
      if (this.character.isColliding(bottle)) {
        this.character.pickupObject('bottles')
        this.level.bottles = this.level.bottles.filter((c) => c !== bottle);  // Aktualisiere/filter die bottle-Liste des Levels
        this.bottleBar.setPercentage((this.character.bottles / 5) * 100);
        this.isSound(world.soundIcon.PICKUP_BOTTLE_SOUND)
        world.score += 10
      }
    });
  }


  checkCollectibleCoin() {
    this.level.coins.forEach((coin) => {
      if (this.character.isColliding(coin)) {
        this.character.pickupObject('coins');
        this.level.coins = this.level.coins.filter((c) => c !== coin); // Aktualisiere/filter die coins-Liste des Levels
        this.coinBar.setPercentage((this.character.coins / 5) * 100);
        this.isSound(world.soundIcon.PICKUP_COIN)
        world.score += 100
        world.character.damage += 1
      }
    });
  }


  checkHitEndboss() {
    this.throwableObject.forEach((bottle) => {
      if (world.endboss.isColliding(bottle)) {
        world.endboss.hit("boss");
        bottle.bottleHit = true
        world.endbossBar.setPercentage(world.endboss.energy);
      }
    });
  }


  checkEndBossAttackCollisions() {
    if (Array.isArray(world.endboss)) {// In diesem Fall wird Array.isArray(world.endboss) verwendet, um zu überprüfen, ob world.endboss ein Array ist
      this.handleMultipleEndbossAttacks()
    } else { // Wenn es kein Array ist
      this.handleSingleEndbossAttack()
    }
  }


  handleMultipleEndbossAttacks() {
    world.level.endboss.forEach((boss) => {
      if (this.character.isColliding(boss)) {
        this.character.hit("me")
        this.healthBar.setPercentage(this.character.energy)
      }
    });
  }


  handleSingleEndbossAttack() {
    const boss = world.endboss;
    if (this.character.isColliding(boss)) {
      this.character.hit("me")
      this.healthBar.setPercentage(this.character.energy)
    }
  }


  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    if (this.gameStarted) {
      this.drawGameObjects()
    } else if (!this.gameStarted) {
      this.drawStartScreen();
    } if (resolutionForMobile()) {
      this.addToMap(this.rotatePhoneIMG);
      this.stopGameByResolution()
    } if (!resolutionForMobile() && this.alertLandscape == true) {
      this.resumeGameByResolution()
    }
    this.selfDraw();
  }


  resumeGameByResolution() {
    this.showScoreDIV();
    if (this.gameStarted) {
      gameResume()
    }
  }


  stopGameByResolution() {
    this.hiddenScoreDIV();
    if (this.gameStarted) {
      gamePause()
    }
  }


  selfDraw() {
    let self = this;
    this.animationFrameId = requestAnimationFrame(function () {
      self.draw();
    });
  }


  drawGameObjects() {
    this.ctx.translate(this.camera_x, 0)
    this.drawItemsToMap();
    this.ctx.translate(-this.camera_x, 0)
  }


  drawItemsToMap() {
    this.addObjectsToMap(this.level.backgroundObjects);
    this.addObjectsToMap(this.level.coins);
    this.addObjectsToMap(this.level.clouds);
    this.addObjectsToMap(this.level.bottles);
    this.addObjectsToMap(this.level.enemies);
    this.ctx.translate(-this.camera_x, 0) // back//--fixed Items with camara_X --//
    this.drawFixedItemsToMap()
    this.ctx.translate(this.camera_x, 0) // forward //-- --//
    this.addToMap(world.endboss);
    this.addToMap(this.character);
    this.addObjectsToMap(this.throwableObject);
  }


  drawFixedItemsToMap() {
    this.drawStatusBar()
    if (world.endboss.seeEnemy) {
      this.addToMap(this.endbossBar);
    }
    if (this.mobileVersion) {
      this.drawForMobile()
    }
    if (world.character.isDead()) {
      this.drawEndScreen("loose")
    }
    if (world.endboss.isDead()) {
      this.drawEndScreen("win")
    }
  }


  drawStartScreen() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.addButtonsToMap()
    this.ctx.translate(-this.camera_x, 0)
    toggleIconsForMobile()
  }


  drawStatusBar() {
    this.addToMap(this.healthBar);
    this.addToMap(this.bottleBar);
    this.addToMap(this.coinBar);
  }


  drawForMobile() {
    this.addToMap(this.leftButton);
    this.addToMap(this.rightButton);
    this.addToMap(this.jumpButton);
    this.addToMap(this.throwButton);
  }


  drawEndScreen(status) {
    world.startAndEndScreens.gameFinish(status)
    this.addToMap(this.startAndEndScreens);
  }

  addButtonsToMap() {
    this.addToMap(this.startAndEndScreens);
  }


  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }


  addToMap(mo) {
    if (mo.otherDirection) {
      this.flipImage(mo)
    }
    mo.draw(this.ctx)
    if (mo.otherDirection) {
      this.flipImageBack(mo)
    }
  }


  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0)
    this.ctx.scale(-1, 1)
    mo.x = mo.x * -1
  }


  flipImageBack(mo) {
    mo.x = mo.x * -1
    this.ctx.restore()
  }


  async isSound(sound) {
    if (world.soundIcon.isSoundEnabled()) {
      await sound.play().catch((error) => {
        console.error("Error playing sound: ", error, (sound));
      });
    }
  }


  hiddenScoreDIV() {
    let fullscreen = document.getElementById("fullscreenCountaier");
    let sound = document.getElementById("soundCountaier");
    let htp = document.getElementById("divHTP");
    let htpExplane = document.getElementById("explane-container");
    let scoreDIV = document.getElementById("highscoreContainer");
    scoreDIV.classList.add("d-none");
    htp.classList.add("d-none");
    htpExplane.classList.add("d-none");
    fullscreen.classList.add("d-none");
    sound.classList.add("d-none");
    this.alertLandscape = true;
  }


  showScoreDIV() {
    let fullscreen = document.getElementById("fullscreenCountaier");
    let sound = document.getElementById("soundCountaier");
    let htp = document.getElementById("divHTP");
    let scoreDIV = document.getElementById("highscoreContainer");
    scoreDIV.classList.remove("d-none");
    htp.classList.remove("d-none");
    fullscreen.classList.remove("d-none");
    sound.classList.remove("d-none");
    this.alertLandscape = false
  }


  stopAllAnimation() {
    this.timerManager.pauseAllTimers(); // Verwendung des TimerManagers in der `stopAllAnimation()`-Funktion
  }


  resumeAllAnimation() {
    this.timerManager.resumeAllTimers(); // Verwendung des TimerManagers in der `playAllAnimation()`-Funktion
  }

}
