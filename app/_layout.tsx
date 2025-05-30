import { Stack, useNavigation } from "expo-router";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./redux/store";
import React, { useEffect } from "react";
import SnackbarProvider from "./components/SnackbarProvider";
import { ThemeProvider } from "./context/ThemeContext";

export default function Layout() {
  return (
    <ThemeProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <SnackbarProvider>
            <Stack
              screenOptions={{
                headerShown: false,
              }}
            >
              <Stack.Screen
                name="screens/homePage"
                options={{ title: "HomePage" }}
              />
                 <Stack.Screen
                name="screens/DetailScreen"
                options={{ title: "DetailScreen" }}
              />
            </Stack>
          </SnackbarProvider>
        </PersistGate>
      </Provider>
    </ThemeProvider>
  );
}
