import React from "react";
import ButtonWithLoading from "../UI/LoaderButton";

const TokenInfoCard = ({
  name,
  currentForm,
  symbol,
  decimal,
  supply,
  url,
  token,
  isLoading,
  isValid,
  handleSubmit,
  onSubmitContract,
  contractName,
}) => {
  return (
    <>
      <form className="grid-column" onSubmit={handleSubmit(onSubmitContract)}>
        <div className="sidebar-box">
          <p className="sidebar-box-title">Deploy</p>
          <div className="sidebar-box-items">
            <div className="totals-line-list separator-bottom">
              <div className="totals-line">
                <div className="totals-line-info">
                  <p className="totals-line-title">
                    <span className="bold">Contract Name</span>
                  </p>
                </div>
                <p className="price-title">{contractName}</p>
              </div>
              {
                <div className="totals-line">
                  <div className="totals-line-info">
                    <p className="totals-line-title">
                      <span className="bold"> Symbol</span>
                    </p>
                  </div>
                  <p className="price-title"> {symbol}</p>
                </div>
              }

              {currentForm !== "NFT" && (
                <div className="totals-line">
                  <div className="totals-line-info">
                    <p className="totals-line-title">
                      <span className="bold">Token Supply</span>
                    </p>
                  </div>
                  <p className="price-title">{supply}</p>
                </div>
              )}
              <div className="totals-line">
                <div className="totals-line-info">
                  <p className="totals-line-title">
                    <span className="bold">Token name</span>
                  </p>
                </div>
                <p className="price-title"> {name}</p>
              </div>
            </div>
          </div>
          <div className="sidebar-box-items">
            <ButtonWithLoading
              isLoading={isLoading}
              loaderColor="blue"
              disabled={!isValid}
              text="Deploy Token"
              className="button secondary"
            />
          </div>
        </div>
      </form>
    </>
  );
};

export { TokenInfoCard };
