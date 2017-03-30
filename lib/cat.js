import { TiltedRect, Circle, Line} from './shapes.js';
import Vector from './vector.js';


import Vector from './vector.js';

class Cat {
  constructor (x, y) {
    this.pos = new Vector(x, y);
    let randAngle = (-1 + (Math.random()*2))*Math.PI;
    // zero is horizontal looking right
    this.angleRad = randAngle;
    // this.angleRad = 0;
    // this.angleRad = Math.PI/2;
    this.speed = 2.5;
    this.color = 'orange';
    this.canMove = true;
    this.headDiam = 15;
    this.width = 20;
    this.length = 60;
    this.dir = this.calcDirection();
    this.makeShapes();
  }
  toggleMove(){
    this.canMove = !this.canMove;
  }

  makeShapes(){
    let {length, width, angleRad, pos, headDiam} = this;
    let rel = new Vector(length*0.5 - headDiam, 0).rotate(angleRad);
    let headLoc = this.pos.add(rel);
    let head = new Circle(headLoc.x, headLoc.y, this.headDiam, this.color);

    let p1 = new Vector(-length/2, -width/2).rotate(angleRad).add(pos);
    let bodyArr = [
      p1.x,
      p1.y,
      width,
      this.length-this.headDiam/2,
      this.color,
      angleRad
    ];
    let body = new TiltedRect(...bodyArr);
    // this.shapes = [body, head]; //original cat plotting
    this.shapes = [body, head];
  }
  calcDirection(){
    return new Vector(Math.cos(this.angleRad), Math.sin(this.angleRad));
  }
  hits(other){
    // returns [pt, normal]
    let body = this.shapes[0];
    if (other.constructor.name === 'Cat' ||
        other.constructor.name === 'Person' ) {
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
    console.log('other is ',other.constructor.name);
    let reversed = this.dir.mult(-1);
    let reverseAng = reversed.angle();
    console.log('reverseAng ',reverseAng);
    let normalAng = normal.angle();
    console.log('normalAng ',normalAng);
    let newAng = normalAng + (normalAng - reverseAng);
    this.angleRad = newAng;
    this.dir = this.calcDirection();
    let startPos = this.pos;
    let tmpSpeed = this.speed;
    this.pos = startPos.add(this.dir.mult(tmpSpeed));
    this.makeShapes();
    let hitData = this.hits(other);
    // let [_other, hits] = this.getOtherHits(hitable);
    while (hitData) {
      tmpSpeed += 1;
      let rel = this.dir.mult(tmpSpeed);
      this.pos = startPos.add(rel);
      this.makeShapes();
      hitData = this.hits(other);
      // debugger;
      // [_other, hits] = this.getOtherHits(hitable);
    }
    console.log('new angle is ',newAng);
    console.log('new angle in degrees ',(newAng*360)/(Math.PI*2));
    console.log(' ');
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
    if (this.canMove){
      if (hitable) {
        let hitData = this.getOtherHits(hitable);
        if (hitData) {
          this.handleHit(hitData);
          // this.canMove = false;
        }
      }
      let newPos = this.pos.add(this.dir.mult(this.speed));
      this.pos = newPos;
      this.makeShapes();
      // update pos
      // update shape positions
    }
  }
  render() {
    // draw the cat body here
    this.shapes.forEach(item => item.render());
  }
}

export default Cat;
