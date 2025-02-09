const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth * 0.9;
canvas.height = window.innerHeight * 0.6;

let hearts = [];
let basket = { x: canvas.width / 2 - 25, y: canvas.height - 40, width: 50, height: 20 };
let score = 0;
let moveLeft = false;
let moveRight = false;

// Function to create hearts
function createHeart() {
    return {
        x: Math.random() * (canvas.width - 20),
        y: 0,
        size: 20,
        speed: 2 + Math.random() * 2
    };
}

// Add hearts at intervals
setInterval(() => {
    hearts.push(createHeart());
}, 1000);

// Mobile Controls (Touch & Hold Movement)
document.getElementById("leftBtn").addEventListener("touchstart", () => moveLeft = true);
document.getElementById("leftBtn").addEventListener("touchend", () => moveLeft = false);
document.getElementById("rightBtn").addEventListener("touchstart", () => moveRight = true);
document.getElementById("rightBtn").addEventListener("touchend", () => moveRight = false);

// Game loop
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Move basket smoothly
    if (moveLeft && basket.x > 0) basket.x -= 5;
    if (moveRight && basket.x < canvas.width - basket.width) basket.x += 5;

    // Draw the basket
    ctx.fillStyle = "#ff4081";
    ctx.fillRect(basket.x, basket.y, basket.width, basket.height);

    // Move and draw hearts
    hearts.forEach((heart, index) => {
        heart.y += heart.speed;

        ctx.fillStyle = "red";
        ctx.beginPath();
        ctx.arc(heart.x, heart.y, heart.size / 2, 0, Math.PI * 2);
        ctx.fill();

        // Check if the basket catches a heart
        if (
            heart.y + heart.size > basket.y &&
            heart.x > basket.x &&
            heart.x < basket.x + basket.width
        ) {
            hearts.splice(index, 1);
            score++;
        }

        // If heart reaches the bottom, just remove it (instead of ending game)
        if (heart.y > canvas.height) {
            hearts.splice(index, 1);
        }
    });

    // Show score
    ctx.fillStyle = "#d63384";
    ctx.font = "20px Arial";
    ctx.fillText("Score: " + score, 10, 30);

    // Show love message when score is high
    if (score >= 10) {
        document.getElementById("message").innerText = "You caught all the love! 💕";
        document.getElementById("message").style.display = "block";
    }

    requestAnimationFrame(gameLoop);
}

gameLoop();
