import React from "react";
import ReactDOM from "react-dom/client";
import '@mantine/core/styles.css';

import { createTheme, MantineProvider } from "@mantine/core";

import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { Connect } from "@stacks/connect-react";

import { userSession } from "./components/Header/Header.component";
import StacksProvider from "./providers/StacksProvider";
import TransactionToastProvider from "./providers/TransactionStatusProvider";

const theme = createTheme({
  /** Put your mantine theme override here */
});
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <MantineProvider theme={theme}>
      <Connect
        authOptions={{
          appDetails: {
            name: "Stacks React Template",
            icon: window.location.origin + "/logo.png",
          },
          redirectTo: "/",
          onFinish: () => {
            window.location.reload();
          },
          userSession,
        }}
      >
        <StacksProvider>
          <TransactionToastProvider>
            <App />
          </TransactionToastProvider>
        </StacksProvider>
      </Connect>
    </MantineProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
