import { useContext, useEffect, useState } from "react";
import { Transfer } from "../components/BulkTransfer/Transfer";
import SideNavBar from "../components/UI/SideNavBar";
import { MetamaskContext } from "../context/MetamaskContext";
import { Approve } from "../components/approve/Aprrove";
import {
  bulkTokenDispatcherContractName,
  bulkTransferContractAddress,
} from "../lib/constants";

export const BulkTransfer = () => {
  const { accountID } = useContext(MetamaskContext);
  const [margin, setMargin] = useState(false);

  const [moveToLockPage, setMoveToLockPage] = useState(false);
  const [tokenAddress, setTokenAddress] = useState("");
  const [data, setData] = useState({
    assetName: "",
    decimals: "",
    currentBlockHeight: 0,
    balance: 0,
    symbol: "",
  });

  useEffect(() => {
    setTokenAddress("");
    setMoveToLockPage(false);
  }, [accountID]);

  return (
    <>
      <SideNavBar />
      {!moveToLockPage ? (
        <div className="content-grid">
          <Approve
            contractAddress={bulkTransferContractAddress}
            setData={setData}
            setTokenAddress={setTokenAddress}
            tokenAddress={tokenAddress}
            setMoveToLockPage={setMoveToLockPage}
            setMargin={setMargin}
          />
        </div>
      ) : (
        <Transfer data={data} setData={setData} token={tokenAddress} />
      )}
    </>
  );
};
