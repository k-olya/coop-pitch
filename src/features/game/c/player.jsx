import * as THREE from "three";
import React, { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { useAnimations, useFBX, useGLTF } from "@react-three/drei";

export const mixamo = [
  "rifle aiming idle",
  "firing rifle",
  "hit reaction",
  "reloading",
  "rifle jump",
  "rifle run",
  "run backwards",
  "strafe left",
  "strafe right",
  "strafe",
  "toss grenade",
  "turn left",
  "turning right 45 degrees",
  "walking backwards",
  "walking",
];

export const Player = props => {
  const ref = useRef();
  const mixer = useRef();
  const i = useRef(0);
  const animations = useRef({});
  const anims = useFBX(mixamo.map(m => `./animations/${m}.fbx`));
  const model = useFBX("joe.fbx");
  useEffect(() => {
    mixer.current = new THREE.AnimationMixer(model);
    animations.current.t = mixer.current.clipAction(anims[1].animations[0]);
    mixamo.forEach((m, i) => {
      const animationAction = mixer.current.clipAction(anims[i].animations[0]);
      animations.current[m] = animationAction;
    });
    animations.current[mixamo[i.current]].play();

    const action = e => {
      const { code } = e;
      if (code === "ArrowUp") {
        animations.current[mixamo[i.current]].stop();
        i.current = (i.current - 1 + mixamo.length) % mixamo.length;
        animations.current[mixamo[i.current]].play();
      }
      if (code === "ArrowDown") {
        animations.current[mixamo[i.current]].stop();
        i.current = (i.current + 1) % mixamo.length;
        animations.current[mixamo[i.current]].play();
      }
    };
    window.addEventListener("keyup", action);
    return () => window.removeEventListener("keyup", action);
  }, []);
  useFrame((three, delta) => {
    mixer.current?.update(delta);
  });
  return (
    <group {...props} ref={ref}>
      <group>
        <primitive object={model} />
      </group>
    </group>
  );
};
