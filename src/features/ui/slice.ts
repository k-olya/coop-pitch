import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type UiScreen = "main" | "game" | "settings" | "attributions";
export type Ability = "jump" | "sprint";

export interface UiState {
  screen: UiScreen;
  abilities: Ability[];
}

const initialState: UiState = {
  screen: "main",
  abilities: [],
};

export const slice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setScreen: (state, { payload }: PayloadAction<UiScreen>) => {
      state.screen = payload;
    },
    addAbility: (state, { payload }: PayloadAction<Ability>) => {
      state.abilities.push(payload);
    },
  },
});

export const { setScreen, addAbility } = slice.actions;

export default slice.reducer;
