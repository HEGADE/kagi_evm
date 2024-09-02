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
  console.log({ accountAddress, vestID });

  const contractInstance = new web3.eth.Contract(
    tradableVestingAbi,
    TradableVestingContractAddress
  );

  let releaseRes = await contractInstance.methods
    .releaseTokens(vestID)
    .send({ from: accountAddress, to: TradableVestingContractAddress });

  return releaseRes;
};

export const getUserVestingSchedules = async ({ accountAddress }) => {
  try {
    const web3 = await initWeb3();
    console.log(accountAddress);

    const contractInstance = new web3.eth.Contract(
      tradableVestingAbi,
      TradableVestingContractAddress
    );

    let vestingList = await contractInstance.methods
      .getUserVestingSchedules(accountAddress)
      .call();

    console.log(vestingList, "vestingList");

    let vestPeriods = await contractInstance.methods
      .getVestingScheduleDetails(0)
      .call();

    console.log(vestPeriods);

    return vestingList;
  } catch (error) {
    console.log(error);
  }
};

export const getVestingSchedules = async ({ accountAddress }) => {
  try {
    const web3 = await initWeb3();
    console.log(accountAddress);

    const contractInstance = new web3.eth.Contract(
      tradableVestingAbi,
      TradableVestingContractAddress
    );

    const vestScheduleList = await getUserVestingSchedules({ accountAddress });
    console.log(vestScheduleList);

    const vestPeriods = await Promise.all(
      vestScheduleList.map((scheduleId) =>
        contractInstance.methods.getVestingScheduleDetails(scheduleId).call()
      )
    );

    console.log(vestPeriods);

    return vestPeriods;
  } catch (error) {
    console.log(error);
  }
};

export const transferOwnership = async ({
  newAddress,
  vestID,
  accountAddress,
}) => {
  try {
    const web3 = await initWeb3();
    console.log({ newAddress, vestID, accountAddress });

    const contractInstance = new web3.eth.Contract(
      tradableVestingAbi,
      TradableVestingContractAddress
    );

    const transfer = await contractInstance.methods
      .transferVestingOwnership(vestID, newAddress)
      .send({ from: accountAddress, to: TradableVestingContractAddress });
    return transfer;
  } catch (error) {
    console.log(error);
  }
};
