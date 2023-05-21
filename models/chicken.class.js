class Chicken extends MovableObject {
  y = 365;
  height = 60;
  width = 50;

  minDistance = 50;
  randomNumber = Math.random();

  static lastX = 600;

  offset = {
    top: 25,
    left: 8,
    right: 8,
    bottom: 10
  }

  IMAGES_WALKING = [
    'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
    'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
    'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
  ]

  IMAGES_DEAD = [
    'img/3_enemies_chicken/chicken_normal/2_dead/dead.png',
  ]


  constructor() {
    super().loadImage("img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_DEAD);
    this.x = Chicken.lastX + this.minDistance + this.randomNumber * 500;
    Chicken.lastX = this.x; // Aktualisiere die letzte x-Koordinate
    this.speed = 0.15 + this.randomNumber * 0.5;
    this.animate();
  }


  animate() {
    world.timerManager.addInterval('chickenSmall', () => {
      this.moveLeft();
    }, 1000 / 60);
    setInterval(() => {
      if (this.isDead()) {
        this.playAnimation(this.IMAGES_DEAD);
        this.speed = 0
      } else {
        this.playAnimation(this.IMAGES_WALKING);
      }
    }, 60);
  }

}