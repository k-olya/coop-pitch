import React, { useRef, useMemo } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";

export const Pixelate = ({ children }) => {
  const meshRef = useRef();
  const resolution = 64;
  const texture = useMemo(
    () => new THREE.WebGLRenderTarget(resolution, resolution),
    []
  );

  useFrame(three => {
    // Render children onto the texture
    meshRef.current.material.map = texture.texture;
    meshRef.current.material.needsUpdate = true;
    meshRef.current.visible = false;
    console.log(three);
    three.scene.renderer.setRenderTarget(texture);
    three.scene.renderer.render(meshRef.current.scene, meshRef.current.camera);
    meshRef.current.parent?.parent?.renderer.setRenderTarget(null);
    meshRef.current.visible = true;
  });

  return (
    <group>
      <mesh ref={meshRef}>
        <planeBufferGeometry args={[1, 1]} />
        <meshBasicMaterial attach="material" transparent>
          <primitive attach="map" object={texture.texture} />
        </meshBasicMaterial>
      </mesh>
      {children}
    </group>
  );
};
