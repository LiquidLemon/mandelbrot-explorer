export default class Complex {
  constructor(r, i) {
    this.r = r;
    this.i = i;
  }

  add(other) {
    return new Complex(this.r + other.r, this.i + other.i);
  }

  square() {
    return new Complex(this.r * this.r - this.i * this.i, 2 * this.r * this.i);
  }

  squareAbs() {
    return this.r * this.r + this.i * this.i;
  }
}
