class Coin extends MovableObject {
    width = 150;
    height = 150;
    y = 0;
    x = 400;

    static lastX = 0;

    offset = {
        top: 55,
        left: 55,
        right: 55,
        bottom: 55
    }

    IMAGES_COIN = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ]

    
    constructor() {
        super().loadImage('img/8_coin/coin_1.png')
        this.loadImages(this.IMAGES_COIN);
        this.x = this.x + Math.random() * 1000;
        this.y = 20 + Math.random() * 300;
        this.animate();
    }


    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_COIN);
        }, 400);
    }
}