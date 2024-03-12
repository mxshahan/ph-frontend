import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./routes";
import { ReduxProvider } from "./store/provider";

import "./styles/index.scss";
import { Toaster } from "react-hot-toast";

const App: React.FC = () => (
  <React.StrictMode>
    <ReduxProvider>
      <BrowserRouter>
        <Toaster />
        <AppRouter />
      </BrowserRouter>
    </ReduxProvider>
  </React.StrictMode>
);

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(<App />);
