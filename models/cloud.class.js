class Cloud extends MovableObject {
  y = 0;
  width = 500;
  height = 250;
  speed = 0.5;

  static lastX = 0;
  static imageIndex = 0;

  static images = [
    "img/5_background/layers/4_clouds/1.png",
    "img/5_background/layers/4_clouds/2.png"
  ];


  constructor() {
    super().loadImage(Cloud.getNextImagePath());
    this.x = Cloud.lastX;
    Cloud.lastX += 450;
    this.y = Math.random() + 20;
    this.animate();
  }


  static getNextImagePath() {
    const imagePath = Cloud.images[Cloud.imageIndex];
    Cloud.imageIndex = (Cloud.imageIndex + 1) % Cloud.images.length;
    return imagePath;
  }


  animate() {
    setInterval(() => {
      this.moveLeft();
      if (this.x + this.width <= 0) {
        this.x = Cloud.lastX;
        this.loadImage(Cloud.getNextImagePath());
      }
    }, 1000 / 60);
  }
  
}

