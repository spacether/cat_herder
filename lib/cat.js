import { TiltedRect, Circle, Line } from './shapes.js';
import { getRandomIntInclusive } from './util.js';
import Vector from './vector.js';

class Cat {
  constructor (x, y, width, length, mewSound, angrySound, playAudio) {
    this.pos = new Vector(x, y);
    let randAngle = (-1 + (Math.random()*2))*Math.PI;
    // zero is horizontal looking right
    this.angleRad = randAngle;
    // this.angleRad = 0;
    // this.angleRad = Math.PI/2;
    this.speed = 2.0;
    this.adder = 0;
    this.color = 'orange';
    this.canMove = true;
    this.width = width;
    this.length = length;
    this.headDiam = 0.75*this.width;

    // orientation, drawing
    this.dir = this.calcDirection();
    this.makeShapes();

    this.mewSound = new Audio(mewSound);
    this.mewSound.volume = 0.1;
    this.angrySound = new Audio(angrySound);
    this.angrySound.volume = 0.3;
    this.playAudio = playAudio;
  }
  toggleMove(){
    this.canMove = !this.canMove;
  }

  pointAt(pt){
    let newAngle = pt.subtract(this.pos).angle();
    this.angleRad = newAngle;
    this.dir = this.calcDirection();
    this.makeShapes();
  }

  reverse(){
    let newAngle = this.dir.mult(-1).angle();
    this.angleRad = newAngle;
    this.dir = this.calcDirection();
    this.makeShapes();
  }

  unfreeze(){
    if (!this.canMove) {
      if (this.playAudio()) {
        let {angrySound} = this;
        angrySound.currentTime = 0;
        angrySound.play();
      }
      this.reverse();
      this.canMove = true;
      this.adder = 15;
    }
  }

  mew(){
    if (this.playAudio()) {
      // this.mewSound.pause();
      let notPlaying = this.mewSound.paused;
      if (notPlaying) {
        this.mewSound.load();
        this.mewSound.play();
      }
    }
  }

  makeShapes(){
    let {length, width, angleRad, pos, color} = this;

    let p1 = new Vector(-length/2, -width/2).rotate(angleRad).add(pos);
    let bodyArr = [
      p1.x,
      p1.y,
      width,
      length,
      "assets/images/cat_topface.png",
      angleRad
    ];
    let body = new TiltedRect(...bodyArr);
    // this.shapes = [body, head]; //original cat plotting
    this.shapes = [body];
  }
  calcDirection(){
    return new Vector(Math.cos(this.angleRad), Math.sin(this.angleRad));
  }
  hits(other){
    // returns [pt, normal]
    let body = this.shapes[0];
    if (other.constructor.name === 'Cat' ||
        other.constructor.name === 'Player' ) {
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
    let reversed = this.dir.mult(-1);
    let reverseAng = reversed.angle();
    // console.log('reverseAng ',reverseAng);
    let normalAng = normal.angle();
    // console.log('normalAng ',normalAng);
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
      this.mew();
      tmpSpeed += 1;
      let rel = this.dir.mult(tmpSpeed);
      this.pos = startPos.add(rel);
      this.makeShapes();
      hitData = this.hits(other);
      // debugger;
      // [_other, hits] = this.getOtherHits(hitable);
    }
    // console.log('new angle is ',newAng);
    // ---------------------
    // HIT REPORTING
    // ---------------------
    // console.log('other is ',other.constructor.name);
    // console.log('new angle in degrees ',(newAng*360)/(Math.PI*2));
    // console.log(' ');
  }
  getHits(hitable){
    // returns [pt, normal, other]
    for (let i = 0; i < hitable.length; i++) {
      let other = hitable[i];
      if (this !== other){
        let hitData = this.hits(other);
        if (hitData) {
          if (hitData === true) debugger; // handle fail case
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
        let hitData = this.getHits(hitable);
        if (hitData) {
          this.handleHit(hitData);
          // this.canMove = false;
        }
      }
      let newPos = this.pos.add(this.dir.mult(this.speed + this.adder));
      this.adder = (this.adder > 0) ? this.adder -= 0.5 : 0;
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
