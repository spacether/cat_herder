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

  arr(){
    return [this.x, this.y];
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

export default Vector;

// let v = new Vector(0,1);
// console.log(v.angleTo(new Vector(1,0)));
// v = v.add(3);
// console.log(v);
// console.log(v.equals(new Vector(4, 5)));
// console.log(new Vector(3, 4).magnitude() === 5);
// console.log(new Vector(4, 4).divideBy(2).equals(new Vector(2,2)));
