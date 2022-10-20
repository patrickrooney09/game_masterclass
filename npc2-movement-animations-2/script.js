/**@type {HTMLCanvasElement} */
// tells vs code that this is a canvas element and to give us canvas suggestions
// endless horizontal movement with angled and curved flying patterns using Math.sin()
const canvas = document.getElementById("canvas1");

const ctx = canvas.getContext("2d");
const CANVAS_WIDTH = (canvas.width = 500);
const CANVAS_HEIGHT = (canvas.height = 1000);
const numberOfEnemies = 20;
const enemiesArray = [];

let gameFrame = 0;

class Enemy {
  constructor() {
    this.image = new Image();
    this.image.src = "enemy2.png";

    this.speed = Math.random() * 4 + 1; //randomizing speed
    this.spriteWidth = 266;
    this.spriteHeight = 188;
    this.width = this.spriteWidth / 2.5; // scaling bats down
    this.height = this.spriteHeight / 2.5;
    // taking the height and width of a single frame on the sprite sheet so we do not get multiple enemies in the same frame
    this.x = Math.random() * (canvas.width - this.width);
    this.y = Math.random() * (canvas.height - this.height); // random enemy placement

    this.frame = 0;
    this.flapSpeed = Math.floor(Math.random() * 3 + 1);
    //randomize speed of wing flap
    this.angle = 0;
    this.angleSpeed = Math.random() * 0.2;
    // enables enemies to fly at an angle
    this.curve = Math.random() * 7; // makes curve unpredictable
  }
  update() {
    this.x -= this.speed;
    this.y += this.curve * Math.sin(this.angle);
    this.angle += this.angleSpeed;
    // randomizing angle speed
    if (this.x + this.width < 0) {
      this.x = canvas.width; // letting them endlessly fly over
    }
    if (gameFrame % this.flapSpeed === 0) {
      // this.y += Math.random() * 5 - 2.5; // enemy movement
      //animate sprites
      // slows down animation
      this.frame > 4 ? (this.frame = 0) : this.frame++;
    }
  }
  draw() {
    ctx.drawImage(
      this.image,
      this.frame * this.spriteWidth,
      0,
      this.spriteWidth,
      this.spriteHeight,
      this.x,
      this.y,
      this.width,
      this.height
    );
    //first arg is the image we want to draw, next 4 are the image we want to crop out from the spreadsheet, and last 4 determine where on canvas we want to place the cropped out frame on to
  }
}

for (let i = 0; i < numberOfEnemies; i++) {
  enemiesArray.push(new Enemy());
}

function animate() {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  enemiesArray.forEach((enemy) => {
    enemy.update();
    // moves the enemy across the canvas
    enemy.draw();
    // filling a square in which the enemy will reside
  });
  gameFrame++;
  requestAnimationFrame(animate);
}
animate();
