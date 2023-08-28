import React from "react";
import ReactDOM from "react-dom";
import { CookiesProvider } from "react-cookie";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <CookiesProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
  </CookiesProvider>
);

reportWebVitals();
