import React from "react";
import { tokenTable } from "./data-token";
import { Image } from "@mantine/core";

const TokenTable = () => {
  return (
    <>
      <div className="section-filters-bar v1">
        <div className="section-filters-bar-actions">
          <form className="form">
            <div className="form-input small with-button">
              <label htmlFor="friends-search">Search Tokens</label>
              <input type="text" id="friends-search" name="friends_search" />
              <button className="button primary">
                <svg className="icon-magnifying-glass">
                  <use xlinkHref="#svg-magnifying-glass" />
                </svg>
              </button>
            </div>
            <div className="form-select">
              <label htmlFor="friends-filter-category">Filter By</label>
              <select
                id="friends-filter-category"
                name="friends_filter_category"
              >
                <option value={0}>All</option>
                <option value={1}>Blockchain</option>
                <option value={2}>Defi</option>
                <option value={3}>DAO</option>
                <option value={4}>NFT</option>
                <option value={5}>Launchpad</option>
                <option value={6}>Others</option>
              </select>
              <svg className="form-select-icon icon-small-arrow">
                <use xlinkHref="#svg-small-arrow" />
              </svg>
            </div>
          </form>
          <div className="filter-tabs">
            <div className="filter-tab active">
              <p className="filter-tab-text">All</p>
            </div>
            <div className="filter-tab">
              <p className="filter-tab-text">Blockchain</p>
            </div>
            <div className="filter-tab">
              <p className="filter-tab-text">Defi</p>
            </div>
            <div className="filter-tab">
              <p className="filter-tab-text">DAO</p>
            </div>
            <div className="filter-tab">
              <p className="filter-tab-text">NFT</p>
            </div>
            <div className="filter-tab">
              <p className="filter-tab-text">Launchpad</p>
            </div>
            <div className="filter-tab">
              <p className="filter-tab-text">Others</p>
            </div>
          </div>
        </div>
      </div>
      <div className="grid">
        <div className="user-stats">
          <div className="user-stat">
            <p className="user-stat-title">Project Name</p>
          </div>
          <div className="user-stat d-none d-lg-block">
            <p className="user-stat-title">Price</p>
          </div>
          <div className="user-stat d-none d-lg-block">
            <p className="user-stat-title">Marketcap</p>
          </div>
          <div className="user-stat d-none d-lg-block">
            <p className="user-stat-title">Cir. Supply</p>
          </div>
          <div className="user-stat d-none d-lg-block">
            <p className="user-stat-title">% Locked</p>
          </div>
          <div className="user-stat">
            <p className="user-stat-title">Value Locked</p>
          </div>
          <div className="user-stat d-none d-lg-block">
            <p className="user-stat-title">Unlock Value</p>
          </div>
          <div
            style={{
              visibility: "hidden",
            }}
            className="user-stat d-none d-lg-block"
          >
            <p className="user-stat-title">Next Unlock</p>
          </div>
        </div>

        {tokenTable.map((token) => {
          return (
            <div className="user-preview landscape">
              <figure
                className="user-preview-cover liquid"
                style={{
                  background:
                    'url("assets/img/token-cover.jpg") center center / cover no-repeat',
                }}
              >
                <img
                  src="assets/img/token-cover.jpg"
                  alt="cover-04"
                  style={{ display: "none" }}
                />
              </figure>
              <>
                <div className="user-preview-info">
                  <div className="user-short-description landscape tiny">
                    <a
                      className="user-short-description-avatar user-avatar small"
                      href="project-overview.html"
                    >
                      <div className="user-avatar-border">
                        <div
                          className="hexagon-50-56"
                          style={{
                            width: 80,
                            height: 86,
                            position: "relative",
                          }}
                        >
                          <canvas
                            width={80}
                            height={86}
                            style={{ position: "absolute", top: 0, left: 0 }}
                          />
                        </div>
                      </div>
                      <div className="user-avatar-content">
                        <div
                          className="hexagon-image-30-32"
                          data-src="https://cdn.prod.website-files.com/618b0aafa4afde9048fe3926/62b7a54730c30d0840766c4d_clarity%20favicon%20(1).png"
                          style={{
                            width: 50,
                            height: 52,
                            position: "relative",
                          }}
                        >
                          <canvas
                            width={50}
                            height={52}
                            style={{ position: "absolute", top: 0, left: 0 }}
                          />
                        </div>
                      </div>
                      <div className="user-avatar-progress-border">
                        <div
                          className="hexagon-border-40-44"
                          style={{
                            width: 60,
                            height: 64,
                            position: "relative",
                          }}
                        >
                          <canvas
                            width={60}
                            height={64}
                            style={{ position: "absolute", top: 0, left: 0 }}
                          />
                        </div>
                      </div>
                    </a>
                    <p
                      className="user-short-description-title"
                      style={{
                        display: "flex",
                        gap: ".4rem",
                        // justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <span>
                        <Image src={token.logo} w="50" h="50" />
                      </span>
                      <a href="project-overview.html">{token.projectName} </a>
                    </p>
                    <p className="user-short-description-text">
                      {/* <a href="project-overview.html">$BRCL</a> */}
                    </p>
                  </div>
                  <div className="user-stats">
                    <div className="user-stat">
                      <p className="user-stat-title">${token.price}</p>
                    </div>
                  </div>
                  <div className="user-stats">
                    <div className="user-stat">
                      <p className="user-stat-title">${token.marketcap}</p>
                    </div>
                  </div>
                  <div className="user-stats">
                    <div className="user-stat">
                      <p className="user-stat-title">${token.cirSupply}</p>
                    </div>
                  </div>
                  <div className="user-stats">
                    <div className="user-stat">
                      <p className="user-stat-title">{token.percentLocked}%</p>
                    </div>
                  </div>
                  <div className="user-stats">
                    <div className="user-stat">
                      <p className="user-stat-title">$ {token.valueLocked}</p>
                    </div>
                  </div>
                  <div className="user-stats">
                    <div className="user-stat">
                      <p className="user-stat-title">${token.unlockValue}</p>
                    </div>
                  </div>
                  <div
                    style={{
                      visibility: "hidden",
                    }}
                    className="social-links small"
                  >
                    <div id="clockdiv">
                      <div>
                        <span className="days" />
                        <div className="smalltext">D</div>
                      </div>
                      <div>
                        <span className="hours" />
                        <div className="smalltext">H</div>
                      </div>
                      <div>
                        <span className="minutes" />
                        <div className="smalltext">M</div>
                      </div>
                      <div>
                        <span className="seconds" />
                        <div className="smalltext">S</div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            </div>
          );
        })}
      </div>
      <div className="section-pager-bar">
        <div className="section-pager">
          <div className="section-pager-item active">
            <p className="section-pager-item-text">01</p>
          </div>
          <div className="section-pager-item">
            <p className="section-pager-item-text">02</p>
          </div>
          <div className="section-pager-item">
            <p className="section-pager-item-text">03</p>
          </div>
          <div className="section-pager-item">
            <p className="section-pager-item-text">04</p>
          </div>
          <div className="section-pager-item">
            <p className="section-pager-item-text">05</p>
          </div>
          <div className="section-pager-item">
            <p className="section-pager-item-text">06</p>
          </div>
        </div>
        <div className="section-pager-controls">
          <div className="slider-control left disabled">
            <svg className="slider-control-icon icon-small-arrow">
              <use xlinkHref="#svg-small-arrow" />
            </svg>
          </div>
          <div className="slider-control right">
            <svg className="slider-control-icon icon-small-arrow">
              <use xlinkHref="#svg-small-arrow" />
            </svg>
          </div>
        </div>
      </div>
    </>
  );
};

export { TokenTable };
