class StatusBar extends DrawableObject {
    constructor(type, value, position) {
        super();
        this.type = type;
        this.value = value;
        this.x = position.x;
        this.y = position.y;
        this.width = 250;
        this.height = 60;

        this.IMAGES = {
            'BottleBar': [
                'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png', // 0 (this.IMAGES[this.resolveImageIndex()])
                'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/20.png', // 1 (this.IMAGES[this.resolveImageIndex()])
                'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/40.png', // 2 (this.IMAGES[this.resolveImageIndex()])
                'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/60.png', // 3 (this.IMAGES[this.resolveImageIndex()])
                'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/80.png', // 4 (this.IMAGES[this.resolveImageIndex()])
                'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/100.png', // 5 (this.IMAGES[this.resolveImageIndex()])

            ],
            'CoinBar': [
                'img/7_statusbars/1_statusbar/1_statusbar_coin/green/0.png', // 0 (this.IMAGES[this.resolveImageIndex()])
                'img/7_statusbars/1_statusbar/1_statusbar_coin/green/20.png', // 1 (this.IMAGES[this.resolveImageIndex()])
                'img/7_statusbars/1_statusbar/1_statusbar_coin/green/40.png', // 2 (this.IMAGES[this.resolveImageIndex()])
                'img/7_statusbars/1_statusbar/1_statusbar_coin/green/60.png', // 3 (this.IMAGES[this.resolveImageIndex()])
                'img/7_statusbars/1_statusbar/1_statusbar_coin/green/80.png', // 4 (this.IMAGES[this.resolveImageIndex()])
                'img/7_statusbars/1_statusbar/1_statusbar_coin/green/100.png', // 5 (this.IMAGES[this.resolveImageIndex()])

            ],
            'EndbossBar': [
                'img/7_statusbars/2_statusbar_endboss/0.png',
                'img/7_statusbars/2_statusbar_endboss/20.png',
                'img/7_statusbars/2_statusbar_endboss/40.png',
                'img/7_statusbars/2_statusbar_endboss/60.png',
                'img/7_statusbars/2_statusbar_endboss/80.png',
                'img/7_statusbars/2_statusbar_endboss/100.png',
            ],
            'HealthBar': [
                'img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png', // 0 (this.IMAGES[this.resolveImageIndex()])
                'img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png',
                'img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png',
                'img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',
                'img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
                'img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png' // 5 (this.IMAGES[this.resolveImageIndex()])

            ]
        };
        this.loadImages(this.IMAGES[this.type]);
        this.setPercentage(this.value);
    }

    setPercentage(value) {
        this.value = value;
        let path = this.IMAGES[this.type][this.resolveImageIndex(value)];
        this.img = this.imageCach[path];
    }

    resolveImageIndex(percentage) {
        if (percentage == 100) {
            return 5;
        } else if (percentage > 79) {
            return 4;
        }
        else if (percentage > 59) {
            return 3;
        }
        else if (percentage > 39) {
            return 2;
        }
        else if (percentage > 1) {
            return 1;
        }
        else {
            return 0;
        }
    }
}
