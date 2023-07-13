import React, { ReactNode, useEffect, useRef } from "react";
import { shaderMaterial, Plane, RenderTexture } from "@react-three/drei";
import { extend } from "@react-three/fiber";
import { Color, Texture, Vector2 } from "three";

// Custom fragment shader code
const fragmentShader = `
  uniform vec2 uResolution;
  uniform float uTime;
  uniform sampler2D colorMap;
  varying vec2 vUv;
  
  void main() {
    vec2 uv = vUv;
    uv = floor(uv * uResolution) / uResolution;
    vec4 color = texture(colorMap, uv);
    
    if (color.a < 0.9) {
        discard;
    }
    
    gl_FragColor = color;
  }
`;

const vertexShader = `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
`;

// Extend the shader material from drei to include the custom shader code
const CustomShaderMaterial = shaderMaterial(
  {
    time: 0.0, // Custom uniform variable
    resolution: new Vector2(), // Custom uniform variable
    colorMap: new Texture(),
  },
  vertexShader,
  fragmentShader
);

extend({ CustomShaderMaterial });

declare global {
  namespace JSX {
    interface IntrinsicElements {
      customShaderMaterial: any; // Declare the customShaderMaterial component as valid JSX
    }
  }
}

type ShaderPlaneProps = {
  shaderCode: string;
  size: number;
  children?: ReactNode;
};

export const ShaderRenderPlane: React.FC<ShaderPlaneProps> = ({
  shaderCode,
  size,
  children,
}) => {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const renderTextureRef = useRef<THREE.Texture>(null);
  useEffect(() => {
    if (materialRef.current && renderTextureRef.current) {
      materialRef.current.uniforms.colorMap.value = renderTextureRef.current;
    }
  }, []);

  return (
    <Plane args={[1, 1]} position={[0, 0, -0.2]}>
      <shaderMaterial
        ref={materialRef}
        attach="material"
        uniforms={{
          uTime: { value: 0 },
          uResolution: {
            value: new Vector2(size, size),
          },
          colorMap: { value: new Texture() },
        }}
        fragmentShader={fragmentShader}
        vertexShader={vertexShader}
      />
      <RenderTexture ref={renderTextureRef} anisotropy={16}>
        {children}
      </RenderTexture>
    </Plane>
  );
};
