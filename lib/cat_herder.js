import Level from './level.js';

function setup() {
  let width = 800;
  let height = width/2;
  let canvas = createCanvas(width, height);
  canvas.parent('view');
  frameRate(30);
  window.game = new Game();
  document.addEventListener("keydown", spaceHandler, false);
}

const spaceHandler = (e) => {
  let {keyCode} = e;
  let SPACE = 32;
  switch(keyCode) {
    case SPACE:
      window.game.togglePause();
  }
};


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
    this.level = new Level({x: 0, y: 0, width: 800, height: 400, playAudio: this.playAudio.bind(this), isPaused: this.isPaused.bind(this), win: this.win.bind(this)});
    this.muted = false;
    this.paused = true;
  }
  render(){
    this.level.render();
  }
  win() {
    document.getElementById("intro").style.display = "none";
    document.getElementById("win-msg").style.display = "block";
  }
  togglePause(event){
    if (event) {
      event.target.blur();
    }
    document.getElementById("intro").style.display = "none";
    document.getElementById("win-msg").style.display = "none";
    document.getElementById("pauser").value = (this.paused) ? 'Pause' : 'Resume';
    this.paused = !this.paused;
    document.removeEventListener("keydown", spaceHandler, false);
  }
  setAudio(event){
    event.target.blur();
    let type = event.target.value;
    if (type === "Music + FX") {
      this.muted = false;
      this.level.bgsound.play();
    } else if (type === "FX only") {
      this.muted = false;
      this.level.bgsound.pause();
    } else if (type === "Muted") {
      this.muted = true;
      this.level.bgsound.pause();
    }
  }

  isPaused(){
    return this.paused;
  }

  playAudio(){
    return !this.muted;
  }
}
