import { FC, useRef } from "react";
import { useThree } from "@react-three/fiber";
import { Point } from "app/math/point";

interface Props {
  near?: number;
  far?: number;
  position?: Point;
}

export const Camera: FC<Props> = ({ near, far, position = [0, 0, 0] }) => {
  const init = useRef(false);
  useThree(({ camera }) => {
    if (!init.current) {
      init.current = true;
      if (typeof near === "number") camera.near = near;
      if (typeof far === "number") camera.far = far;
      camera.position.set(position[0], position[1], position[2]);
    }
  });
  return null;
};
