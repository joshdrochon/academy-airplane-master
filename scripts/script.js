//initialize program
function init() {
    //create sprite template
    class Sprite {
        constructor(top, left, width, height) {
            this.top = top;
            this.left = left;
            this.width = width;
            this.height = height;
        }
    }

    //instantiate new player object
    const playerObj = new Sprite(620, 415, 70, 75);

    //create array of enemey objects
    let enemyObjs = [
        new Sprite(10, 100, 70, 75), 
        new Sprite(10, 400, 70, 75), 
        new Sprite(30, 700, 70, 75),
    ];
    //set empty player missiles array
    let playerMissiles = [];
    //set score, gameOver variable
    let score = 0, 
    gameOver = false;
    gameSpeed = 20;

    //draw player on screen
    function drawPlayer() {
        let content = `<div class='player' style='top: ${playerObj.top}px; left: ${playerObj.left}px;'></div>`;
        document.getElementById('player-box').innerHTML = content;
    }
    //update player score
    function updateScore() {
        score += 1;
        updateGameSpeed(score)
        document.getElementsByClassName('score')[0].innerHTML = score;
    }
    //update game speed
    function updateGameSpeed() {
        if (score === 250) {
            gameSpeed -=5;
        }
        if (score === 100) {
            gameSpeed -= 5;
        }
        if (score === 25) {
            gameSpeed -= 5;
        }
    }
    //draw enemies on screen
    function drawEnemies() {
        let content = "";
        enemyObjs.forEach(enemy => {
            content += `<div class="enemy" style="top: ${enemy.top}px; left: ${enemy.left}px"></div>`;
        });
        //append enemy divs to enemies container
        document.getElementById('enemies-box').innerHTML = content;
    }
    //add new enemy
    function addEnemy() {
        let randomNum = Math.floor(Math.random() * Math.floor(830));
        enemyObjs.push(new Sprite(-75, randomNum, 70, 75))
    }
    //detect if enemy shot
    function detectCollision() {
        for (let i = 0; i < enemyObjs.length; i++) {
            let enemyObj = enemyObjs[i];
            for (let j = 0; j < playerMissiles.length; j++) {
                let missileObj = playerMissiles[j];
                if (rectIntersect(enemyObj.left, enemyObj.top, enemyObj.width, enemyObj.height, missileObj.left, missileObj.top, missileObj.width, missileObj.height)) {
                    updateScore();
                    //remove enemy object
                    enemyObjs.splice(i, 1);
                    //remove missile object
                    playerMissiles.splice(j, 1);
                    //add new enemy to enemies
                    addEnemy();
                }
            }
        }
    }
    
    // Check x and y for overlap
    function rectIntersect(x1, y1, w1, h1, x2, y2, w2, h2) {
        if (x2 > w1 + x1 || x1 > w2 + x2 || y2 > h1 + y1 || y1 > h2 + y2){
            return false;
        }
        return true;
    }
    //move enemeies on screen
    function moveEnemies(){
        enemyObjs.forEach(enemy => {
            if (enemy.top >= 625) {
                gameOver = true;
            }
            else {
                enemy.top += 1;
            }
        });
    }
    //move missles on screen
    function moveMissiles() {
        for (let i = 0; i < playerMissiles.length; i++) {
            if (playerMissiles[i].top <= -10) {
                playerMissiles.shift();
            }
            else {
                playerMissiles[i].top -= 5; 
            }
        }
    }
    //control player movement
    function playerMovement(){
        document.onkeydown = function(KeyboardEvent) {
            if (KeyboardEvent.key === "ArrowLeft") {
                if (playerObj.left > 0)
                    playerObj.left -= 20;
            }
            if (KeyboardEvent.key === "ArrowRight") {
                if (playerObj.left < 835)
                    playerObj.left += 20;
            }
            if (KeyboardEvent.key === "ArrowUp") {
                if (playerObj.top > 450)
                    playerObj.top -= 20;
            }
            if (KeyboardEvent.key === "ArrowDown") {
                if (playerObj.top < 620)
                    playerObj.top += 20;
            }

            if (KeyboardEvent.key === "s") {
                //invoke shoot missle
                shootMissile();
            }
            drawPlayer();
        }
    }

    //add new missile to player missiles
    function shootMissile() {
        playerMissiles.push(new Sprite(playerObj.top - 8, playerObj.left + 34, 3, 10));
        //invoke draw missiles
        drawMissiles();
    }
    //draw missiles on screen
    function drawMissiles() {
        let content = "";
        playerMissiles.forEach(missile => {
            content += `<div class="missile" style="top: ${missile.top}px; left: ${missile.left}px"></div>`;
        });
        document.getElementById('missiles').innerHTML = content;
    }
    //control game flow
    function gameLoop() {
        drawPlayer();
        drawEnemies();
        moveEnemies();
        drawMissiles();
        moveMissiles();
        detectCollision();
        window.setTimeout(()=> {
            if (gameOver === false) {
                gameLoop();
            }
            else {
                return;
            }
        }, gameSpeed);
    }
    //invoke player movement
    playerMovement();
    //invoke draw player
    drawPlayer();
    //invoke game loop
    gameLoop();
}
//invoke init
init()

