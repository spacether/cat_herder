import { TiltedRect, Circle, Line} from './shapes.js';
import Vector from './vector.js';

class Cat {
  constructor (x, y) {
    this.pos = new Vector(x, y);
    let randAngle = (-1 + (Math.random()*2))*Math.PI;
    this.angleRad = randAngle;
    this.dir = this.calcDirection();
    this.speed = 1;
    this.color = 'orange';
    this.canMove = false;
    this.headDiam = 15;
    this.width = 15;
    this.length = 50;
    this.shapes = this.makeShapes();
    // build a cat here
  }
  makeShapes(){
    let rel = this.dir.mult(this.length/2);
    let headLoc = this.pos.add(rel);
    let head = new Circle(headLoc.x, headLoc.y, this.headDiam, this.color);

    let mag = new Vector(this.width*0.5, this.length*0.5).magnitude;
    rel = new Vector(-mag*Math.sin(this.angleRad), -mag*Math.cos(this.angleRad));
    let bodyLoc = this.pos.add(rel);
    let bodyArr = [
      bodyLoc.x,
      bodyLoc.y,
      this.width,
      this.length,
      this.color,
      this.angleRad
    ];
    let body = new TiltedRect(bodyArr);
    return [body, head];
  }
  calcDirection(){
    return new Vector(Math.cos(this.angleRad), Math.sin(this.angleRad));
  }
  vel(){
    return this.dir.mult(this.speed);
  }
  move (){
    if (this.canMove){
      // update pos
      // update shape positions
    }
  }
  render() {
    // draw the cat body here
    this.shapes.forEach(item => item.render());
  }
}
