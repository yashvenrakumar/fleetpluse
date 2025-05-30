import { combineReducers } from "@reduxjs/toolkit";
import weatherSlice from "./slice/weatherHostory"

export const rootReducer = combineReducers({
   weather: weatherSlice,
  },
);

export type RootState = ReturnType<typeof rootReducer>;

