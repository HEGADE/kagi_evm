/* eslint-disable react/prop-types */
import { StacksTestnet, StacksMainnet } from "@stacks/network";
import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { NETWORK } from "../lib/constants";
// import { NETWORK } from "../utils/config/constants";

const TransactionToastsContext = createContext(undefined);

export default function TransactionToastProvider({ children }) {
  const network =
    NETWORK === "TESTNET" ? new StacksTestnet() : new StacksMainnet();

  const [transactionIds, setTransactionIds] = useState(new Set());

  const [transactionLoading, setTransactionLoading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      updateAllTransactions(transactionIds);
    }, 5000);

    return () => {
      clearInterval(interval);
      setTransactionLoading(false);
    };
  }, [transactionIds]);

  async function updateAllTransactions(transactionIds) {
    transactionIds.forEach(async (transactionId) => {
      console.log("Checking latest status of transaction:", transactionId);
      await getTransactionStatus(transactionId);
    });
  }

  async function getTransactionStatus(transactionId) {
    const apiUrl = network.coreApiUrl;
    const url = `${apiUrl}/extended/v1/tx/${transactionId}`;
    const res = await fetch(url);
    const json = await res.json();

    const status = json["tx_status"];
    if (status === "pending") {
      return;
    }

    if (status === "success") {
      toast.success("Done!", { id: transactionId });
      setTransactionLoading(false);
    } else {
      toast.error("Transaction failed", { id: transactionId });
      setTransactionLoading(false);
    }
    setTransactionIds((transactionIds) => {
      const newTransactionIds = new Set(transactionIds);
      newTransactionIds.delete(transactionId);
      return newTransactionIds;
    });
  }

  function addTransactionToast(transactionId, pendingMessage) {
    setTransactionLoading(true);
    console.log(`listening to updates for transaction ${transactionId}`);
    toast.loading(pendingMessage, {
      id: transactionId,
      position: "bottom-right",
    });
    setTransactionIds((transactionIds) => transactionIds.add(transactionId));
  }

  const value = { addTransactionToast, transactionLoading };

  return (
    <TransactionToastsContext.Provider value={value}>
      {children}
    </TransactionToastsContext.Provider>
  );
}

export function useTransactionToasts() {
  const context = useContext(TransactionToastsContext);
  if (context === undefined) {
    throw new Error(
      "useTransactionToasts must be used within a TransactionToastProvider"
    );
  }
  return context;
}
