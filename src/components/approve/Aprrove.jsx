import { useContext, useEffect, useState } from "react";
import ButtonWithLoading from "../UI/LoaderButton";
import {
  getTokenBalance,
  getTokenName,
  getTokenSymbol,
  requestAllowance,
  requestApprove,
} from "../../services/token.service";
import { MetamaskContext } from "../../context/MetamaskContext";
import Web3 from "web3";
import toast from "react-hot-toast";

export const Approve = ({
  setTokenAddress,
  tokenAddress,
  setData,
  setMoveToLockPage,
  nft,
  setMargin,
  contractAddress,
}) => {
  const [loading, setLoading] = useState(false);

  const web3 = new Web3();

  const [buttonConfig, setButtonConfig] = useState({
    showApprove: false,
  });

  const { accountID } = useContext(MetamaskContext);

  const tokens = {
    ft: "Fungible Token",
    nft: "Non Fungible Token",
  };

  const fetch = async () => {
    try {
      const balance = await getTokenBalance(accountID, tokenAddress);
      const symbol = await getTokenSymbol(accountID, tokenAddress);
      const assetName = await getTokenName(accountID, tokenAddress);

      setData((pre) => ({
        ...pre,
        balance,
        symbol,
        assetName,
      }));

      const allowance = await requestAllowance(
        accountID,
        contractAddress,
        tokenAddress
      );

      if (allowance <= 0) {        
        setButtonConfig((pre) => ({
          ...pre,
          showApprove: true,
        }));

        return;
      }
      
      setMargin(true);
      setMoveToLockPage(true);
    } catch (err) {
      console.log(err);
      toast.error("Invalid token address", {
        position: "bottom-right",
      });
    }
  };

  const handleNext = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await requestApprove({
        accountAddress: accountID,
        contractAddress: contractAddress,
        tokenAddress,
      });

      setMargin(true);
      setMoveToLockPage(true);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!tokenAddress?.length) return;

    if (!web3.utils.isAddress(tokenAddress)) {
      toast.error("Invalid token address", {
        position: "bottom-right",
      });
      return;
    }

    fetch();
  }, [tokenAddress]);

  return (
    <>
      <h5 className="form-box-title">{!nft ? tokens.ft : tokens.nft}</h5>
      {/* <p className="text-center mt-10">
        {" "}
        {!nft ? tokens.ft : tokens.nft} Generated from App{" "}
        {buttonConfig?.showApprove}
      </p> */}
      <div className="form-row landing-form-next">
        <div className="form-item grid grid-8-4 small-space">
          <div className="form-input">
            {/* <label for="login-username">Project Token Address</label> */}
            <input
              placeholder={
                !nft ? tokens.ft + " Address" : tokens.nft + " Address"
              }
              type="text"
              id="address"
              required
              onChange={(e) => setTokenAddress(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="form-row" onClick={handleNext}>
        <div className="form-item grid grid-8-4 small-space">
          {buttonConfig?.showApprove && (
            <ButtonWithLoading
              loaderColor="blue"
              isLoading={loading}
              className="button medium primary"
              text="Approve"
            />
          )}
        </div>
      </div>
    </>
  );
};
