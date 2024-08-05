import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createTheme, ThemeProvider } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";
import store from "./store/store.js";
import axios from "axios";

axios.defaults.baseURL = "http://localhost/5000/api/v1"; // providing axios the base URL so that we easily call the api requests.
axios.defaults.withCredentials = true; // this helps in exchanging the cookies and other credentials with the backend.

const theme = createTheme({
  typography: { fontFamily: "Poppins, serif", allVariants: { color: "white" } },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <Toaster position="bottom-left" />
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
