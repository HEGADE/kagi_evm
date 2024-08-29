import React from "react";

import Header from "./components/Header/Header.component";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { TokenLock } from "./pages/TokenLock";
import { WithdrawToken } from "./pages/WithdrawToken";
import DashBoard from "./pages/DashBoard";
import ContactUs from "./pages/ContactUs";
import { CreateToken } from "./pages/CreateToken";
import { TraceableTokens } from "./pages/TraceableTokens";
import { BulkTransfer } from "./pages/BulkTransfer";
import { Vesting } from "./pages/Vesting";
import VestingTokenList from "./components/VestingTokenList/VestingTokenList";
import VestingList from "./pages/VestingList";
import TradableVesting from "./pages/TradableVesting";

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
          <Route path="create-token" element={<CreateToken />} />
          <Route path="tradeable-token" element={<TraceableTokens />} />
          <Route path="bulk-transfer" element={<BulkTransfer />} />
          <Route path="vest-token" element={<Vesting />} />
          <Route path="vest-token-list" element={<VestingList/>}/>
          <Route path="tradable-vest-token" element={<TradableVesting/>}/>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
