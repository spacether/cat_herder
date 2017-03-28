import { TiltedRect, Circle, Line} from './shapes.js';
import Vector from './vector.js';

// top down items
// https://opengameart.org/content/top-down-2d-rpg
// good tables
// https://opengameart.org/content/tables-and-stools

// good grass
// https://opengameart.org/content/yellowish-green-grass-tileset

class Level {
  constructor({x, y, width, height, color, view}){
    background(color);
    this.pos = new Vector(x, y);
    this.size = new Vector(width, height);

    // walls
    let lines = new TiltedRect(x, height, width, height).lines();
    this.hitable = lines;

    // tree
    this.hitable.push( new Circle(100, 100, 100, 'darkgreen') );

    // obstacles
    let rect1 = new TiltedRect(300, 300, 20, 60, 'blue', 0);
    this.hitable.push( rect1 );

    let rect2 = new TiltedRect(450, 300, 20, 120, 'blue', Math.PI/8);
    this.hitable.push( rect2 );
    console.log(this.hitable);

    // doing hit test
    // let tree = this.hitable[0];
    // // console.log(tree.x);
    // // console.log(tree.y);
    for(let i=0; i<20; i++){
      let hit = true;
      let redCirc;
      while (hit){
        let loc = this.randomLoc();
        console.log(loc);
        redCirc = new Circle(loc.x, loc.y, 25, 'red');
        hit = false;
        for (let j = 0; j < this.hitable.length; j++) {
          hit = redCirc.hits(this.hitable[j]);
          if (hit) break;
        }
        console.log(hit);
      }
      this.hitable.push(redCirc);
    }
    console.log(this.hitable);
  }

  randomLoc(){
    let x = Math.random()*this.size.x;
    let y = Math.random()*this.size.y;
    return this.pos.add(new Vector(x, y));
  }

  render(){
    // console.log('in level render');
    // console.log('IN LEVEL, calling render');
    this.hitable.forEach (item => item.render());
  }
}

export default Level;
