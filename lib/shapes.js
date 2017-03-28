import Vector from './vector.js';

class TiltedRect {
  constructor (x, y, width, height, color='blue', angleRad = 0) {
    this.diam = 50;
    this.pos = new Vector(x, y);
    this.angleRad = angleRad;
    this.color = color;
    let p1 = this.pos;
    let rel = new Vector(Math.cos(-this.angleRad), Math.sin(-this.angleRad)).mult(width);
    let p2 = p1.add(rel);
    rel = new Vector(-Math.sin(-this.angleRad), Math.cos(-this.angleRad)).mult(-height);
    let p3 = p2.add(rel);
    rel = new Vector(Math.cos(-this.angleRad), Math.sin(-this.angleRad)).mult(-width)
    let p4 = p3.add(rel);
    this.pts = [p1, p2, p3, p4];
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
  hits(other){
    let {pos, diam} = this;
    let hit;
    if (other.constructor.name === 'TiltedRect') {
      let vects = other.p5Vects();
      hit = collideCirclePoly(pos.x,pos.y,diam,vects);
    } else if (other.constructor.name === 'Circle') {
      let otherPos = other.pos;
      let otherDiam = other.diam;
      hit = collideCircleCircle(pos.x,pos.y,diam,otherPos.x,otherPos.y,otherDiam);
    } else if (other.constructor.name === 'Line') {
      let p1 = other.pts[0];
      let p2 = other.pts[1];
      hit = collideLineCircle(p1.x, p1.y, p2.x, p2.y, pos.x, pos.y, diam)
    }
    return hit;
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
  render() {
    fill('black');
    this.item();
  }
}

class Circle {
  constructor (x, y, diam, color='green') {
    this.diam = diam;
    this.pos = new Vector(x, y);
    this.color = color;
  }
  item () {
    return ellipse(this.pos.x, this.pos.y, this.diam);
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
    }
    return hit;
  }
  render() {
    fill(this.color);
    this.item();
  }
}

export { TiltedRect, Circle };
