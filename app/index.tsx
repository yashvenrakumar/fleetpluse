import React, { useEffect } from "react";
import { Provider, useSelector } from "react-redux";
 import { persistor, store } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react"; 
import {  useRouter } from "expo-router";
import { RootState } from "./redux/rootReducer";
import Homepage from "./screens/homePage";
import { ThemeProvider } from "./context/ThemeContext";
 

export default function App() {
  return (
     <ThemeProvider>
       <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Homepage />
      </PersistGate>
    </Provider>
     </ThemeProvider>
   
  );
} 