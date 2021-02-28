var Snake = [];
var AppleList = [];
function GameStart() {
    var StartButton = document.getElementById("StartButton");
    StartButton.style.visibility = "hidden";

    Snake[0] = new SnakeSegment("head", (document.documentElement.clientWidth) / 2, (document.documentElement.scrollHeight) / 2);
    Snake[1] = new SnakeSegment("body", (document.documentElement.clientWidth) / 2, (document.documentElement.scrollHeight) / 2 - 46);
    Snake[2] = new SnakeSegment("tail", (document.documentElement.clientWidth) / 2, (document.documentElement.scrollHeight) / 2 -92);

    GameLoop()
}

function GameLoop() {
    var Dead = 0
    const loop = setInterval(function(){
        if(Dead) { return clearInterval(loop) }
        else{
            Movement();
        }
    },200)
    //}


}

function AddSegment() {
    Snake[Snake.length - 1].setType("body");
    var PreviousCoordinates = Snake[Snake.length - 1].getPosition();
    Snake[Snake.length] = new SnakeSegment("tail", PreviousCoordinates.x, PreviousCoordinates.y - 46)

}



function Movement() {
    var HeadPosition = Snake[0].getPosition();
    Snake[0].setPosition(HeadPosition.x, HeadPosition.y + 46); // Increments the position of the head of the snake
    Snake[Snake.length - 1].setPosition(HeadPosition.x, HeadPosition.y); // Moves the tail piece to where the head was
    Snake[Snake.length - 1].setType("body"); // Alters the tail piece to become a body segment
    Snake.splice(1, 0, Snake[Snake.length - 1]); // Adds the altered tail piece in the list between the head and first body connection
    Snake.splice(Snake.length - 1, 1); // Deletes the initial tail piece from the list
    Snake[Snake.length - 1].setType("tail"); // Alters the now final item in the list (body) to be a tail
    

}

function SpawnApple() {
    if (AppleList.length = 0) {
        AppleList[0] = new Apple;
    } else {
        AppleList[AppleList.length - 1] = new Apple;
    }
}


