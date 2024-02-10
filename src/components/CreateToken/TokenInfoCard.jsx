import React from "react";
import ButtonWithLoading from "../UI/LoaderButton";

const TokenInfoCard = ({
  name,
  currentForm,
  symbol,
  decimal,
  supply,
  url,
  isLoading,
  isValid,
  handleSubmit,
  onSubmitContract,
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
                    <span className="bold">Token Name</span>
                  </p>
                </div>
                <p className="price-title">{name}</p>
              </div>
              {currentForm !== "NFT" && (
                <div className="totals-line">
                  <div className="totals-line-info">
                    <p className="totals-line-title">
                      <span className="bold">Token Symbol</span>
                    </p>
                  </div>
                  <p className="price-title"> {symbol}</p>
                </div>
              )}
              {currentForm !== "NFT" && (
                <div className="totals-line">
                  <div className="totals-line-info">
                    <p className="totals-line-title">
                      <span className="bold">Decimal</span>
                    </p>
                  </div>
                  <p className="price-title"> {decimal}</p>
                </div>
              )}
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
                    <span className="bold">URL</span>
                  </p>
                </div>
                <p className="price-title"> {url}</p>
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
