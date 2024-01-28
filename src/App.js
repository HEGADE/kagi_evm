import React from "react";

import Header from "./components/Header/Header.component";
import ContractCallVote from "./components/ContractCallVote";

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
    <div className="App">
      <header className="App-header">
        {/* ConnectWallet file: `./src/components/ConnectWallet.js` */}
        <Header />

        {/* ContractCallVote file: `./src/components/ContractCallVote.js` */}
        <ContractCallVote />
      </header>
    </div>
  );
}

export default App;
