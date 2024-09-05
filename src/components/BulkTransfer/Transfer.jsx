import { useContext, useState } from "react";

import { toWei } from "../../helpers/convertion";

import Parser from "papaparse";
import toast from "react-hot-toast";

import ButtonWithLoading from "../UI/LoaderButton";
import FileInput from "../UI/FileInput";
import { MetamaskContext } from "../../context/MetamaskContext";
import { sendTokensToMultipleAddresses } from "../../services/bulk-transfer";
import Web3 from "web3";

const allowedExtensions = ["csv"];

export function Transfer({ data, setData, token }) {
  const [tokenAddress, setTokenAddress] = useState(token);
  const [file, setFile] = useState(undefined);
  const [loading, setLoading] = useState(false);

  const { accountID } = useContext(MetamaskContext);

  const handleFileChange = async (e) => {
    e.preventDefault();

    const files = e.currentTarget.files;

    // Checking if user has entered the file
    if (files?.length) {
      const inputFile = files[0];

      // Check the file extension
      const fileExtension = inputFile?.type.split("/")[1];
      if (!allowedExtensions.includes(fileExtension)) {
        toast.error("⛔️ Only CSV extension allowed!", {
          duration: 5000,
          position: "bottom-right",
        });
        setFile(null);
        return;
      }

      setFile(inputFile);
    }
  };

  const handleParse = (e) => {
    if (!file) return toast.error("⛔️  Please enter a valid file!");
    // When the file loads, we parse it and set the data
    Parser.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        const recipientLists = [];
        const amountList = [];
        let finalAmount = 0;

        // Iterating data to get column name and their values
        let keys = results.meta.fields;

        results.data
          .filter(
            (d) => !(d[keys[0]]?.toLowerCase() === accountID?.toLowerCase())
          )
          .map((d) => {
            recipientLists.push(d[keys[0]]);
            amountList.push(Number(d[keys[1]]));
          });
        let InvalidAddress = "";
        try {
          recipientLists.forEach((recipient) => {
            InvalidAddress = recipient;
            if (Web3.utils.isAddress(recipient) === false) {
              throw new Error("Invalid Address");
            }
          });
          amountList.forEach((amount) => {
            if (amount <= 0) {
              throw new Error("Amount Error");
            }
            finalAmount += amount;
          });

          if (finalAmount > data?.balance) {
            toast.error(
              `⛔️  Insufficient balance to transfer ${finalAmount} ${data?.symbol}`,

              {
                duration: 5000,
                position: "bottom-right",
              }
            );
            return;
          }

          transferTokens(e, recipientLists, amountList);
        } catch (err) {
          setFile(null);
          if (err.message === "Amount Error") {
            toast.error("⛔️  Amount should be greater than 0 in CSV fle", {
              duration: 5000,
              position: "bottom-right",
            });
          } else
            toast.error(
              ` ${InvalidAddress} this address  in Csv File  is not Valid`,
              {
                duration: 5000,

                position: "bottom-right",
              }
            );
        }
      },
    });
  };

  const transferTokens = async (e, recipientList, amountList) => {
    e.preventDefault();

    if (!accountID) {
      toast.error("⛔️  Must be connected to a wallet\nto transfer tokens!");
      return;
    }

    setLoading(true);

    try {
      let transactionInfoAddress = [];
      let transactionInfoAmount = [];
      let totalTokens = 0;

      recipientList.map((recipient, index) => {
        if (recipient?.toLowerCase() !== accountID?.toLowerCase()) {
          const amount = amountList[index];
          transactionInfoAddress.push(recipient.toString());

          transactionInfoAmount.push(toWei(amount, "ether"));
          totalTokens += amount;
        } else {
          console.warn(
            `⚠️  Removing ${recipient} and associated amount ${amountList[index]}`
          );
        }
      });

      await sendTokensToMultipleAddresses({
        accountAddress: accountID,
        tokenAddress,
        addressArray: transactionInfoAddress,
        amountArray: transactionInfoAmount,
      });
      setFile(null);
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
      setTokenAddress(null);
      setFile(null);
    } finally {
      setLoading(false);
    }
  };

  const isButtonDisabled = !tokenAddress || !file || loading;

  return (
    <div className="content-grid">
      <div className="grid grid-8-4 small-space">
        <form className="form ">
          <div>
            <label
              htmlFor="fungible-token"
              className="block text-sm font-medium text-gray-700"
            >
              Available Balance {data?.balance} {data?.symbol}
            </label>
          </div>
          <br />

          <div>
            <label
              htmlFor="token-address"
              className="block text-sm font-medium text-gray-700"
            >
              Token Name
            </label>
            <div className="form-input small">
              <input
                value={data?.assetName}
                type="text"
                disabled
                style={{
                  cursor: "not-allowed",
                }}
                id="token-address"
                className="block w-full p-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="some-token-address"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="token-address"
              className="block text-sm font-medium text-gray-700"
            >
              Token Symbol
            </label>
            <div className="form-input small">
              <input
                value={data?.symbol}
                type="text"
                disabled
                style={{
                  cursor: "not-allowed",
                }}
                id="token-address"
                className="block w-full p-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="some-token-address"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="token-address"
              className="block text-sm font-medium text-gray-700"
            >
              Token Address
            </label>
            <div className="form-input small">
              <input
                value={tokenAddress}
                type="text"
                disabled
                style={{
                  cursor: "not-allowed",
                }}
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
              onClick={handleParse}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
