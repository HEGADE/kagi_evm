import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  getTokenBalance,
  getTokenName,
  getTokenSymbol,
  requestAllowance,
  requestApprove,
} from "../../services/token.service.js";

import { lockContractAddress } from "../../lib/constants.js";

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

const LockTokenInfo = ({
  tokenAddress,
  nft,
  data,
  handlePage,
  setTokenAddress,
}) => {
  const [loading, setLoading] = useState(false);
  const [btnDisabled, setBtnDisabled] = useState(false);

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
    setError,
    handleSubmit: nftHandleSubmit,
    watch,
    formState: { errors: nftErrors, isValid: nftIsValid },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(nftSchema(data.currentBlockHeight)),
  });

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
    } catch (err) {
      console.log(err, "error submitting");

      toast.error("Error submitting", {
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
      });
      return;
    }
    reset({
      assetName: transformString(data?.assetName?.toLowerCase()),
      token: tokenAddress,
    });
  }, []);
  // lock-expiry: uint, token-id: uint, taker: principal
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
        <form className="form">
          <div className="form-row">
            <div className="form-item">
              <div className="form-input">
                {/* <label for="register-email">Asset Name</label> */}
                <input
                  disabled
                  value={data?.assetName}
                  type="text"
                  id="balance"
                  {...nftRegister("assetName")}
                  placeholder="Fungible Token name"
                />
                <ValidationError err={nftErrors.assetName} />
              </div>
            </div>
          </div>
          <div className="form-row">
            <div className="form-item">
              <div className="form-input">
                {/* <label for="register-email">Asset Name</label> */}
                <input
                  type="text"
                  id="balance"
                  {...nftRegister("tokenID")}
                  placeholder="Token ID"
                />
                <ValidationError err={nftErrors?.tokenID} />
              </div>
            </div>
          </div>
          <div className="form-row">
            <div className="form-item">
              <div className="form-input">
                {/* <label for="register-email">Taker Address</label> */}
                <input
                  type="text"
                  id="balance"
                  placeholder="Taker Address"
                  {...nftRegister("taker")}
                />
                <ValidationError err={nftErrors.taker} />
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
                  {...nftRegister("days")}
                />
                <ValidationError err={nftErrors.days} />
              </div>
            </div>
          </div>
          <div className="form-row">
            <div className="form-item">
              <ButtonWithLoading
                disabled={!btnDisabled || !nftIsValid}
                loaderColor="blue"
                type="submit"
                className="button medium primary"
                text="Lock"
                isLoading={loading}
              />
            </div>
          </div>
        </form>
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
        lockContractAddress,
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
        contractAddress: lockContractAddress,
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
    if (!tokenAddress.length) return;

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
      <h2 className="form-box-title">{!nft ? tokens.ft : tokens.nft}</h2>
      <p className="text-center mt-10">
        {" "}
        {!nft ? tokens.ft : tokens.nft} Generated from App{" "}
        {buttonConfig?.showApprove}
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
              onChange={(e) => setTokenAddress(e.target.value)}
            />
          </div>
        </div>
      </div>
      <br />
      <div className="form-row" onClick={handleNext}>
        <div className="form-item">
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

const LockTokenForm = ({
  nft = false,
  setMargin,
  moveToLockPage,
  setMoveToLockPage,
  handlePage,
}) => {
  const [tokenAddress, setTokenAddress] = useState("");
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
