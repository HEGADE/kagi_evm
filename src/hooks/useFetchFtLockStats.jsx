import { callReadOnlyFunction, cvToValue } from "@stacks/transactions";
import { contractOwnerAddress, deployedContractName } from "../lib/constants";
import React, { useState } from "react";
import { useStacks } from "../providers/StacksProvider";
import { principalCV } from "@stacks/transactions";
import { useTableData } from "../store/table-data.store";
const useFetchFtLockStats = () => {
  const { network, address } = useStacks();
  const data = useTableData((state) => state.data);

  const setData = useTableData((state) => state.setData);

  const fetchData = async ({ functionName }) => {
    setData({ loading: true });

    try {
      const result = await callReadOnlyFunction({
        contractAddress: contractOwnerAddress,
        contractName: deployedContractName,
        functionName: functionName,
        functionArgs: [principalCV(address)],
        network,
        senderAddress: address,
      });
      console.log("result user", result);
      console.log("resultCv user", cvToValue(result?.value?.list[0]));
      setData({
        result: result?.value?.list?.map((item) => {
          return cvToValue(item);
        }),
      });
    } catch (err) {
      console.log(err);

      setData({ error: err, result: [] });
    } finally {
      setTimeout(() => {
        setData({
          loading: false,
        });
      }, 3000);
    }
  };

  return { data, fetchData, setData };
};

export { useFetchFtLockStats };
