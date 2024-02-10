import React, { useState } from "react";
import { TokenInfoCard } from "../TokenInfoCard";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  CreateTokenSchemaFT,
  createNFTSchema,
} from "../../../utils/validation/validation-schema";
import { ValidationError } from "../../UI/Errors";
import { copy } from "../../../utils/copy-text";
import {
  createDeployableTokenContractFT,
  createDeployableTokenContractNFT,
} from "../../../utils/deploy-contract/createDeployableFT";
import toast from "react-hot-toast";
import { useTransactionToasts } from "../../../providers/TransactionStatusProvider";
import { NETWORK } from "../../../lib/constants";
import { deployContract } from "../../../utils/deploy-contract/deployContract";

const explorerUrl =
  NETWORK === "TESTNET"
    ? "https://explorer.hiro.so"
    : "https://explorer.hiro.so";
const CreateTokenFormNFT = ({ currentForm }) => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(createNFTSchema),
  });

  let { name, symbol, decimals, supply, url } = watch();

  const { addTransactionToast } = useTransactionToasts({
    success: `Successfully deployed ${name?.toLowerCase()} NFT `,
  });

  const [buttonLoading, setButtonLoading] = useState(false);

  console.log(errors, isValid, "::");

  const onSubmit = async (data) => {
    setButtonLoading(true);
    try {
      const contactToDeploy = createDeployableTokenContractNFT(data, NETWORK);
      let txId = await deployContract({
        contractCode: contactToDeploy,
        contractName: data?.name,
        networkBeingUsed: NETWORK,
      });

      let url = `${explorerUrl}/txid/${txId}?chain=testnet`;
      if (txId) {
        copy(url);
        alert("Transaction URL copied to ClipBoard");
        setTimeout(() => {
          addTransactionToast(txId, `Deploying ${data?.name} NFT`);
        }, 2000);
      }
    } catch (err) {
      toast.error(err?.message || "Some error occurred");
    } finally {
      setButtonLoading(false);
    }
  };

  return (
    <>
      <div className="grid grid-8-4 small-space">
        <div className="grid-column">
          <div className="widget-box">
            <div className="widget-box-content">
              <form className="form" onSubmit={handleSubmit(onSubmit)}>
                <div className="form-row split">
                  <div className="form-item">
                    <div className="form-input small">
                      <input
                        placeholder="Token Name"
                        type="text"
                        id="name"
                        name="name"
                        {...register("name", { required: true })}
                      />
                      <ValidationError err={errors.name} />
                    </div>
                  </div>
                  <br />
                  <br />
                  <br />
                </div>

                <br />

                <div className="form-row">
                  <div className="form-item">
                    {/* FORM INPUT */}
                    <div className="form-input small medium-textarea">
                      <textarea
                        {...register("url", { required: true })}
                        id="billing-details"
                        name="url"
                        placeholder="Token Url (www.example.com)"
                        defaultValue={""}
                      />
                      <ValidationError err={errors.url} />
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <TokenInfoCard
          currentForm={currentForm}
          isLoading={buttonLoading}
          handleSubmit={handleSubmit}
          onSubmitContract={onSubmit}
          isValid={isValid}
          name={name}
          decimal={decimals}
          supply={supply}
          symbol={symbol}
          url={url}
        />
      </div>
    </>
  );
};

export { CreateTokenFormNFT };
