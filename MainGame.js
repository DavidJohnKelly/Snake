var Snake = [];

function GameStart() {
    var StartButton = document.getElementById("StartButton");
    StartButton.style.visibility = "hidden";

    Snake[0]=new SnakeSegment("head", 300, 100);
    Snake[1] = new SnakeSegment("body", 300, 100 - 46);
    Snake[2] = new SnakeSegment("body", 300, 100 - 92);
    Snake[3] = new SnakeSegment("body", 300, 100 - 92-46);
    Snake[4] = new SnakeSegment("tail", 300, 100 - 92 - 46-46);
    Snake[5] = new SnakeSegment("tail", 300, 100 - 92 - 46 - 46 - 46);
    GameLoop()
}

function GameLoop() {
    
    //Movement();
    Movement(); Movement(); Movement(); Movement(); Movement(); Movement(); Movement(); Movement(); Movement(); Movement(); Movement(); Movement(); Movement();

        //sleep(100);
    
}

function AddSegment() {
    Snake[Snake.length - 1].setType("body");
    var PreviousCoordinates = Snake[Snake.length - 1].getPosition();
    Snake[Snake.length] = new SnakeSegment("tail", PreviousCoordinates.x, PreviousCoordinates.y - 46)

}

function sleep(miliseconds) {
    var currentTime = new Date().getTime();
    while (currentTime + miliseconds >= new Date().getTime()) {
    }
}

function Movement() {
    var HeadPosition = Snake[0].getPosition();
    Snake[0].setPosition(HeadPosition.x, HeadPosition.y + 46);
    Snake[Snake.length - 1].setPosition(HeadPosition.x, HeadPosition.y);
    Snake[Snake.length - 1].setType("body");
    Snake.splice(1, 0, Snake[Snake.length - 1]);
    Snake.splice(Snake.length - 1, 1);

    Snake[Snake.length - 1].setType("tail");


}


