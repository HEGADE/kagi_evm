import { useState } from "react";
import { openContractCall } from "@stacks/connect";
import {
  createAssetInfo,
  FungibleConditionCode,
  makeStandardFungiblePostCondition,
  makeStandardSTXPostCondition,
} from "@stacks/transactions";
import {
  listCV,
  principalCV,
  standardPrincipalCV,
  tupleCV,
  uintCV,
} from "@stacks/transactions";
import Parser from "papaparse";
import toast from "react-hot-toast";
import {
  appDetails,
  bulkTokenDispatcherContractName,
} from "../../lib/constants";
import { useStacks } from "../../providers/StacksProvider";
import { useTransactionToasts } from "../../providers/TransactionStatusProvider";

import { fetchFromContractForBulkTransfer } from "../../lib/fetch-data";
import ButtonWithLoading from "../UI/LoaderButton";
import FileInput from "../UI/FileInput";

const allowedExtensions = ["csv"];

export function Transfer() {
  const [tokenAddress, setTokenAddress] = useState("");
  const [fungibleToken, setFungibleToken] = useState("");
  const [file, setFile] = useState(undefined);
  const [recipientList, setRecipientList] = useState([]);
  const [amountList, setAmountList] = useState([]);
  const [loading, setLoading] = useState(false);

  const { network, address } = useStacks();
  const { addTransactionToast } = useTransactionToasts({
    success: "🎉 Tokens Transferred Successfully!",
  });

  const handleFileChange = async (e) => {
    e.preventDefault();

    const files = e.currentTarget.files;

    // Checking if user has entered the file
    if (files?.length) {
      const inputFile = files[0];

      // Check the file extension
      const fileExtension = inputFile?.type.split("/")[1];
      if (!allowedExtensions.includes(fileExtension)) {
        toast.error(
          "⛔️  Invalid File Extension. \n\nOnly CSV extension allowed!"
        );
        return;
      }

      setFile(inputFile);
    }
  };

  const handleParse = () => {
    console.info("Calling handleParse");
    if (!file) return toast.error("⛔️  Please enter a valid file!");

    try {
      // When the file loads, we parse it and set the data
      principalCV(tokenAddress);
      Parser.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: function (results) {
          const recipientList = [];
          const amountList = [];

          // Iterating data to get column name and their values
          let keys = results.meta.fields;
          console.info("keys: ", keys);
          results.data.map((d) => {
            recipientList.push(d[keys[0]]);
            amountList.push(Number(d[keys[1]]));
          });

          setRecipientList(recipientList);
          setAmountList(amountList);
        },
      });
    } catch (err) {
      const actualErrorMsg = err?.message?.split(":")[0];
      if (actualErrorMsg === "Invalid c32 address") {
        toast.error("⛔️ Please Enter Valid Token Address");
      }
    }
  };

  const transferTokens = async (e) => {
    e.preventDefault();

    if (!address) {
      toast.error("⛔️  Must be connected to a wallet\nto transfer tokens!");
      return;
    }

    setLoading(true);

    try {
      // Parse file data
      await handleParse();

      const contractInfoResult = await fetchFromContractForBulkTransfer(
        tokenAddress,
        network,
        address,
        [
          {
            functionName: "get-symbol",
          },
          {
            functionName: "get-decimals",
          },
          {
            functionName: "get-balance",
            functionArgs: [principalCV(address)],
          },
        ]
      );
      console.info("👓  contractInfoResult: ", contractInfoResult);

      const tokenSymbol = contractInfoResult?.contractInfo[0]?.value;
      const tokenDecimals = contractInfoResult?.contractInfo[1]?.value;
      const tokenBalance = contractInfoResult?.contractInfo[2]?.value;
      const tokenContractOwnerAddress =
        contractInfoResult?.contractOwnerAddress;
      const tokenContractName = contractInfoResult?.contractName;
      console.info(
        "👓  tokenContractName, tokenContractOwnerAddress, tokenSymbol, tokenDecimals, tokenBalance: ",
        tokenContractName,
        tokenContractOwnerAddress,
        tokenSymbol,
        tokenDecimals,
        tokenBalance
      );

      let transactionInfo = [];
      // let transactionInfo: TupleCV<TransactionInfo>[] = [];
      let totalTokens = 0;
      recipientList.map((recipient, index) => {
        if (recipient !== address) {
          const amount = amountList[index];
          transactionInfo.push(
            tupleCV({
              recipient: standardPrincipalCV(recipient),
              amount: uintCV(amount * 1000000),
            })
          );
          totalTokens += amount;
        } else {
          console.warn(
            `⚠️  Removing ${recipient} and associated amount ${amountList[index]}`
          );
        }
      });

      console.info("👓  totalTokens: ", totalTokens);

      const tokenPostCondition = makeStandardFungiblePostCondition(
        address,
        FungibleConditionCode.Equal,
        totalTokens * 10 ** Number(tokenDecimals),
        createAssetInfo(
          tokenContractOwnerAddress,
          tokenContractName,
          fungibleToken
        ) // TODO: Fetch contractOwnerAdress, contractName and tokenName from entered tokenAddress
      );

      const stxPostCondition = makeStandardSTXPostCondition(
        address,
        FungibleConditionCode.Equal,
        0
      );

      console.info("transactionInfo: ", transactionInfo);
      // (contract-call? .bulk-token-dispatcher send-multiple-transaction-tuple-list .sip010-ft (list { 'St....9 u5000000 }))
      const options = {
        contractAddress: tokenContractOwnerAddress,
        contractName: bulkTokenDispatcherContractName,
        functionName: "send-multiple-transaction-tuple-list",
        functionArgs: [principalCV(tokenAddress), listCV(transactionInfo)],
        postConditions: [tokenPostCondition, stxPostCondition],
        network,
        appDetails,
        onFinish: ({ txId }) =>
          addTransactionToast(txId, `Transferring tokens...`),
      };

      await openContractCall(options);
    } catch (err) {
      const actualErrorMsg = err?.message?.split(":")[0];
      if (actualErrorMsg === "Invalid c32 address") {
        toast.error("⛔️ Please Enter Valid Token Address", {
          duration: 5000,

          position: "bottom-right",
        });
      } else {
        if (err?.message?.includes("Unchecked")) {
          toast.error("⛔️  Token Address is not Found", {
            duration: 5000,
            position: "bottom-right",
          });
        }
      }
    } finally {
      setLoading(false);
    }
  };

  // const transferTokens = async (e: React.MouseEvent<HTMLButtonElement>) => {
  //   e.preventDefault();

  //   if (!address) {
  //     toast.error('⛔️  Must be connected to a wallet\nto transfer tokens!');
  //     return
  //   }

  //   // Parse file data
  //   await handleParse();

  //   const network = new StacksMocknet();

  //   let recipientsListClarity: any = [];
  //   recipientList.map((recipient) => {
  //     // recipientsListClarity.push(principalCV(recipient));
  //     recipientsListClarity.push(standardPrincipalCV(recipient));
  //   });

  //   let amountListClarity: any = [];
  //   // let transferInfo: any = [];
  //   let totalTokens: number = 0;
  //   await amountList.map((amount, index) => {
  //     // transferInfo.push(tupleCV({ recipient: standardPrincipalCV(recipientList[index]), amount: uintCV(amount * 1000000) }))
  //     amountListClarity.push(uintCV(amount * 1000000));
  //     totalTokens += Number(amount);
  //   });

  //   console.info("totalTokens: ", totalTokens);

  //   const tokenPostCondition = makeStandardFungiblePostCondition(
  //     address,
  //     FungibleConditionCode.Equal,
  //     totalTokens * 1000000,
  //     createAssetInfo(contractOwnerAddress, 'sip010-ft', 'cryptic-ocean-coin'),
  //   );

  //   const stxPostCondition = makeStandardSTXPostCondition(
  //     address,
  //     FungibleConditionCode.Equal,
  //     0,
  //   );

  //   // console.info("amountListClarity: ", amountListClarity);
  //   // console.info("transferInfo: ", transferInfo);
  //   // (contract-call? .bulk-token-dispatcher send-multiple-transactions .sip010-ft (list 'St....9) (list u5000000))
  //   const options: ContractCallRegularOptions = {
  //     contractAddress: contractOwnerAddress,
  //     contractName: bulkTokenDispatcherContractName,
  //     functionName: 'send-multiple-transactions',
  //     functionArgs: [
  //       principalCV(tokenAddress),
  //       listCV(recipientsListClarity),
  //       listCV(amountListClarity),
  //     ],
  //     postConditions: [tokenPostCondition, stxPostCondition],
  //     network,
  //     appDetails,
  //     onFinish: ({ txId }) => addTransactionToast(txId, `Transfering tokens...`),
  //   };

  //   // const options: ContractCallRegularOptions = {
  //   //   contractAddress: contractOwnerAddress,
  //   //   contractName: bulkTokenDispatcherContractName,
  //   //   functionName: 'send-multiple-transactions-2',
  //   //   functionArgs: [
  //   //     principalCV(tokenAddress),
  //   //     listCV(transferInfo),
  //   //   ],
  //   //   postConditions: [tokenPostCondition, stxPostCondition],
  //   //   network,
  //   //   appDetails,
  //   //   onFinish: ({ txId }) => addTransactionToast(txId, `Transfering tokens...`),
  //   // };

  //   await openContractCall(options);
  // };

  // console.info("recipientList: ", recipientList);
  // console.info("amountList: ", amountList);

  const isButtonDisabled = !tokenAddress || !file || !fungibleToken || loading;

  return (
    <div className="content-grid">
      <div className="grid grid-8-4 small-space">
        <form className="form ">
          <div>
            <label
              htmlFor="fungible-token"
              className="block text-sm font-medium text-gray-700"
            >
              Fungible Token
            </label>
            <div className="form-input small">
              <input
                type="text"
                id="fungible-token"
                onChange={(e) => setFungibleToken(e.target.value)}
                className="block w-full p-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="some-fungible-token defined in : (define-fungible-token some-fungible-token)"
              />
            </div>
          </div>
          <br />

          <div>
            <label
              htmlFor="token-address"
              className="block text-sm font-medium text-gray-700"
            >
              Token Address
            </label>
            <div className="form-input small">
              <input
                type="text"
                id="token-address"
                onChange={(e) => setTokenAddress(e.target.value)}
                className="block w-full p-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="some-token-address"
              />
            </div>
          </div>
          <br />

          <div>
            <label
              htmlFor="file-input"
              className="block text-sm font-medium text-gray-700"
            >
              Upload Bulk Transfer CSV File
            </label>
            <div className="form-input small">
              <FileInput
                name="file-input"
                required={true}
                extraClasses="bg-gray-50"
                onChange={(e) => handleFileChange(e)}
              />
            </div>
            <p
              className="mt-1 text-sm text-gray-500 dark:text-gray-400"
              id="file_input_help"
            >
              Only CSV Files Allowed.
            </p>
          </div>
          <br />

          <div className="flex flex-row gap-8">
            <ButtonWithLoading
              className="button secondary"
              text="Transfer Tokens"
              type="button"
              loaderColor="blue"
              isLoading={loading}
              disabled={isButtonDisabled}
              onClick={transferTokens}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
