import { WeatherData } from "@/app/interface/WeatherData";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface WeatherHistoryState {
  weather: WeatherData | null;
  weatherHistory: any; // ✅ should not be nullable
}

const initialState: WeatherHistoryState = {
  weather: null,
  weatherHistory: [],
};

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    updateWeather: (state, action: PayloadAction<WeatherData>) => {
      state.weather = action.payload;
state.weatherHistory = [action.payload, ...(state.weatherHistory ?? [])];
    },
     updateCurrentWeather: (state, action: PayloadAction<WeatherData>) => {
      state.weather = action.payload;
     },
  },
});

export const { updateWeather,updateCurrentWeather } = weatherSlice.actions;
export default weatherSlice.reducer;
