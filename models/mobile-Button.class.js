class MobileButton {
    constructor(x, y, width, height, text) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.text = text;
        this.animationCounter = 0;
        this.cornerRadius = 10;
    }


    isClicked(mouseX, mouseY) {
        return (
            mouseX >= this.x &&
            mouseX <= this.x + this.width &&
            mouseY >= this.y &&
            mouseY <= this.y + this.height
        );

    }


    draw(ctx) {
        this.backgroundForMobilePads(ctx)
        this.borderForMobilePads(ctx)
        this.textForMobilePads(ctx)
    }


    backgroundForMobilePads(ctx) {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.beginPath();
        ctx.arc(this.x + this.width / 2, this.y + this.height / 2, this.width / 2, 0, 2 * Math.PI);
        ctx.fill();
    }


    borderForMobilePads(ctx) {
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(this.x + this.width / 2, this.y + this.height / 2, this.width / 2, 0, 2 * Math.PI);
        ctx.stroke();
    }


    textForMobilePads(ctx) {
        ctx.fillStyle = 'black';
        ctx.font = '30px "zabars", Arial, Helvetica, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(this.text, this.x + this.width / 2, this.y + this.height / 2);
    }

}