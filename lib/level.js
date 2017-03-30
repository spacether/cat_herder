import { TiltedRect, Circle, Line} from './shapes.js';
import Cat from './cat.js';
import Person from './person.js';
import Vector from './vector.js';

// top down items
// https://opengameart.org/content/top-down-2d-rpg
// good tables
// https://opengameart.org/content/tables-and-stools

// good grass
// https://opengameart.org/content/yellowish-green-grass-tileset

class Level {
  constructor({x, y, width, height, color, view}){
    this.color = color;
    this.pos = new Vector(x, y);
    this.size = new Vector(width, height);
    p5.prototype.collideDebug(true);
    // this.bg = loadImage("assets/images/grass2.png");

    // walls
    this.hitable = this.makeWalls(10);
    this.movable = [];

    // tree
    // this.hitable.push( new Circle(200, 200, 100, 'blue') );
    // this.hitable.push( new Circle(400, 200, 100, 'blue') );

    // obstacles
    let rect1 = new TiltedRect(100, 200, 120, 120, 'blue', -PI/4);
    this.hitable.push( rect1 );

    let rect2 = new TiltedRect(400, 200, 120, 120, 'blue', -PI/4);
    this.hitable.push( rect2 );

    this.person = new Person(700, 200);
    this.hitable.push( this.person );
    this.movable.push( this.person );

    // console.log(this.hitable);

    // Make the cats
    for(let i=0; i<4; i++){
      let hit = true;
      let item;
      while (hit){
        let loc = this.randomLoc();
        item = new Cat(loc.x, loc.y);
        // item = new Circle(loc.x, loc.y, 25, 'red');
        hit = false;
        for (let j = 0; j < this.hitable.length; j++) {
          let other = this.hitable[j];
          let catSquare = item.shapes[0];
          hit = other.hits(catSquare);
          if (hit) {
            break;
          }
        }
      }
      this.hitable.push(item);
      this.movable.push(item);
    } // done placing cats
    this.addListeners();
  }

  addListeners() {
    document.addEventListener("keydown", (e) => {
      let keyCode = e.keyCode;
      if(keyCode === 32) {
        this.toggleMove();
      }
    }, false);
  }

  toggleMove(){
    this.movable.forEach(item => item.toggleMove());
  }

  makeWalls(thick){
    let walls = [];
    let delta = 1;
    walls.push( new TiltedRect(0, -thick+delta, thick, this.size.x, 'black', 0) );
    walls.push( new TiltedRect(this.size.x-delta, 0, this.size.y, thick, 'black', 0) );
    walls.push( new TiltedRect(0, this.size.y-delta, thick, this.size.x, 'black', 0) );
    walls.push( new TiltedRect(-thick+delta, 0, this.size.y, thick, 'black', 0) );
    return walls;
  }

  randomLoc(){
    let x = Math.random()*this.size.x;
    let y = Math.random()*this.size.y;
    return this.pos.add(new Vector(x, y));
  }

  render(){
    // console.log('in level render');
    // console.log('IN LEVEL, calling render');
    clear();
    this.movable.forEach(item => item.move(this.hitable));
    // background(0);
    this.hitable.forEach (item => item.render());
  }
}

export default Level;
