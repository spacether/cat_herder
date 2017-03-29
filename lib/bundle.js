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
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__shapes_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__actors_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__vector_js__ = __webpack_require__(0);




// top down items
// https://opengameart.org/content/top-down-2d-rpg
// good tables
// https://opengameart.org/content/tables-and-stools

// good grass
// https://opengameart.org/content/yellowish-green-grass-tileset

class Level {
  constructor({x, y, width, height, color, view}){
    this.color = color;
    this.pos = new __WEBPACK_IMPORTED_MODULE_2__vector_js__["a" /* default */](x, y);
    this.size = new __WEBPACK_IMPORTED_MODULE_2__vector_js__["a" /* default */](width, height);
    p5.prototype.collideDebug(true);

    // walls
    this.hitable = this.makeWalls(10);
    this.movable = [];

    // tree
    this.hitable.push( new __WEBPACK_IMPORTED_MODULE_0__shapes_js__["a" /* Circle */](100, 100, 100, 'darkgreen') );

    // obstacles
    let rect1 = new __WEBPACK_IMPORTED_MODULE_0__shapes_js__["b" /* TiltedRect */](300, 300, 20, 100, 'blue', -Math.PI/2);
    this.hitable.push( rect1 );

    let rect2 = new __WEBPACK_IMPORTED_MODULE_0__shapes_js__["b" /* TiltedRect */](450, 300, 20, 120, 'blue', -Math.PI*5/8);
    this.hitable.push( rect2 );
    console.log(this.hitable);

    // Make the cats
    for(let i=0; i<2; i++){
      let hit = true;
      let item;
      while (hit){
        let loc = this.randomLoc();
        item = new __WEBPACK_IMPORTED_MODULE_1__actors_js__["a" /* Cat */](loc.x, loc.y);
        // item = new Circle(loc.x, loc.y, 25, 'red');
        hit = false;
        for (let j = 0; j < this.hitable.length; j++) {
          hit = item.hits(this.hitable[j]);
          if (hit) break;
        }
      }
      this.hitable.push(item);
      this.movable.push(item);
    }

  }

  makeWalls(thick){
    let walls = [];
    let delta = 1;
    walls.push( new __WEBPACK_IMPORTED_MODULE_0__shapes_js__["b" /* TiltedRect */](0, -thick+delta, thick, this.size.x, 'black', 0) );
    walls.push( new __WEBPACK_IMPORTED_MODULE_0__shapes_js__["b" /* TiltedRect */](this.size.x-delta, 0, this.size.y, thick, 'black', 0) );
    walls.push( new __WEBPACK_IMPORTED_MODULE_0__shapes_js__["b" /* TiltedRect */](0, this.size.y-delta, thick, this.size.x, 'black', 0) );
    walls.push( new __WEBPACK_IMPORTED_MODULE_0__shapes_js__["b" /* TiltedRect */](-thick+delta, 0, this.size.y, thick, 'black', 0) );
    return walls;
  }

  randomLoc(){
    let x = Math.random()*this.size.x;
    let y = Math.random()*this.size.y;
    return this.pos.add(new __WEBPACK_IMPORTED_MODULE_2__vector_js__["a" /* default */](x, y));
  }

  render(){
    // console.log('in level render');
    // console.log('IN LEVEL, calling render');
    this.movable.forEach(item => item.move(this.hitable));
    background(this.color);
    this.hitable.forEach (item => item.render());
  }
}

/* harmony default export */ __webpack_exports__["a"] = Level;


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__vector_js__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return TiltedRect; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Circle; });
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
    this.pos = new __WEBPACK_IMPORTED_MODULE_0__vector_js__["a" /* default */](x, y);
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




/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__level_js__ = __webpack_require__(1);


function setup() {
  createCanvas(800, 400);
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
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__shapes_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__vector_js__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Cat; });



class Cat {
  constructor (x, y) {
    this.pos = new __WEBPACK_IMPORTED_MODULE_1__vector_js__["a" /* default */](x, y);
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
    let rel = new __WEBPACK_IMPORTED_MODULE_1__vector_js__["a" /* default */](length*0.5 - headDiam, 0).rotate(angleRad);
    let headLoc = this.pos.add(rel);
    let head = new __WEBPACK_IMPORTED_MODULE_0__shapes_js__["a" /* Circle */](headLoc.x, headLoc.y, this.headDiam, this.color);

    let p1 = new __WEBPACK_IMPORTED_MODULE_1__vector_js__["a" /* default */](-length/2, -width/2).rotate(angleRad).add(pos);
    let bodyArr = [
      p1.x,
      p1.y,
      width,
      this.length-this.headDiam/2,
      this.color,
      angleRad
    ];
    let body = new __WEBPACK_IMPORTED_MODULE_0__shapes_js__["b" /* TiltedRect */](...bodyArr);
    this.shapes = [body, head];
  }
  calcDirection(){
    return new __WEBPACK_IMPORTED_MODULE_1__vector_js__["a" /* default */](Math.cos(this.angleRad), Math.sin(this.angleRad));
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
      let finalAng = newVect.angleTo(new __WEBPACK_IMPORTED_MODULE_1__vector_js__["a" /* default */](1,0));
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




/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map