class SnakeSegment {

    constructor(x, y,direction, type) {
        this.coordinates = {
            x: x,
            y: y,
        };
        
        this.direction = direction;    
        this.Image = document.createElement("img");
        this.Image.src = type+"Snake.png";
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
        if (isValidDirection(Direction, this.direction)) {
            console.log(Direction + "   " + this.direction);
            this.direction = Direction;
        }
    }

    getDirection() {
        return this.direction;
    }

    remove() {
        document.body.removeChild(this.Image);
    }

}

class Apple {
    constructor(xcoord, ycoord) {

        this.coordinates = {
            x: xcoord.toString(),
            y: ycoord.toString(),
        };
        this.Appleimg = document.createElement("img");
        this.Appleimg.src = "Apple.png";
        this.Appleimg.style.position = "absolute";
        this.Appleimg.style.left = (this.coordinates.x + "px");
        this.Appleimg.style.top = (this.coordinates.y + "px");
        document.body.appendChild(this.Appleimg);
    }

    getPosition() {
        return this.coordinates;
    }

    eaten() {
        this.Appleimg.style.visibility = "hidden";
        
    }
}




