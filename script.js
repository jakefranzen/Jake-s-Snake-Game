// Get the game area DOM element
const gameArea = document.getElementById('gameArea');
const gameAreaSize = 400;  // The size of the game area (square)
const cellSize = 20;       // The size of each cell in the grid

// Calculate the number of cells in each row/column
const rowCount = gameAreaSize / cellSize;
const colCount = gameAreaSize / cellSize;

// Create the snake as an array of objects, each with x and y coordinates
let snake = [
    { x: Math.floor(colCount / 2), y: Math.floor(rowCount / 2) }
];

// Set the initial direction of the snake
let direction = 'RIGHT';

// Create the food at a random position
let food = {
    x: Math.floor(Math.random() * colCount),
    y: Math.floor(Math.random() * rowCount)
};

// Set the initial game speed and score
let speed = 80;  // Speed of the snake, lower is faster
let score = 0;

// Draw initial snake and food
function drawGameArea() {
    gameArea.innerHTML = '';  // Clear the game area

    // Draw the snake
    snake.forEach(segment => {
        const snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = segment.y;
        snakeElement.style.gridColumnStart = segment.x;
        snakeElement.classList.add('snake');
        gameArea.appendChild(snakeElement);
    });

    // Draw the food
    const foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    gameArea.appendChild(foodElement);
}

// Initial drawing of the game area
drawGameArea();

// Add event listener for key presses to control the snake
document.addEventListener('keydown', changeDirection);

// Function to change the snake's direction based on keyboard input
function changeDirection(event) {
    const keyPressed = event.keyCode;
    const goingUp = direction === 'UP';
    const goingDown = direction === 'DOWN';
    const goingRight = direction === 'RIGHT';
    const goingLeft = direction === 'LEFT';

    if (keyPressed === 37 && !goingRight) { direction = 'LEFT'; }
    if (keyPressed === 38 && !goingDown) { direction = 'UP'; }
    if (keyPressed === 39 && !goingLeft) { direction = 'RIGHT'; }
    if (keyPressed === 40 && !goingUp) { direction = 'DOWN'; }
}

// Main function that updates the game at each interval
function moveSnake() {
    // Get the head of the snake
    const head = { x: snake[0].x, y: snake[0].y };

    // Update the head's coordinates based on the direction
    if (direction === 'LEFT') head.x -= 1;
    if (direction === 'RIGHT') head.x += 1;
    if (direction === 'UP') head.y -= 1;
    if (direction === 'DOWN') head.y += 1;

    // Check for collisions with the game boundaries or the snake itself
    if (head.x < 0 || head.x >= colCount || head.y < 0 || head.y >= rowCount || snake.some(segment => segment.x === head.x && segment.y === head.y)) {
        return gameOver();
    }

    // Add the new head to the beginning of the snake array
    snake.unshift(head);

    // Check if the snake has eaten the food
    if (head.x === food.x && head.y === food.y) {
        score += 10;  // Increase the score
        moveFood();   // Move the food to a new random position
    } else {
        // Remove the last segment of the snake
        snake.pop();
    }

    // Redraw the game area
    drawGameArea();
}

// Move the food to a new random location
function moveFood() {
    food = {
        x: Math.floor(Math.random() * colCount),
        y: Math.floor(Math.random() * rowCount)
    };
}

// Handle the game over condition
function gameOver() {
    clearInterval(gameInterval);
    alert('Game Over! Your score: ' + score);
}

// Start the game with an interval to move the snake
let gameInterval = setInterval(moveSnake, speed);

function startGame() {
    snake = [{ x: Math.floor(colCount / 2), y: Math.floor(rowCount / 2) }];
    direction = 'RIGHT';
    score = 0;
    moveFood();  // Place the food randomly
    drawGameArea();
    gameInterval = setInterval(moveSnake, speed);
}

function restartGame() {
    clearInterval(gameInterval);
    startGame();  // Restart the game
}

// Optionally, add a button in HTML for restarting the game
// <button onclick="restartGame()">Restart Game</button>

startGame();  // Call this function to initially start the game
