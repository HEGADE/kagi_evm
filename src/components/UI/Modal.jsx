import { useContext } from "react";
import { MetamaskContext } from "../../context/MetamaskContext";

const ConnectWalletMetamask = ({ styl }) => {
  const { connectMetamask } = useContext(MetamaskContext);
  if (!window?.ethereum)
    return (
      <>
        <div
          className="d-flex justify-content-center align-items-center "
          style={styl}
        >
          <button className="btn btn-success">Please install Metamask </button>
        </div>
      </>
    );
  return (
    <>
      <div
        className="d-flex justify-content-center align-items-center "
        style={styl}
      >
        <button className="btn btn-dark shadow" onClick={connectMetamask}>
          Connect to wallet
        </button>
      </div>
    </>
  );
};

export { ConnectWalletMetamask };
