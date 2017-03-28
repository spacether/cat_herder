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

  divideBy(other){
    return this.mult(1/other);
  }

  dotProd(other){
    return (this.x*other.y + this.y * other.x);
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

// let v = new Vector(1,2);
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__vector_js__ = __webpack_require__(0);



// top down items
// https://opengameart.org/content/top-down-2d-rpg
// good tables
// https://opengameart.org/content/tables-and-stools

// good grass
// https://opengameart.org/content/yellowish-green-grass-tileset

class Level {
  constructor({x, y, width, height, color, view}){
    background(color);
    this.pos = new __WEBPACK_IMPORTED_MODULE_1__vector_js__["a" /* default */](x, y);
    this.size = new __WEBPACK_IMPORTED_MODULE_1__vector_js__["a" /* default */](width, height);

    // walls
    let lines = new __WEBPACK_IMPORTED_MODULE_0__shapes_js__["a" /* TiltedRect */](x, height, width, height).lines();
    this.hitable = lines;

    // tree
    this.hitable.push( new __WEBPACK_IMPORTED_MODULE_0__shapes_js__["b" /* Circle */](100, 100, 100, 'darkgreen') );

    // obstacles
    let rect1 = new __WEBPACK_IMPORTED_MODULE_0__shapes_js__["a" /* TiltedRect */](300, 300, 20, 60, 'blue', 0);
    this.hitable.push( rect1 );

    let rect2 = new __WEBPACK_IMPORTED_MODULE_0__shapes_js__["a" /* TiltedRect */](450, 300, 20, 120, 'blue', Math.PI/8);
    this.hitable.push( rect2 );
    console.log(this.hitable);

    // doing hit test
    // let tree = this.hitable[0];
    // // console.log(tree.x);
    // // console.log(tree.y);
    for(let i=0; i<20; i++){
      let hit = true;
      let redCirc;
      while (hit){
        let loc = this.randomLoc();
        console.log(loc);
        redCirc = new __WEBPACK_IMPORTED_MODULE_0__shapes_js__["b" /* Circle */](loc.x, loc.y, 25, 'red');
        hit = false;
        for (let j = 0; j < this.hitable.length; j++) {
          hit = redCirc.hits(this.hitable[j]);
          if (hit) break;
        }
        console.log(hit);
      }
      this.hitable.push(redCirc);
    }
    console.log(this.hitable);
  }

  randomLoc(){
    let x = Math.random()*this.size.x;
    let y = Math.random()*this.size.y;
    return this.pos.add(new __WEBPACK_IMPORTED_MODULE_1__vector_js__["a" /* default */](x, y));
  }

  render(){
    // console.log('in level render');
    // console.log('IN LEVEL, calling render');
    this.hitable.forEach (item => item.render());
  }
}

/* harmony default export */ __webpack_exports__["a"] = Level;


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__vector_js__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TiltedRect; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return Circle; });


class TiltedRect {
  constructor (x, y, width, height, color='blue', angleRad = 0) {
    this.diam = 50;
    this.pos = new __WEBPACK_IMPORTED_MODULE_0__vector_js__["a" /* default */](x, y);
    this.angleRad = angleRad;
    this.color = color;
    let p1 = this.pos;
    let rel = new __WEBPACK_IMPORTED_MODULE_0__vector_js__["a" /* default */](Math.cos(-this.angleRad), Math.sin(-this.angleRad)).mult(width);
    let p2 = p1.add(rel);
    rel = new __WEBPACK_IMPORTED_MODULE_0__vector_js__["a" /* default */](-Math.sin(-this.angleRad), Math.cos(-this.angleRad)).mult(-height);
    let p3 = p2.add(rel);
    rel = new __WEBPACK_IMPORTED_MODULE_0__vector_js__["a" /* default */](Math.cos(-this.angleRad), Math.sin(-this.angleRad)).mult(-width)
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
    let p1 =  new __WEBPACK_IMPORTED_MODULE_0__vector_js__["a" /* default */](x1, y1);
    let p2 =  new __WEBPACK_IMPORTED_MODULE_0__vector_js__["a" /* default */](x2, y2);
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
    this.pos = new __WEBPACK_IMPORTED_MODULE_0__vector_js__["a" /* default */](x, y);
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


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map