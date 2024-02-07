import React from "react";

const TokenInfoCard = ({ name, symbol, decimal, supply, url }) => {
  return (
    <>
      <div className="grid-column">
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
              <div className="totals-line">
                <div className="totals-line-info">
                  <p className="totals-line-title">
                    <span className="bold">Token Symbol</span>
                  </p>
                </div>
                <p className="price-title"> ${symbol}</p>
              </div>
              <div className="totals-line">
                <div className="totals-line-info">
                  <p className="totals-line-title">
                    <span className="bold">Decimal</span>
                  </p>
                </div>
                <p className="price-title"> {decimal}</p>
              </div>
              <div className="totals-line">
                <div className="totals-line-info">
                  <p className="totals-line-title">
                    <span className="bold">Token Supply</span>
                  </p>
                </div>
                <p className="price-title">{supply}</p>
              </div>
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
            <p className="button primary">Deploy Token</p>
          </div>
        </div>
      </div>
    </>
  );
};

export { TokenInfoCard };
