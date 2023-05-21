class Event extends MovableObject {

    constructor() {
        super()
        this.canvas = canvas;
        canvas.addEventListener('click', (event) => this.handleCanvasClick(event));
        this.ctx = canvas.getContext("2d");
    }

    mouseCoordinates(event, rect) {
        const scaleY = world.canvas.height / rect.height;
        const Y = (event.clientY - rect.top) * scaleY;
        const scaleX = world.canvas.width / rect.width;
        const X = (event.clientX - rect.left) * scaleX;
        return { X, Y }
    }


    handleCanvasClick(event) {
        event.preventDefault();
        world.isSound(world.soundIcon.BUTTON_CLICK_SOUND);
    }


    gameReadyForReset() {
        return ((world.character && world.character.isDead()) || (world.endboss && world.endboss.isDead()));
    }


    isTouchingButton(event, button) {
        if (button === undefined) {
            return
        }
        const rect = world.canvas.getBoundingClientRect();
        let mouse = this.mouseCoordinates(event, rect)
        return button.isClicked(mouse.X, mouse.Y);
    }


    handleButtonTouch(touch) {
        if (this.isTouchingButton(touch) && this.gameReadyForReset()) {
            world.resetGame();
        }
        if (!world.gameStarted && this.isTouchingButton(touch)) {
            world.startGame();
        }
        if (world.gameStarted) {
            this.setGamePadsForMobile(touch)
        }
    }


    setGamePadsForMobile(touch) {
        if (this.isTouchingButton(touch, world.jumpButton) && !world.character.isAboveGround()) {
            this.mobileCharacterJump();
        }
        if (this.isTouchingButton(touch, world.throwButton)) {
            world.keyboard.E = true;
        } else {
            world.keyboard.E = false;
        }
    }


    mobileCharacterJump() {
        world.keyboard.SPACE = true;
        setTimeout(() => {
            world.keyboard.SPACE = false;
        }, 50);
    }


    handleCanvasTouchStart(event) {
        for (let i = 0; i < event.touches.length; i++) {
            this.handleButtonTouch(event.touches[i]);
        }
    }


    makeTouchfieldBigger(button, touch) {
        if (touch === "true" && button === world.rightButton) {
            this.touchButtonSizeTrue(button, 80)
        }
        if (touch === "false" && button === world.rightButton) {
            this.touchButtonSizeFalse(button, 100)
        }
        if (touch === "true" && button === world.leftButton) {
            this.touchButtonSizeTrue(button, 10)
        }
        if (touch === "false" && button === world.leftButton) {
            this.touchButtonSizeFalse(button, 10)
        }
    }


    touchButtonSizeTrue(button, buttonPosiX) {
        button.width = 80;
        button.height = 90;
        button.x = buttonPosiX;
        button.y = 390;
    }


    touchButtonSizeFalse(button, buttonPosiX) {
        button.width = 60
        button.height = 70
        button.x = buttonPosiX;
        button.y = 405
    }


    handleCanvasTouchMove(event) {
        const touches = event.touches;
        const initialKeyboardState = this.getKeyboardState();
        this.makeTouchfieldBigger(world.rightButton, "false")
        this.makeTouchfieldBigger(world.leftButton, "false")
        this.playerTouchButtons(touches, initialKeyboardState)
        this.setStateToKeyboard(initialKeyboardState)
    }


    setStateToKeyboard(initialKeyboardState) {
        world.keyboard.RIGHT = initialKeyboardState.RIGHT;
        world.keyboard.LEFT = initialKeyboardState.LEFT;
        world.keyboard.E = initialKeyboardState.E;
    }


    playerTouchButtons(touches, initialKeyboardState) {
        for (let i = 0; i < touches.length; i++) {
            const touch = touches[i];
            if (this.isTouchingButton(touch, world.rightButton)) {
                initialKeyboardState.RIGHT = true;
                this.makeTouchfieldBigger(world.rightButton, "true")
            }
            if (this.isTouchingButton(touch, world.leftButton)) {
                initialKeyboardState.LEFT = true;
                this.makeTouchfieldBigger(world.leftButton, "true")
            }
            if (this.isTouchingButton(touch, world.throwButton)) {
                initialKeyboardState.E = true;
            }
        }
    }


    getKeyboardState() {
        return {
            RIGHT: false,
            LEFT: false,
            E: false,
            SPACE: false,
        };
    }


    handleCanvasTouchEnd(event) {
        event.preventDefault();
        const remainingTouches = event.touches;
        const initialKeyboardState = this.getKeyboardState();
        this.playerDontTouchButtons(remainingTouches, initialKeyboardState)
        this.setStateToKeyboard(initialKeyboardState)
    }


    playerDontTouchButtons(remainingTouches, initialKeyboardState) {
        for (let i = 0; i < remainingTouches.length; i++) {
            const touch = remainingTouches[i];
            if (this.isTouchingButton(touch, world.rightButton)) {
                initialKeyboardState.RIGHT = true;
            }
            if (this.isTouchingButton(touch, world.leftButton)) {
                initialKeyboardState.LEFT = true;
            }
            if (this.isTouchingButton(touch, world.throwButton)) {
                initialKeyboardState.E = true;
            }
        }
    }


    ifMobileVersion() {
        if (window.innerWidth > window.innerHeight && window.innerWidth < 930 && innerHeight < 500) {
            world.mobileVersion = true
            canvas.addEventListener('touchstart', (event) => this.handleCanvasTouchStart(event), { passive: true });
            canvas.addEventListener('touchend', (event) => this.handleCanvasTouchEnd(event));
            canvas.addEventListener('touchstart', (event) => this.handleCanvasTouchMove(event), { passive: true }); // with touchmove the buttons working better on mobile becose you dont need to 
        } else {
            world.mobileVersion = false
        }
    }
}


