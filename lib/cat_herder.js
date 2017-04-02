import Level from './level.js';

function setup() {
  let width = 800;
  let height = width/2;
  let canvas = createCanvas(width, height);
  canvas.parent('view');
  frameRate(30);
  window.game = new Game();
  document.addEventListener("keydown", downHandler, false);
  document.addEventListener("keyup", upHandler, false);
}

function draw() {
  window.game.render();
}

document.addEventListener("DOMContentLoaded", () => {
  window.setup = setup;
  window.draw = draw;
});

const downHandler = (e) => {
  let {keyCode} = e;
  let SPACE = 32;
  let [W, S, A, D] = [87, 83, 65, 68];
  let [UP, DOWN, LEFT, RIGHT] = [38, 40, 37, 39];
  switch(keyCode) {
  case SPACE:
    if (window.game.paused) {
      window.game.resetIfOver();
      window.game.togglePause();
    } else {
      window.game.level.player.callCats();
    }
    break;
  case W:
  case UP:
    if (!window.game.paused) window.game.level.player.keyTrue('up');
    break;
  case S:
  case DOWN:
    if (!window.game.paused) window.game.level.player.keyTrue('down');
    break;
  case A:
  case LEFT:
    if (!window.game.paused) window.game.level.player.keyTrue('left');
    break;
  case D:
  case RIGHT:
    if (!window.game.paused) window.game.level.player.keyTrue('right');
    break;
  }
};

const upHandler = (e) => {
  let {keyCode} = e;
  let SPACE = 32;
  let [W, S, A, D] = [87, 83, 65, 68];
  let [UP, DOWN, LEFT, RIGHT] = [38, 40, 37, 39];
  switch(keyCode) {
  case SPACE:
    if (!window.game.paused) window.game.level.player.firstSpacedown = true;
    break;
  case W:
  case UP:
    if (!window.game.paused) window.game.level.player.keyFalse('up');
    break;
  case S:
  case DOWN:
    if (!window.game.paused) window.game.level.player.keyFalse('down');
    break;
  case A:
  case LEFT:
    if (!window.game.paused) window.game.level.player.keyFalse('left');
    break;
  case D:
  case RIGHT:
    if (!window.game.paused) window.game.level.player.keyFalse('right');
    break;
  }
}

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
    this.resetGame = false;
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
      playAudio: this.playAudio.bind(this),
      moveItems: this.moveItems.bind(this),
      win: this.win.bind(this),
      numCats: this.numCats
    };
  }
  win() {
    document.getElementById("intro").style.display = "none";
    document.getElementById("win-msg").style.display = "block";
    this.paused = true;
    this.updatePauseText();
    this.resetGame = true;
  }
  resetIfOver(){
    if (this.resetGame) {
      this.numCats = this.numCats*2;
      this.level.createCats(this.numCats);
      this.resetGame = false;
    }
  }
  togglePause(event){
    if (event) {
      event.target.blur();
    }
    document.getElementById("intro").style.display = "none";
    document.getElementById("win-msg").style.display = "none";
    this.paused = !this.paused;
    this.updatePauseText();
  }
  showControls(event){
    event.target.blur();
    this.paused = true;
    this.updatePauseText();
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
      this.playAudio(this.level.bgsound);
    } else if (type === "FX only") {
      this.muted = false;
      this.level.bgsound.pause();
    } else if (type === "Muted") {
      this.muted = true;
      this.level.bgsound.pause();
    }
  }
  moveItems(items, hitable){
    items.forEach(item => {  // cats or player
      if (!this.paused) item.move(hitable);
      item.render();
    });
  }
  playAudio(item){
    if (!this.muted) {
      item.currentTime = 0;
      item.play();
    }
  }
}
