import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Box } from "app/math/box";

export type BoxWithCollision = Box & { id: string; onCollide?: string };
export type SphereWithCollision = Box & { id: string; onCollide?: string };
export type Collisions = {
  boxes: BoxWithCollision[];
  spheres: SphereWithCollision[];
};

const initialState: Collisions = { boxes: [], spheres: [] };

export const slice = createSlice({
  name: "collisions",
  initialState,
  reducers: {
    setBox: (state, { payload }: PayloadAction<BoxWithCollision>) => {
      state.boxes = state.boxes
        .filter((f) => f.id !== payload.id)
        .concat(payload);
    },
    removeBox: (state, { payload }: PayloadAction<string>) => {
      state.boxes = state.boxes.filter((f) => f.id !== payload);
    },
  },
});

export const { setBox, removeBox } = slice.actions;

export default slice.reducer;
