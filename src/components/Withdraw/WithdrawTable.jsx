import React, { useState } from "react";
import ButtonWithLoading from "../UI/LoaderButton";
import { useStacks } from "../../providers/StacksProvider";
import { useTransactionToasts } from "../../providers/TransactionStatusProvider";
import { getFtPostCondition } from "../../utils/postconditions/ft-postcondition";
import {
  appDetails,
  contractOwnerAddress,
  deployedContractName,
} from "../../lib/constants";

import { uintCV, principalCV } from "@stacks/transactions";
import { getContractAddressAndName } from "../../utils/extract-contract-info";
import { openContractCall } from "@stacks/connect";
import { withDrawData } from "../../lib/withdraw-data";
import { shortAddress } from "../../utils/format/address.format";
import { ContentLoader } from "../UI/ContentLoader";

const WithdrawTable = () => {
  const { network, address } = useStacks();

  const { addTransactionToast } = useTransactionToasts();

  const [loading, setLoading] = useState(true);

  const handleWithdraw = async ({ amount, assetName, tokenAddress }) => {
    const { contractAddress, contractName } =
      getContractAddressAndName(tokenAddress);

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
        functionName: "unlock-ft",
        functionArgs: [principalCV(tokenAddress), uintCV(amount)],
        postConditions: [tokenPostCondition],
        network,
        appDetails,
        onFinish: ({ txId }) => {
          console.log("onFinish:", txId);
          addTransactionToast(txId, `Withdrawing ${assetName} `);
        },
      };
      await openContractCall(options);
    } catch (err) {
      console.log("error", err);
    }
  };

  if (loading) {
   return <ContentLoader />;
  }
  return (
    <>
      <div className="table-body same-color-rows">
        {withDrawData.map((token) => {
          return (
            <>
              <div className="table-row medium" key={token.LockID}>
                <div className="table-column">
                  <div className="product-preview tiny">
                    <a>
                      <figure
                        className="product-preview-image short liquid"
                        style={{ background: "url('img/btc-logo.svg')" }}
                      >
                        <img
                          src="img/btc-logo.svg"
                          alt="item-11"
                          style={{ display: "none" }}
                        />
                      </figure>
                    </a>
                    <div className="product-preview-info">
                      <p className="product-preview-title">{token.ftName}</p>
                    </div>
                  </div>
                </div>
                <div className="table-column padded">
                  <p className="table-title">
                    {shortAddress(token.ftContract.split(".")[0])}
                  </p>
                </div>
                <div className="table-column padded">
                  <p className="table-title">{token.amount} $BRCL</p>
                </div>
                <div className="table-column padded">
                  <p className="table-title">Wed, 09 Mar 2022 12:09:47 GMT</p>
                </div>
                <div className="table-column padded">
                  <div id="clockdiv">
                    <div>
                      <span className="days">99</span>
                      <div className="smalltext">D</div>
                    </div>
                    <div>
                      <span className="hours">23</span>
                      <div className="smalltext">H</div>
                    </div>
                    <div>
                      <span className="minutes">54</span>
                      <div className="smalltext">M</div>
                    </div>
                    <div>
                      <span className="seconds">57</span>
                      <div className="smalltext">S</div>
                    </div>
                  </div>
                </div>
                <div className="table-column padded-left">
                  <div className="table-actions">
                    <ButtonWithLoading
                      onClick={() =>
                        handleWithdraw({
                          amount: token.amount,
                          tokenAddress: token.ftContract,
                          assetName: token.ftName,
                        })
                      }
                      text="withdraw"
                      className="button secondary"
                    />
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};

export { WithdrawTable };
