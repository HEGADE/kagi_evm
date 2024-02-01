import { callReadOnlyFunction, cvToValue } from "@stacks/transactions";
import { contractOwnerAddress, deployedContractName } from "../lib/constants";
import React, { useEffect, useState } from "react";
import { useStacks } from "../providers/StacksProvider";

const useFetchFtLockStats = () => {
  const { network, address } = useStacks();

  const [data, setData] = useState({
    loading: true,
    error: null,
    result: null,
  });

  const fetchData = async () => {
    setData((pre) => {
      return { ...pre, loading: true };
    });

    try {
      const result = await callReadOnlyFunction({
        contractAddress: contractOwnerAddress,
        contractName: deployedContractName,
        functionName: "get-ft-lock-info",
        functionArgs: [address],
        network,
        senderAddress: address,
      });
      console.log("result", result);
      console.log("resultCv", cvToValue(result));
      setData((pre) => {
        return {
          ...pre,
          result: cvToValue(result),
        };
      });
    } catch (err) {
      console.log(err);

      setData((pre) => {
        return { ...pre, error: err };
      });
    } finally {
      setData((pre) => {
        return { ...pre, loading: false };
      });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data };
};

export { useFetchFtLockStats };
