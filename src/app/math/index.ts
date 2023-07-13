export const PI = Math.PI;

export const abs = (x: number) => Math.abs(x);
export const clamp = (x: number, min = 0, max = 1) =>
  x < min ? min : x > max ? max : x;
export const rad = (deg: number) => (deg / 180) * Math.PI;
export const range = (x: number) => Array.from(Array(x).keys());
export const lerp = (a: number, b: number, t: number) => a * (1 - t) + b * t;

export const pow = (x: number, s: number = 2) => Math.pow(x, s);
export const rand = (a: number, b: number) => lerp(a, b, Math.random());
export const irand = (x: number) => Math.floor(Math.random() * x);

// easeInOut function based on
// https://github.com/CreateJS/TweenJS/blob/master/src/tweenjs/Ease.js
export const easeInOut = (t: number, p = 2) =>
  (t *= 2) < 1 ? 0.5 * pow(t, p) : 1 - 0.5 * abs(pow(2 - t, p));
export const easeIn = (t: number, p = 2) => pow(t, p);
export const easeOut = (t: number, p = 2) => 1 - pow(1 - t, p);
export const linear = (x: number) => x;
