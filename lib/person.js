import { TiltedRect, Circle, Line} from './shapes.js';
import Vector from './vector.js';


import Vector from './vector.js';

class Person {
  constructor (x, y) {
    this.pos = new Vector(x, y);
    this.dir = new Vector(0, 0);
    this.speed = 2.5;
    this.color = 'red';
    this.canMove = true;
    this.headDiam = 25;
    this.width = 50;
    this.makeShapes();
  }
  clearDir(){
    this.dir = new Vector(0, 0);
  }
  up(){
    this.dir = new Vector(0, -1);
  }
  down(){
    this.dir = new Vector(0, 1);
  }
  left(){
    this.dir = new Vector(-1, 0);
  }
  right(){
    this.dir = new Vector(1, 0);
  }

  toggleMove(){
    this.canMove = !this.canMove;
  }

  makeShapes(){
    let {width, pos, headDiam, color} = this;
    let head = new Circle(pos.x, pos.y, headDiam, color);

    let p1 = new Vector(-headDiam/2, -width/2).add(pos);
    let bodyArr = [
      p1.x,
      p1.y,
      width,
      headDiam,
      color,
      0
    ];
    let body = new TiltedRect(...bodyArr);
    this.shapes = [body, head];
  }
  hits(other){
    // returns [pt, normal]
    let body = this.shapes[0];
    if (other.constructor.name === 'Cat') {
      let oBody = other.shapes[0];
      return body.hits(oBody);
    } else {
      return body.hits(other); // the initial val I had, need to flip it to allow for internal hits
      // return other.hits(body); // this should fix the problem where cats in boxes
    }
  }
  vel(){
    return this.dir.mult(this.speed);
  }
  normal(pt) {
    return this.shapes[0].normal(pt);
  }
  handleHit([pt, normal, other]){
    let startPos = this.pos;
    let tmpSpeed = this.speed;
    this.pos = startPos.add(this.dir.mult(-tmpSpeed));
    this.makeShapes();
    let hitData = this.hits(other);
    // let [_other, hits] = this.getOtherHits(hitable);
    while (hitData) {
      tmpSpeed += 1;
      let rel = this.dir.mult(-tmpSpeed);
      this.pos = startPos.add(rel);
      this.makeShapes();
      hitData = this.hits(other);
      // debugger;
      // [_other, hits] = this.getOtherHits(hitable);
    }
  }
  getOtherHits(hitable){
    // returns [pt, normal, other]
    for (let i = 0; i < hitable.length; i++) {
      let other = hitable[i];
      if (this !== other){
        let hitData = this.hits(other);
        if (hitData) {
          let [pt, normal] = hitData;
          return [pt, normal, other];
        }
      }
    }
    return false;
  }
  move (hitable=undefined){
    if (this.canMove && hitable){
      if (!this.dir.equals(new Vector(0, 0))) {
        let hitData = this.getOtherHits(hitable);
        if (hitData) this.handleHit(hitData);
        let newPos = this.pos.add(this.dir.mult(this.speed));
        this.pos = newPos;
        this.makeShapes();
      }
    }
  }
  render() {
    this.shapes.forEach(item => item.render());
  }
}

export default Person;
