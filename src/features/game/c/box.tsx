import { FC, useState, useEffect, ComponentProps, forwardRef } from "react";
import { useDispatch } from "app/store";
import { Point } from "app/math/point";
import { Box as DreiBox } from "@react-three/drei";
import { id as genId } from "app/id";
import { setBox, removeBox } from "features/collisions/slice";
import { storeFunction } from "app/store-function";

type Props = ComponentProps<typeof DreiBox> & {
  id?: string;
  position?: Point;
  rotation?: Point;
  scale?: Point;
  collide?: boolean;
  color?: number | string;
  onCollide?: Function;
};

export const Box = forwardRef<THREE.Mesh, Props>(
  (
    {
      id: idProp,
      position = [0, 0, 0],
      rotation = [0, 0, 0],
      scale = [1, 1, 1],
      children,
      color,
      collide,
      onCollide,
      ...props
    },
    ref
  ) => {
    const dispatch = useDispatch();
    const [id, setId] = useState(idProp || "");

    useEffect(() => {
      if (collide) {
        if (id && idProp && id !== idProp) {
          // if id prop was changed after initialization
          dispatch(removeBox(id));
        }
        const _id = idProp || id || genId("box");
        if (!id) {
          // componentDidMount logic
          setId(_id);
        }
        dispatch(
          setBox({
            id,
            position,
            rotation,
            scale,
            onCollide: onCollide && storeFunction(onCollide),
          })
        );
      } else if (id) dispatch(removeBox(id));

      return () => {
        // componentWillUnmount logic
        dispatch(removeBox(id));
      };
    }, [id, position, rotation, scale, onCollide, collide, dispatch, idProp]);

    return (
      <DreiBox
        position={position}
        rotation={rotation}
        scale={scale}
        {...props}
        ref={ref}
      >
        {children}
        {!!color && <meshPhongMaterial color={color} />}
        {!color && !children && <meshPhongMaterial color="whitesmoke" />}
      </DreiBox>
    );
  }
);
