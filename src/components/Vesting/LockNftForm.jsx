import React from "react";
import { ValidationError } from "../UI/Errors";
import ButtonWithLoading from "../UI/LoaderButton";

const LockNftForm = ({
  nftHandleSubmit,
  nftRegister,
  nftErrors,
  nftIsValid,
  onSubmitNFT,
  data,
  loading,
}) => {
  return (
    <>
      <form className="form" onSubmit={nftHandleSubmit(onSubmitNFT)}>
        <div className="form-row">
          <div className="form-item">
            <div className="form-input">
              {/* <label for="register-email">Asset Name</label> */}
              <input
                disabled
                value={data?.assetName}
                type="text"
                id="balance"
                {...nftRegister("assetName")}
                placeholder="Fungible Token name"
              />
              <ValidationError err={nftErrors.assetName} />
            </div>
          </div>
        </div>
        <div className="form-row">
          <div className="form-item">
            <div className="form-input">
              {/* <label for="register-email">Asset Name</label> */}
              <input
                type="text"
                id="balance"
                disabled
                {...nftRegister("tokenID")}
                placeholder="Token ID"
              />
              <ValidationError err={nftErrors?.tokenID} />
            </div>
          </div>
        </div>
        <div className="form-row">
          <div className="form-item">
            <div className="form-input">
              {/* <label for="register-email">Taker Address</label> */}
              <input
                type="text"
                id="balance"
                disabled
                placeholder="Token Address"
                {...nftRegister("tokenAddress")}
              />
              <ValidationError err={nftErrors?.tokenAddress} />
            </div>
          </div>
        </div>

        <div className="form-row">
          <div className="form-item">
            <div className="form-input">
              {/* <label for="register-password">Locking Days</label> */}
              <input
                type="text"
                id="days"
                placeholder="Locking Days"
                {...nftRegister("days")}
              />
              <ValidationError err={nftErrors.days} />
            </div>
          </div>
        </div>
        <div className="form-row">
          <div className="form-item">
            <ButtonWithLoading
              disabled={!nftIsValid}
              loaderColor="blue"
              type="submit"
              className="button medium primary"
              text="Lock"
              isLoading={loading}
            />
          </div>
        </div>
      </form>
    </>
  );
};

export { LockNftForm };
