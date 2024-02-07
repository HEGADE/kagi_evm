import React, { useEffect, useState } from "react";
import { openContractCall } from "@stacks/connect";
import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";

import {
  appDetails,
  contractOwnerAddress,
  deployedContractName,
} from "../../lib/constants";

import {
  uintCV,
  tupleCV,
  principalCV,
  makeStandardSTXPostCondition,
  stringAsciiCV,
  FungibleConditionCode,
  makeStandardFungiblePostCondition,
  createAssetInfo,
} from "@stacks/transactions";

import { getContractAddressAndName } from "../../utils/extract-contract-info";
import { useStacks } from "../../providers/StacksProvider";
import ButtonWithLoading from "../UI/LoaderButton";
import {
  getFtPostCondition,
  getFtPostConditionNFT,
} from "../../utils/postconditions/ft-postcondition";
import { useTransactionToasts } from "../../providers/TransactionStatusProvider";
import {
  nftSchema,
  tokenSchema,
} from "../../utils/validation/validation-schema";
import { ValidationError } from "../UI/Errors";
import toast from "react-hot-toast";
import {
  fetchFromContract,
  fetchFromVestingContract,
} from "../../lib/fetch-data";
import { transformString } from "../../utils/format/format-asset-name";
import { IconBackArrow } from "../UI/Icons";
import { getFinalAmount } from "../../utils/final-stx-amount";
import { formatDate } from "../../utils/format/format-date-time";

const LockTokenInfo = ({ tokenAddress, nft, data, handlePage }) => {
  const { network, address } = useStacks();

  const [loading, setLoading] = useState(false);
  const { addTransactionToast, setTransactionSuccessfulMsg } =
    useTransactionToasts();

  const res = data;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(tokenSchema(data.currentBlockHeight)),
  });
  const {
    register: nftRegister,
    reset: nftReset,
    handleSubmit: nftHandleSubmit,
    formState: { errors: nftErrors },
  } = useForm({
    resolver: yupResolver(nftSchema(data.currentBlockHeight)),
  });
  const onSubmit = async (data) => {
    const { contractAddress, contractName } =
      getContractAddressAndName(tokenAddress);
    const { amount, days, assetName, taker } = data;
    console.log(
      "days:",
      days,
      "assetName:",
      assetName,
      "taker:",
      taker,
      amount,
      "tokenAddress",
      tokenAddress
    );

    setLoading(true);

    let lockDate = formatDate(new Date());

    let finalAmount = getFinalAmount(res.decimals, amount);

    console.log("finalAmount", finalAmount, "lock", lockDate);

    try {
      const stxPostCondition = makeStandardSTXPostCondition(
        address,
        FungibleConditionCode.Equal,
        0
      );
      const tokenPostCondition = makeStandardFungiblePostCondition(
        address,
        FungibleConditionCode.Equal,
        finalAmount,
        createAssetInfo(contractAddress, contractName, assetName)
      );

      const options = {
        contractAddress: contractOwnerAddress,
        contractName: deployedContractName,
        functionName: "lock-ft",
        functionArgs: [
          principalCV(tokenAddress),
          tupleCV({
            amount: uintCV(finalAmount),
            "lock-expiry": uintCV(days),
            "ft-name": stringAsciiCV(assetName),
            taker: principalCV(taker),
            "locked-time": stringAsciiCV(lockDate),
          }),
        ],
        postConditions: [stxPostCondition, tokenPostCondition],
        network,
        appDetails,
        onFinish: ({ txId }) => {
          console.log("onFinish:", txId);
          addTransactionToast(txId, `Locking ${assetName} token`);
          setTransactionSuccessfulMsg(`Successfully Locked ${assetName} token`);
        },
      };

      await openContractCall(options);
    } catch (err) {
      console.log(err, "error submitting");
    } finally {
      setLoading(false);
    }
  };
  const onSubmitNFT = async (data) => {
    const { contractAddress, contractName } =
      getContractAddressAndName(tokenAddress);
    const { days, tokenID, assetName, taker } = data;

    setLoading(true);

    let lockDate = formatDate(new Date());

    let finalAssetName = transformString(assetName);

    try {
      const stxPostCondition = makeStandardSTXPostCondition(
        address,
        FungibleConditionCode.Equal,
        0
      );

      const nftPostCondition = getFtPostConditionNFT(
        address,
        contractAddress,
        contractName,
        finalAssetName,
        uintCV(tokenID)
      );

      const options = {
        contractAddress: contractOwnerAddress,
        contractName: deployedContractName,
        functionName: "lock-nft",
        functionArgs: [
          principalCV(tokenAddress),
          tupleCV({
            "token-id": uintCV(tokenID),
            "lock-expiry": uintCV(days),
            taker: principalCV(taker),
            "locked-time": stringAsciiCV(lockDate),
          }),
        ],
        postConditions: [stxPostCondition, nftPostCondition],
        network,
        appDetails,
        onFinish: ({ txId }) => {
          console.log("onFinish:", txId);

          addTransactionToast(txId, `Locking ${assetName} token`);
          setTransactionSuccessfulMsg(`Successfully Locked ${assetName} token`);
        },
      };

      await openContractCall(options);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  console.log("error:", errors.assetName);

  useEffect(() => {
    if (nft) {
      nftReset({
        assetName: transformString(data?.assetName.toLowerCase()),
      });
      return;
    }
    reset({
      assetName: transformString(data?.assetName?.toLowerCase()),
    });
  }, []);
  // lock-expiry: uint, token-id: uint, taker: principal
  return (
    <>
      <div>
        <IconBackArrow onClick={handlePage} style={{ cursor: "pointer" }} />
        <h2 className="form-box-title">Configure Lock</h2>
      </div>
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
                  type="text"
                  id="balance"
                  placeholder="Taker Address"
                  {...register("taker")}
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
                className="button medium primary"
                text="Lock"
                isLoading={loading}
              />
            </div>
          </div>
        </form>
      ) : (
        <form className="form" onSubmit={nftHandleSubmit(onSubmitNFT)}>
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
  const { address, network } = useStacks();

  const [loading, setLoading] = useState(false);

  const tokens = {
    ft: "Fungible Token",
    nft: "Non Fungible Token",
  };

  const fetch = async ({ functionName }) => {
    return fetchFromContract({
      network,
      address,
      contract: tokenAddress?.trim(),
      contractFunctionName: functionName,
    });
  };

  const handleNext = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (
      tokenAddress &&
      tokenAddress?.length > 0 &&
      tokenAddress?.length >= 34 &&
      tokenAddress?.length <= 52
    ) {
      try {
        let [assetName, decimals, currentBlockHeight] = await Promise.all([
          fetch({ functionName: "get-name" }),
          !nft ? fetch({ functionName: "get-decimals" }) : [],
          fetchFromVestingContract({
            network,
            address,
            contractFunctionName: "get-current-block-height",
          }),
        ]);

        console.log("current Block height", currentBlockHeight);

        setData((pre) => {
          return {
            ...pre,
            assetName: assetName?.value,
            decimals: Number(decimals?.value),
            currentBlockHeight: Number(currentBlockHeight?.value),
          };
        });

        setMargin(true);
        setMoveToLockPage(true);
      } catch (err) {
        toast.error("No data Found for the given contract", {
          position: "bottom-right",
        });
      } finally {
        setLoading(false);
      }
    } else {
      toast.error("Please enter the valid token address");
      setLoading(false);
    }
  };

  return (
    <>
      <h2 className="form-box-title">{!nft ? tokens.ft : tokens.nft}</h2>
      <p className="text-center mt-10">
        {" "}
        {!nft ? tokens.ft : tokens.nft} Generated from App
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
          <ButtonWithLoading
            loaderColor="blue"
            isLoading={loading}
            className="button medium primary"
            text="Next"
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
  const [tokenAddress, setTokenAddress] = useState("");
  const [data, setData] = useState({
    assetName: "",
    decimals: "",
    currentBlockHeight: 0,
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
          tokenAddress={tokenAddress}
        />
      )}
    </>
  );
};

export { LockTokenForm };
