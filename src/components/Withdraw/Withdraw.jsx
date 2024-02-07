import React, { useEffect } from "react";
import { WithdrawTable } from "./WithdrawTable";
import { PageLoader } from "../UI/PageLoader";
import { useFetchFtLockStats } from "../../hooks/useFetchFtLockStats";
import { ContentLoader } from "../UI/ContentLoader";

const Withdraw = () => {
  const { data, fetchData } = useFetchFtLockStats();

  useEffect(() => {
    fetchData({ functionName: "get-ft-lock-info" });
  }, []);

  return (
    <>
      <div class="content-grid">
        <div className="account-hub-content">
          <div className="section-header">
            <div className="section-header-info">
              <h2 className="section-title">
                My Token Locks: <span className="highlighted"> </span>
              </h2>
              <p className="section-pretitle">Withraw your token locks</p>
            </div>
          </div>
          <div className="section-filters-bar v2">
            <form className="form">
              <div className="form-item split medium">
                <div className="form-select">
                  <label for="downloads-filter-category">Categories</label>
                  <select
                    id="downloads-filter-category"
                    name="tokens_filter_category"
                  >
                    <option value="1">All</option>
                    <option value="2">Blockchain</option>
                    <option value="3">Defi</option>
                    <option value="4">DAO</option>
                    <option value="5">NFT</option>
                    <option value="6">Launchpad</option>
                    <option value="7">Others</option>
                  </select>
                  <svg className="form-select-icon icon-small-arrow">
                    {/* <use xlink:href="#svg-small-arrow"></use> */}
                  </svg>
                </div>
                <div className="form-select">
                  <label for="downloads-filter-order">Filer By</label>
                  <select
                    id="downloads-filter-order"
                    name="tokens_filter_order"
                  >
                    <option value="1">All</option>
                    <option value="2">Withdrawn</option>
                    <option value="3">Not Withdrawn</option>
                  </select>
                  <svg className="form-select-icon icon-small-arrow">
                    {/* <use xlink:href="#svg-small-arrow"></use> */}
                  </svg>
                </div>
                <button className="button primary">Filter Tokens</button>
              </div>
            </form>
          </div>
          <div className="table-wrap" data-simplebar="init">
            <div className="simplebar-wrapper" style={{ margin: "0px" }}>
              <div className="simplebar-height-auto-observer-wrapper">
                <div className="simplebar-height-auto-observer"></div>
              </div>
              <div className="simplebar-mask">
                <div
                  className="simplebar-offset"
                  style={{ right: "0px", bottom: "0px" }}
                >
                  <div
                    className="simplebar-content-wrapper"
                    style={{ height: "auto", overflow: "hidden" }}
                  >
                    <div
                      className="simplebar-content"
                      style={{ padding: "0px;" }}
                    >
                      <div className="table table-downloads split-rows">
                        <div className="table-header">
                          <div className="table-header-column">
                            <p className="table-header-title">Token Name</p>
                          </div>
                          <div className="table-header-column padded">
                            <p className="table-header-title">Tokens Address</p>
                          </div>
                          <div className="table-header-column padded">
                            <p className="table-header-title">Tokens Locked</p>
                          </div>
                          <div className="table-header-column padded">
                            <p className="table-header-title">Locked Time</p>
                          </div>
                          <div className="table-header-column padded">
                            <p className="table-header-title">Unlocked Time</p>
                          </div>
                          <div className="table-header-column padded-left"></div>
                        </div>
                        <div className="table-body same-color-rows">
                          {data?.loading ? (
                            <ContentLoader />
                          ) : data?.result?.length > 0 ? (
                            data?.result?.map((token) => {
                              return (
                                <WithdrawTable
                                  amount={token.amount?.value}
                                  assetContact={token["ft-contract"]?.value}
                                  assetName={token["ft-name"]?.value}
                                  lockID={token["lock-id"]?.value}
                                  key={token["lock-id"]?.value}
                                  lockTime={token["locked-time"]?.value}
                                />
                              );
                            })
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export { Withdraw };
