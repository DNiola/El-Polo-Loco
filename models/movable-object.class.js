class MovableObject extends DrawableObject {
  speed = 0.15;
  speedY = 0;
  acceleration = 2.5;
  energy = 100;
  lastHit = 0;
  bottles = 0;
  coins = 0;
  intervalForIdle = 0;

  currentImage = 0;

  collidiable = true;
  otherDirection = false;

  offset = {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  }


  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 25);
  }


  isAboveGround() {
    if (this instanceof ThrowableObject) { // ThrowableObject falling under the map // this.y is undesfiend
      return true;
    } else {
      return this.y < 140
    }
  }


  // is obj.a Colliding with obj.b
  isColliding(mo) {
    if (mo.collidiable) {
      return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
        this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
        this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
        this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;
    }
  }


  /**
   * formel from GPT
   * @param {} mo 
   * @returns 
   * is obj.a Colliding with obj.b from the top 
   */
  hitsFromTop(mo) {
    const characterCollisionWidthRatio = 0.0;
    const characterCollisionWidth = this.width * characterCollisionWidthRatio;
    const verticalTolerance = -0; // Anpassen, um die Empfindlichkeit der Kollisionserkennung zu steuern
    return this.y + this.height - this.offset.bottom <= mo.y + mo.offset.top + verticalTolerance &&
      this.speedY < -25 &&
      this.x + this.width - this.offset.right - characterCollisionWidth / 2 > mo.x + mo.offset.left &&
      this.x + this.offset.left + characterCollisionWidth / 2 < mo.x + mo.width - mo.offset.right;
  }


  checkDistanceToEnemy(enemy) {
    let playerY = world.character.y;
    let chickenY = enemy.y;
    let heightDifference = Math.abs(playerY - chickenY);
    if (heightDifference <= 250) {
      return true;
    } else {
      return false;
    }
  }


  pickupObject(object) {
    if (object === "bottles") {
      this.bottles++;
    } else if (object === "coins") {
      this.coins++;
    }
  }


  //hit by object 
  hit(object) {
    if (object === "me") {
      if (world.endboss.energy <= 0 || world.character.energy <= 0) {
        return
      }
      this.hitCharacter();
    } else if (object === "chicken") {
      this.hitChicken();
    } else if (object === "boss") {
      this.hitEndBoss();
    }
  }


  hitCharacter() {
    world.score -= 1;
    this.energy -= 0.5;
    if (this.energy === 0) {
      this.characterDead();
    } else {
      this.lastHit = new Date().getTime();
    }
  }


  hitChicken() {
    this.energy -= 100;
    if (this.energy === 0) {
      this.chickenDead();
    } else {
      this.lastHit = new Date().getTime();
    }
  }


  hitEndBoss() {
    this.energy -= world.character.damage;
    world.isSound(world.soundIcon.HIT_BOSS_SOUND);
    if (this.energy === 0) {
      this.endbossDead();
    } else {
      this.lastHit = new Date().getTime();
    }
  }


  characterDead() {
    this.loadImage(this.IMAGES_DEAD[5]);
    world.score -= 50;
    this.energy = -1;
    keyboard--;
    this.speed = 0;
    world.isSound(world.soundIcon.LOOSE_GAME_SOUND);
  }


  chickenDead() {
    world.score -= 10;
    this.energy = -1;
    this.collidiable = false;
    world.isSound(world.soundIcon.CHICKEN_DEAD_SOUND);
  }


  endbossDead() {
    this.energy = -1;
    keyboard--;
    world.character.speed = 0;
    world.character.speedY = 0;
    this.collidiable = false;
    world.endboss.speed = 0;
    world.isSound(world.soundIcon.BOSS_DEAD_SOUND);
    world.isSound(world.soundIcon.WIN_GAME_SOUND);
    world.soundIcon.BOSS_ATTACK_SOUND.pause();
    world.score += 529;
  }


  isDead() {
    return this.energy <= 0;
  }


  isHurt() {
    let timepassed = new Date().getTime() - this.lastHit; // difference in ms
    timepassed = timepassed / 1000; // difference in s
    let isHurt = timepassed < 0.5;
    return isHurt;
  }


  isToClose() {
    if (!world || !world.character) {
      return false;
    }
    if (this.x - world.character.x < 510) {
      this.toClose = true;
      return true;
    }
  }
  

  bossWantsAttack() {
    if (!world || !world.character) {
      return false;
    }
    if (world.endboss.x - world.character.x < 150) {
      this.bossAttack = true;
      return true;
    }
  }


  bossFixesCharakter() {
    if (this.x - world.character.x >= -80) {
      this.moveLeft();
      this.otherDirection = false;
    } else {
      this.otherDirection = true;
      return false;
    }
  }


  moveRight() {
    this.x += this.speed;
  }


  moveLeft() {
    this.x -= this.speed;
  }


  playAnimation(images) {
    let i = this.currentImage % images.length; //let i = 0 % 6 = 0, Rest 0 // 1 = 0, 1, 2, 3, 4, 5, 6, 0, 1 usw...
    let path = images[i];
    this.img = this.imageCach[path];
    this.currentImage++;
  }


  stopAnimation(interval) {
    setTimeout(() => {
      clearInterval(interval);
    }, 300);
  }


  isIdle() {
    if (this.isHurt() || this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
      this.dontIdle();
      return false
    }
    if (this.intervalForIdle >= 1) {
      this.dontIdle();
      return true;
    } else {
      this.intervalForIdle++;
      false;
    }
  }


  getThrowDirection() {
    if (!world.character.otherDirection) {
      return "right";
    }
    if (world.character.otherDirection) {
      return "left";
    } else {
      return false;
    }
  }

}
