import { RootState, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { clamp, lerp, linear } from "app/math";

export const useAnimation = (
  x: number,
  duration: number,
  cb: (x: number, three: RootState, delta: number) => void,
  easing?: (x: number) => number
) => {
  const _e = easing || linear;
  const b = useRef(x);
  const a = useRef(x);
  const finished = useRef(true);

  const time = useRef(0);
  if (b.current !== x) {
    a.current = lerp(a.current, b.current, _e(time.current / duration)); // b.current;
    b.current = x;
    time.current = 0;
    finished.current = false;
  }
  useFrame((three, delta) => {
    time.current = clamp(time.current + delta * 1000, 0, duration);
    if (finished.current) return;
    if (time.current === duration) finished.current = true;
    cb(lerp(a.current, b.current, _e(time.current / duration)), three, delta);
  });
};
