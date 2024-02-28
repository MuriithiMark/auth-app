import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import App from "./App.jsx";
import "./index.css";
import store from "./features/store.js";
import Modals from "./components/modals/Modals.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <Modals />
      <App />
    </Provider>
  </React.StrictMode>
);
