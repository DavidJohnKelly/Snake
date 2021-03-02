class SnakeSegment {

    constructor(x, y,rotation) {
        this.coordinates = {
            x: x,
            y: y,
        };
        
        this.rotation = rotation;    
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
        this.Image.style.transform = "rotate(" + this.rotation + "deg)";
        
    };

    getPosition() {
        return this.coordinates;
    }

    setRotation(RotationDeg) {
        this.rotation = RotationDeg;
    }

    getRotation() {
        return this.rotation;
    }

}




