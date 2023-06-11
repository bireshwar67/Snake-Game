//board
var blockSize = 25;
var row = 20;
var col = 20;
var board;
var context;

//snake head
var snakeX = blockSize *5;
var snakeY = blockSize * 5;

var velocityX = 0;
var velocityY = 0;
//Snake Body;
var snakeBody = [];

//Food
var foodX = blockSize * 10;
var foodY = blockSize * 10;

var gameOver = false;


window.onload = function(){
    board = document.getElementById("board");
    board.height = row * blockSize;
    board.width = col * blockSize;
    context = board.getContext("2d");    //using to draw on the board;

    placeFood();
    document.addEventListener("keyup", changeDirection);
    //update();
    setInterval(update, 1000/8); // updating every 10 mill sec;
}

function update() {
    if(gameOver){
        return;
    }

    context.fillStyle="black";
    context.fillRect(0,0, board.width, board.height);

    //drawing the food first , so that when the snake colides snake can overlap the food.
    context.fillStyle = "red";
    context.fillRect(foodX, foodY, blockSize, blockSize);

    // checking when the Snake eats the food ;
    if(snakeX == foodX && snakeY == foodY){
        snakeBody.push([foodX, foodY]);
        placeFood();
    }

    //attaching every grown part of the snake to it's body;
    for(let i = snakeBody.length-1; i > 0; i--){
        snakeBody[i] = snakeBody[i-1];
    }
    //moving the whole body all thogether;
    if(snakeBody.length){
        snakeBody[0] = [snakeX, snakeY];
    }


    context.fillStyle = "lime";
    snakeX += velocityX * blockSize;    //making the snake move;
    snakeY += velocityY * blockSize;
    context.fillRect(snakeX, snakeY, blockSize, blockSize);

    //Drawing the snake where the food was;
    for(let i = 0; i < snakeBody.length; i++){
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }

    // game Over Condition;
    if(snakeX < 0 || snakeX >= col*blockSize || snakeY < 0 || snakeY >= row*blockSize) {    
        gameOver = true;
        alert("Game Over");
    }

    for(let i = 0; i < snakeBody.length; i++){
        if(snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]){
            gameOver = true;
            alert("Game Over, Better Luck Next Time"); 
        }
    }
}

function changeDirection(e) {
    if (e.code == "ArrowUp" && velocityY != 1){ //added velocity to restrict the direction .
        velocityX = 0;
        velocityY = -1;
    }
    else if (e.code == "ArrowDown" && velocityY != -1){
        velocityX = 0;
        velocityY = 1;
    }
    else if (e.code == "ArrowLeft" && velocityX != 1){
        velocityX = -1;
        velocityY = 0;
    }
    else if (e.code == "ArrowRight" && velocityX != -1){
        velocityX = 1;
        velocityY = 0;
    }
}

function placeFood() {
    foodX = Math.floor(Math.random() * col) * blockSize;
    foodY = Math.floor(Math.random() * col) * blockSize;
}