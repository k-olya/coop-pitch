import React, { FC, ReactNode, useEffect, useRef } from "react";
import { useThree, useFrame, extend } from "@react-three/fiber";
import {
  ShaderMaterial,
  WebGLRenderTarget,
  LinearFilter,
  NearestFilter,
  RGBAFormat,
} from "three";

// Shader code for the pixelation effect
const pixelationShader = {
  uniforms: {
    tDiffuse: { value: null },
    resolution: { value: { x: 1, y: 1 } },
  },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform sampler2D tDiffuse;
    uniform vec2 resolution;
    varying vec2 vUv;
    float pixelSize = 8.0; // Adjust this value to control pixel size

    void main() {
      vec2 xy = vUv.xy * resolution;
      xy = floor(xy * pixelSize) / pixelSize;
      gl_FragColor = texture2D(tDiffuse, xy / resolution);
    }
  `,
};

// Extend ShaderMaterial with the custom pixelation shader
extend({ ShaderMaterial });

interface Props {
  children?: ReactNode;
}

// Pixelate component
const Pixelate: FC<Props> = ({ children }) => {
  const { gl, size } = useThree();
  const pixelationMaterialRef = useRef<ShaderMaterial>(null);

  // Update the pixelation shader uniform values on each frame
  useFrame(() => {
    if (pixelationMaterialRef.current) {
      pixelationMaterialRef.current.uniforms.resolution.value = {
        x: size.width,
        y: size.height,
      };
    }
  });

  // Create the texture render target for pixelation
  const renderTarget = new WebGLRenderTarget(size.width, size.height, {
    minFilter: LinearFilter,
    magFilter: NearestFilter,
    format: RGBAFormat,
  });

  useEffect(() => {
    renderTarget.setSize(size.width, size.height);
  }, [size.width, size.height]);

  return (
    <>
      <group>
        {/* Render the scene to the texture using the pixelation shader */}
        <mesh position={[0, 0, 0]}>
          <planeGeometry args={[size.width, size.height]} />
          <shaderMaterial
            ref={pixelationMaterialRef}
            args={[pixelationShader]}
            uniforms-tDiffuse-value={renderTarget.texture}
          />
        </mesh>
      </group>
      {/* Render the pixelated texture onto the screen */}
      <mesh position={[0, 0, -1]}>
        <planeGeometry args={[size.width, size.height]} />
        <meshBasicMaterial map={renderTarget.texture} />
      </mesh>
      {children}
    </>
  );
};

export default Pixelate;
