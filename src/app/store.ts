import {
  TypedUseSelectorHook,
  useDispatch as _useDispatch,
  useSelector as _useSelector,
} from "react-redux";

import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import ui from "features/ui/slice";
import kb from "features/kb/slice";
import collisions from "features/collisions/slice";

export const store = configureStore({
  reducer: { ui, kb, collisions },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export const useDispatch = () => _useDispatch<AppDispatch>();
export const useSelector: TypedUseSelectorHook<RootState> = _useSelector;
