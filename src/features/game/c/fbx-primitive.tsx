import { useFBX, Resize } from "@react-three/drei";
import { FC } from "react";

type Props = JSX.IntrinsicElements["group"] & {
  src: string;
};

export const FBXPrimitive: FC<Props> = ({ src, ...props }) => {
  const model = useFBX(src);
  return (
    <Resize {...props}>
      <primitive object={model} />
    </Resize>
  );
};
