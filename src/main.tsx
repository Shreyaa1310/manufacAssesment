import React from "react";
import ReactDOM from "react-dom/client";
import "@mantine/core/styles.css";

import App from "./App.tsx";
import { MantineProvider } from "@mantine/core";
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <MantineProvider>
    <App />
  </MantineProvider>
);
