import { callReadOnlyFunction, cvToValue } from "@stacks/transactions";
import { contractOwnerAddress, deployedContractName } from "../lib/constants";
import React, { useState } from "react";
import { useStacks } from "../providers/StacksProvider";
import { principalCV } from "@stacks/transactions";
const useFetchFtLockStats = () => {
  const { network, address } = useStacks();

  const [data, setData] = useState({
    loading: true,
    error: null,
    result: null,
  });

  const fetchData = async ({ functionName }) => {
    setData((pre) => {
      return { ...pre, loading: true };
    });

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
      setData((pre) => {
        return {
          ...pre,
          result: result?.value?.list?.map((item) => {
            return cvToValue(item);
          }),
        };
      });
    } catch (err) {
      console.log(err);

      setData((pre) => {
        return { ...pre, error: err, result: [] };
      });
    } finally {
      setTimeout(() => {
        setData((pre) => {
          return { ...pre, loading: false };
        });
      }, 3000);
    }
  };

  return { data, fetchData };
};

export { useFetchFtLockStats };
