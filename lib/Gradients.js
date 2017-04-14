import * as Colors from './Colors';

function gradient(n, lambda, whiteEnd = false) {
  const colors = [];
  const limit = whiteEnd ? n - 1 : n;
  for (let i = 0; i < limit; i++) {
    colors.push(lambda(i));
  }
  if (whiteEnd) {
    colors.push({r: 255, g: 255, b: 255, a: 255});
  }
  return colors;
}

export function rainbow(n) {
  return gradient(n, (i) => {
    let hue = ((i + 140) % 200 + 1) / 200;
    let c = Colors.hsvToRgb(hue, 1, 1);
    return {
      r: c[0],
      g: c[1],
      b: c[2],
      a: 255
    };
  }, true);
}

export function monochrome(n) {
  return gradient(n, (i) => {
    let c = Math.floor(i/n*255);
    return {
      r: c,
      g: c,
      b: c,
      a: 255
    };
  }, true);
}
