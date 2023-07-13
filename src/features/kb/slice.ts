import { createSlice, PayloadAction } from "@reduxjs/toolkit";
export type KbState = { [k: string]: boolean };

const initialState: KbState = {};

export const slice = createSlice({
  name: "kb",
  initialState,
  reducers: {
    updateKb: (state, { payload }: PayloadAction<KbState>) => {
      return { ...state, ...payload };
    },
  },
});

export const { updateKb } = slice.actions;

export default slice.reducer;
