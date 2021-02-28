var AppleLocations = {};

class Apple {
    constructor(){
        var width = document.body.clientWidth - 40;
        var height = document.documentElement.clientHeight - 40;
        this.coordinates = {
            x:(Math.floor(Math.random() * width) + 10).toString(),
            y:(Math.floor(Math.random() * height) - 10).toString(),
        };
        this.Appleimg = document.createElement("img");
        this.Appleimg.src = "C:/Users/wwwku/source/repos/Snake/Apple.png";
        this.Appleimg.style.position = "absolute";
        this.Appleimg.style.left = (this.coordinates.x + "px");
        this.Appleimg.style.top = (this.coordinates.y + "px");
        document.body.appendChild(this.Appleimg);
    }
}

