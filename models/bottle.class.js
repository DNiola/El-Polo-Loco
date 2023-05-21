class Bottle extends MovableObject {
    y = 305;
    width = 50;
    height = 100;
    
    static lastX = 400;
    static imageIndex = 0;
    static images = [
        "img/6_salsa_bottle/1_salsa_bottle_on_ground.png",
        "img/6_salsa_bottle/2_salsa_bottle_on_ground.png"
    ];


    offset = {
        top: 23,
        left: 20,
        right: 10,
        bottom: 10
      }


    constructor() {
        super().loadImage(Bottle.getNextImagePath());
        this.x = Bottle.lastX
        Bottle.lastX += Math.random() * 650;
        this.y = this.y + Math.random() + 20;
    }


    static getNextImagePath() {
        const imagePath = Bottle.images[Bottle.imageIndex];
        Bottle.imageIndex = (Bottle.imageIndex + 1) % Bottle.images.length;
        return imagePath;
    }
    
}