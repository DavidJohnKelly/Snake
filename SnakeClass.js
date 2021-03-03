class SnakeSegment {

    constructor(x, y,direction) {
        this.coordinates = {
            x: x,
            y: y,
        };
        
        this.direction = direction;    
        this.Image = document.createElement("img");
        this.Image.src = "C:/Users/wwwku/source/repos/Snake/Snake.png";
        this.Image.style.position = "absolute";
        this.Image.style.left = this.coordinates.x.toString() + "px";
        this.Image.style.top = this.coordinates.y.toString() + "px";
        document.body.appendChild(this.Image);
    };

    setPosition(xcoord, ycoord) {
        this.coordinates = {
            x: xcoord,
            y: ycoord,
        };
        this.Image.style.left = this.coordinates.x.toString() + "px";
        this.Image.style.top = this.coordinates.y.toString() + "px";        
    };

    getPosition() {
        return this.coordinates;
    }

    setDirection(Direction) {
        this.direction = Direction;
    }

    getDirection() {
        return this.direction;
    }

}




