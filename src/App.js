import React from "react";

import Header from "./components/Header/Header.component";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { TokenLock } from "./pages/TokenLock";
import { WithdrawToken } from "./pages/WithdrawToken";
import DashBoard from "./pages/DashBoard";
import ContactUs from "./pages/ContactUs";

function App() {
  // SCRIPT LOAD
  const runScript = () => {
    if (window.$) {
      let script = document.createElement("script");
      script.src = "/assets/js/app.bundle.min.js";
      script.async = true;
      script.crossorigin = "anonymous";
      document.head.appendChild(script);
      document.body.appendChild(script);
    } else {
      let script = document.createElement("script");
      script.src = "/assets/js/app.bundle.min.js";
      script.async = true;
      script.crossorigin = "anonymous";
      document.head.appendChild(script);
      document.body.appendChild(script);
    }
  };

  React.useEffect(() => {
    runScript();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Header />}>
          <Route path="dash-board" element={<DashBoard />} />
          <Route path="token-withdraw" element={<WithdrawToken />} />
          <Route path="token-lock" element={<TokenLock />} />
          <Route path="smart-contact-audit" element={<ContactUs />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
