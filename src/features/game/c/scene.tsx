import { useEffect, useRef, useState } from "react";
import {
  SoftShadows,
  RoundedBox,
  PointerLockControls,
  useCursor,
  Sphere,
  Icosahedron,
} from "@react-three/drei";
import { Bobbing } from "./bobbing";
import { Camera } from "./camera";
import { KbMovable } from "./kbmovable";
import { Skybox } from "./skybox";
import { Box } from "./box";
import { Demo } from "./demo";
import { Pixelate } from "./pixelate.jsx";
import { ShaderRenderPlane } from "./shader-render-plane";
import { ShadedBox } from "./shaded-box";
import { useAnimation } from "app/animation";
import { PI, lerp } from "app/math";
import { useDispatch, useSelector } from "app/store";
import { addAbility } from "features/ui/slice";
import { FBXPrimitive } from "./fbx-primitive";

const fragmentShader = `
// 'Warp Speed' by David Hoskins 2013.
// I tried to find gaps and variation in the star cloud for a feeling of structure.
// Inspired by Kali: https://www.shadertoy.com/view/ltl3WS

  uniform float uTime;
  varying vec2 vUv;
  
  void main() {
	vec2 uv = vUv - 0.5; //gl_FragCoord.xy / vec2(700.0, 1200.0) - 0.5;
    float time = (uTime+29.) * 120.0;

    float s = 0.0, v = 0.0;
	float t = time*0.005;
	uv.x += sin(t) * .3;
	float si = sin(t*1.5); // ...Squiffy rotation matrix!
	float co = cos(t);
	uv *= mat2(co, si, -si, co);
	vec3 col = vec3(0.0);
	vec3 init = vec3(0.25, 0.25 + sin(time * 0.001) * .1, time * 0.0008);
	for (int r = 0; r < 100; r++) 
	{
		vec3 p = init + s * vec3(uv, 0.143);
		p.z = mod(p.z, 2.0);
		for (int i=0; i < 10; i++)	p = abs(p * 2.04) / dot(p, p) - 0.75;
		v += length(p * p) * smoothstep(0.0, 0.5, 0.9 - s) * .002;
		// Get a purple and cyan effect by biasing the RGB in different ways...
		col +=  vec3(v * 0.8, 1.1 - s * 0.5, .7 + v * 0.5) * v * 0.013;
		s += .01;
	}
	gl_FragColor = vec4(col, 1.0);
}
`;
export const Scene = () => {
  const dispatch = useDispatch();
  const kbe = useSelector(s => s.kb.KeyE);
  const abilities = useSelector(s => s.ui.abilities);
  const [contraptionUnlocked, setContraptionUnlocked] = useState(false);
  const [hover, setHover] = useState(false);
  const leverRef = useRef<THREE.Mesh>(null);
  const wallRef = useRef<THREE.Mesh>(null);
  const timeoutRef = useRef<number | undefined>(undefined);
  const [wallX, setWallX] = useState(3.5);
  const [renderDoor, setRenderDoor] = useState(false);

  useEffect(() => {
    if (kbe) {
      if (typeof timeoutRef.current !== "number") {
        setContraptionUnlocked(true);
        timeoutRef.current = window.setTimeout(() => {
          timeoutRef.current = undefined;
          setContraptionUnlocked(false);
        }, 1500);
      }
    }
  }, [kbe]);
  useEffect(() => {
    window.setTimeout(() => {
      setRenderDoor(true);
    }, 500);
  }, []);
  useAnimation(Number(contraptionUnlocked), 250, (x, three, delta) => {
    if (leverRef.current && wallRef.current) {
      leverRef.current.rotation.x = lerp(PI / 5, (4 * PI) / 5, x);
      setWallX(lerp(3.5, 4.48, x));
    }
  });
  return (
    <group>
      <Skybox />
      <SoftShadows />
      <ambientLight intensity={0.15} />
      <KbMovable
        speed={1}
        gravity={3}
        sprint={abilities.includes("sprint")}
        jumpHeight={abilities.includes("jump") ? 1 : 0}
      >
        <Box
          position={[0, -1.5, 0]}
          scale={[50, 0.2, 50]}
          receiveShadow
          collide
          color="mediumseagreen"
        />
        {/* starting podium */}
        <Box position={[1, -1, 0]} scale={[8, 1, 1]} collide receiveShadow />
        {/* joe's button */}
        <Box
          position={[2, -0.5, 0]}
          scale={[0.25, 0.05, 0.25]}
          color="#f87171"
        />
        {/* back wall */}
        <Box position={[1, 0.5, 1]} scale={[8, 4, 1]} collide receiveShadow />
        {/* 1st wall block */}
        <Box position={[-1.5, 0, -1]} scale={[1, 1, 1]} collide castShadow />
        {/* 2nd wall block */}
        <Box
          position={[-1.5, 1, -4]}
          scale={[1, 1, 5]}
          collide
          castShadow
          color="#f87171"
        />
        {/* left wall */}
        <Box
          position={[-2.5, 0, -4.5]}
          scale={[1, 5, 10]}
          collide
          receiveShadow
        />
        {/* right wall */}
        <Box
          position={[4.5, 0.5, -4.5]}
          scale={[1, 4, 10]}
          collide
          receiveShadow
        />
        {/* right podium */}
        <Box position={[3.5, -1, -5.5]} scale={[1, 1, 10]} collide />
        {/* right movable wall */}
        <Box
          position={[wallX, 0, -3.5]}
          scale={[1, 1, 6]}
          collide
          color="#60a5fa"
          castShadow
          ref={wallRef}
        />
        {/* back podium */}
        <Box
          position={[-1, -0.5, -7]}
          scale={[8, 2, 1]}
          collide
          receiveShadow
        />
        {/* exit door */}
        {renderDoor && (
          <ShadedBox
            position={[0, 0.8, -7.525]}
            scale={[0.35, 0.6, 0.1]}
            fragmentShader={fragmentShader}
          />
        )}
        {/* back wall lever */}
        <group>
          <Box
            position={[2, 0.8, -7.525]}
            scale={[0.1, 0.15, 0.1]}
            receiveShadow
            color="gray"
          />
          <Box
            position={[2, 0.8, -7.475]}
            rotation={[Math.PI / 5, 0, 0]}
            scale={[0.035, 0.15, 0.035]}
            castShadow
            color="#2563eb"
            ref={leverRef}
          />
        </group>
        {/* back wall */}
        <Box position={[1, 0.5, -8]} scale={[8, 4, 1]} collide receiveShadow />
        <pointLight position={[0, 10, -5]} intensity={0.5} castShadow />
        <pointLight position={[0, 10, 0]} intensity={0.5} castShadow />
        {!abilities.includes("jump") && (
          <>
            <Box
              collide
              position={[-1.5, -0.25, 0]}
              scale={[0.1, 0.1, 0.1]}
              onCollide={() => dispatch(addAbility("jump"))}
            />
            <Sphere position={[-1.5, -0.25, 0]} scale={[0.1, 0.1, 0.1]}>
              {/* "#84cc16" */}
              <meshStandardMaterial color="orange" />
            </Sphere>
          </>
        )}
        {!abilities.includes("sprint") && (
          <>
            <Box
              collide
              position={[3.5, -0.25, 0]}
              scale={[0.05, 0.05, 0.05]}
              onCollide={() => dispatch(addAbility("sprint"))}
            />
            <Icosahedron position={[3.5, -0.25, 0]} scale={[0.1, 0.1, 0.1]}>
              <meshStandardMaterial color="orange" />
            </Icosahedron>
          </>
        )}
        <group
          scale={[0.4, 0.4, 0.4]}
          position={[2, -0.48, 0]}
          rotation={[0, 0, 0]}
        >
          <FBXPrimitive src="Detective2.fbx" />
        </group>
        <PointerLockControls selector="canvas" />
        <Camera position={[0, 0, 0]} />
      </KbMovable>
      <Camera position={[0, 0, 0]} />
    </group>
  );
};
