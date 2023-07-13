import { Box as DreiBox } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { ComponentProps, useRef } from "react";

type Props = ComponentProps<typeof DreiBox> & {
  fragmentShader: string;
};

const vertexShader = `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
`;

export const ShadedBox: React.FC<Props> = ({ fragmentShader, ...props }) => {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const uTimeRef = useRef(0);
  const ref = useRef<THREE.Mesh>(null);
  useFrame((three, delta) => {
    if (materialRef.current) {
      uTimeRef.current += delta;
      materialRef.current.uniforms.uTime = { value: uTimeRef.current };
    }
  });

  return (
    <DreiBox {...props}>
      <shaderMaterial
        attach="material"
        fragmentShader={fragmentShader}
        vertexShader={vertexShader}
        // uniforms={{ uTime: { value: uTimeRef.current } }}
        ref={materialRef}
      />
    </DreiBox>
  );
};
