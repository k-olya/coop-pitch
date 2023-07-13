import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type UiScreen = "main" | "game" | "settings" | "attributions";

export interface UiState {
  screen: UiScreen;
}

const initialState: UiState = {
  screen: "main",
};

export const slice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setScreen: (state, { payload }: PayloadAction<UiScreen>) => {
      state.screen = payload;
    },
  },
});

export const { setScreen } = slice.actions;

export default slice.reducer;
