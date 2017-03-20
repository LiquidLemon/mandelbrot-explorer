import MandelbrotViewer from './MandelbrotViewer';
import * as Gradients from './Gradients';

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
  view.precision = precision.value;
  canvas.width = canvas.height = canvasSize.value;

  view.render(canvas, colorscheme.value);

  console.log(view.center.r, view.center.i);
  centerR.value = view.center.r;
  centerI.value = view.center.i;
  width.value = view.width;
};

const updateSettings = () => {
  view.width = view.height = width.value;
  view.center.r = centerR.value;
  view.center.i = centerI.value;
  update();
};

const getMousePos = (canvas, event) => {
  let rect = canvas.getBoundingClientRect();
  let x = event.clientX - rect.left;
  let y = event.clientY - rect.top;
  return {x, y};
};

const magnify = (invert = false) => {
  let value = invert ? 1/zoom.value : zoom.value;
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
  download.download = 'mandelbrot.png';
});

update();
