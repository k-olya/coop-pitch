import React from "react";
import { Game } from "features/game";
import { Ui } from "features/ui";
import { Kb } from "features/kb";

const App = () => (
  <div className="w-screen h-screen select-none bg-gray-900">
    <Game />
    <Ui />
    <Kb />
  </div>
);

export default App;
