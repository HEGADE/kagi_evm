import React from "react";

const TokenCard = ({
  tokenName,
  totalTokenAmount,
  lockTime,
  tokenAmount,
  ticker,
}) => {
  return (
    <>
      <div className="quest-item">
        <figure
          className="quest-item-cover liquid"
          style={{
            background:
              'url("assets/img/cover.png") center center / cover no-repeat',
          }}
        >
          <img
            src="assets/img/cover.png"
            alt="cover-01"
            style={{ display: "none" }}
          />
        </figure>
        <p className="text-sticker small-text">${totalTokenAmount}m</p>
        <div className="quest-item-info">
          <h4 className="quest-item-title">Token Locked Past {lockTime}D</h4>
          <br />
          <div className="table-information">
            <span className="d-flex align-items-center">
              <h4 className="table-title">1</h4>
              <img
                className="table-image"
                src="assets/img/btc-logo.svg"
                alt="btc-logo"
              />
              <h3 className="table-title">
                {tokenName} ({ticker})
              </h3>
            </span>
            <h4 className="table-title table-value">${tokenAmount}m</h4>
          </div>
          <div className="table-information">
            <span className="d-flex align-items-center">
              <h4 className="table-title">2</h4>
              <img
                className="table-image"
                src="assets/img/btc-logo.svg"
                alt="btc-logo"
              />
              <h3 className="table-title">
                {tokenName} ({ticker})
              </h3>
            </span>
            <h4 className="table-title table-value">${tokenAmount}m</h4>
          </div>
          <div className="table-information">
            <span className="d-flex align-items-center">
              <h4 className="table-title">3</h4>
              <img
                className="table-image"
                src="assets/img/btc-logo.svg"
                alt="btc-logo"
              />
              <h3 className="table-title">
                {tokenName} ({ticker})
              </h3>
            </span>
            <h4 className="table-title table-value">${tokenAmount}m</h4>
          </div>
          <div className="quest-item-meta">
            <div className="user-avatar-list">
              <div className="user-avatar micro no-stats">
                <div className="user-avatar-border">
                  <div
                    className="hexagon-22-24"
                    style={{
                      width: 22,
                      height: 24,
                      position: "relative",
                    }}
                  >
                    <canvas
                      width={22}
                      height={24}
                      style={{ position: "absolute", top: 0, left: 0 }}
                    />
                  </div>
                </div>
                <div className="user-avatar-content">
                  <div
                    className="hexagon-image-18-20"
                    data-src="assets/img/btc-logo.svg"
                    style={{
                      width: 18,
                      height: 20,
                      position: "relative",
                    }}
                  >
                    <canvas
                      width={18}
                      height={20}
                      style={{ position: "absolute", top: 0, left: 0 }}
                    />
                  </div>
                </div>
              </div>
              <div className="user-avatar micro no-stats">
                <div className="user-avatar-border">
                  <div
                    className="hexagon-22-24"
                    style={{
                      width: 22,
                      height: 24,
                      position: "relative",
                    }}
                  >
                    <canvas
                      width={22}
                      height={24}
                      style={{ position: "absolute", top: 0, left: 0 }}
                    />
                  </div>
                </div>
                <div className="user-avatar-content">
                  <div
                    className="hexagon-image-18-20"
                    data-src="assets/img/btc-logo.svg"
                    style={{
                      width: 18,
                      height: 20,
                      position: "relative",
                    }}
                  >
                    <canvas
                      width={18}
                      height={20}
                      style={{ position: "absolute", top: 0, left: 0 }}
                    />
                  </div>
                </div>
              </div>
              <div className="user-avatar micro no-stats">
                <div className="user-avatar-border">
                  <div
                    className="hexagon-22-24"
                    style={{
                      width: 22,
                      height: 24,
                      position: "relative",
                    }}
                  >
                    <canvas
                      width={22}
                      height={24}
                      style={{ position: "absolute", top: 0, left: 0 }}
                    />
                  </div>
                </div>
                <div className="user-avatar-content">
                  <div
                    className="hexagon-image-18-20"
                    data-src="assets/img/btc-logo.svg"
                    style={{
                      width: 18,
                      height: 20,
                      position: "relative",
                    }}
                  >
                    <canvas
                      width={18}
                      height={20}
                      style={{ position: "absolute", top: 0, left: 0 }}
                    />
                  </div>
                </div>
              </div>
              <div className="user-avatar micro no-stats">
                <div className="user-avatar-border">
                  <div
                    className="hexagon-22-24"
                    style={{
                      width: 22,
                      height: 24,
                      position: "relative",
                    }}
                  >
                    <canvas
                      width={22}
                      height={24}
                      style={{ position: "absolute", top: 0, left: 0 }}
                    />
                  </div>
                </div>
                <div className="user-avatar-content">
                  <div
                    className="hexagon-image-18-20"
                    data-src="assets/img/btc-logo.svg"
                    style={{
                      width: 18,
                      height: 20,
                      position: "relative",
                    }}
                  >
                    <canvas
                      width={18}
                      height={20}
                      style={{ position: "absolute", top: 0, left: 0 }}
                    />
                  </div>
                </div>
              </div>
              <div className="user-avatar micro no-stats">
                <div className="user-avatar-border">
                  <div
                    className="hexagon-22-24"
                    style={{
                      width: 22,
                      height: 24,
                      position: "relative",
                    }}
                  >
                    <canvas
                      width={22}
                      height={24}
                      style={{ position: "absolute", top: 0, left: 0 }}
                    />
                  </div>
                </div>
                <div className="user-avatar-content">
                  <div
                    className="hexagon-image-18-20"
                    data-src="assets/img/btc-logo.svg"
                    style={{
                      width: 18,
                      height: 20,
                      position: "relative",
                    }}
                  >
                    <canvas
                      width={18}
                      height={20}
                      style={{ position: "absolute", top: 0, left: 0 }}
                    />
                  </div>
                </div>
              </div>
              <div className="user-avatar micro no-stats">
                <div className="user-avatar-border">
                  <div
                    className="hexagon-22-24"
                    style={{
                      width: 22,
                      height: 24,
                      position: "relative",
                    }}
                  >
                    <canvas
                      width={22}
                      height={24}
                      style={{ position: "absolute", top: 0, left: 0 }}
                    />
                  </div>
                </div>
                <div className="user-avatar-content">
                  <div
                    className="hexagon-image-18-20"
                    data-src="assets/img/btc-logo.svg"
                    style={{
                      width: 18,
                      height: 20,
                      position: "relative",
                    }}
                  >
                    <canvas
                      width={18}
                      height={20}
                      style={{ position: "absolute", top: 0, left: 0 }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="quest-item-meta-info">
              <p className="quest-item-meta-title">+24 Tokens</p>
              <p className="quest-item-meta-text">
                Locked in past {lockTime} Days
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export { TokenCard };
