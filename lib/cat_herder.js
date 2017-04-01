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
    this.numCats = 4;
    this.level = new Level(this.getLevelHash());
    this.muted = false;
    this.paused = true;
  }
  render(){
    if (this.level) {
      this.level.render();
    }
  }
  getLevelHash(){
    return {
      x: 0,
      y: 0,
      width: 800,
      height: 400,
      playAudio:
      this.playAudio.bind(this),
      isPaused: this.isPaused.bind(this),
      win: this.win.bind(this),
      numCats: this.numCats
    };
  }
  win() {
    document.getElementById("intro").style.display = "none";
    document.getElementById("win-msg").style.display = "block";
    this.numCats = this.numCats*2;
    this.paused = true;
    this.updatePauseText();
    this.level.bgsound.pause();
    delete this.level;
    this.level = new Level(this.getLevelHash());
    document.addEventListener("keydown", spaceHandler, false);
  }
  togglePause(event){
    if (event) {
      event.target.blur();
    }
    document.getElementById("intro").style.display = "none";
    document.getElementById("win-msg").style.display = "none";
    this.paused = !this.paused;
    this.updatePauseText();
    document.removeEventListener("keydown", spaceHandler, false);
  }
  showControls(event){
    event.target.blur();
    this.paused = true;
    this.updatePauseText();
    document.addEventListener("keydown", spaceHandler, false);
    document.getElementById("intro").style.display = "block";
    document.getElementById("win-msg").style.display = "none";
  }
  updatePauseText(){
    document.getElementById("pauser").value = (this.paused) ? 'Resume' : 'Pause';
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
