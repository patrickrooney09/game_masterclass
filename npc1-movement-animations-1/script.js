/**@type {HTMLCanvasElement} */
// tells vs code that this is a canvas element and to give us canvas suggestions
const canvas = document.getElementById("canvas1");

const ctx = canvas.getContext("2d");
const CANVAS_WIDTH = (canvas.width = 500);
const CANVAS_HEIGHT = (canvas.height = 1000);
const numberOfEnemies = 10;
const enemiesArray = [];

let gameFrame = 0;

class Enemy {
  constructor() {
    this.image = new Image();
    this.image.src = "enemy1.png";



    // this.speed = Math.random() * 4 - 2; //randomizing speed
    this.spriteWidth = 293;
    this.spriteHeight = 155;
    this.width = this.spriteWidth / 2.5; // scaling bats down
    this.height = this.spriteHeight / 2.5;
    // taking the height and width of a single frame on the sprite sheet so we do not get multiple enemies in the same frame
    this.x = Math.random() * (canvas.width-this.width);
    this.y = Math.random() * (canvas.height-this.height); // random enemy placement

    this.frame = 0;
    this.flapSpeed = Math.floor(Math.random() * 3 + 1);
    //randomize speed of wing flap
  }
  update() {
    this.x += Math.random() * 5 - 2.5;
    this.y += Math.random() * 5 - 2.5; // enemy movement
    //animate sprites
    if (gameFrame % this.flapSpeed === 0) {
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
