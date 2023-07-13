import { Plane, useTexture } from "@react-three/drei";

export const Skybox = () => {
  const [bk, dn, ft, lf, rt, up] = useTexture([
    "/alt_bk.jpg",
    "/alt_dn.jpg",
    "/alt_ft.jpg",
    "/alt_lf.jpg",
    "/alt_rt.jpg",
    "/alt_up.jpg",
  ]);
  return (
    <group scale={[100, 100, 100]}>
      <Plane
        scale={[-2, 2, 2]}
        position={[-1, 0, 0]}
        rotation={[0, Math.PI / 2, 0]}
      >
        <meshBasicMaterial map={lf} specularMap={lf} attach="material" />
      </Plane>
      <Plane
        scale={[-2, 2, 2]}
        position={[1, 0, 0]}
        rotation={[0, -Math.PI / 2, 0]}
      >
        <meshBasicMaterial map={rt} specularMap={rt} attach="material" />
      </Plane>
      <group rotation={[0, -Math.PI, 0]}>
        <Plane scale={[-2, 2, 2]} position={[0, 0, -1]} rotation={[0, 0, 0]}>
          <meshBasicMaterial map={bk} specularMap={bk} attach="material" />
        </Plane>
      </group>
      <Plane scale={[-2, 2, 2]} position={[0, 0, -1]} rotation={[0, 0, 0]}>
        <meshBasicMaterial map={ft} specularMap={ft} attach="material" />
      </Plane>
      <Plane
        scale={[-2, 2, 2]}
        position={[0, -1, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <meshBasicMaterial map={dn} specularMap={dn} attach="material" />
      </Plane>
      <group rotation={[0, -Math.PI / 2, 0]}>
        <Plane
          scale={[-2, 2, 2]}
          position={[0, 1, 0]}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <meshBasicMaterial map={up} specularMap={up} attach="material" />
        </Plane>
      </group>
    </group>
  );
};
