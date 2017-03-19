import MandelbrotViewer from './MandelbrotViewer';

const canvas = document.getElementById('canvas');
const reset = document.getElementById('reset');
const form = document.getElementById('form');
const zoom = document.getElementById('zoom');
const precision = document.getElementById('precision');
const download = document.getElementById('download');

let view = new MandelbrotViewer();

const render = () => { view.render(canvas) };

const getMousePos = (canvas, event) => {
  let rect = canvas.getBoundingClientRect();
  let x = event.clientX - rect.left;
  let y = event.clientY - rect.top;
  return {x, y};
};

const onclick = (invert = false) => {
  let value = invert ? 1/zoom.value : zoom.value;
  return (e) => {
    view.moveTo(canvas, getMousePos(canvas, e));
    view.magnify(value);
    render();
  }
}

canvas.addEventListener('click', onclick());

canvas.addEventListener('contextmenu', (e) => {
  e.preventDefault();
  onclick(true)(e);
});

reset.addEventListener('click', (e) => {
  view = new MandelbrotViewer();
  render();
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  view.precision = precision.value;
  render();
});

download.addEventListener('click', (e) => {
  const img = canvas
    .toDataURL("image/png")
    .replace('image/octet-stream');
  download.href = img;
  download.download = 'mandelbrot.png';
});

render();
