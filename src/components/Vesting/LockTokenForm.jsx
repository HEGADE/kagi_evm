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
  createAssetInfo,
  FungibleConditionCode,
  makeStandardFungiblePostCondition,
  uintCV,
  tupleCV,
  principalCV,
  stringAsciiCV,
} from "@stacks/transactions";

import { getContractAddressAndName } from "../../utils/extract-contract-info";
import { useStacks } from "../../providers/StacksProvider";
import ButtonWithLoading from "../UI/LoaderButton";
import { getFtPostCondition } from "../../utils/postconditions/ft-postcondition";
import { useTransactionToasts } from "../../providers/TransactionStatusProvider";
import { tokenSchema } from "../../utils/validation/validation-schema";
import { ValidationError } from "../UI/Errors";
import toast from "react-hot-toast";

const LockTokenInfo = ({ tokenAddress }) => {
  const { network, address } = useStacks();

  const [loading, setLoading] = useState(false);
  const { addTransactionToast } = useTransactionToasts();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(tokenSchema),
  });
  const onSubmit = async (data) => {
    const { contractAddress, contractName } =
      getContractAddressAndName(tokenAddress);
    const { amount, days, assetName, taker } = data;

    setLoading(true);

    try {
      const tokenPostCondition = getFtPostCondition(
        address,
        amount,
        contractAddress,
        contractName,
        "cryptic-ocean-coin"
      );

      const options = {
        contractAddress: contractOwnerAddress,
        contractName: deployedContractName,
        functionName: "lock-ft",
        functionArgs: [
          principalCV(tokenAddress),
          tupleCV({
            amount: uintCV(amount),
            "lock-expiry": uintCV(days),
            "ft-name": stringAsciiCV(assetName),
            taker: principalCV(taker),
          }),
        ],
        postConditions: [tokenPostCondition],
        network,
        appDetails,
        onFinish: ({ txId }) => {
          console.log("onFinish:", txId);
          addTransactionToast(txId, `Approving ${assetName} lock`);
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

  return (
    <>
      <h2 className="form-box-title">Configure Lock</h2>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-row">
          <div className="form-item">
            <div className="form-input">
              {/* <label for="register-email">Asset Name</label> */}
              <input
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
              {/* <label for="register-username">Lock Amount</label> */}
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
    </>
  );
};

const LockTokenAddress = ({
  setTokenAddress,
  tokenAddress,
  setMoveToLockPage,
}) => {
  const handleNext = (e) => {
    e.preventDefault();
    if (
      tokenAddress &&
      tokenAddress?.length > 0 &&
      tokenAddress?.length >= 34 &&
      tokenAddress?.length <= 52
    ) {
      setMoveToLockPage(true);
    } else {
      toast.error("Please enter the valid token address");
    }
  };

  return (
    <>
      <h2 className="form-box-title">Project Tokens</h2>
      <p className="text-center mt-10">Project Tokens Generated from App</p>
      <div className="form-row">
        <div className="form-item">
          <div className="form-input">
            {/* <label for="login-username">Project Token Address</label> */}
            <input
              placeholder="Project Token Address"
              type="text"
              id="address"
              required
              onChange={(e) => setTokenAddress(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="form-row" onClick={handleNext}>
        <div className="form-item">
          <button type="button" className="button medium secondary">
            Next
          </button>
        </div>
      </div>
    </>
  );
};

const LockTokenForm = () => {
  const [tokenAddress, setTokenAddress] = useState("");
  const [moveToLockPage, setMoveToLockPage] = useState(false);

  return (
    <>
      {!moveToLockPage ? (
        <LockTokenAddress
          setTokenAddress={setTokenAddress}
          tokenAddress={tokenAddress}
          setMoveToLockPage={setMoveToLockPage}
        />
      ) : (
        <LockTokenInfo tokenAddress={tokenAddress} />
      )}
    </>
  );
};

export { LockTokenForm };
