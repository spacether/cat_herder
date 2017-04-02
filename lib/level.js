import { TiltedRect, Circle, Line} from './shapes.js';
import Cat from './cat.js';
import Player from './player.js';
import Vector from './vector.js';

// top down items
// https://opengameart.org/content/top-down-2d-rpg
// good tables
// https://opengameart.org/content/tables-and-stools

// good grass
// https://opengameart.org/content/yellowish-green-grass-tileset

class Level {
  constructor({x, y, width, height, playAudio, moveItems, win, numCats}){
    this.pos = new Vector(x, y);
    this.size = new Vector(width, height);
    this.sounds = {
      CALL_CATS: "assets/sounds/cat_call_1.mp3",
      CAT_MEW: "assets/sounds/262312__steffcaffrey__cat-meow1.mp3",
      CAT_ANGRY: "assets/sounds/Cat_Meowing_2-Mr_Smith-780889994.mp3",
      BACKGROUND: "assets/sounds/epic_sax_guy.mp3",
    };
    this.playAudio = playAudio;
    this.bgsound = new Audio(this.sounds['BACKGROUND']);
    this.bgsound.loop = true;
    this.bgsound.volume = 0.1;
    this.playAudio(this.bgsound);


    this.moveItems = moveItems;
    this.win = win;

    // walls
    this.hitable = this.makeWalls();
    this.drawable = []; // stores tmp circle only
    let corral = new TiltedRect(0, 0, 100, 100, '#493D26', 0);
    this.corral = corral;

    // player set-up
    let player = new Player(700, 200, 20, 20*2.2, this.sounds['CALL_CATS'], playAudio, this.drawable);
    // this.hitable.push( player );
    this.player = player;
    this.movable = [player];

    // tree
    // this.hitable.push( new Circle(200, 200, 100, 'blue') );
    // this.hitable.push( new Circle(400, 200, 100, 'blue') );

    // obstacles
    // this.hitable.push( new TiltedRect(75, 125, 20, 100, 'red', -PI/4) );
    let wallColor = 'Red';
    this.hitable.push( new TiltedRect(62, 138, 20, 100, wallColor, -PI/4) );
    // this.hitable.push( new TiltedRect(50, 150, 20, 100, 'red', -PI/4) );

    this.hitable.push( new TiltedRect(200, 400, 50, 100, wallColor, -PI/2) );

    this.hitable.push( new TiltedRect(400, 55, 75, 75, wallColor, -PI/4) );


    this.hitable.push( new TiltedRect(350, 250, 20, 100, wallColor, -5*PI/8) );

    this.hitable.push( new TiltedRect(600, 200, 20, 100, wallColor, 6*PI/8) );


    // Make the cats
    this.createCats(numCats);
  }

  createCats(numCats){
    this.trappedCats = [];
    let cats = [];
    for(let i=0; i<numCats; i++){
      let hit = true;
      let cat;
      while (hit){
        let loc = this.randomLoc();
        cat = new Cat(i, loc.x, loc.y, 16, 30, this.sounds['CAT_MEW'], this.sounds['CAT_ANGRY'], this.playAudio);
        hit = false;
        let allItems = this.hitable.concat(this.movable, this.drawable, this.corral);
        for (let j = 0; j < allItems.length; j++) {
          let other = allItems[j];
          let catSquare = cat.shapes[0];
          hit = other.hits(catSquare);
          if (hit) {
            break;
          }
        }
      }
      // this.hitable.push(cat);
      this.movable.push(cat);
      cats.push(cat);
    }
    this.cats = cats;
    this.movable.shift(); // remove player from the beginning
    this.movable.push(this.player); // add player on end so on top for draw
    this.player.receiveCats(this.cats);
  }

  makeWalls(){
    let thick = 100;
    let walls = [];
    let width = this.size.x;
    let height = this.size.y;
    walls.push( new TiltedRect(0, -thick, thick, width, 'black', 0) );
    walls.push( new TiltedRect(width, 0, height, thick, 'black', 0) );
    walls.push( new TiltedRect(0, height, thick, width, 'black', 0) );
    walls.push( new TiltedRect(-thick, 0, height, thick, 'black', 0) );
    return walls;
  }

  randomLoc(){
    let x = Math.random()*this.size.x;
    let y = Math.random()*this.size.y;
    return this.pos.add(new Vector(x, y));
  }

  stopCats(){
    this.cats.forEach(cat => {

      if (cat.canMove) {
        let catSquare = cat.shapes[0];
        let {corral} = this;
        if (corral.hits(catSquare)) {
          // cat is in corral
          let inCorral = true;
          let {pts} = catSquare;
          for (let i = 0; i < pts.length; i++) {
            if (!corral.hits(pts[i])) {
              inCorral = false;
              break;
            }
          }
          if (inCorral) {
            cat.canMove = false;
            this.movable = this.movable.filter(item => item !== cat);
            this.trappedCats.push(cat);
            if (this.movable.length === 1) {
              this.win();
            }
          }
        }
      }

    });
  }

  render(){
    clear();
    this.corral.render();
    this.drawable.forEach (item => item.render()); // show circle
    this.trappedCats.forEach (item => item.render()); // show trapped cats
    this.moveItems(this.movable, this.hitable);
    this.hitable.forEach (item => item.render()); // walls etc
    this.stopCats();
  }
}

export default Level;
