class ThrowableObject extends MovableObject {

    bottleHit = false

    IMAGES_BOTTLE_ROTATION = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
    ]

    IMAGES_BOTTLE_HIT = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
    ]




    constructor(x, y) {
        super().loadImage('img/6_salsa_bottle/salsa_bottle.png')
        this.loadImages(this.IMAGES_BOTTLE_ROTATION)
        this.loadImages(this.IMAGES_BOTTLE_HIT)
        this.x = x
        this.y = y
        this.height = 80
        this.width = 60
        this.throw()
        this.animate()
    }


    throw() {
        let direction = this.getThrowDirection()
        this.setThrow()
        setInterval(() => {
            if (direction === "right") {
                this.x += 10
            }
            if (direction === "left") {
                this.x -= 10
            }
            if (this.bottleHit === false && this.y == 600) {
                world.isSound(world.soundIcon.THROW_SOUND_FALSE)
            }
        }, 25);
    }


    setThrow() {
        world.isSound(world.soundIcon.THROW_SOUND)
        this.speedY = 30
        this.applyGravity();
    }


    animate() {
        const bottleRotation = setInterval(() => {
            if (!this.bottleHit) {
                this.playAnimation(this.IMAGES_BOTTLE_ROTATION)
            }
            if (this.bottleHit) {
                this.bottleHitTrue()
                this.stopAnimation(bottleRotation)
            }
        }, Math.random() * 100);
    }


    bottleHitTrue() {
        this.animateSplash()
        world.isSound(world.soundIcon.THROW_SOUND_TRUE)
    }


    animateSplash() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_BOTTLE_HIT);
            this.x -= 10
        }, 120);
    }

}