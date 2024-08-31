import React, { useEffect, useMemo, useState } from "react";
import { TokenInfoCard } from "../TokenInfoCard";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { CreateTokenSchemaFT } from "../../../utils/validation/validation-schema";
import { ValidationError } from "../../UI/Errors";
import { copy } from "../../../utils/copy-text";
import toast from "react-hot-toast";
import { solidityCompiler } from "@agnostico/browser-solidity-compiler";

import Web3 from "web3";
import { getContract } from "../../../dynamic-contract/ft";
import { compileCode } from "../../../helpers/solidity";

const web3 = new Web3(window.ethereum);

const CreateTokenFormFT = () => {
  const {
    register,
    watch,
    reset,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(CreateTokenSchemaFT),
  });

  let { name, symbol, supply, token } = watch();

  const [buttonLoading, setButtonLoading] = useState(false);

  const [needDynamicContractName, setNeedDynamicContractName] = useState(false);

  async function deployContract(abi, bytecode) {
    const accounts = await web3.eth.getAccounts();
    const contract = new web3.eth.Contract(abi);

    setButtonLoading(true);
    try {
      const deployedContract = await contract
        .deploy({
          data: "0x" + bytecode,
          arguments: [accounts[0]], // tokenHolder is the deploying account
        })
        .send({
          from: accounts[0],
          gas: 3000000, // Adjust gas limit as needed
        });

      copy(deployedContract?.options?.address);
      toast.success(
        "Contract deployed successfully,and address copied to clip board",
        {
          position: "bottom-right",
          duration: 5000,
        }
      );

      reset({
        name: "",
        symbol: "",
        supply: "",
        token: "",
      });
    } catch (error) {
      console.error("Error deploying contract:", error);
      throw error;
    }
  }

  const contractName = useMemo(() => {
    const randomString = Math.random().toString(20).substring(4);
    const contractName = `Token${randomString}${token}`;

    return contractName;
  }, [token]);

  useEffect(() => {
    if (needDynamicContractName && token)
      reset((pre) => ({ ...pre, name: contractName }));
  }, [contractName]);

  const onSubmit = async (data) => {
    try {
      const { token, name, symbol, supply } = data;

      const version = "soljson-v0.5.16+commit.9c3226ce.js";
      const contractToDeploy = getContract(name, token, symbol, supply);

      const output = await compileCode({
        compilerVersion: version,
        sourceCode: contractToDeploy,
      });

      const contractComplied =
        output?.contracts?.["Compiled_Contracts"]?.[name];

      if (!contractComplied?.abi) {
        toast.error("Please Refresh the page and try again", {
          position: "bottom-right",
        });
        return;
      }
      await deployContract(
        contractComplied.abi,
        contractComplied.evm.bytecode.object
      );
    } catch (err) {
      console.log(err, "error");
      toast.error("Some error occurred", {
        position: "bottom-right",
      });
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
                <input
                  type="checkbox"
                  onChange={(e) => {
                    setNeedDynamicContractName(e.target.checked);
                  }}
                  id="dynamic"
                  name="dynamic"
                />{" "}
                {"   "}
                <label for="dynamic">Create contract name automatically </label>
                <div className="form-row split">
                  <div className="form-item">
                    <div className="form-input small">
                      <input
                        disabled={needDynamicContractName}
                        placeholder="Contract Name"
                        style={{
                          cursor: needDynamicContractName
                            ? "not-allowed"
                            : "pointer",
                        }}
                        type="text"
                        id="name"
                        name="name"
                        {...register("name", { required: true })}
                      />
                      <ValidationError err={errors.name} />
                    </div>
                  </div>
                  <div className="form-item">
                    <div className="form-input small">
                      <input
                        placeholder="Token Name"
                        type="text"
                        id="token"
                        name="token"
                        {...register("token", { required: true })}
                      />
                      <ValidationError err={errors.token} />
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
                        placeholder="Token Symbol"
                        type="text"
                        id="symbol"
                        name="symbol"
                        {...register("symbol", { required: true })}
                      />
                      <ValidationError err={errors.symbol} />
                    </div>
                  </div>
                </div>
                <br />
                <div className="form-row split">
                  <div className="form-item">
                    <div className="form-input small">
                      <input
                        placeholder="Token Supply"
                        type="text"
                        id="supply"
                        name="supply"
                        {...register("supply", { required: false })}
                      />
                      <ValidationError err={errors.supply} />
                    </div>
                    <br />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <TokenInfoCard
          isLoading={buttonLoading}
          handleSubmit={handleSubmit}
          onSubmitContract={onSubmit}
          isValid={isValid}
          name={name}
          supply={supply}
          symbol={symbol}
          token={token}
        />
      </div>
    </>
  );
};

export { CreateTokenFormFT };
