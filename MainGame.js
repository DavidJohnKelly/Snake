//Using multiple local copies of the width and height variables to allow for window resizing
var Snake = [];
var Apple_Location_Dictionary = { // O(1) coordinate lookup!

};
var Snake_Location_Dictionary = { // O(1) coordinate lookup!

};
var Score = 0;
var Dead = 0

function GameStart() {

    document.documentElement.style.overflow = "hidden"; //Disables the scroll bars
    document.body.scroll = "no";
    var StartButton = document.getElementById("StartButton");
    StartButton.style.visibility = "hidden";
    //Using grid system of 45 x 45 px
    var width = Math.round(((document.documentElement.clientWidth) / 2) / 45) * 45
    var height = Math.round(((document.documentElement.scrollHeight) / 2) / 45) * 45
    Snake[0] = new SnakeSegment(width, height, "down"); // Head can't collide with itself so no need to add to dictionary
    Snake[1] = new SnakeSegment(width, Math.round(((document.documentElement.scrollHeight) / 2) / 45) * 45 - 45, "down");
    Snake_Location_Dictionary[width.toString() + ":" + (height - 45).toString()] = 1;
    Snake[2] = new SnakeSegment(width, height - 90, "down");
    Snake_Location_Dictionary[width.toString() + ":" + (height - 90).toString()] = 1;
    GameLoop()
}

function GameLoop() {

    const snakeloop = setInterval(function () {
        if (Dead) {
            alert("You died! Score: " + Score.toString());
            clearInterval(snakeloop);
            window.location.reload();
        } else {
            Movement();

        }
    }, 200) // New Snake movement every 0.2 seconds initially (5 fps)

    document.addEventListener("keydown", function (press) {
        var SnakeDirection = Snake[0].getDirection();
        var KeyPressed = press.code;

        if (KeyPressed == "KeyA" && SnakeDirection !=="right") {
            //Left
            Snake[0].setDirection("left");
        };

        if (KeyPressed == "KeyW" && SnakeDirection !== "down") {
            //Up
            Snake[0].setDirection("up");
        };

        if (KeyPressed == "KeyD" && SnakeDirection !== "left") {
            //Right
            Snake[0].setDirection("right");
        };

        if (KeyPressed == "KeyS" && SnakeDirection !== "up") {
            //Down
            Snake[0].setDirection("down");
        };
    });

    const appleloop = setInterval(function () {
        if (Dead) {
            return clearInterval(appleloop)
        } else {
            SpawnApple();

        };
    }, 5000) // Apple spawns every 5 seconds

}

function AddSegment() { //Adds a new body segment to the snake
    var SnakeTailDirection = Snake[Snake.length - 1].getDirection();
    var PreviousCoordinates = Snake[Snake.length - 1].getPosition();
    if (SnakeTailDirection == "up") { //Adds the new segment below the tail piece
        Snake[Snake.length] = new SnakeSegment(PreviousCoordinates.x, PreviousCoordinates.y + 45, SnakeTailDirection);
        Snake_Location_Dictionary[PreviousCoordinates.x + ":" + (PreviousCoordinates.y + 45).toString()] = 1;
    } else if (SnakeTailDirection == "left") { //Adds the new segment to the right of the tail piece
        Snake[Snake.length] = new SnakeSegment(PreviousCoordinates.x + 45, PreviousCoordinates.y, SnakeTailDirection);
        Snake_Location_Dictionary[(PreviousCoordinates.x + 45).toString() + ":" + (PreviousCoordinates.y).toString()] = 1;

    } else if (SnakeTailDirection == "right") { //Adds the new segment to the left of the tail piece
        Snake[Snake.length] = new SnakeSegment(PreviousCoordinates.x - 45, PreviousCoordinates.y, SnakeTailDirection);
        Snake_Location_Dictionary[(PreviousCoordinates.x - 45).toString() + ":" + (PreviousCoordinates.y).toString()] = 1;

    } else if (SnakeTailDirection == "down") { //Adds the new segment above the tail piece
        Snake[Snake.length] = new SnakeSegment(PreviousCoordinates.x, PreviousCoordinates.y - 45, SnakeTailDirection);
        Snake_Location_Dictionary[(PreviousCoordinates.x) + ":" + (PreviousCoordinates.y - 45).toString()] = 1;

    }
}

function Movement() {

    var width = Math.round(document.body.clientWidth / 45) * 45;
    var height = Math.round(document.documentElement.clientHeight / 45) * 45;

    var HeadDirection = Snake[0].getDirection();
    var HeadPosition = Snake[0].getPosition();
    var TailPosition = Snake[Snake.length - 1].getPosition();
    Snake.splice(1, 0, Snake[Snake.length - 1]); // Adds the altered tail piece in the list between the head and first body connection
    Snake[1].setDirection(HeadDirection);
    Snake[1].setPosition(HeadPosition.x, HeadPosition.y); // Moves the tail piece to where the head was
    Snake.splice(Snake.length - 1, 1); // Deletes the initial tail piece from the list
    delete Snake_Location_Dictionary[TailPosition.x + ":" + TailPosition.y]; // Removes the location of the tail from the location dictionary
    Snake_Location_Dictionary[HeadPosition.x + ":" + HeadPosition.y] = 1; // Updates the dictionary with the new location of the tail piece

    if (HeadDirection == "up") {
        Snake[0].setPosition(HeadPosition.x, HeadPosition.y - 45); // Increments the position of the head of the snake up
        HeadPosition = Snake[0].getPosition();

        if (HeadPosition.y < 0) { //Checks if segment is off screen, loops on other side if it is
            Snake[0].setPosition(HeadPosition.x, height);
        }
    };
    if (HeadDirection == "left") {
        Snake[0].setPosition(HeadPosition.x - 45, HeadPosition.y); // Increments the position of the head of the snake left
        HeadPosition = Snake[0].getPosition();
        if (HeadPosition.x < 0) { //Checks if segment is off screen, loops on other side if it is
            Snake[0].setPosition(width, HeadPosition.y);
        }
    };

    if (HeadDirection == "right") {
        Snake[0].setPosition(HeadPosition.x + 45, HeadPosition.y); // Increments the position of the head of the snake right
        HeadPosition = Snake[0].getPosition();
        if (HeadPosition.x > width) { //Checks if segment is off screen, loops on other side if it is
            Snake[0].setPosition(0, HeadPosition.y);
        }
    };
    if (HeadDirection == "down") {
        Snake[0].setPosition(HeadPosition.x, HeadPosition.y + 45); // Increments the position of the head of the snake down
        HeadPosition = Snake[0].getPosition()
        if (HeadPosition.y > height) { //Checks if segment is off screen, loops on other side if it is
            Snake[0].setPosition(HeadPosition.x, 0);
        }
    };

    // Checks the new head position against the locations of the body segments.
    if (typeof Snake_Location_Dictionary[HeadPosition.x.toString() + ":" + HeadPosition.y.toString()] !== "undefined") {
        Dead = 1; //Collision between segments so game is over
    }

    //Checks for collisions between snake and apples
    if (typeof Apple_Location_Dictionary[HeadPosition.x.toString() + ":" + HeadPosition.y.toString()] !== "undefined") {
        Apple_Location_Dictionary[HeadPosition.x.toString() + ":" + HeadPosition.y.toString()].eaten();
        delete Apple_Location_Dictionary[HeadPosition.x.toString() + ":" + HeadPosition.y.toString()];
        document.getElementById("Score").innerHTML = "Score: " + Score.toString();
        AddSegment();
    }

}

//Spawns an Apple at a random coordinate and adds it to the dictionary object.
function SpawnApple() {
    var width = document.body.clientWidth - 50; //-50 to stop it spawning out of bounds
    var height = document.documentElement.clientHeight - 50; //-50 to stop it spawning out of bounds
    var Valid = 0

    do {
        var xcoord = (Math.round((Math.floor(Math.random() * width)) / 45) * 45);
        var ycoord = (Math.round((Math.floor(Math.random() * height)) / 45) * 45);
        if (typeof Apple_Location_Dictionary[xcoord.toString() + ":" + ycoord.toString()] === "undefined" && typeof Snake_Location_Dictionary[xcoord.toString() + ":" + ycoord.toString()] === "undefined") {
            Valid = 1;
            var ApplePosition = {
                x: xcoord.toString(),
                y: ycoord.toString(),
            };
            Apple_Location_Dictionary[ApplePosition.x + ":" + ApplePosition.y] = new Apple(ApplePosition.x, ApplePosition.y);
        }
    } while (Valid = 0);


}