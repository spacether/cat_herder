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
    this.img = undefined;
    if (this.color.includes("assets")) {
      this.img = loadImage(this.color);
    }
    this.height = height;
    this.width = width;

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
  cornerInOther(lines, other){
    // returns [ptHit, normalVect] or undefined
    let otherLines = other.lines();
    let foundPts = [];
    for (let i = 0; i < lines.length; i++) {
      let line = lines[i];
      for (let j = 0; j < otherLines.length; j++) {
        let otherLine = otherLines[j];
        let [x1, y1] = line.pts[0].arr;
        let [x2, y2] = line.pts[1].arr;
        let [x3, y3] = otherLine.pts[0].arr;
        let [x4, y4] = otherLine.pts[1].arr;
        let result = collideLineLine(x1, y1, x2, y2, x3, y3, x4, y4, true);
        if (result.x) foundPts.push(new Vector(result.x, result.y));
      }
    }
    if (foundPts.length > 0) {
      // corner of this hits other
      if(foundPts.length === 2) {
        // console.log('rect-rect found TWO');
        let pt = foundPts[0].add(foundPts[1]).mult(0.5);
        let normal = other.normal(pt);
        return [pt, normal];
      } else if (foundPts.length === 1) {
        // console.log('rect-rect found ONE');
        let pt = foundPts[0];
        let normal = other.normal(pt);
        return [pt, normal];
      }
    } else {
      // console.log('did not find this corner in other');
      return undefined;
    }
  }
  otherInThis(other) {
    // returns [ptHit, normalVect] or undefined
    let {pts} = other;
    let vects = this.p5Vects();
    for (let i = 0; i < pts.length; i++) {
      let hits = collidePointPoly(pts[i].x,pts[i].y,vects);
      if (hits) {
        let pt = pts[i];
        let normal = other.normal(pt);
        // console.log("OTHER'S CORNER IS IN THIS");
        return [pt, normal];
      }
    }
    return undefined;
  }
  findHit(other){
    // returns [ptHit, normalVect] or undefined
    let result;
    let lines = this.lines();
    if (other.constructor.name === 'TiltedRect') {
      // other has a corner in this
      result = this.otherInThis(other);

      // this has a corner in other
      if (!result) result = this.cornerInOther(lines, other);

      if (result) {
        // console.log('found hit is:');
        // console.log(' point: ',result[0]);
        // console.log(' normal: ',result[1]);
        return result;
      } else {
        // console.log(' hit not found in findhit for rect-rect');
        return true;
      }
    } else if (other.constructor.name === 'Circle') {
      for (let i = 0; i < lines.length; i++) {
        result = other.findIntersection(lines[i]);
        if (result) {
          // console.log('found hit is:');
          // console.log(' point: ',result[0]);
          // console.log(' normal: ',result[1]);
          return result;
        }
      }
    }
    return undefined;
  }

  hits(other){
    // returns [ptHit, normalVect] or undefined
    let hit;
    let vects = this.p5Vects();
    if (other.constructor.name === 'TiltedRect') {
      let otherVects = other.p5Vects();
      hit = collidePolyPoly(vects, otherVects, true);
      if (hit) return this.findHit(other);
    } else if (other.constructor.name === 'Circle') {
      let {pos, diam} = other;
      hit = collideCirclePoly(pos.x,pos.y,diam,vects);
      if (hit) return this.findHit(other);
    } else if (other.constructor.name === 'Vector') {
      // we need this for hit testing the cat points inside the corral
      let {x, y} = other;
      hit = collidePointPoly(x, y, vects);
    }
    return hit;
  }

// } else if (other.constructor.name === 'Line') {
//   let p1 = other.pts[0];
//   let p2 = other.pts[1];
//   hit = collideLinePoly(p1.x, p1.y, p2.x, p2.y, vects);



  normal(pt){
    // passed point is either one of the corners or on a line
    let {pts} = this;
    let lines = this.lines();
    let lineHash = {
      '-1': lines[3],
      '0': lines[0],
      '1': lines[1],
      '2': lines[2],
      '3': lines[3]
    };
    // if point is one of the corners return it
    for (let i = 0; i < pts.length; i++) {
      if (pts[i].equals(pt)) {
        // console.log('detected hit on CORNER');
        let norm1 = lineHash[i].normal();
        let norm2 = lineHash[i-1].normal();
        let newVect = norm1.add(norm2).unit();
        return newVect;
      }
    }
    let line;
    for (let i = 0; i < lines.length; i++) {
      let [p1, p2] = lines[i].pts;
      let hit = collidePointLine(pt.x, pt.y, p1.x, p1.y, p2.x, p2.y, 1);
      if (hit) {
        // console.log('detected hit MIDWAY on a line');
        line = lines[i];
        return line.normal();
      }
    }
    if (!line) {
      console.log("RECT looked for hit on lines but didn't see it");
      // debugger;
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
    let {img, height, width} = this;
    if (img) {
      push();
      image(img, p1.x, p1.y);
      rotate(this.angleRad);
      pop();
    } else {
      quad(p1.x, p1.y, p2.x, p2.y, p3.x, p3.y, p4.x, p4.y);
    }
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
    return bigVect.unit();
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
  constructor (x, y, diam, color, height=diam) {
    this.diam = diam;
    this.height = height;
    this.color = color;
    this.pos = new Vector(x, y);
  }
  normal(point){
    let bigVect = point.subtract(this.pos);
    return bigVect.unit();
  }
  item () {
    return ellipse(this.pos.x, this.pos.y, this.diam, this.height);
  }
  findIntersection(line){
    // http://mathworld.wolfram.com/Circle-LineIntersection.html
    const sgn = (input) => (input < 0 ? -1 : 1);
    let p1 = line.pts[0].subtract(this.pos);
    let p2 = line.pts[1].subtract(this.pos);
    let [x1, y1] = p1.arr;
    let [x2, y2] = p2.arr;
    let r = this.diam*0.5;
    let dx = x2 - x1;
    let dy = y2 - y1;
    let dr = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
    let D = x1 * y2 - x2 * y1;
    let delta = Math.pow(r, 2) * Math.pow(dr, 2) - Math.pow(D, 2);
    let rootTerm = Math.pow(r, 2)*Math.pow(dr, 2) - Math.pow(D, 2);
    let xTopEnd = sgn(dy) * dx * Math.sqrt(rootTerm);
    let yTopEnd = Math.abs(dy) * Math.sqrt(rootTerm);
    if (delta < 0) {
      // console.log('no hit rect-circle');
      return undefined;
    } else {
      let p1x = (D * dy + xTopEnd) / Math.pow(dr, 2);
      let p1y = (-D * dx + yTopEnd) / Math.pow(dr, 2);
      if (delta === 0) {
        // one intersection
        // console.log('hit circle TANGENCY');
        let rel = new Vector(p1x, p1y);
        let pt = this.pos.add(rel);
        let normal = this.normal(pt);
        return [pt, normal];
      } else {
        // two intersections
        // console.log('hit circle TWO POINTS');
        let p2x = (D * dy - xTopEnd) / Math.pow(dr, 2);
        let p2y = (-D * dx + yTopEnd) / Math.pow(dr, 2);
        let avgX = (p1x + p2x)*0.5;
        let avgY = (p1y + p2y)*0.5;
        let rel = new Vector(p1x, p1y);
        rel = rel.unit().mult(this.diam*0.5);
        let pt = this.pos.add(rel);
        let normal = this.normal(pt);
        return [pt, normal];
      }
    }
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

    // fill(255, 255, 255, 100);
    if (this.color === 'transparent') {
      fill(255, 255, 255, 100);
    } else {
      fill(this.color);
    }
    this.item();
  }
}

export { TiltedRect, Circle, Line };
