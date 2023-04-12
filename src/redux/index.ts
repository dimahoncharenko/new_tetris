// Imports redux library
import { configureStore } from "@reduxjs/toolkit";
import { useSelector, useDispatch, TypedUseSelectorHook } from "react-redux";

// Imports reducers
import game from "./slices/game";

const store = configureStore({
  reducer: {
    game,
  },
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: true,
        ignoreState: true,
      },
    });
  },
});

export type State = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<State> = useSelector;
export const useAppDispatch: () => AppDispatch = useDispatch;

export default store;
