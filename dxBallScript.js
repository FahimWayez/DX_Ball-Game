const ball = document.getElementById("ball");
const stick = document.getElementById("stick");
const mainScreen = document.getElementById("mainScreen");

let ballX = 390, ballY = 570, ballDX = 2, ballDY = -2, stickX = 350, leftPressed = false, rightPressed = false, bricks = [];


function createBricks() {
    const rows = 5;
    const columns = 10;
    const brickWidth = 75; //change kora lagbe 
    const brickHeight = 20; //change kora lagbe
    const padding = 10;
    const offsetTop = 30; //
    const offsetLeft = 30;//

    for (let row = 0; row < rows; row++) {
        for (let column = 0; column < columns; column++) {
            const brick = document.createElement("div");
            brick.classList.add("brick");
            brick.style.top = row * (brickHeight + padding) + offsetTop + "px";
            brick.style.left = column * (brickWidth + padding) + offsetLeft + "px";
            mainScreen.appendChild(brick);
            bricks.push(brick);
        }
    }
}

function drawBall()
{
    ball.style.left = ballX + "px";
    ball.style.top = ballY + "px";
}

function drawStick()
{
    stick.style.left = stickX + "px";
} 

function moveBall()
{
    ballX += ballDX;
    ballY += ballDY;
    if (ballX <= 0 || ballX + ball.offsetWidth >= mainScreen.offsetWidth)
    {
        ballDX = -ballDX;    
    }
    if (ballY <= 0)
    {
        ballDY = -ballDY;
    }
    if (ballY + ball.offsetHeight >= mainScreen.offsetHeight)
    {
        if (ballX + ball.offsetWidth >= stickX && ballX <= stickX + stick.offsetWidth)
        {
            ballDY = -ballDY;
        }
        else
        {
            gameOver();    
        }
    }

    bricks.forEach((brick, index) => {
        if (ballX + ball.offsetWidth >= brick.offsetLeft && ballX <= brick.offsetLeft + brick.offsetWidth && ballY + ball.offsetHeight >= brick.offsetTop && ballY <= brick.offsetTop + brick.offsetHeight) {
            ballDY = -ballDY;
            brick.remove();
            bricks.splice(index, 1);//
        }
    });
    if (bricks.length === 0)
    {
        gameOver(true);
    }
}

function gameOver(win = false)//
{
    clearInterval(gameInterval);
    if (win)
    {
        alert("You Win!");
    }
    else
    {
        alert("Game Over!");
    }
}

document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") {
        leftPressed = true;
    }
    else if (e.key === "ArrowRight") {
        rightPressed = true;
    }
});

document.addEventListener("keyup", (e) =>
{
    if (e.key === "ArrowLeft")
    {
        leftPressed = false;    
    }
    else if (e.key === "ArrowRight")
    {
        rightPressed = false;
    }
});

function moveStick()
{
    if (leftPressed && stickX > 0)
    {
        stickX -= 5;
    }
    else if (rightPressed && stickX + stick.offsetWidth < mainScreen.offsetWidth)
    {
        stickX += 5;

    }
}

document.addEventListener("mousemove", (e) =>
{
    const screenLeft = mainScreen.offsetLeft;
    let newStickX = e.clientX - screenLeft - stick.offsetWidth / 2;
    stickX = Math.min(Math.max(newStickX, 0), mainScreen.offsetWidth - stick.offsetWidth);
});

function game()
{
    moveBall();
    drawBall();
    drawStick();
    moveStick();
}
createBricks();
const gameInterval = setInterval(game, 10);
//lordW