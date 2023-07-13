import { FC, ReactNode, useRef, useEffect, useState } from "react";
import { useAnimation } from "app/animation";
import { useInterval } from "app/interval";
import { useSelector } from "app/store";
import { irand, lerp } from "app/math";
import { Group } from "three";
import { NumberLiteralType } from "typescript";

interface Props {
  children?: ReactNode;
  duration?: number;
  amplitude?: number;
}

export const Bobbing: FC<Props> = ({
  children,
  duration = 500,
  amplitude = 0.05,
}) => {
  const { kb } = useSelector(s => s);
  const active = kb.KeyW || kb.KeyA || kb.KeyS || kb.KeyD;
  const ref = useRef<Group>(null);
  const [side, setSide] = useState(0);

  useAnimation(side, duration, (x, three, delta) => {
    if (ref.current) {
      ref.current.position.y = amplitude * x;
    }
  });

  useInterval(() => {
    setSide(side => side * -1);
  }, duration);

  useEffect(() => {
    setSide(active ? lerp(-1, 1, irand(2)) : 0);
  }, [active]);

  return <group ref={ref}>{children}</group>;
};
