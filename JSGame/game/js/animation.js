var canvas = document.getElementById('game');
var ctx = canvas.getContext('2d');

// Game objects
var fish = {
    speed: 256 // movement in pixels per second
};
var food = {};
var foodsCaught = 0;

// Handle keyboard controls
var keysDown = {};

addEventListener("keydown", function (e) {
    keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
    delete keysDown[e.keyCode];
}, false);

/*初始化游戏元素：背景，fish，food*/
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
    bgReady = true;
};
bgImage.src = "images/BG.jpg";

// fish image
var fishReady = false;
var fishImage = new Image();
fishImage.onload = function () {
    fishReady = true;
};
fishImage.src = "images/fish.png";

// food image
var foodReady = false;
var foodImage = new Image();
foodImage.onload = function () {
    foodReady = true;
};
foodImage.src = "images/food.png";
// Reset the game when the player catches a food
var reset = function () {
    fish.x = canvas.width / 2;
    fish.y = canvas.height / 2;

    // Throw the food somewhere on the screen randomly
    food.x = 32 + (Math.random() * (canvas.width - 64));
    food.y = 32 + (Math.random() * (canvas.height - 64));
};

// Update game objects
var update = function (modifier) {
    if (38 in keysDown) { // Player holding up
        console.log(modifier);
        fish.y -= fish.speed * modifier;
    }
    if (40 in keysDown) { // Player holding down
        fish.y += fish.speed * modifier;
    }
    if (37 in keysDown) { // Player holding left
        fish.x -= fish.speed * modifier;
    }
    if (39 in keysDown) { // Player holding right
        fish.x += fish.speed * modifier;
    }

    // Are they touching?
    if (
        fish.x <= (food.x + 32)
        && food.x <= (fish.x + 32)
        && fish.y <= (food.y + 32)
        && food.y <= (fish.y + 32)
    ) {
        ++foodsCaught;
        reset();
    }
};

// Draw everything
var render = function () {
    if (bgReady) {
        ctx.drawImage(bgImage, 0, 0);
    }

    if (fishReady) {
        ctx.drawImage(fishImage, fish.x, fish.y);
    }

    if (foodReady) {
        ctx.drawImage(foodImage, food.x, food.y);
    }

    // Score
    ctx.fillStyle = "rgb(250, 250, 250)";
    ctx.font = "24px Helvetica";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillText("Goblins caught: " + foodsCaught, 32, 32);
};

// The main game loop
var main = function () {
    var now = Date.now();
    var delta = now - then;

    update(delta / 1000);
    render();

    then = now;

    // Request to do this again ASAP
    requestAnimationFrame(main);
};

// Let's play this game!
var then = Date.now();
reset();
main();