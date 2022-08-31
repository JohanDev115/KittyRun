const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');
const gameInfo = document.querySelector('#game_info');

const UP = document.querySelector('#up')
const LEFT = document.querySelector('#left')
const RIGHT = document.querySelector('#right')
const DOWN = document.querySelector('#down')

const SPAN_LIVES = document.querySelector('#lives');
const SPAN_TIME = document.querySelector('#time');
const SPAN_SCORE = document.querySelector('#score');

let canvasSize;
let elementSize;
let level = 0;
let lives = 3;

let enemyTimerMovement;
let enemySpeed = 500;

let timeStart;
let timeInterval;

window.addEventListener('load', adjustScreen);
window.addEventListener('resize', adjustScreen);

const player = {
    posX: undefined,
    posY: undefined,
    move() {
        const fishCollision = (this.posX.toFixed(2) == fish.posX.toFixed(2)) && (this.posY.toFixed(2) == fish.posY.toFixed(2));
        if (fishCollision) {
            levelWin();
        }

        const enemyCollision = (this.posX.toFixed(2) == enemy.posX.toFixed(2)) && (this.posY.toFixed(2) == enemy.posY.toFixed(2));
        if (enemyCollision) {
            levelFail();
        }

        game.fillText(emojis['PLAYER'], this.posX, this.posY);
    }
}

const enemy = {
    posX: undefined,
    posY: undefined,
    move() {
        game.fillText(emojis['E'], this.posX, this.posY);
    }
}

const fish = {
    posX: undefined,
    posY: undefined
}

let treePositions = [];

function adjustScreen() {
    canvasSize = window.innerHeight > window.innerWidth 
    ? window.innerWidth * 0.8 
    : window.innerHeight * 0.8;

    canvas.setAttribute('width', canvasSize);
    canvas.setAttribute('height', canvasSize);
    gameInfo.style.width = canvasSize + 'px';
    
    elementSize = canvasSize / 10;

    startGame();
    botMovements();
}

function startGame() {
    game.font = elementSize + 'px Monospace';
    game.textAlign = 'end';

    const map = maps[level];
    const mapRows = map.trim().split('\n');
    const mapRowCols = mapRows.map(row => row.trim().split(''));
    
    if (!timeStart) {
        timeStart = Date.now();
        timeInterval = setInterval(showTime, 100);
        showScore();
    }

    showLives();
    
    treePositions = [];
    game.clearRect(0, 0, canvasSize, canvasSize);
    mapRowCols.forEach((row, rowI) => {
        row.forEach((col, colI) => {
            const emoji = emojis[col];
            const posX = elementSize * (colI + 1);
            const posY = elementSize * (rowI + 1);

            if (col == 'O') {
                if (!player.posX && !player.posY) {
                    player.posX = posX;
                    player.posY = posY;
                }
            }

            if (col == '_') {
                if (!enemy.posX && !enemy.posY) {
                    enemy.posX = posX;
                    enemy.posY = posY;
                }
            }

            if (col == 'I') {
                fish.posX = posX;
                fish.posY = posY;
            }

            if (col == 'X') {
                treePositions.push({
                    posX,
                    posY
                })
            }

            game.fillText(emoji, posX, posY);
        })
    });

    player.move();
    enemy.move();
}

function resetGame() {
    player.posX = undefined;
    player.posY = undefined;
    enemy.posX = undefined;
    enemy.posY = undefined;
    startGame();
}

function levelWin() {
    if (level == maps.length - 1) {
        console.log('There are not more maps');
        clearInterval(enemyTimerMovement);
        clearInterval(timeInterval);
        const playerTime = Date.now() - timeStart;

        const scoreTime = localStorage.getItem('score_time');
        if (scoreTime) {
            if (scoreTime >= playerTime) {
                localStorage.setItem('score_time', playerTime);
                console.log('score has been better');
            }

        } else {
            localStorage.setItem('score_time', playerTime);
        }

    } else {
        level++;
        resetGame();
    }
}

function levelFail() {
    lives--;

    if (lives <= 0) {
        level = 0;
        lives = 3;
        timeStart = undefined;
    }
    showLives();
    resetGame();
}

function showLives() {
    SPAN_LIVES.innerText = emojis['HEART'].repeat(lives);
}

function showTime() {
    SPAN_TIME.innerText = Date.now() - timeStart;
}

function showScore() {
    SPAN_SCORE.innerText = localStorage.getItem('score_time') || 0;
}

UP.addEventListener('click', moveUp);
LEFT.addEventListener('click', moveLeft);
RIGHT.addEventListener('click', moveRight);
DOWN.addEventListener('click', moveDown);

window.addEventListener('keydown', (evt) => {
    evt.preventDefault();
    if (evt.key == 'ArrowUp' || evt.key == 'w') moveUp();
    else if (evt.key == 'ArrowLeft' || evt.key == 'a') moveLeft();
    else if (evt.key == 'ArrowRight' || evt.key == 'd') moveRight();
    else if (evt.key == 'ArrowDown' || evt.key == 's') moveDown();
})

function moveUp() {
    let cantMoveUp;

    treePositions.forEach(tree => {
        if (player.posX == tree.posX && player.posY == (tree.posY + elementSize)) cantMoveUp = true;
    })

    if (!(player.posY <= elementSize) && !cantMoveUp) {
        player.posY -= elementSize;
        startGame();
    }
}

function moveLeft() {
    let cantMoveLeft;

    treePositions.forEach(tree => {
        if (player.posX == (tree.posX + elementSize) && player.posY == tree.posY) cantMoveLeft = true;
    })

    if (!(player.posX <= elementSize) && !cantMoveLeft) {
        player.posX -= elementSize;
        startGame();
    }
}

function moveRight() {
    let cantMoveRight;

    treePositions.forEach(tree => {
        if (player.posX == (tree.posX - elementSize) && player.posY == tree.posY) cantMoveRight = true;
    })

    if (!(player.posX >= canvasSize) && !cantMoveRight) {
        player.posX += elementSize;
        startGame();
    }
}

function moveDown() {
    let cantMoveDown;

    treePositions.forEach(tree => {
        if (player.posX == tree.posX && player.posY == (tree.posY - elementSize)) cantMoveDown = true;
    })

    if (!(player.posY >= canvasSize) && !cantMoveDown) {
        player.posY += elementSize;
        startGame();
    }
}

function botMovements() {
    let enemySteps = elementSize;
    let canMoveUp;
    let canMoveLeft; 
    let canMoveRight;
    let canMoveDown;

    let dir;

    function checkCollision() {
        canMoveUp = true;
        canMoveLeft = true;
        canMoveRight = true;
        canMoveDown = true;

        treePositions.forEach(tree => {
            if ((enemy.posX == tree.posX && enemy.posY == (tree.posY + elementSize)) || enemy.posY <= elementSize) canMoveUp = false;

            if ((enemy.posX == (tree.posX + elementSize) && enemy.posY == tree.posY) || enemy.posX <= elementSize) canMoveLeft = false;

            if ((enemy.posX == (tree.posX - elementSize) && enemy.posY == tree.posY) || enemy.posX >= canvasSize) canMoveRight = false;

            if ((enemy.posX == tree.posX && enemy.posY == (tree.posY - elementSize)) || enemy.posY >= canvasSize) canMoveDown = false;
        })
    }

    function chooseDirection() {
        checkCollision();
        let randomNumber = Math.ceil(Math.random() * 4);

        if (randomNumber == 1 && canMoveUp) {
            dir = 'up';
        } else if (randomNumber == 2 && canMoveLeft) {
            dir = 'left';
        } else if (randomNumber == 3 && canMoveRight) {
            dir = 'right';
        } else if (randomNumber == 4 && canMoveDown) {
            dir = 'down';
        } else {
            chooseDirection();
        }
    }
    
    chooseDirection();

    function moveEnemy() {
        chooseDirection();

        if (dir == 'up') {
            enemy.posY -= enemySteps;
        } else if (dir == 'left') {
            enemy.posX -= enemySteps;
        } else if (dir == 'right') {
            enemy.posX += enemySteps;
        } else if (dir == 'down') {
            enemy.posY += enemySteps;
        } else {
            chooseDirection();
        }
        
        startGame();
    }

    enemyTimerMovement = setInterval(moveEnemy, enemySpeed);
}
