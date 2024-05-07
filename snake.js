// Get the canvas element and its context
let canvas = document.getElementById('game');
let context = canvas.getContext('2d');

// Define the size of the game grid
let box = 32;

// Initialize the snake at the center of the canvas
let snake = [];
let score = 0;
snake[0] = { x: 8 * box, y: 8 * box };

let obstacles = [
    { x: 3 * box, y: 3 * box },
    { x: 6 * box, y: 7 * box },
    { x: 9 * box, y: 12 * box },
    // Add more obstacles as needed
];

// Set the initial direction of the snake
let direction = "right";

// Place the first food item at a random position
let food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}

// Function to draw the game background
function createBG() {
    context.fillStyle = "lightgreen";
    context.fillRect(0, 0, 16 * box, 16 * box);
}

// Function to draw the snake
function createSnake() {
    for (i = 0; i < snake.length; i++) {
        context.fillStyle = "green";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

// Function to draw the food
function drawFood() {
    context.fillStyle = "red";
    context.fillRect(food.x, food.y, box, box);
}

function drawObstacles() {
    context.fillStyle = "grey";
    for (let i = 0; i < obstacles.length; i++) {
        context.fillRect(obstacles[i].x, obstacles[i].y, box, box);
    }
}

function drawScore() {
    context.fillStyle = "white";
    context.font = "16px Arial";
    context.fillText("Score: " + score, box, box);
}

// Event listener to update the direction of the snake
document.addEventListener('keydown', update);

function update(event) {
    if (event.keyCode == 37 && direction != "right") direction = "left";
    if (event.keyCode == 38 && direction != "down") direction = "up";
    if (event.keyCode == 39 && direction != "left") direction = "right";
    if (event.keyCode == 40 && direction != "up") direction = "down";
}

// Main game loop
function startGame() {
    // Check if the snake has hit the border and wrap it around to the other side
    if (snake[0].x > 15 * box && direction == "right") snake[0].x = 0;
    if (snake[0].x < 0 && direction == 'left') snake[0].x = 16 * box;
    if (snake[0].y > 15 * box && direction == "down") snake[0].y = 0;
    if (snake[0].y < 0 && direction == 'up') snake[0].y = 16 * box;

    // Check if the snake has hit itself
    for (i = 1; i < snake.length; i++) {
        if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
            clearInterval(game);
            alert('Game Over :(');
        }
    }

    // Draw the game objects
    createBG();
    createSnake();
    drawFood();
    drawObstacles();
    drawScore();

    // Move the snake
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (direction == "right") snakeX += box;
    if (direction == "left") snakeX -= box;
    if (direction == "up") snakeY -= box;
    if (direction == "down") snakeY += box;

    if (snakeX == food.x && snakeY == food.y) {
        score++;
        document.getElementById('score').innerHTML = "Score: " + score;
        // Rest of the code...
    }

    for (let i = 0; i < obstacles.length; i++) {
        if (snakeX == obstacles[i].x && snakeY == obstacles[i].y) {
            clearInterval(game);
            alert('Game Over :(');
        }
    }

    // Check if the snake has eaten the food
    if (snakeX != food.x || snakeY != food.y) {
        // Remove the tail of the snake
        snake.pop();
    } else {
        // Generate a new food item at a random position
        food.x = Math.floor(Math.random() * 15 + 1) * box;
        food.y = Math.floor(Math.random() * 15 + 1) * box;
    }

    // Add a new head to the snake
    let newHead = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead);
}

// Start the game loop
let game = setInterval(startGame, 100);