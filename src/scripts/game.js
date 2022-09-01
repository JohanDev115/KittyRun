/* main elements */
const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');
const gameMenu = document.querySelector('#game-menu');
const gameInfo = document.querySelector('#game-info');
const GAME_WIN = document.querySelector('#game-win');
const GAME_LOSE = document.querySelector('#game-lose');

/* Buttons Events */
const UP = document.querySelector('#up')
const LEFT = document.querySelector('#left')
const RIGHT = document.querySelector('#right')
const DOWN = document.querySelector('#down')

const PLAYBUTTONS = document.getElementsByClassName('playButton')
const MENUBUTTONS = document.getElementsByClassName('menuButton')
const FINALSCORES = document.getElementsByClassName('final-score')
const SOUND_BUTTON = document.querySelector('#soundButton');

/* Game information */
const SPAN_LIVES = document.querySelector('#lives');
const SPAN_LEVEL = document.querySelector('#level');
const SPAN_TIME = document.querySelector('#time');
const SPAN_SCORE = document.querySelector('#score');
const NEW_RECORD = document.querySelector('#new-record');

/* Game initial configurations */
let canvasSize, elementSize, timeStart, level, lives, playerTime;

/* Timers */
let enemyTimerMovement, timeInterval;

/* Window events */
window.addEventListener('resize', adjustScreen);

PLAYBUTTONS.item(0).addEventListener('click', startGame);

const gameMusic = document.querySelector('#gameMusic');
const audioState = document.querySelector('#audio-state');
SOUND_BUTTON.addEventListener('click', manageMusic);

function manageMusic() {
    if (!gameMusic.paused) {
        gameMusic.pause();
        audioState.innerHTML = "OFF";
    } else {
        gameMusic.play();
        audioState.innerHTML = "ON";
    }
}

/* Characteres */

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
    speed: 500,
    move() {
        game.fillText(emojis['E'], this.posX, this.posY);
    }
}

const fish = {
    posX: undefined,
    posY: undefined
}

let treePositions = [];

/* game functions */

function adjustScreen() {
    canvasSize = window.innerHeight > window.innerWidth 
    ? window.innerWidth * 0.8 
    : window.innerHeight * 0.8;

    player.posX = undefined;
    player.posY = undefined;
    enemy.posX = undefined;
    enemy.posY = undefined;

    canvas.setAttribute('width', canvasSize);
    canvas.setAttribute('height', canvasSize);
    gameInfo.style.width = canvasSize + 'px';
    
    elementSize = canvasSize / 10;
}

function goToMenu() {
    gameMenu.style.display = 'block';
    GAME_LOSE.style.display = 'none';
    GAME_WIN.style.display = 'none';
}

function startGame() {
    adjustScreen();
    resetAllGame();
    botMovements();

    gameMenu.style.display = 'none';
    GAME_LOSE.style.display = 'none';
    GAME_WIN.style.display = 'none';

    UP.addEventListener('click', moveUp);
    LEFT.addEventListener('click', moveLeft);
    RIGHT.addEventListener('click', moveRight);
    DOWN.addEventListener('click', moveDown);

    window.addEventListener('keydown', moveByKeyboard);
}

function stopGame() {
    clearInterval(enemyTimerMovement);
    clearInterval(timeInterval);

    UP.removeEventListener('click', moveUp);
    LEFT.removeEventListener('click', moveLeft);
    RIGHT.removeEventListener('click', moveRight);
    DOWN.removeEventListener('click', moveDown);

    window.removeEventListener('keydown', moveByKeyboard);

    PLAYBUTTONS.item(1).addEventListener('click', startGame);
    PLAYBUTTONS.item(2).addEventListener('click', startGame);

    MENUBUTTONS.item(0).addEventListener('click', goToMenu);
    MENUBUTTONS.item(1).addEventListener('click', goToMenu);

    playerTime = Date.now() - timeStart;
}

function renderGame() {
    game.font = elementSize + 'px Monospace';
    game.textAlign = 'end';

    const map = maps[level];
    const mapRows = map.trim().split('\n');
    const mapRowCols = mapRows.map(row => row.trim().split(''));
    
    if (!timeStart) {
        timeStart = Date.now();
        timeInterval = setInterval(showTime, 100);
    }

    showLives();
    showLevel();
    showScore();
    
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
    renderGame();
}

function resetAllGame() {
    level = 0;
    lives = 3;
    timeStart = undefined;
    resetGame();
}

function levelWin() {
    if (level == maps.length - 1) {
        gameWin();
    } else {
        level++;
        if (level > 5 && level < 10) enemy.speed = 450;
        else if (level >= 10 && level < 15) enemy.speed = 400;
        else if (level >= 15 && level < 18) enemy.speed = 350;
        else enemy.speed = 300;
        resetGame();
    }
}

function levelFail() {
    lives--;
    if (lives <= 0) gameLose();
    showLives();
    resetGame();
}

function gameWin() {
    stopGame();
    GAME_WIN.style.display = 'flex';
    const scoreTime = localStorage.getItem('score_time');

    if (scoreTime) {
        if (scoreTime >= playerTime) {
            localStorage.setItem('score_time', playerTime);
            NEW_RECORD.style.display = "block";
        }
    
    } else {
        localStorage.setItem('score_time', playerTime);
        NEW_RECORD.style.display = "none";
    }

    FINALSCORES.item(0).innerText = playerTime;
}

function gameLose() {
    stopGame();
    GAME_LOSE.style.display = 'flex';
    FINALSCORES.item(1).innerText = playerTime;
    // level = 0;
    // lives = 3;
    // timeStart = undefined;
}

function showLives() {
    SPAN_LIVES.innerText = emojis['HEART'].repeat(lives);
}

function showLevel() {
    SPAN_LEVEL.innerText = level + 1;
}

function showTime() {
    SPAN_TIME.innerText = Date.now() - timeStart;
}

function showScore() {
    SPAN_SCORE.innerText = localStorage.getItem('score_time') || 0;
}

/* Movements functions */

function moveUp() {
    let cantMoveUp;

    treePositions.forEach(tree => {
        if (player.posX == tree.posX && player.posY == (tree.posY + elementSize)) cantMoveUp = true;
    })

    if (!(player.posY <= elementSize) && !cantMoveUp) {
        player.posY -= elementSize;
        renderGame();
    }
}

function moveLeft() {
    let cantMoveLeft;

    treePositions.forEach(tree => {
        if (player.posX == (tree.posX + elementSize) && player.posY == tree.posY) cantMoveLeft = true;
    })

    if (!(player.posX <= elementSize) && !cantMoveLeft) {
        player.posX -= elementSize;
        renderGame();
    }
}

function moveRight() {
    let cantMoveRight;

    treePositions.forEach(tree => {
        if (player.posX == (tree.posX - elementSize) && player.posY == tree.posY) cantMoveRight = true;
    })

    if (!(player.posX >= canvasSize) && !cantMoveRight) {
        player.posX += elementSize;
        renderGame();
    }
}

function moveDown() {
    let cantMoveDown;

    treePositions.forEach(tree => {
        if (player.posX == tree.posX && player.posY == (tree.posY - elementSize)) cantMoveDown = true;
    })

    if (!(player.posY >= canvasSize) && !cantMoveDown) {
        player.posY += elementSize;
        renderGame();
    }
}

function moveByKeyboard(evt) {
    evt.preventDefault();
    if (evt.key == 'ArrowUp' || evt.key == 'w') moveUp();
    else if (evt.key == 'ArrowLeft' || evt.key == 'a') moveLeft();
    else if (evt.key == 'ArrowRight' || evt.key == 'd') moveRight();
    else if (evt.key == 'ArrowDown' || evt.key == 's') moveDown();
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
        
        renderGame();
    }

    enemyTimerMovement = setInterval(moveEnemy, enemy.speed);
}
