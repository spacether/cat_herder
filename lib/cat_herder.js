import Level from './level.js';

function setup() {
  let width = 800;
  let height = width/2;
  createCanvas(width, height);
  frameRate(30);
  window.game = new Game();
}

function draw() {
  window.game.render();
}

document.addEventListener("DOMContentLoaded", () => {
  window.setup = setup;
  window.draw = draw;
});


// licenses
// CAT_MEW 'https://freesound.org/people/steffcaffrey/sounds/262312/' CREATIVE COMMONS
// CAT_ANGRY http://soundbible.com/1684-Cat-Meowing-2.html ATTRIBUTION
// CAT ANGRIER http://soundbible.com/1509-Cat-Scream.html ATTRIBUTION

class Game {
  constructor() {
    this.level = new Level({x: 0, y: 0, width: 800, color: 'green', height: 400});
  }
  render(){
    this.level.render();
  }
}
