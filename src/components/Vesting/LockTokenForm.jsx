import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  getTokenBalance,
  getTokenName,
  getTokenSymbol,
  requestAllowance,
  requestApprove,
} from "../../services/token.service.js";

import {
  lockContractAddress,
  lockNftContractAddress,
} from "../../lib/constants.js";

import { yupResolver } from "@hookform/resolvers/yup";

import ButtonWithLoading from "../UI/LoaderButton";

import {
  nftSchema,
  tokenSchema,
} from "../../utils/validation/validation-schema";
import { ValidationError } from "../UI/Errors";

import { transformString } from "../../utils/format/format-asset-name";
import { IconBackArrow } from "../UI/Icons";

import { lockToken } from "../../services/lock.services";
import { MetamaskContext } from "../../context/MetamaskContext";
import Web3 from "web3";
import toast from "react-hot-toast";
import {
  getApproved,
  getNFTName,
  getNFTOwner,
  getNFTSymbol,
  requestApproveNft,
} from "../../services/nft.service.js";
import { lockNFT } from "../../services/lock-nft.services.js";
import { set } from "date-fns";
import { LockNftForm } from "./LockNftForm.jsx";
import { TokenInfo } from "./TokenInfo.jsx";
import { daysToFutureTimestamp } from "../../helpers/convertion.js";

const LockTokenInfo = ({
  tokenAddress,
  nft,
  data,
  handlePage,
  setTokenAddress,
}) => {
  const [loading, setLoading] = useState(false);

  const { accountID } = useContext(MetamaskContext);

  const {
    register,
    handleSubmit,
    reset,

    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(tokenSchema(data?.balance)),
  });

  const {
    register: nftRegister,
    reset: nftReset,
    handleSubmit: nftHandleSubmit,
    formState: { errors: nftErrors, isValid: nftIsValid },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(nftSchema()),
  });

  const goBack = () => {
    setTimeout(() => {
      handlePage();
      setTokenAddress("");
    }, 2000);
  };

  const onSubmit = async (data) => {
    setLoading(true);

    const { token, amount, days } = data;
    try {
      await lockToken({
        accountAddress: accountID,
        ert20TokenAddress: token,
        amount,
        duration: days,
      });

      toast.success("Token locked successfully", {
        position: "bottom-right",
      });
      goBack();
    } catch (err) {
      console.log(err, "error submitting");

      toast.error("Error submitting", {
        position: "bottom-right",
      });
    } finally {
      setLoading(false);
    }
  };
  const onSubmitNFT = async (data) => {
    setLoading(true);

    const { days } = data;
    try {
      await lockNFT({
        accountAddress: accountID,
        nftAddress: tokenAddress?.address,
        tokenID: tokenAddress?.id,
        lockingPeriod: daysToFutureTimestamp(days),
      });

      toast.success("NFT locked successfully", {
        position: "bottom-right",
      });
      goBack();
    } catch (err) {
      console.log(err, "error submitting");

      toast.error("Error While Locking", {
        position: "bottom-right",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (nft) {
      nftReset({
        assetName: transformString(data?.assetName.toLowerCase()),
        tokenID: tokenAddress?.id,
        tokenAddress: tokenAddress?.address,
      });
      return;
    }
    reset({
      assetName: transformString(data?.assetName?.toLowerCase()),
      token: tokenAddress?.address,
    });
  }, []);
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <IconBackArrow
          onClick={() => {
            setTokenAddress("");
            handlePage();
          }}
          style={{ cursor: "pointer" }}
        />
        <p
          style={{
            visibility: nft ? "hidden" : "visible",
          }}
        >
          <span
            style={{
              color: "black",
            }}
          >
            Token:-
          </span>{" "}
          {data?.balance} {data?.symbol}
        </p>
      </div>
      <h2 className="form-box-title">Configure Lock</h2>
      {!nft ? (
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-row">
            <div className="form-item">
              <div className="form-input">
                {/* <label for="register-email">Asset Name</label> */}
                <input
                  disabled
                  type="text"
                  id="balance"
                  {...register("assetName")}
                  placeholder="Asset Name"
                />
                <ValidationError err={errors.assetName} />
              </div>
            </div>
          </div>
          <div className="form-row">
            <div className="form-item">
              <div className="form-input">
                {/* <label for="register-email">Taker Address</label> */}
                <input
                  disabled
                  name="token"
                  type="text"
                  id="balance"
                  placeholder="Token Address"
                  {...register("token")}
                />

                <ValidationError err={errors.taker} />
              </div>
            </div>
          </div>
          <div className="form-row">
            <div className="form-item">
              <div className="form-input">
                <small>Total decimal points {data?.decimals}</small>
                <input
                  type="text"
                  id="lock-amount"
                  placeholder="Lock Amount"
                  {...register("amount")}
                />
                <ValidationError err={errors.amount} />
              </div>
            </div>
          </div>
          <div className="form-row">
            <div className="form-item">
              <div className="form-input">
                {/* <label for="register-password">Locking Days</label> */}
                <input
                  type="text"
                  id="days"
                  placeholder="Locking Days"
                  {...register("days")}
                />
                <ValidationError err={errors.days} />
              </div>
            </div>
          </div>
          <div className="form-row">
            <div className="form-item">
              <ButtonWithLoading
                type="submit"
                disabled={!isValid}
                loaderColor="blue"
                className="button medium primary"
                text="Lock"
                isLoading={loading}
              />
            </div>
          </div>
        </form>
      ) : (
        <LockNftForm
          nftHandleSubmit={nftHandleSubmit}
          onSubmitNFT={onSubmitNFT}
          nftRegister={nftRegister}
          data={data}
          nftErrors={nftErrors}
          nftIsValid={nftIsValid}
          loading={loading}
        />
      )}
    </>
  );
};

const LockTokenAddress = ({
  setTokenAddress,
  tokenAddress,
  setData,
  setMoveToLockPage,
  nft,
  setMargin,
  data,
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

  const fetchFt = async () => {
    const balance = await getTokenBalance(accountID, tokenAddress?.address);
    const symbol = await getTokenSymbol(accountID, tokenAddress?.address);
    const assetName = await getTokenName(accountID, tokenAddress?.address);

    setData((pre) => ({
      ...pre,
      balance,
      symbol,
      assetName,
    }));

    const allowance = await requestAllowance(
      accountID,
      lockContractAddress,
      tokenAddress?.address
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
  };

  const fetchNft = async () => {
    if (!tokenAddress?.id) return;
    const name = await getNFTName(tokenAddress?.address);
    const symbol = await getNFTSymbol(tokenAddress?.address);
    const owner = await getNFTOwner(tokenAddress?.address, tokenAddress?.id);

    if (owner?.toLowerCase() !== accountID?.toLowerCase()) {
      toast.error("You are not the owner of this token", {
        position: "bottom-right",
      });
      setButtonConfig((pre) => ({
        ...pre,
        showApprove: false,
      }));
      return;
    }

    setData((pre) => ({
      ...pre,
      assetName: name,
      symbol,
    }));

    const approved = await getApproved({
      nftAddress: tokenAddress?.address,
      tokenID: tokenAddress?.id,
    });

    if (approved?.toLowerCase() !== lockNftContractAddress?.toLowerCase()) {
      setButtonConfig((pre) => ({
        ...pre,
        showApprove: true,
      }));

      return;
    }

    setMargin(true);
    setMoveToLockPage(true);
  };

  const fetch = async () => {
    try {
      if (!nft) {
        await fetchFt();
        return;
      }

      await fetchNft();
    } catch (err) {
      console.log(err);
      toast.error("Invalid token address", {
        position: "bottom-right",
      });
    }
  };

  const handleFtNext = async () => {
    await requestApprove({
      accountAddress: accountID,
      contractAddress: lockContractAddress,
      tokenAddress: tokenAddress?.address,
    });
  };

  const handleNftNext = async () => {
    await requestApproveNft({
      accountAddress: accountID,
      tokenID: tokenAddress?.id,
      nftAddress: tokenAddress?.address,
    });
  };

  const handleNext = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      if (!nft) {
        await handleFtNext();
      } else {
        await handleNftNext();
      }
      setMargin(true);
      setMoveToLockPage(true);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!tokenAddress?.address?.length) return;

    if (!web3.utils.isAddress(tokenAddress?.address)) {
      toast.error("Invalid token address", {
        position: "bottom-right",
      });
      return;
    }

    fetch();
  }, [tokenAddress?.address, tokenAddress?.id, accountID]);

  return (
    <>
      <TokenInfo data={data} nft={nft} />
      <h2 className="form-box-title">{!nft ? tokens.ft : tokens.nft}</h2>
      <p className="text-center mt-10">
        {" "}
        {!nft ? tokens.ft : tokens.nft} Generated from App{" "}
      </p>
      <div className="form-row landing-form-next">
        <div className="form-item">
          <div className="form-input">
            {/* <label for="login-username">Project Token Address</label> */}
            <input
              placeholder={
                !nft ? tokens.ft + " Address" : tokens.nft + " Address"
              }
              type="text"
              id="address"
              required
              onChange={(e) =>
                setTokenAddress({
                  ...tokenAddress,
                  address: e.target.value,
                })
              }
            />
            <br />
            <br />
            {nft && (
              <input
                placeholder="Token ID"
                type="text"
                id="address"
                required
                onChange={(e) =>
                  setTokenAddress({
                    ...tokenAddress,
                    id: e.target.value,
                  })
                }
              />
            )}
          </div>
        </div>
      </div>
      <br />
      <div className="form-row" onClick={handleNext}>
        <div className="form-item">
          <ButtonWithLoading
            disabled={!buttonConfig.showApprove}
            loaderColor="blue"
            isLoading={loading}
            className="button medium primary"
            text="Approve"
          />
        </div>
      </div>
    </>
  );
};

const LockTokenForm = ({
  nft = false,
  setMargin,
  moveToLockPage,
  setMoveToLockPage,
  handlePage,
}) => {
  const [tokenAddress, setTokenAddress] = useState({
    address: "",
    id: 0,
  });
  const [data, setData] = useState({
    assetName: "",
    decimals: "",
    currentBlockHeight: 0,
    balance: 0,
    symbol: "",
  });
  return (
    <>
      {!moveToLockPage ? (
        <LockTokenAddress
          nft={nft}
          setData={setData}
          data={data}
          setMargin={setMargin}
          setTokenAddress={setTokenAddress}
          tokenAddress={tokenAddress}
          setMoveToLockPage={setMoveToLockPage}
        />
      ) : (
        <LockTokenInfo
          handlePage={handlePage}
          nft={nft}
          data={data}
          setTokenAddress={setTokenAddress}
          tokenAddress={tokenAddress}
        />
      )}
    </>
  );
};

export { LockTokenForm };
