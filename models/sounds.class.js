class Sounds extends MovableObject {
    
    MAIN_SOUND = new Audio('audio/MAIN_SOUND.mp3');
    PICKUP_COIN = new Audio('audio/COIN.mp3')
    PICKUP_BOTTLE_SOUND = new Audio('audio/BOTTLE.mp3');
    THROW_SOUND = new Audio('audio/THROW.mp3')
    THROW_SOUND_TRUE = new Audio('audio/THROW_TRUE.mp3')
    THROW_SOUND_FALSE = new Audio('audio/THROW_FALSE.mp3')
    HIT_BOSS_SOUND = new Audio('audio/BOSS_HIT.mp3')
    BOSS_DEAD_SOUND = new Audio('audio/BOSS_DEAD.mp3')
    LOOSE_GAME_SOUND = new Audio('audio/LOOSE_GAME.mp3')
    CHICKEN_DEAD_SOUND = new Audio('audio/CHICKEN_DEAD.mp3')
    WIN_GAME_SOUND = new Audio('audio/WIN_GAME_SOUND.mp3')
    BUTTON_CLICK_SOUND = new Audio('audio/BUTTON_CLICK.mp3');
    BOSS_ATTACK_SOUND = new Audio('audio/BOSS_ATTACK.mp3')
    CHARACKTER_HURT_SOUND = new Audio('audio/CHARACKTER_HURT.mp3')
    WALKING_SOUND = new Audio('audio/WALKING.mp3')
    AFTER_JUMP = new Audio('audio/AFTER_JUMP.mp3')
    JUMP_BOUNCE = new Audio('audio/JUMP_BOUNCE.mp3')


    constructor() {
        super()
        this.sound = false
    }


    isSoundEnabled() {
        return this.sound;
    }


    playSound() {
      const mainSound = setInterval(() => {
            if (sound) {
                this.sound = true
                this.MAIN_SOUND.play();
            } else if (!sound) {
                this.sound = false
                this.stopSound()
                this.stopAnimation(mainSound)
            }
        }, 500);
    }


    stopSound() {
        this.sound = false
        sound = false
        this.MAIN_SOUND.pause(); // Pause the sound
        this.AFTER_JUMP.pause();
        this.WALKING_SOUND.pause();
        this.JUMP_BOUNCE.pause();
        this.CHARACKTER_HURT_SOUND.pause();
        this.BOSS_ATTACK_SOUND.pause();
        this.BUTTON_CLICK_SOUND.pause();
        this.HIT_BOSS_SOUND.pause();
        this.BOSS_DEAD_SOUND.pause();
        this.LOOSE_GAME_SOUND.pause();
        this.CHICKEN_DEAD_SOUND.pause();
        this.WIN_GAME_SOUND.pause();
        this.THROW_SOUND.pause();
        this.THROW_SOUND_TRUE.pause();
        this.THROW_SOUND_FALSE.pause();
        this.PICKUP_BOTTLE_SOUND.pause();
        this.PICKUP_COIN.pause();
    }

}
