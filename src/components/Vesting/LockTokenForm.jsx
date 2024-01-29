import React, { useState } from "react";
import { ContractCallRegularOptions, openContractCall } from "@stacks/connect";
import { useForm } from "react-hook-form";
import {
  appDetails,
  contractOwnerAddress,
  deployedContractName,
  microstacksPerSTX,
} from "../../lib/constants";

import {
  createAssetInfo,
  FungibleConditionCode,
  makeContractFungiblePostCondition,
  makeContractSTXPostCondition,
  makeStandardFungiblePostCondition,
  makeStandardSTXPostCondition,
  uintCV,
  tupleCV,
  principalCV,
  stringAsciiCV,
} from "@stacks/transactions";

import { getContractAddressAndName } from "../../utils/extract-contract-info";
import { useStacks } from "../../providers/StacksProvider";

const LockTokenInfo = ({ tokenAddress }) => {
  const { network, address } = useStacks();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    const { contractAddress, contractName } =
      getContractAddressAndName(tokenAddress);
    const { amount, days, assetName, taker } = data;

    const tokenPostCondition = makeStandardFungiblePostCondition(
      address,
      FungibleConditionCode.Equal,
      amount,
      createAssetInfo(contractAddress, contractName, "cryptic-ocean-coin")
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
      },
    };
    await openContractCall(options);
  };

  return (
    <>
      <div className="landing-form" style={{ marginTop: "300px" }}>
        <div className="form-box">
          <img
            className="form-box-decoration"
            src="img/landing/rocket.png"
            alt="rocket"
          />
          <h2 className="form-box-title">Configure Lock</h2>
          <form className="form" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-row">
              <div className="form-item">
                <div className="form-input">
                  <label for="register-email">Asset Name</label>
                  <input type="text" id="balance" {...register("assetName")} />
                </div>
              </div>
            </div>
            <div className="form-row">
              <div className="form-item">
                <div className="form-input">
                  <label for="register-email">Taker Address</label>
                  <input type="text" id="balance" {...register("taker")} />
                </div>
              </div>
            </div>
            <div className="form-row">
              <div className="form-item">
                <div className="form-input">
                  <label for="register-username">Lock Amount</label>
                  <input type="text" id="lock-amount" {...register("amount")} />
                </div>
              </div>
            </div>
            <div className="form-row">
              <div className="form-item">
                <div className="form-input">
                  <label for="register-password">Locking Days</label>
                  <input type="text" id="days" {...register("days")} />
                </div>
              </div>
            </div>
            <div className="form-row">
              <div className="form-item">
                <button type="submit" className="button medium primary">
                  Approve Lock!
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
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
    if (tokenAddress) {
      setMoveToLockPage(true);
    }
  };

  return (
    <>
      <div className="form-row">
        <div className="form-item">
          <div className="form-input">
            <label for="login-username">Project Token Address</label>
            <input
              type="text"
              id="address"
              onChange={(e) => setTokenAddress(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="form-row">
        <div className="form-item">
          <button
            type="button"
            className="button medium secondary"
            onClick={handleNext}
          >
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
