class Score {
    
    localhighscore = localStorage.getItem('Highscore');

    constructor() {
        this.checkScoreLoop();
    }


    getLocalHighscore(score) {
        if (this.localhighscore === null) {
            score.innerHTML = "Your Highscore 0";
        } else {
            score.innerHTML = "Your Highscore" + "<br>" + this.localhighscore;
        }
    }


    checkScoreLoop() {
        let score = document.getElementById("highscore");
        this.getLocalHighscore(score)
        setInterval(() => {
            if (world.gameStarted) {
                this.getCurrentHighscore(score)
                if (this.newHighScore()) {
                    localStorage.setItem('Highscore', world.score);
                }
            }
        }, 300);
    }


    newHighScore() {
        return world.score > this.localhighscore && (world.character.isDead() || world.endboss.isDead())
    }


    getCurrentHighscore(score) {
        score.innerHTML = "Your Score " + "<br>" + world.score;
    }

}