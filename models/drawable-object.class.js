class DrawableObject {
    x = 200;
    y = 275;
    height = 150;
    width = 100;

    img;
    imageCach = {};
    currentImage = 0;

    //loadImage('img/test.png);
    loadImage(path) {
        this.img = new Image(); //sowie : document.getElementById('image') <img id="image" src....>
        this.img.src = path;
    }


    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }


    drawFrame(ctx) {
        if (this.canDrawFrame()) {
            this.drawBlueBox(ctx)
            this.drawRedBox(ctx)
        }
    }

    // instance of Character, Chicken, Coin, Bottle, Endboss, ThrowableObject, ChickenSmall
    canDrawFrame() {
        return (this instanceof Character ||
            this instanceof Chicken ||
            this instanceof Coin ||
            this instanceof Bottle ||
            this instanceof Endboss ||
            this instanceof ThrowableObject ||
            this instanceof ChickenSmall)
    }

    drawBlueBox(ctx) {
        ctx.beginPath()
        ctx.lineWidth = '5'
        ctx.strokeStyle = 'blue'
        ctx.rect(this.x, this.y, this.width, this.height)
        ctx.stroke()
    }

    drawRedBox(ctx) {
        ctx.beginPath()
        ctx.lineWidth = '5'
        ctx.strokeStyle = 'red'
        ctx.rect(this.x + this.offset.left, this.y + this.offset.top, this.width - this.offset.left - this.offset.right, this.height - this.offset.top - this.offset.bottom)
        ctx.stroke()
    }

    /**
     * 
     * @param {Array} arr - [img/image1.pgn, img/image2.pgn, ....]
     */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image()
            img.src = path;
            img.style = 'transform: scaleX(-1)'
            this.imageCach[path] = img;
        })
    }

}




