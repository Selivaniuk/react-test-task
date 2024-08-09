import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App";

import "./styles/index.css";

const rootView = document.getElementById("root");

if (rootView) {
  const root = createRoot(rootView);
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}
