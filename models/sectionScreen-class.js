class SectionScreen extends MovableObject {

    CANVAS_STATUS_IMG = [
        'img/9_intro_outro_screens/start/startscreen_1.png',
        'img/9_intro_outro_screens/game_over/oh no you lost!.png',
        'img/9_intro_outro_screens/game_over/you_win.png'
    ]

    status = false

    constructor() {
        super()
        this.x = 0;
        this.y = 0;
        this.width = canvas.width;
        this.height = canvas.height;
        this.gameFinish()
    }


    gameFinish(status) {
        if (status === "loose") {
            this.loadImage(this.CANVAS_STATUS_IMG[1])
        } else if (status === "win") {
            this.loadImage(this.CANVAS_STATUS_IMG[2])
        }
        if (!this.status) {
            this.loadImage(this.CANVAS_STATUS_IMG[0]);
            this.status = true
        }
    }
}
