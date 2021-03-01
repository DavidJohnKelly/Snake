class Apple {
    constructor(xcoord,ycoord){

        this.coordinates = {
            x: xcoord.toString(),
            y: ycoord.toString(),
        };
        this.Appleimg = document.createElement("img");
        this.Appleimg.src = "C:/Users/wwwku/source/repos/Snake/Apple.png";
        this.Appleimg.style.position = "absolute";
        this.Appleimg.style.left = (this.coordinates.x + "px");
        this.Appleimg.style.top = (this.coordinates.y + "px");
        document.body.appendChild(this.Appleimg);
    }

    getPosition(){
        return this.coordinates;
    }   

    eaten() {
        this.Appleimg.style.visibility = "hidden";
        Score++;
    }
}

