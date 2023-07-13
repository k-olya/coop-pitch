import { IoSettingsSharp } from "react-icons/io5";
import { useDispatch } from "app/store";
import { Button } from "./button";
import { setScreen } from "../slice";

export const Main = () => {
  const dispatch = useDispatch();
  return (
    <div className="fixed">
      <Button
        className="fixed top-2 right-2 p-4 text-4xl"
        onClick={() => dispatch(setScreen("settings"))}
      >
        <IoSettingsSharp />
      </Button>
    </div>
  );
};
