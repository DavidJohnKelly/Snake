var Snake = [];

function GameStart() {
    var StartButton = document.getElementById("StartButton");
    StartButton.style.visibility = "hidden";

    Snake[0]=new SnakeSegment("head", 300, 300);
    Snake[1]=new SnakeSegment("body", 300, 300 - 46);
    Snake[2]=new SnakeSegment("tail", 300, 300 - 92);
    Snake[3].setType("body");
    Snake[4] = new SnakeSegment("tail", 300, 300 - 92 - 46);
}

function GameLoop() {

}


