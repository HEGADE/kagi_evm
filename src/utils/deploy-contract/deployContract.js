import { openContractDeploy } from "@stacks/connect";
import { StacksTestnet, StacksMainnet, StacksDevnet } from "@stacks/network";
import { AnchorMode } from "@stacks/transactions";

import { transformString } from "../format/format-asset-name";

export const deployContract = async ({
  contractCode,
  contractName,
  networkBeingUsed,
}) => {
  let txid = null;

  await openContractDeploy({
    contractName: transformString(contractName),
    codeBody: contractCode,
    anchorMode: AnchorMode.Any,
    network:
      networkBeingUsed === "TESTNET" ? new StacksDevnet() : new StacksMainnet(),

    onFinish: (res) => {
      console.log("finished");

      txid = res.txId;
    },

    onCancel: () => {
      console.log("cancelled");
    },
  });
  return txid;
};
