import { vestingAbi } from "../abi/vesting.abi";
import { toWei } from "../helpers/convertion";
import { vestingContractAddress } from "../lib/constants";
import { initWeb3 } from "./web3.service";

export const vestToken = async ({
  accountAddress,
  takerAddress,
  cliffPeriod,
  vestingPeriod,
  duration,
  ert20TokenAddress,
  amount,
}) => {
  const web3 = await initWeb3();

  const contractInstance = new web3.eth.Contract(
    vestingAbi,
    vestingContractAddress
  );

  console.log(
    "accountAddress",
    accountAddress,
    "takerAddress",
    takerAddress,
    "cliffPeriod",
    cliffPeriod,
    "vestingPeriod",
    vestingPeriod,
    "duration",
    duration,
    "ert20TokenAddress",
    ert20TokenAddress,
    "amount",
    amount
  );

  const actualAmount = toWei(amount, "ether");

  let vestRes = await contractInstance.methods
    .vestTokens(
      ert20TokenAddress,
      takerAddress,
      actualAmount,
      vestingPeriod,
      cliffPeriod,
      duration
    )
    .send({ from: accountAddress, to: vestingContractAddress });

  return vestRes;
};
