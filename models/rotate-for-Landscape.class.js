class LandscapeIMG extends MovableObject {

    constructor() {
        super().loadImage('img/body/screen-rotate.png');
        this.x = 0;
        this.y = 0;
        this.width = canvas.width;
        this.height = canvas.height;
    }
}