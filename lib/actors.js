import { TiltedRect, Circle, Line} from './shapes.js';
import Vector from './vector.js';

class Cat {
  constructor (x, y) {
    this.pos = new Vector(x, y);
    let randAngle = (-1 + (Math.random()*2))*Math.PI;
    // zero is horizontal looking right
    this.angleRad = randAngle;
    // this.angleRad = 0;
    // this.angleRad = Math.PI/2;
    this.speed = 1;
    this.color = 'orange';
    this.canMove = true;
    this.headDiam = 15;
    this.width = 20;
    this.length = 60;
    this.dir = this.calcDirection();
    this.makeShapes();
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
    this.shapes = [body, head];
  }
  calcDirection(){
    return new Vector(Math.cos(this.angleRad), Math.sin(this.angleRad));
  }
  hits(other){
    let body = this.shapes[0];
    if (other.constructor.name === 'Cat') {
      let oBody = other.shapes[0];
      return body.hits(oBody);
    } else {
      return body.hits(other);
    }
  }
  vel(){
    return this.dir.mult(this.speed);
  }
  normal(pt) {
    return this.shapes[0].normal(pt);
  }
  filterPts(pts, other){
    let pt;
    for (let i = 0; i <pts.length; i++) {
      if (other.hits(pts[i])) {
        pt = pts[i];
        break;
      }
    }
    return pt;
  }
  handleHit(other){
    let {pts} = this.shapes[0];
    let pt = this.filterPts(pts, other);
    if (!pt && other.constructor.name === 'Cat') {
      pts = other.shapes[0].pts;
      other = this.shapes[0];
      pt = this.filterPts(pts, other);
    } else if (!pt && other.constructor.name === 'TiltedRect') {
      pts = other.pts;
      pt = this.filterPts(pts, this);
    }
    // find the hit point
    console.log('Found hit point is:');
    console.log(pt);
    console.log('other is ',other.constructor.name);
    if (pt) {
      let normal = other.normal(pt);
      let reversed = this.dir.mult(-1);
      let angleBetween = normal.angleTo(reversed);
      let newVect = normal.rotate(angleBetween);
      let finalAng = newVect.angleTo(new Vector(1,0));
      this.angleRad = finalAng;
      this.dir = this.calcDirection();

      console.log('normal vector is');
      console.log(normal);
      console.log('new angle is ',finalAng);
      console.log(' ');
    }
    // check if the pointhits the other stuff
    // if it does
  }
  move (hitable=undefined){
    if (this.canMove){
      if (hitable) {
        let hits = false;
        let other;
        for (let i = 0; i < hitable.length; i++) {
          if (this !== hitable[i] && this.hits(hitable[i])) {
            other = hitable[i];
            hits = true;
            break;
          }
        }
        if (hits) {
          this.handleHit(other);
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

export { Cat };
