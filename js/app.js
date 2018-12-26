// Declares player spawn point
const spawnX = 202;
const spawnY = 380;

// Difficulty leveler
let winRate = 100;

/*
//
///
////        ENEMY SECTION       ////
///
//
*/

var Enemy = function (x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
};

// Spawns enemies beyond canvas to start with random speeds
// and check collisions to reset the player if hit
Enemy.prototype.update = function (dt) {
    this.x += this.speed * dt; // Verifies browser speed is the time regardless of the computer

    if (this.x > 510) {
        this.x = -50;
        this.speed = 100 + Math.floor(Math.random() * winRate);
    };

    if (player.x < this.x + 80 && player.x + 80 > this.x &&
        player.y < this.y + 60 && 60 + player.y > this.y) {
        player.x = spawnX;
        player.y = spawnY;
        if(winRate > 100)
            winRate-=100;
    };
};

Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/*
//
///
////        PLAYER SECTION       ////
///
//
*/

var Player = function (x, y) {
    this.x = x;
    this.y = y;
    this.player = 'images/char-horn-girl.png';
};

Player.prototype.update = function (dt) { };

Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.player), this.x, this.y);

    // Uses the player renderer to write and keep the score updated
    ctx.beginPath();
    ctx.font = "bold 24pt Roboto";
    ctx.fillStyle = "#02b3e4"; // Udacity's color ;P
    ctx.fillText("Win Rates: " + winRate/100, 10, 40);
    ctx.closePath();
};

// Checks if the user wants their character to move and limits to the canvas
Player.prototype.handleInput = function (keyPress) {
    if (keyPress == 'left' && this.x > 0) {
        this.x -= 102;
    };

    if (keyPress == 'right' && this.x < 405) {
        this.x += 102;
    };

    if (keyPress == 'up' && this.y > 0) {
        this.y -= 83;
    };

    if (keyPress == 'down' && this.y < 380) {
        this.y += 83;
    };

    // If the player gets to the water blocks, respawns and increases difficulty
    if (this.y < 0) {
        setTimeout(() => {
            this.x = spawnX;
            this.y = spawnY;
            winRate+=100;
        }, 350);
    };
};

/*
//
///
////        SPAWN SECTION       ////
///
//
*/

var allEnemies = [];
var enemyLocations = [60, 145, 230, 315]; // Each array element is a row of enemies

enemyLocations.forEach(function (enemyRow) {
    enemy = new Enemy(515, enemyRow, 200);
    allEnemies.push(enemy);
});

var player = new Player(spawnX, spawnY);

/*
//
///
////        INPUT SECTION       ////
///
//
*/

// Reads arrows and WASD for player commands
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        65: 'left',
        38: 'up',
        87: 'up',
        39: 'right',
        68: 'right',
        40: 'down',
        83: 'down'        
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
