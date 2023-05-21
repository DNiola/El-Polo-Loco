class Endboss extends MovableObject {
    y = 60;
    height = 400;
    width = 250;
    speed = 10;

    seeEnemy = false;
    toClose = false;
    bossAttack = false;

    otherDirection = false;
    bossState = false;

    offset = {
        top: 70,
        left: 40,
        right: 30,
        bottom: 80
    }

    IMAGES_ALERT = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png'
    ]

    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png'
    ]

    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png'
    ]

    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png'
    ]

    IMAGES_ATTACK = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png'
    ]


    constructor() {
        super().loadImage(this.IMAGES_ALERT[5]);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_ATTACK);
        this.x = 2550;
        this.animate();
    }


    animate() {
        world.timerManager.addInterval('endboss', () => {
            this.getBossState();
            this.setBossState();
        }, 120);
        world.timerManager.addInterval('moveBoss', () => {
            this.moveBoss();
        }, 120);
    }


    moveBoss() {
        if ((world.gameStarted == true) && this.seeEnemy == true && this.bossFixesCharakter() == false) {
            this.moveRight();
            this.otherDirection = true;
        }
    }


    getBossState() {
        if (this.isHurt()) {
            this.bossState = "hurt";
        } else if (this.bossWantsAttack() && this.bossAttack == true) {
            this.bossState = "attack";
        } else if (this.seeEnemy) {
            this.bossState = "seeEnemy";
        } else if (this.isToClose() && this.toClose) {
            this.bossState = "toClose";
        }
    }


    setBossState() {
        switch (this.bossState) {
            case "hurt":
                this.playAnimation(this.IMAGES_HURT);
                if (this.isDead()) {
                    this.playAnimation(this.IMAGES_DEAD);
                }
                break;
            case "attack":
                this.playAnimation(this.IMAGES_ATTACK);
                world.isSound(world.soundIcon.BOSS_ATTACK_SOUND);
                break;
            case "seeEnemy":
                this.playAnimation(this.IMAGES_WALKING);
                break;
            case "toClose":
                this.playAnimation(this.IMAGES_ALERT);
                this.setTrue();
                break;
        }
    }


    setTrue() {
        setTimeout(() => {
            this.seeEnemy = true;
        }, 800);
    }

}