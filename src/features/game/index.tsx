import { Canvas } from "@react-three/fiber";
import { Scene } from "./c/scene";

export const Game = () => (
  <Canvas shadows>
    <Scene />
  </Canvas>
);
