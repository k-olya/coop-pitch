import { useEffect } from "react";
import { useDispatch, useSelector } from "app/store";
import { updateKb, KbState } from "./slice";

export const Kb = () => {
  const dispatch = useDispatch();
  const kb = useSelector<KbState>((s) => s.kb);
  useEffect(() => {
    const downListener = (e: any) => {
      if (e?.code && !kb[e?.code as string]) {
        dispatch(updateKb({ [e?.code]: true }));
      }
    };
    const upListener = (e: any) => {
      dispatch(updateKb({ [e?.code]: false }));
    };

    const mouseDownListener = (e: any) => {
      dispatch(updateKb({ [`MB${e?.button || 0}`]: true }));
    };
    const mouseUpListener = (e: any) => {
      dispatch(updateKb({ [`MB${e?.button || 0}`]: false }));
    };

    window.addEventListener("keydown", downListener);
    window.addEventListener("keyup", upListener);
    window.addEventListener("mousedown", mouseDownListener);
    window.addEventListener("mouseup", mouseUpListener);
    return () => {
      window.removeEventListener("keydown", downListener);
      window.removeEventListener("keyup", upListener);
      window.removeEventListener("mousedown", mouseDownListener);
      window.removeEventListener("mouseup", mouseUpListener);
    };
  }, []);
  return <></>;
};
