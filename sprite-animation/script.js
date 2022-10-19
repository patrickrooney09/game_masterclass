let playerState = "idle"
const dropdown = document.getElementById("animations")
dropdown.addEventListener('change', function(event){
  playerState = event.target.value
})

const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d"); // this gives us access to drawing methods
// the html canvas element is used to draw graphics on a web page

const CANVAS_WIDTH = (canvas.width = 600);
const CANVAS_HEIGHT = (canvas.height = 600);

const playerImage = new Image();
playerImage.src = "shadow_dog.png";

const spriteWidth = 575;
const spriteHeight = 523; // these variables cut out the portion of the sprite row and colum that I want to access for my animation

let frameX = 0
let frameY = 0
// these variables set the coordinates for which animation frame we'd like to use!
let gameFrame = 0
const staggerFrames = 5
// gameFrame and staggerFrames help us slow down animation - the higher staggerFrames is- the slower the animation

const spriteAnimations = [];
const animationStates = [
  {
    name: "idle",
    frames: 7
  },
  {
    name: 'jump',
    frames: 7
  },
  {
    name: 'fall',
    frames: 7
  },
  {
    name: 'run',
    frames: 9
  },
  {
    name: 'dizzy',
    frames: 11
  },
  {
    name: 'sit',
    frames: 5
  },
  {
    name: 'roll',
    frames: 7
  },
  {
    name: 'bite',
    frames: 7
  },
  {
    name: 'ko',
    frames: 12
  },
  {
    name: 'getHit',
    frames: 4
  }
]
animationStates.forEach((state, index)=>{
  let frames = {
    loc: [],
  }
  for(let j = 0; j < state.frames; j++){
    let positionX= j* spriteWidth;
    let positionY = index * spriteHeight;
    frames.loc.push({x:positionX, y: positionY})
  }
  spriteAnimations[state.name] = frames
})

console.log(spriteAnimations)
function animate() {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT); // clearing the canvas
  let position = Math.floor(gameFrame/staggerFrames) % spriteAnimations[playerState].loc.length// slows down animation
  let frameX = spriteWidth * position
  let frameY = spriteAnimations[playerState].loc[position].y

                        //source dimensions destination dimensions
  // ctx.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh)
  ctx.drawImage(playerImage, frameX, frameY, spriteWidth, spriteHeight, 0, 0, spriteWidth, spriteHeight);

  // if(gameFrame % staggerFrames ===0){ // our frames only animate when the remainder is 0- therefore running this if statement less times, and slowing down the animation
  //   if(frameX < 4){
  //     frameX++
  //   }else{
  //     frameX = 0
  //   }
  // }

  gameFrame++
  requestAnimationFrame(animate); // recursively creating animation loop
}

animate();
