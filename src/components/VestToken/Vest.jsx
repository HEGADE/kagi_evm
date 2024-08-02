import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  CreateTokenSchemaFT,
  VestTokenSchema,
} from "../../utils/validation/validation-schema";
import { ValidationError } from "../UI/Errors";
import { copy } from "../../utils/copy-text";
import { createDeployableTokenContractFT } from "../../utils/deploy-contract/createDeployableFT";
import toast from "react-hot-toast";
import { useTransactionToasts } from "../../providers/TransactionStatusProvider";
import { NETWORK } from "../../lib/constants";
import { deployContract } from "../../utils/deploy-contract/deployContract";
import { TokenInfoCard } from "../CreateToken/TokenInfoCard";
import ButtonWithLoading from "../UI/LoaderButton";

const explorerUrl =
  NETWORK === "TESTNET"
    ? "https://explorer.hiro.so"
    : "https://explorer.hiro.so";

const VestToken = () => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(VestTokenSchema),
  });

  let { name, symbol, decimals, supply, url } = watch();

  const { addTransactionToast } = useTransactionToasts({
    success: `Successfully deployed ${name?.toLowerCase()} ${
      false ? "NFT" : "FT"
    } `,
  });

  const [buttonLoading, setButtonLoading] = useState(false);
  const [includeTotalSupply, setIncludeTotalSupply] = useState(false);

  const onSubmit = async (data) => {
    window.location.reload();
    setButtonLoading(true);
    try {
      const contactToDeploy = createDeployableTokenContractFT(data, NETWORK);
      let txId = await deployContract({
        contractCode: contactToDeploy,
        contractName: data?.name,
        networkBeingUsed: NETWORK,
      });

      let url = `${explorerUrl}/txid/${txId}?chain=testnet`;
      if (txId) {
        copy(url);
        // alert("Transaction URL copied to ClipBoard");
        addTransactionToast(txId, `Deploying ${data?.name}`);
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
                <div className="form-row split">
                  <div className="form-item">
                    <div className="form-input small">
                      <input
                        placeholder="Token Address"
                        type="text"
                        id="symbol"
                        name="symbol"
                        {...register("address", { required: true })}
                      />
                      <ValidationError err={errors.symbol} />
                    </div>
                  </div>
                </div>
                <br />
                <div className="form-row">
                  <div className="form-item">
                    <div className="form-input small">
                      <input
                        placeholder="Token Amount"
                        type="text"
                        id="decimal"
                        name="decimal"
                        {...register("amount", { required: true })}
                      />
                      <ValidationError err={errors.decimals} />
                    </div>
                    <br />
                  </div>
                </div>

                <input
                  type="checkbox"
                  name="include"
                  onClick={() => setIncludeTotalSupply((pre) => !pre)}
                />
                <label
                  for="include"
                  style={{
                    color: "green",
                  }}
                >
                  Do you Want to include the Cliff period in Days (default its
                  in months)?
                </label>

                <div className="form-row">
                  <div className="form-item">
                    <div className="form-input small">
                      <input
                        placeholder="Cliff Period"
                        type="text"
                        id="decimal"
                        name="decimal"
                        {...register("cliff", { required: true })}
                      />
                      <ValidationError err={errors.decimals} />
                    </div>
                    <br />
                  </div>
                </div>
                <input
                  type="checkbox"
                  name="include"
                  onClick={() => setIncludeTotalSupply((pre) => !pre)}
                />
                <label
                  for="include"
                  style={{
                    color: "green",
                  }}
                >
                  Do you Want to include the Vesting period in Days (default its
                  in months)?
                </label>
                <div className="form-row split">
                  <div className="form-item">
                    <div className="form-input small">
                      <input
                        // disabled={!includeTotalSupply}
                        // style={{
                        //   cursor: !includeTotalSupply
                        //     ? "not-allowed"
                        //     : "pointer",
                        // }}
                        placeholder="Vesting Period"
                        type="text"
                        id="supply"
                        name="supply"
                        {...register("vestingPeriod", { required: false })}
                      />
                      <ValidationError err={errors.supply} />
                    </div>
                    <br />
                  </div>
                </div>
                <ButtonWithLoading
                  loaderColor="blue"
                  disabled={!isValid}
                  text="Vest Token"
                  className="button secondary"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export { VestToken };
