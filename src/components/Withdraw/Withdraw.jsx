import React, { useEffect, useState } from "react";
import { WithdrawTable } from "./WithdrawTable";
import { useFetchFtLockStats } from "../../hooks/useFetchFtLockStats";
import { ContentLoader } from "../UI/ContentLoader";
import { WithdrawTableNFT } from "./WitdrawTableNFT";
import { TableHeading } from "./TableHeading";

const Withdraw = () => {
  const { data, fetchData } = useFetchFtLockStats();

  const [selectToken, setSelectToken] = useState("ft");
  const [selectTokenSort, setSelectTokenSort] = useState("ds");

  let sorted = [];

  if (data.result?.length) {
    sorted = data.result.sort((a, b) => {
      const timeA = new Date(a["locked-time"]?.value);
      const timeB = new Date(b["locked-time"]?.value);

      if (selectTokenSort === "ds") {
        if (timeA < timeB) {
          return 1;
        }
        if (timeA > timeB) {
          return -1;
        }
      } else {
        if (timeA < timeB) {
          return -1;
        } else {
          return 1;
        }
      }
      return 0;
    });
  }

  useEffect(() => {
    if (selectToken === "ft") {
      fetchData({ functionName: "get-ft-lock-info" });
    } else {
      fetchData({ functionName: "get-nft-lock-info" });
    }
  }, [selectToken]);

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
                    onChange={(e) => setSelectToken(e.target.value)}
                    id="downloads-filter-category"
                    name="tokens_filter_category"
                  >
                    <option value="ft">FT</option>
                    <option value="nft">NFT</option>
                  </select>
                  <svg className="form-select-icon icon-small-arrow">
                    {/* <use xlink:href="#svg-small-arrow"></use> */}
                  </svg>
                </div>
                <div className="form-select">
                  <label for="downloads-filter-order">Filer By</label>
                  <select
                    onChange={(e) => setSelectTokenSort(e.target.value)}
                    id="downloads-filter-order"
                    name="tokens_filter_order"
                  >
                    <option value="ds">Descending</option>
                    <option value="as">Ascending</option>
                  </select>
                  <svg className="form-select-icon icon-small-arrow">
                    {/* <use xlink:href="#svg-small-arrow"></use> */}
                  </svg>
                </div>
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
                        <TableHeading type={selectToken} />
                        <div className="table-body same-color-rows">
                          {data?.loading ? (
                            <ContentLoader />
                          ) : sorted?.length > 0 ? (
                            sorted?.map((token) => {
                              if (selectToken === "ft") {
                                return (
                                  <WithdrawTable
                                    assetContact={token["ft-contract"]?.value}
                                    assetName={
                                      token["ft-name"]?.value || "stacksies"
                                    }
                                    amount={token["amount"]?.value}
                                    lockID={token["lock-id"]?.value}
                                    key={token["lock-id"]?.value}
                                    lockTime={token["locked-time"]?.value}
                                    lockedTime={token["locked-time"]?.value}
                                  />
                                );
                              } else {
                                return (
                                  <WithdrawTableNFT
                                    assetContact={token["nft-contract"]?.value}
                                    assetName={
                                      token["nft-name"]?.value || "stacksies"
                                    }
                                    lockID={token["locking-id"]?.value}
                                    key={token["token-id"]?.value}
                                    assetID={token["token-id"]?.value}
                                    lockTime={token["lock-expiry"]?.value}
                                    lockedTime={token["locked-time"]?.value}
                                    taker={token["taker"]?.value}
                                  />
                                );
                              }
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
