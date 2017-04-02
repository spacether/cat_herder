import { TiltedRect, Circle, Line} from './shapes.js';
import Vector from './vector.js';


import Vector from './vector.js';

class Player {
  constructor (x, y, headDiam, width, soundFile, playAudio, drawable) {
    this.pos = new Vector(x, y);
    this.dirs = {
      empty: new Vector(0, 0),
      up: new Vector(0, -1),
      down: new Vector(0, 1),
      left: new Vector(-1, 0),
      right: new Vector(1, 0)
    };
    this.sound = new Audio(soundFile);
    this.keys = {
      up: false,
      down: false,
      left: false,
      right: false
    };
    this.dir = this.dirs['empty'];
    this.drawable = drawable;
    this.speed = 5.0;
    this.color = 'white';
    this.canMove = true;
    this.headDiam = headDiam;
    this.width = width;
    this.cats = [];
    this.makeShapes();
    this.playAudio = playAudio;
    this.firstSpacedown = true;
  }

  callCats(){
    // this.sound.stop();
    if (this.firstSpacedown) {

      let {pos} = this;
      let diam = 300;
      let circle = new Circle(pos.x, pos.y, diam, 'transparent');
      this.drawable.push(circle);
      setTimeout(() => {
        if (this.drawable.length > 0) this.drawable.pop();
      }, 500);
      this.firstSpacedown = false;

      this.playAudio(this.sound);
      let nearCats = this.cats.filter(cat => (
        pos.subtract(cat.pos).magnitude() <= diam*0.5 && cat.canMove
      ));
      nearCats.forEach(cat => {
        cat.canMove = false;
        cat.pointAt(pos);
      });
      // if fire off a new call onend won't happen
      this.sound.onended = () => {
        nearCats.forEach(cat => cat.unfreeze());
      };
      setTimeout(() => {
        nearCats.forEach(cat => cat.unfreeze());
      }, this.sound.duration*1000);
      this.firstSpacedown = false;
    }
  }

  receiveCats(cats){
    this.cats = cats;
  }

  keyFalse(dir){
    this.keys[dir] = false;
    this.updateDir();
  }

  keyTrue(dir){
    this.keys[dir] = true;
    this.updateDir();
  }

  keysSet(){
    let {keys} = this;
    return (keys['up'] || keys['down'] || keys['left'] || keys['right']);
  }

  updateDir(){
    let tmp = this.dirs['empty'];
    let {keys} = this;
    if (keys['up']) tmp = tmp.add(this.dirs['up']);
    if (keys['down']) tmp = tmp.add(this.dirs['down']);
    if (keys['left']) tmp = tmp.add(this.dirs['left']);
    if (keys['right']) tmp = tmp.add(this.dirs['right']);
    this.dir = tmp;
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
    let reversed = normal;
    let tmpSpeed = this.speed;
    this.pos = startPos.add(reversed.mult(tmpSpeed));
    this.makeShapes();
    let hitData = this.hits(other);
    // let [_other, hits] = this.getOtherHits(hitable);
    while (hitData) {
      tmpSpeed += 1;
      let rel = reversed.mult(tmpSpeed);
      this.pos = startPos.add(rel);
      this.makeShapes();
      hitData = this.hits(other);
      // debugger;
      // debugger;
      // [_other, hits] = this.getOtherHits(hitable);
    }
  }

  getHits(hitable){
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
      if (this.keysSet()) {
        let hitData = this.getHits(hitable);
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

export default Player;
