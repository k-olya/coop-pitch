import { IoSettingsSharp } from "react-icons/io5";
import { GiJumpAcross, GiSprint } from "react-icons/gi";
import { useDispatch, useSelector } from "app/store";
import { Button } from "./button";
import { setScreen } from "../slice";

export const Main = () => {
  const dispatch = useDispatch();
  const abilities = useSelector(s => s.ui.abilities);
  return (
    <div className="fixed">
      <Button
        className="fixed top-2 right-2 p-4 text-4xl"
        onClick={() => dispatch(setScreen("settings"))}
      >
        <IoSettingsSharp />
      </Button>
      <div className="fixed flex space-x-2 top-2 left-2">
        {abilities.includes("jump") && (
          <Button className="p-4 text-4xl text-yellow-400">
            <GiJumpAcross />
          </Button>
        )}
        {abilities.includes("sprint") && (
          <Button className="p-4 text-4xl text-yellow-400">
            <GiSprint />
          </Button>
        )}
      </div>
    </div>
  );
};
