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
import toast from "react-hot-toast";
import { solidityCompiler } from "@agnostico/browser-solidity-compiler";
import { getContractNFT } from "../../../dynamic-contract/ft";
import Web3 from "web3";

const web3 = new Web3(window.ethereum);

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

  let { contractName, nftName, nftSymbol } = watch();

  const [buttonLoading, setButtonLoading] = useState(false);

  async function deployContract(abi, bytecode) {
    const accounts = await web3.eth.getAccounts();
    const contract = new web3.eth.Contract(abi);

    setButtonLoading(true);
    try {
      const deployedContract = await contract
        .deploy({
          data: "0x" + bytecode,
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
    } catch (error) {
      console.error("Error deploying contract:", error);

      toast.error("Error deploying contract", {
        position: "bottom-right",
      });
    } finally {
      setButtonLoading(false);
    }
  }

  const onSubmit = async (data) => {
    setButtonLoading(true);

    const version = "soljson-v0.8.15+commit.e14f2714.js";

    try {
      const contractToDeploy = getContractNFT(contractName, nftName, nftSymbol);

      console.log("contractToDeploy nft", contractToDeploy);

      const output = await solidityCompiler({
        version: `https://binaries.soliditylang.org/bin/${version}`,
        contractBody: contractToDeploy,
        options: {
          optimizer: {
            enabled: true,
            runs: 3000,
          },
        },
      });

      const contractComplied =
        output?.contracts?.["Compiled_Contracts"]?.[contractName];

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
      console.error("Error compiling contract:", err);
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
                        placeholder="Enter the Contract Name"
                        type="text"
                        id="name"
                        name="contractName"
                        {...register("contractName", { required: true })}
                      />
                      <ValidationError err={errors.contractName} />
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
                        placeholder="Enter the name of the NFT"
                        type="text"
                        id="name"
                        name="nftName"
                        {...register("nftName", { required: true })}
                      />
                      <ValidationError err={errors.nftName} />
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
                        placeholder="Enter the symbol of the NFT"
                        type="text"
                        id="name"
                        name="nftSymbol"
                        {...register("nftSymbol", { required: true })}
                      />
                      <ValidationError err={errors.nftSymbol} />
                    </div>
                  </div>
                  <br />
                  <br />
                  <br />
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
          name={nftName}
          contractName={contractName}
          symbol={nftSymbol}
        />
      </div>
    </>
  );
};

export { CreateTokenFormNFT };
