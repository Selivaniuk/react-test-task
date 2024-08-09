import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App";

import "./styles/index.css";
import { BrowserRouter } from "react-router-dom";

const rootView = document.getElementById("root");
export const basename =
  process.env.NODE_ENV === "production" ? process.env.PUBLIC_URL : "";

if (rootView) {
  const root = createRoot(rootView);
  root.render(
    <BrowserRouter basename={basename}>
      <StrictMode>
        <App />
      </StrictMode>
    </BrowserRouter>
  );
}
