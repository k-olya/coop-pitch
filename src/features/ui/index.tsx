import React, { FC } from "react";
import { useSelector } from "app/store";
import { UiScreen } from "./slice";
import { Main } from "./c/main";
import { Settings } from "./c/settings";

const components: Partial<Record<UiScreen, FC>> = {
  main: Main,
  settings: Settings,
};

export function Ui() {
  const { screen } = useSelector((s) => s.ui);
  const C = components[screen];
  if (C) return <C />;
  return null;
}
