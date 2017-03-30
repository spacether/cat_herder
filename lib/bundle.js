/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Vector  {
  constructor(x,y) {
    this.x = x;
    this.y = y;
    this.arr = [x, y];
  }
  mult(other){
    if (typeof(other) === 'number') {
      return new Vector(this.x*other, this.y*other);
    } else {
      return this.dotProd(other);
    }
  }

  rotate(angleRad){
    // assumes that cw is pos
    let xnew = this.x*Math.cos(angleRad) - this.y*Math.sin(angleRad);
    let ynew = this.x*Math.sin(angleRad) + this.y*Math.cos(angleRad);
    return new Vector(xnew, ynew);
  }

  angleTo(other){
    let a = this.magnitude();
    let b = other.magnitude();
    let c = this.subtract(other).magnitude();
    // console.log(a,b,c);
    let num = (a*a + b*b - c*c);
    let denom = (2*a*b);
    let dot = this.dotProd(other);
    return Math.acos(num/denom);
  }

  divideBy(other){
    return this.mult(1/other);
  }

  dotProd(other){
    return (this.x * other.y + this.y * other.x);
  }

  crossProd(other){
    return (this.x*other.y - this.y * other.x);
  }

  magnitude(){
    return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
  }


  add(other) {
    if (typeof(other) === 'number') {
      return new Vector(this.x + other, this.y + other);
    } else {
      return new Vector(this.x + other.x, this.y + other.y);
    }
  }

  unit(){
    return this.mult(1/this.magnitude());
  }

  angle(){
    return Math.atan2(this.y, this.x);
  }

  subtract(other) {
    if (typeof(other) === 'number') {
      return this.add(other*-1);
    } else {
      let negOther = other.mult(-1);
      return this.add(negOther);
    }
  }

  equals(other) {
    if (!other.y || !other.x) return false;
    return (this.x === other.x && this.y === other.y);
  }

}

/* harmony default export */ __webpack_exports__["a"] = Vector;

// let v = new Vector(0,1);
// console.log(v.angleTo(new Vector(1,0)));
// v = v.add(3);
// console.log(v);
// console.log(v.equals(new Vector(4, 5)));
// console.log(new Vector(3, 4).magnitude() === 5);
// console.log(new Vector(4, 4).divideBy(2).equals(new Vector(2,2)));


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__vector_js__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TiltedRect; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return Circle; });
/* unused harmony export Line */


// CLOCKWISE POS
// COUNTERCLOCKWISE NEG


class TiltedRect {
  constructor (x, y, height, width, color='blue', angleRad = 0) {
    // horizontal assumed by default
    // assumes x,y is the top left corner
    this.diam = 50;
    this.pos = new __WEBPACK_IMPORTED_MODULE_0__vector_js__["a" /* default */](x, y);
    this.angleRad = angleRad;
    this.color = color;
    // assumes start drawing top left then CCW, whch is a neg PI/2 rotation
    let p1 = this.pos;
    let rel = new __WEBPACK_IMPORTED_MODULE_0__vector_js__["a" /* default */](0, height);
    rel = rel.rotate(angleRad);
    let p2 = p1.add(rel);
    rel = new __WEBPACK_IMPORTED_MODULE_0__vector_js__["a" /* default */](width, 0).rotate(angleRad);
    let p3 = p2.add(rel);
    rel = new __WEBPACK_IMPORTED_MODULE_0__vector_js__["a" /* default */](0, -height).rotate(angleRad);
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
        if (result.x) foundPts.push(new __WEBPACK_IMPORTED_MODULE_0__vector_js__["a" /* default */](result.x, result.y));
      }
    }
    if (foundPts.length > 0) {
      // corner of this hits other
      if(foundPts.length === 2) {
        console.log('rect-rect found TWO');
        let pt = foundPts[0].add(foundPts[1]).mult(0.5);
        let normal = other.normal(pt);
        return [pt, normal];
      } else if (foundPts.length === 1) {
        console.log('rect-rect found ONE');
        let pt = foundPts[0];
        let normal = other.normal(pt);
        return [pt, normal];
      }
    } else {
      console.log('did not find this corner in other');
      return undefined;
    }
  }
  otherInThis(other) {
    // returns [ptHit, normalVect] or undefined
    let {pts} = other;
    let vects = other.p5Vects();
    for (let i = 0; i < pts.length; i++) {
      let hits = collidePointPoly(pts[i].x,pts[i].y,vects);
      if (hits) {
        let pt = pts[i];
        let normal = other.normal(pt);
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
        console.log('found hit is:');
        console.log(' point: ',result[0]);
        console.log(' normal: ',result[1]);
        return result;
      } else {
        console.log(' hit not found in findhit for rect-rect');
        return true;
      }
    } else if (other.constructor.name === 'Circle') {
      for (let i = 0; i < lines.length; i++) {
        result = other.findIntersection(lines[i]);
        if (result) {
          console.log('found hit is:');
          console.log(' point: ',result[0]);
          console.log(' normal: ',result[1]);
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
    }
    return hit;
  }

// } else if (other.constructor.name === 'Line') {
//   let p1 = other.pts[0];
//   let p2 = other.pts[1];
//   hit = collideLinePoly(p1.x, p1.y, p2.x, p2.y, vects);

// } else if (other.constructor.name === 'Vector') {
//   let {x, y} = other;
//   hit = collidePointPoly(x, y, vects);


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
        console.log('detected hit on CORNER');
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
        console.log('detected hit MIDWAY on a line');
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
    return quad(p1.x, p1.y, p2.x, p2.y, p3.x, p3.y, p4.x, p4.y);
  }

  render() {
    fill(this.color);
    this.item();
  }
}

class Line {
  constructor (x1, y1, x2, y2){
    let p1 =  new __WEBPACK_IMPORTED_MODULE_0__vector_js__["a" /* default */](x1, y1);
    let p2 =  new __WEBPACK_IMPORTED_MODULE_0__vector_js__["a" /* default */](x2, y2);
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
  constructor (x, y, diam, color='green', height=diam) {
    this.diam = diam;
    this.height = height;
    this.pos = new __WEBPACK_IMPORTED_MODULE_0__vector_js__["a" /* default */](x, y);
    this.color = color;
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
      console.log('no hit rect-circle');
      return undefined;
    } else {
      let p1x = (D * dy + xTopEnd) / Math.pow(dr, 2);
      let p1y = (-D * dx + yTopEnd) / Math.pow(dr, 2);
      if (delta === 0) {
        // one intersection
        console.log('hit circle TANGENCY');
        let rel = new __WEBPACK_IMPORTED_MODULE_0__vector_js__["a" /* default */](p1x, p1y);
        let pt = this.pos.add(rel);
        let normal = this.normal(pt);
        return [pt, normal];
      } else {
        // two intersections
        console.log('hit circle TWO POINTS');
        let p2x = (D * dy - xTopEnd) / Math.pow(dr, 2);
        let p2y = (-D * dx + yTopEnd) / Math.pow(dr, 2);
        let avgX = (p1x + p2x)*0.5;
        let avgY = (p1y + p2y)*0.5;
        let rel = new __WEBPACK_IMPORTED_MODULE_0__vector_js__["a" /* default */](p1x, p1y);
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
    fill(this.color);
    this.item();
  }
}




/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__shapes_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__cat_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__person_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__vector_js__ = __webpack_require__(0);





// top down items
// https://opengameart.org/content/top-down-2d-rpg
// good tables
// https://opengameart.org/content/tables-and-stools

// good grass
// https://opengameart.org/content/yellowish-green-grass-tileset

class Level {
  constructor({x, y, width, height, color, view}){
    this.color = color;
    this.pos = new __WEBPACK_IMPORTED_MODULE_3__vector_js__["a" /* default */](x, y);
    this.size = new __WEBPACK_IMPORTED_MODULE_3__vector_js__["a" /* default */](width, height);
    p5.prototype.collideDebug(true);
    // this.bg = loadImage("assets/images/grass2.png");

    // walls
    this.hitable = this.makeWalls(10);
    this.movable = [];

    // tree
    // this.hitable.push( new Circle(200, 200, 100, 'blue') );
    // this.hitable.push( new Circle(400, 200, 100, 'blue') );

    // obstacles
    let rect1 = new __WEBPACK_IMPORTED_MODULE_0__shapes_js__["a" /* TiltedRect */](100, 200, 120, 120, 'blue', -PI/4);
    this.hitable.push( rect1 );

    let rect2 = new __WEBPACK_IMPORTED_MODULE_0__shapes_js__["a" /* TiltedRect */](400, 200, 120, 120, 'blue', -PI/4);
    this.hitable.push( rect2 );

    this.person = new __WEBPACK_IMPORTED_MODULE_2__person_js__["a" /* default */](700, 200);
    this.hitable.push( this.person );
    this.movable.push( this.person );

    // console.log(this.hitable);

    // Make the cats
    for(let i=0; i<4; i++){
      let hit = true;
      let item;
      while (hit){
        let loc = this.randomLoc();
        item = new __WEBPACK_IMPORTED_MODULE_1__cat_js__["a" /* default */](loc.x, loc.y);
        // item = new Circle(loc.x, loc.y, 25, 'red');
        hit = false;
        for (let j = 0; j < this.hitable.length; j++) {
          let other = this.hitable[j];
          let catSquare = item.shapes[0];
          hit = other.hits(catSquare);
          if (hit) {
            break;
          }
        }
      }
      this.hitable.push(item);
      this.movable.push(item);
    } // done placing cats
    this.addListeners();
  }

  addListeners() {
    document.addEventListener("keydown", (e) => {
      let keyCode = e.keyCode;
      if(keyCode === 32) {
        this.toggleMove();
      }
    }, false);
  }

  toggleMove(){
    this.movable.forEach(item => item.toggleMove());
  }

  makeWalls(thick){
    let walls = [];
    let delta = 1;
    walls.push( new __WEBPACK_IMPORTED_MODULE_0__shapes_js__["a" /* TiltedRect */](0, -thick+delta, thick, this.size.x, 'black', 0) );
    walls.push( new __WEBPACK_IMPORTED_MODULE_0__shapes_js__["a" /* TiltedRect */](this.size.x-delta, 0, this.size.y, thick, 'black', 0) );
    walls.push( new __WEBPACK_IMPORTED_MODULE_0__shapes_js__["a" /* TiltedRect */](0, this.size.y-delta, thick, this.size.x, 'black', 0) );
    walls.push( new __WEBPACK_IMPORTED_MODULE_0__shapes_js__["a" /* TiltedRect */](-thick+delta, 0, this.size.y, thick, 'black', 0) );
    return walls;
  }

  randomLoc(){
    let x = Math.random()*this.size.x;
    let y = Math.random()*this.size.y;
    return this.pos.add(new __WEBPACK_IMPORTED_MODULE_3__vector_js__["a" /* default */](x, y));
  }

  render(){
    // console.log('in level render');
    // console.log('IN LEVEL, calling render');
    clear();
    this.movable.forEach(item => item.move(this.hitable));
    // background(0);
    this.hitable.forEach (item => item.render());
  }
}

/* harmony default export */ __webpack_exports__["a"] = Level;


/***/ }),
/* 3 */,
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__level_js__ = __webpack_require__(2);


function setup() {
  let width = 800;
  let height = width/2;
  createCanvas(width, height);
  frameRate(30);
  window.game = new Game();
}

function draw() {
  window.game.render();
}

document.addEventListener("DOMContentLoaded", () => {
  window.setup = setup;
  window.draw = draw;
});


// licenses
// CAT_MEW 'https://freesound.org/people/steffcaffrey/sounds/262312/' CREATIVE COMMONS
// CAT_ANGRY http://soundbible.com/1684-Cat-Meowing-2.html ATTRIBUTION
// CAT ANGRIER http://soundbible.com/1509-Cat-Scream.html ATTRIBUTION

class Game {
  constructor() {
    this.level = new __WEBPACK_IMPORTED_MODULE_0__level_js__["a" /* default */]({x: 0, y: 0, width: 800, color: 'green', height: 400});
  }
  render(){
    this.level.render();
  }
}


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__shapes_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__vector_js__ = __webpack_require__(0);






class Cat {
  constructor (x, y) {
    this.pos = new __WEBPACK_IMPORTED_MODULE_1__vector_js__["a" /* default */](x, y);
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
    let rel = new __WEBPACK_IMPORTED_MODULE_1__vector_js__["a" /* default */](length*0.5 - headDiam, 0).rotate(angleRad);
    let headLoc = this.pos.add(rel);
    let head = new __WEBPACK_IMPORTED_MODULE_0__shapes_js__["b" /* Circle */](headLoc.x, headLoc.y, this.headDiam, this.color);

    let p1 = new __WEBPACK_IMPORTED_MODULE_1__vector_js__["a" /* default */](-length/2, -width/2).rotate(angleRad).add(pos);
    let bodyArr = [
      p1.x,
      p1.y,
      width,
      this.length-this.headDiam/2,
      this.color,
      angleRad
    ];
    let body = new __WEBPACK_IMPORTED_MODULE_0__shapes_js__["a" /* TiltedRect */](...bodyArr);
    // this.shapes = [body, head]; //original cat plotting
    this.shapes = [body, head];
  }
  calcDirection(){
    return new __WEBPACK_IMPORTED_MODULE_1__vector_js__["a" /* default */](Math.cos(this.angleRad), Math.sin(this.angleRad));
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

/* harmony default export */ __webpack_exports__["a"] = Cat;


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__shapes_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__vector_js__ = __webpack_require__(0);






class Person {
  constructor (x, y) {
    this.pos = new __WEBPACK_IMPORTED_MODULE_1__vector_js__["a" /* default */](x, y);
    this.dir = new __WEBPACK_IMPORTED_MODULE_1__vector_js__["a" /* default */](0, 0);
    this.speed = 2.5;
    this.color = 'red';
    this.canMove = true;
    this.headDiam = 25;
    this.width = 50;
    this.makeShapes();
  }
  clearDir(){
    this.dir = new __WEBPACK_IMPORTED_MODULE_1__vector_js__["a" /* default */](0, 0);
  }
  up(){
    this.dir = new __WEBPACK_IMPORTED_MODULE_1__vector_js__["a" /* default */](0, -1);
  }
  down(){
    this.dir = new __WEBPACK_IMPORTED_MODULE_1__vector_js__["a" /* default */](0, 1);
  }
  left(){
    this.dir = new __WEBPACK_IMPORTED_MODULE_1__vector_js__["a" /* default */](-1, 0);
  }
  right(){
    this.dir = new __WEBPACK_IMPORTED_MODULE_1__vector_js__["a" /* default */](1, 0);
  }

  toggleMove(){
    this.canMove = !this.canMove;
  }

  makeShapes(){
    let {width, pos, headDiam, color} = this;
    let head = new __WEBPACK_IMPORTED_MODULE_0__shapes_js__["b" /* Circle */](pos.x, pos.y, headDiam, color);

    let p1 = new __WEBPACK_IMPORTED_MODULE_1__vector_js__["a" /* default */](-headDiam/2, -width/2).add(pos);
    let bodyArr = [
      p1.x,
      p1.y,
      width,
      headDiam,
      color,
      0
    ];
    let body = new __WEBPACK_IMPORTED_MODULE_0__shapes_js__["a" /* TiltedRect */](...bodyArr);
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
      if (!this.dir.equals(new __WEBPACK_IMPORTED_MODULE_1__vector_js__["a" /* default */](0, 0))) {
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

/* harmony default export */ __webpack_exports__["a"] = Person;


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map