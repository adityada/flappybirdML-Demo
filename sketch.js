const TOTAL_POPULATION = 350;

var pipes = []
var data = []
let counter = 0;
let slider;

let bird;

let brainJSON;

function preload() {
  brainJSON = loadJSON("bestBird.json");
}

function setup() {
  createCanvas(400, 600);
  slider = createSlider(1, 100, 1)
  let birdBrain = NeuralNetwork.deserialize(brainJSON);
  bird = new Bird(birdBrain);
}

function draw() {

  for(let n = 0; n < slider.value(); n++) {
    if(counter % 80 == 0) {
      pipes.push(new Pipe())
    }
    counter++;
    for (var i = pipes.length-1; i >= 0; i--) {
      pipes[i].show();
      pipes[i].update();
      if(pipes[i].hits(bird)) {
          console.log("OOF!"); 
        }
      if(pipes[i].offscreen()) {
        pipes.splice(i, 1);
      }
    }
    
    bird.think(pipes);
    bird.update();
  
  
  }

  background(0);

    bird.show();

    for(let pipe of pipes) {
      pipe.show();
    }
}
