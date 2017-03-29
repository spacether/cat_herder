import { TiltedRect, Circle, Line} from './shapes.js';
import { Cat } from './actors.js';
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

    // walls
    this.hitable = this.makeWalls(10);
    this.movable = [];

    // tree
    this.hitable.push( new Circle(100, 100, 100, 'darkgreen') );

    // obstacles
    let rect1 = new TiltedRect(300, 300, 20, 100, 'blue', -Math.PI/2);
    this.hitable.push( rect1 );

    let rect2 = new TiltedRect(450, 300, 20, 120, 'blue', -Math.PI*5/8);
    this.hitable.push( rect2 );
    console.log(this.hitable);

    // Make the cats
    for(let i=0; i<2; i++){
      let hit = true;
      let item;
      while (hit){
        let loc = this.randomLoc();
        item = new Cat(loc.x, loc.y);
        // item = new Circle(loc.x, loc.y, 25, 'red');
        hit = false;
        for (let j = 0; j < this.hitable.length; j++) {
          hit = item.hits(this.hitable[j]);
          if (hit) break;
        }
      }
      this.hitable.push(item);
      this.movable.push(item);
    }

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
    this.movable.forEach(item => item.move(this.hitable));
    background(this.color);
    this.hitable.forEach (item => item.render());
  }
}

export default Level;
