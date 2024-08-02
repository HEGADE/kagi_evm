import React from "react";

const TraceableTokenContainer = () => {
  return (
    <>
      <div className="content-grid">
        <div className="section-header">
          <div className="section-header-info">
            <h2 className="section-title">Tradable Token Locks</h2>
            <p className="section-pretitle">Buy/Sell Locked Tokens</p>
          </div>
        </div>
        <div className="grid grid-3-3-3-3 centered-on-mobile">
          <div className="create-entity-box v2">
            <div className="create-entity-box-cover" />
            <div className="create-entity-box-avatar primary">
              <img
                className="table-image"
                src="assets/img/kagi-logo-no-name.png"
                alt="btc-logo"
                style={{ height: 60 }}
              />
            </div>
            <div className="create-entity-box-info">
              <p className="create-entity-box-title">KAGI</p>
              <p className="create-entity-box-category">$KG</p>
              <p className="button primary full popup-manage-item-trigger">
                View Details
              </p>
            </div>
          </div>
          <div className="create-entity-box v2">
            <div className="create-entity-box-cover" />
            <div className="create-entity-box-avatar primary">
              <img
                className="table-image"
                src="assets/img/kagi-logo-no-name.png"
                alt="btc-logo"
                style={{ height: 60 }}
              />
            </div>
            <div className="create-entity-box-info">
              <p className="create-entity-box-title">KAPE</p>
              <p className="create-entity-box-category">$KP</p>
              <p className="button primary full popup-manage-item-trigger">
                View Details
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export { TraceableTokenContainer };
