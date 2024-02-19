/* eslint-disable react/prop-types */
import { StacksTestnet, StacksMainnet, StacksDevnet } from "@stacks/network";
import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { NETWORK } from "../lib/constants";
import { useEvent } from "../store/event.store";
// import { NETWORK } from "../utils/config/constants";

const TransactionToastsContext = createContext(undefined);
let successMsg = "";
let successMsgs = {};
export default function TransactionToastProvider({ children }) {
  const network =
    NETWORK === "TESTNET" ? new StacksDevnet() : new StacksMainnet();

  const [transactionIds, setTransactionIds] = useState(new Set());

  const [transactionLoading, setTransactionLoading] = useState(false);

  const [transactionSuccessfulMsg, setTransactionSuccessfulMsg] = useState("");

  const emitEvent = useEvent((state) => state.emitEvent);
  const resetEvent = useEvent((state) => state.reset);

  useEffect(() => {
    const interval = setInterval(() => {
      updateAllTransactions(transactionIds);
    }, 3000);

    return () => {
      clearInterval(interval);
      setTransactionLoading(false);
      resetEvent();
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
    console.log(successMsgs, "msgs");
    const transactionSuccess = successMsgs[transactionId];
    const status = json["tx_status"];
    if (status === "pending") {
      return;
    }

    if (status === "success") {
      toast.success(transactionSuccess, {
        id: transactionId,
        duration: 5000,
        position: "bottom-right",
        style: { fontWeight: "bold" },
      });
      emitEvent();
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
    successMsgs[transactionId] = successMsg;
    toast.loading(pendingMessage, {
      id: transactionId,
      position: "bottom-right",
      style: {
        fontWeight: "bold",
      },
    });
    setTransactionIds((transactionIds) => transactionIds.add(transactionId));
  }

  const value = {
    addTransactionToast,
    transactionLoading,
    setTransactionSuccessfulMsg,
  };

  return (
    <TransactionToastsContext.Provider value={value}>
      {children}
    </TransactionToastsContext.Provider>
  );
}

export function useTransactionToasts({ success }) {
  successMsg = success;
  const context = useContext(TransactionToastsContext);
  if (context === undefined) {
    throw new Error(
      "useTransactionToasts must be used within a TransactionToastProvider"
    );
  }
  return context;
}
