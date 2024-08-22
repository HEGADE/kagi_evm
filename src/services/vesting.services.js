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

export const releaseToken = async ({ accountAddress, vestID }) => {
  const web3 = await initWeb3();

  const contractInstance = new web3.eth.Contract(
    vestingAbi,
    vestingContractAddress
  );

  let releaseRes = await contractInstance.methods
    .releaseTokens(vestID)
    .send({ from: accountAddress, to: vestingContractAddress });

  return releaseRes;
};

export const getVestingSchedules = async ({ accountAddress }) => {
  const web3 = await initWeb3();

  const contractInstance = new web3.eth.Contract(
    vestingAbi,
    vestingContractAddress
  );

  let vestingList = await contractInstance.methods
    .getVestingSchedules(accountAddress)
    .call();

  console.log(vestingList, "vestingList");

  return vestingList;
};
