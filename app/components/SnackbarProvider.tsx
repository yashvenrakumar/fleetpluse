import React, { createContext, useContext, useState, ReactNode } from "react";
import { Snackbar, Provider as PaperProvider } from "react-native-paper";

type SnackbarType = "success" | "error" | "warning";

interface SnackbarContextType {
  showSnackbar: (message: string, type?: SnackbarType) => void;
}

const SnackbarContext = createContext<SnackbarContextType | undefined>(undefined);

export const useSnackbar = () => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error("useSnackbar must be used within a SnackbarProvider");
  }
  return context;
};

const SnackbarProvider = ({ children }: { children: ReactNode }) => {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState<SnackbarType>("success");

  const showSnackbar = (msg: string, snackbarType: SnackbarType = "success") => {
    setMessage(msg);
    setType(snackbarType);
    setVisible(true);
  };

  const getSnackbarStyle = () => {
    switch (type) {
      case "success":
        return { backgroundColor: "green" };
      case "error":
        return { backgroundColor: "red" };
      case "warning":
        return { backgroundColor: "orange" };
      default:
        return {};
    }
  };

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      <PaperProvider>
        {children}
        <Snackbar
          visible={visible}
          onDismiss={() => setVisible(false)}
          duration={3000}
          style={getSnackbarStyle()}
        >
          {message}
        </Snackbar>
      </PaperProvider>
    </SnackbarContext.Provider>
  );
};

export default SnackbarProvider;
