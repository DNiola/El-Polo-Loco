class Character extends MovableObject {
  height = 280;
  y = 80;
  world;
  speed = 3;
  damage = 0;
  energy = 100;

  idle = true;
  longIdle = false;
  idleStartTime = 0;
  LONG_IDLE_DELAY = 5000;

  jumpingPhase = null;
  jumpAnimationInterval = null;

  offset = {
    top: 140,
    left: 26,
    right: 30,
    bottom: 27
  }

  IMAGES_WALKING = [
    'img/2_character_pepe/2_walk/W-21.png',
    'img/2_character_pepe/2_walk/W-22.png',
    'img/2_character_pepe/2_walk/W-23.png',
    'img/2_character_pepe/2_walk/W-24.png',
    'img/2_character_pepe/2_walk/W-25.png',
    'img/2_character_pepe/2_walk/W-26.png'
  ];

  IMAGES_JUMPING = [
    'img/2_character_pepe/3_jump/J-33.png',
    'img/2_character_pepe/3_jump/J-34.png',
    'img/2_character_pepe/3_jump/J-35.png',
    'img/2_character_pepe/3_jump/J-36.png',
    'img/2_character_pepe/3_jump/J-37.png',
    'img/2_character_pepe/3_jump/J-38.png'
  ]
  IMAGES_DEAD = [
    'img/2_character_pepe/5_dead/D-51.png',
    'img/2_character_pepe/5_dead/D-52.png',
    'img/2_character_pepe/5_dead/D-53.png',
    'img/2_character_pepe/5_dead/D-54.png',
    'img/2_character_pepe/5_dead/D-55.png',
    'img/2_character_pepe/5_dead/D-56.png'
  ]

  IMAGES_HURT = [
    'img/2_character_pepe/4_hurt/H-41.png',
    'img/2_character_pepe/4_hurt/H-42.png',
    'img/2_character_pepe/4_hurt/H-43.png'
  ]

  IMAGES_IDLE = [
    'img/2_character_pepe/1_idle/idle/I-1.png',
    'img/2_character_pepe/1_idle/idle/I-2.png',
    'img/2_character_pepe/1_idle/idle/I-3.png',
    'img/2_character_pepe/1_idle/idle/I-4.png',
    'img/2_character_pepe/1_idle/idle/I-5.png',
    'img/2_character_pepe/1_idle/idle/I-6.png',
    'img/2_character_pepe/1_idle/idle/I-7.png',
    'img/2_character_pepe/1_idle/idle/I-8.png',
    'img/2_character_pepe/1_idle/idle/I-9.png',
    'img/2_character_pepe/1_idle/idle/I-10.png'
  ]

  IMAGES_LONG_IDLE = [
    'img/2_character_pepe/1_idle/long_idle/I-11.png',
    'img/2_character_pepe/1_idle/long_idle/I-12.png',
    'img/2_character_pepe/1_idle/long_idle/I-13.png',
    'img/2_character_pepe/1_idle/long_idle/I-14.png',
    'img/2_character_pepe/1_idle/long_idle/I-15.png',
    'img/2_character_pepe/1_idle/long_idle/I-16.png',
    'img/2_character_pepe/1_idle/long_idle/I-17.png',
    'img/2_character_pepe/1_idle/long_idle/I-18.png',
    'img/2_character_pepe/1_idle/long_idle/I-19.png',
    'img/2_character_pepe/1_idle/long_idle/I-20.png'
  ]


  constructor(world) {
    super().loadImage('img/2_character_pepe/1_idle/idle/I-1.png');
    this.world = world;
    this.idleStartTime = Date.now();
    this.loadCharacterImages();
    this.applyGravity();
    this.gameIsStartet();
  }


  loadCharacterImages() {
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_JUMPING);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_IDLE);
    this.loadImages(this.IMAGES_LONG_IDLE);
  }


  gameIsStartet() {
    const start = setInterval(() => {
      if (world.gameStarted) {
        this.animate();
        this.chararcterAction();
        this.stopAnimation(start);
      }
    }, 500);
  }


  animate() {
    world.timerManager.addInterval('animate', () => {
      world.soundIcon.WALKING_SOUND.pause();
      this.idle = true;
      if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
        this.characterDirection(false);
      }
      if (this.world.keyboard.LEFT && this.x > 0) {
        this.characterDirection(true);
      }
      if (this.world.keyboard.SPACE && (!this.isAboveGround())) {
        this.characterJump();
      }
      if (this.idle) {
        this.characterIdle();
      } else {
        this.idleStartTime = Date.now();
        this.longIdle = false;
      }
      this.world.camera_x = -this.x + 200;
    }, 1000 / 120);
  }


  characterDirection(direction) {
    this.idle = false;
    this.otherDirection = direction;
    if (!this.isAboveGround()) {
      this.world.isSound(world.soundIcon.WALKING_SOUND);
    }
    if (direction) {
      this.moveLeft();
    } else {
      this.moveRight();
    }
  }


  characterJump() {
    this.idle = false;
    this.jump();
    if (world.soundIcon.isSoundEnabled()) {
      this.world.isSound(world.soundIcon.JUMP_BOUNCE);
      setTimeout(() => {
        this.world.isSound(world.soundIcon.AFTER_JUMP);
      }, 1000);
    }
  }


  characterIdle() {
    if (Date.now() - this.idleStartTime > this.LONG_IDLE_DELAY) {
      this.longIdle = true;
    } else {
      this.longIdle = false;
    }
  }


  chararcterAction() {
    this.stopAllAnimations();
    world.timerManager.addInterval('action', () => {
      if (this.isDead() || this.world.endboss.isDead()) {
        this.characterOrBossDead();
        return
      }
      else if (this.isHurt()) {
        this.playAnimation(this.IMAGES_HURT);
        this.world.isSound(world.soundIcon.CHARACKTER_HURT_SOUND);
      }
      else if (this.isAboveGround()) {
        this.characterIsInAir();
      }
      else {
        this.otherCharacterActions();
      }
    }, 1000 / 20);
  }


  characterIsInAir() {
    if (this.isAboveGround()) {
      this.startJumpAnimation();
    } else {
      this.endJumpAnimation();
    }
    this.jumpingPhase = 'begin';
  }


  endJumpAnimation() {
    this.loadImage("img/2_character_pepe/3_jump/J-38.png");
    setTimeout(() => {
      this.loadImage(this.IMAGES_IDLE[0]);
      this.jumpingPhase = null;
    }, 100);
  }


  startJumpAnimation() {
    if (this.speedY >= 0 && this.jumpingPhase === 'begin') {
      this.beginJumpAnimation();
    }
    if (this.speedY >= 0 && this.jumpingPhase === 'ascending') {
      this.ascendingJumpAnimation();
    }
    if (this.jumpingPhase === 'descending') {
      this.descendingJumpAnimation();
    }
  }


  beginJumpAnimation() {
    if (this.y >= 80) {
      this.loadImage('img/2_character_pepe/3_jump/J-33.png');
    } else if (this.y >= 15) {
      this.loadImage("img/2_character_pepe/3_jump/J-34.png");
    } else {
      this.loadImage("img/2_character_pepe/3_jump/J-36.png");
      this.jumpingPhase = 'ascending';
    }
  }


  ascendingJumpAnimation() {
    this.jumpingPhase = 'descending';
    this.loadImage("img/2_character_pepe/3_jump/J-35.png");
  }


  descendingJumpAnimation() {
    if (this.y <= -80) {
      this.loadImage("img/2_character_pepe/3_jump/J-37.png");
    } if (this.y <= -15) {
      this.loadImage("img/2_character_pepe/3_jump/J-36.png");
    }
  }


  otherCharacterActions() {
    if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
      this.playAnimation(this.IMAGES_WALKING);
    }
    else if (this.longIdle) {
      world.score -= 1;
      this.playAnimation(this.IMAGES_LONG_IDLE);
    }
    else if (this.idle) {
      this.playAnimation(this.IMAGES_IDLE);
    }
    if (this.world.keyboard.E) {
      this.idleStartTime = Date.now() + this.LONG_IDLE_DELAY / 10;
    }
  }


  characterOrBossDead() {
    if (this.isDead()) {
      this.collidiable = false;
      this.playAnimation(this.IMAGES_DEAD);
      this.playerDeadJump();
    }
    setTimeout(() => {
      world.stopAllAnimation();
    }, 300);
    reStartBtn()
  }


  playerDeadJump() {
    this.jump();
    setTimeout(() => {
      setInterval(() => {
        this.x += 1;
        this.y += 3;
      }, 1000 / 30);
    }, 300);
  }


  stopAllAnimations() {
    this.stopAnimation(this.action);
    this.stopAnimation(this.idle);
    this.stopAnimation(this.longIdle);
  }


  dontIdle() {
    this.intervalForIdle = 0;
    world.character.intervalForIdle = 0;
  }


  jump() {
    this.speedY = 30;
  }
}
