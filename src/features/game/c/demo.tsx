import { useState } from "react";
import { RoundedBox, PointerLockControls, useCursor } from "@react-three/drei";
import { Bobbing } from "./bobbing";
import { Camera } from "./camera";
import { KbMovable } from "./kbmovable";
import { Skybox } from "./skybox";
import { Box } from "./box";

export const Demo = () => (
  <group>
    <Skybox />
    <ambientLight intensity={0.3} />
    <PointerLockControls selector="canvas" />
    <Camera position={[0, 0, 0]} />
    <Bobbing amplitude={0.025} duration={350}>
      <KbMovable speed={0.5}>
        <Box
          position={[0, -0.6, 0]}
          scale={[50, 0.2, 50]}
          color="mediumseagreen"
          receiveShadow
        />
        <pointLight position={[15, 10, 1]} intensity={0.5} castShadow />
        <Box
          position={[-7.5, 0, -9]}
          scale={[1, 1, 16]}
          collide
          castShadow
          receiveShadow
        />
        <Box
          position={[-4, 0, -1.5]}
          scale={[6, 1, 1]}
          collide
          castShadow
          receiveShadow
        />
        <Box
          position={[4, 0, -1.5]}
          scale={[6, 1, 1]}
          collide
          castShadow
          receiveShadow
        />
        <Box
          position={[7.5, 0, -9]}
          scale={[1, 1, 16]}
          collide
          castShadow
          receiveShadow
        />
        <Box
          position={[1.5, 0, -3.5]}
          scale={[1, 1, 3]}
          collide
          castShadow
          receiveShadow
        />
        <Box
          position={[-0.5, 0, -4.5]}
          scale={[3, 1, 1]}
          collide
          castShadow
          receiveShadow
        />
        <Box
          position={[-4.5, 0, -7.5]}
          scale={[1, 1, 7]}
          collide
          castShadow
          receiveShadow
        />
        <Box
          position={[-2.5, 0, -13.5]}
          scale={[9, 1, 1]}
          collide
          castShadow
          receiveShadow
        />
        <Box
          position={[1.5, 0, -11.5]}
          scale={[1, 1, 3]}
          collide
          castShadow
          receiveShadow
        />
        <Box
          position={[4.5, 0, -9]}
          scale={[1, 1, 10]}
          collide
          castShadow
          receiveShadow
        />
        <Box
          position={[1, 0, -16.5]}
          scale={[12, 1, 1]}
          collide
          castShadow
          receiveShadow
        />
        <Box
          position={[1, 0, -7.5]}
          scale={[6, 1, 1]}
          collide
          castShadow
          receiveShadow
        />
        <Box
          position={[-1.5, 0, -9.5]}
          scale={[1, 1, 3]}
          collide
          castShadow
          receiveShadow
        />
        <Box
          position={[-3, 0, -10.5]}
          scale={[2, 1, 1]}
          collide
          castShadow
          receiveShadow
        />
      </KbMovable>
    </Bobbing>
  </group>
);
