import Complex from './Complex';
import * as Gradients from './Gradients';

export default class MandelbrotViewer {
  constructor() {
    this.center = { r: -0.75, i: 0.0 };
    this.width = 2.5;
    this.height = 2.5;
    this.precision = 100;
  }

  render(canvas, colorscheme) {
    const ctx = canvas.getContext('2d');
    const data = ctx.createImageData(canvas.width, canvas.height);
    const colors = this.constructor.getColors(this.precision, colorscheme);
    const step = {
      r: this.width / canvas.width,
      i: this.height / canvas.height
    };
    const start = {
      r: this.center.r - this.width/2,
      i: this.center.i - this.height/2
    };

    for (let x = 0; x < canvas.width; x++) {
      for (let y = 0; y < canvas.width; y++) {
        const point = new Complex(start.r + step.r * x, start.i + step.i * y);
        const offset = (x + y * canvas.width) * 4;
        const level = this.constructor.getLevel(point, this.precision-1);
        const color = colors[level];

        data.data[offset] = color.r;
        data.data[offset + 1] = color.g;
        data.data[offset + 2] = color.b;
        data.data[offset + 3] = color.a;
      }
    }

    ctx.putImageData(data, 0, 0);
  }

  magnify(magnitude) {
    this.width /= magnitude;
    this.height /= magnitude;
  }

  moveTo(canvas, pos) {
    pos = { x: pos.x - canvas.width/2, y: pos.y - canvas.height/2 };
    let trans = {
      r: pos.x/(canvas.width/2)*(this.width/2),
      i: pos.y/(canvas.height/2)*(this.height/2),
    };
    this.center.r += trans.r;
    this.center.i += trans.i;
  }

  static getColors(amount, colorscheme) {
    return Gradients[colorscheme](amount);
  }

  static getLevel(point, maxLevel) {
    let result = new Complex(0, 0);
    let i;
    for (i = 0; i < maxLevel && result.squareAbs() < 4; i++) {
      result = result.square().add(point);
    }
    return i;
  }

}
