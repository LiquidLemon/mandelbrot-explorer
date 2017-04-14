import MandelbrotViewer from './lib/MandelbrotViewer';
import * as Gradients from './lib/Gradients';

const canvas = document.getElementById('canvas');
const reset = document.getElementById('reset');
const form = document.getElementById('form');
const zoom = document.getElementById('zoom');
const precision = document.getElementById('precision');
const download = document.getElementById('download');
const colorscheme = document.getElementById('colorscheme');
const canvasSize = document.getElementById('canvasSize');
const centerR = document.getElementById('centerR');
const centerI = document.getElementById('centerI');
const width = document.getElementById('width');

document.querySelectorAll('input[type="number"]').forEach((i) => {
  i.step = Number.MIN_VALUE;
});

Object.keys(Gradients).forEach((scheme) => {
  const option = document.createElement('option');
  option.value = option.innerHTML = scheme;
  colorscheme.appendChild(option);
});

let view = new MandelbrotViewer();

const update = () => {
  view.precision = Number.parseInt(precision.value);
  canvas.width = canvas.height = Number.parseInt(canvasSize.value);

  view.render(canvas, colorscheme.value);

  centerR.value = view.center.r;
  centerI.value = view.center.i;
  width.value = view.width;
};

const updateSettings = () => {
  view.width = view.height = Number.parseFloat(width.value);
  view.center.r = Number.parseFloat(centerR.value);
  view.center.i = Number.parseFloat(centerI.value);
  update();
};

const getMousePos = (canvas, event) => {
  let rect = canvas.getBoundingClientRect();
  let x = event.clientX - rect.left;
  let y = event.clientY - rect.top;
  return {x, y};
};

const magnify = (invert = false) => {
  let z = Number.parseInt(zoom.value);
  let value = invert ? 1/z : z;
  return (e) => {
    view.moveTo(canvas, getMousePos(canvas, e));
    view.magnify(value);
    update();
  }
}

canvas.addEventListener('click', magnify());

canvas.addEventListener('contextmenu', (e) => {
  e.preventDefault();
  magnify(true)(e);
});

reset.addEventListener('click', (e) => {
  view = new MandelbrotViewer();
  update();
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  update();
});

form.addEventListener('change', updateSettings);

download.addEventListener('click', (e) => {
  const img = canvas
    .toDataURL("image/png")
    .replace('image/octet-stream');
  download.href = img;
  const filename =
    `mandelbrot_${centerR.value}_${centerI.value}_${width.value}.png`;
  download.download = filename;
});

update();
