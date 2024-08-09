import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App";

import "./styles/index.css";
import { BrowserRouter } from "react-router-dom";

const rootView = document.getElementById("root");

if (rootView) {
  const root = createRoot(rootView);
  root.render(
    <BrowserRouter>
      <StrictMode>
        <App />
      </StrictMode>
    </BrowserRouter>
  );
}
