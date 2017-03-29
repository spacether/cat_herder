import Vector from './vector.js';

// CLOCKWISE POS
// COUNTERCLOCKWISE NEG


class TiltedRect {
  constructor (x, y, height, width, color='blue', angleRad = 0) {
    // horizontal assumed by default
    // assumes x,y is the top left corner
    this.diam = 50;
    this.pos = new Vector(x, y);
    this.angleRad = angleRad;
    this.color = color;
    // assumes start drawing top left then CCW, whch is a neg PI/2 rotation
    let p1 = this.pos;
    let rel = new Vector(0, height);
    rel = rel.rotate(angleRad);
    let p2 = p1.add(rel);
    rel = new Vector(width, 0).rotate(angleRad);
    let p3 = p2.add(rel);
    rel = new Vector(0, -height).rotate(angleRad);
    let p4 = p3.add(rel);
    this.pts = [p1, p2, p3, p4];
  }

  hits(other){
    let hit;
    let vects = this.p5Vects();
    if (other.constructor.name === 'TiltedRect') {
      let otherVects = other.p5Vects();
      hit = collidePolyPoly(vects, otherVects, true);
    } else if (other.constructor.name === 'Line') {
      let p1 = other.pts[0];
      let p2 = other.pts[1];
      hit = collideLinePoly(p1.x, p1.y, p2.x, p2.y, vects);
    } else if (other.constructor.name === 'Circle') {
      let {pos, diam} = other;
      hit = collideCirclePoly(pos.x,pos.y,diam,vects);
    } else if (other.constructor.name === 'Vector') {
      let {x, y} = other;
      hit = collidePointPoly(x, y, vects);
    }
    return hit;
  }

  normal(pt){
    let lines = this.lines();
    let line;
    for (let i = 0; i < lines.length; i++) {
      let myline = lines[i];
      let [p1, p2] = myline.pts;
      let hit = collidePointLine(pt.x, pt.y, p1.x, p1.y, p2.x, p2.y);
      if (hit) {
        console.log('detected hit on line!');
        line = myline;
        console.log(line);
        return line.normal();
      }
    }
    if (!line) {
      console.log("looked for hit on lines but didn't see it");
      return undefined;
    }
  }


  lines () {
    let lines = [];
    for (let i = 0; i < 4; i++) {
      let p1 = this.pts[i];
      let p2 = this.pts[i+1];
      if (p2 === undefined) p2 = this.pts[0];
      lines.push(new Line(p1.x, p1.y, p2.x, p2.y));
    }
    return lines;
  }

  p5Vects(){
    let vects = this.pts.map(pos => createVector(pos.x,pos.y));
    return vects;
  }

  item () {
    let [p1, p2, p3, p4] = this.pts;
    return quad(p1.x, p1.y, p2.x, p2.y, p3.x, p3.y, p4.x, p4.y);
  }

  render() {
    fill(this.color);
    this.item();
  }
}

class Line {
  constructor (x1, y1, x2, y2){
    let p1 =  new Vector(x1, y1);
    let p2 =  new Vector(x2, y2);
    this.pts = [p1, p2];
  }
  item (){
    let [p1, p2] = this.pts;
    line(p1.x, p1.y, p2.x, p2.y);
  }
  normal() {
    let bigVect = this.pts[1].subtract(this.pts[0]).rotate(Math.PI/2);
    let mag = bigVect.magnitude();
    return bigVect.mult(1/mag);
  }
  hits (other) {
    let hit = false;
    let [p1, p2] = this.pts;
    if (other.constructor.name === 'Vector') {
      let {x, y} = other;
      hit = collidePointLine(x, y, p1.x, p1.y, p2.x, p2.y);
    }
    return hit;
  }
  render() {
    fill('black');
    this.item();
  }
}

class Circle {
  constructor (x, y, diam, color='green', height=diam) {
    this.diam = diam;
    this.height = height;
    this.pos = new Vector(x, y);
    this.color = color;
  }
  normal(point){
    let bigVect = point.subtract(this.pos);
    let mag = bigVect.magnitude();
    return bigVect.mult(1/mag);
  }
  item () {
    return ellipse(this.pos.x, this.pos.y, this.diam, this.height);
  }
  hits(other){
    let {pos, diam} = this;
    let hit;
    if (other.constructor.name === 'Circle') {
      let otherPos = other.pos;
      let otherDiam = other.diam;
      hit = collideCircleCircle(pos.x,pos.y,diam,otherPos.x,otherPos.y,otherDiam);
    } else if (other.constructor.name === 'Line') {
      let p1 = other.pts[0];
      let p2 = other.pts[1];
      hit = collideLineCircle(p1.x, p1.y, p2.x, p2.y, pos.x, pos.y, diam)
    } else if (other.constructor.name === 'TiltedRect') {
      let vects = other.p5Vects();
      hit = collideCirclePoly(pos.x,pos.y,diam,vects);
    } else if (other.constructor.name === 'Vector') {
      let {x, y} = other;
      hit = collidePointCircle(x, y, pos.x, pos.y, diam);
    }
    return hit;
  }
  render() {
    fill(this.color);
    this.item();
  }
}

export { TiltedRect, Circle, Line };
