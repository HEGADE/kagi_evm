import { tradableVestingAbi } from "../abi/tradable-vest.abi";
import { toWei } from "../helpers/convertion";
import { TradableVestingContractAddress } from "../lib/constants";
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
    tradableVestingAbi,
    TradableVestingContractAddress
  );
  console.log(contractInstance.methods);
  
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
    .send({ from: accountAddress, to: TradableVestingContractAddress });

  return vestRes;
};

export const releaseToken = async ({ accountAddress, vestID }) => {
  const web3 = await initWeb3();

  const contractInstance = new web3.eth.Contract(
    tradableVestingAbi,
    TradableVestingContractAddress
  );

  let releaseRes = await contractInstance.methods
    .releaseTokens(vestID)
    .send({ from: accountAddress, to: TradableVestingContractAddress });

  return releaseRes;
};

export const getVestingSchedules = async ({ accountAddress }) => {
  const web3 = await initWeb3();

  const contractInstance = new web3.eth.Contract(
    tradableVestingAbi,
    TradableVestingContractAddress
  );

  let vestingList = await contractInstance.methods
    .getUserVestingSchedules(accountAddress)
    .call();

  console.log(vestingList, "vestingList");

  return vestingList;
};
