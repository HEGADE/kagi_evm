import React, { useEffect, useState } from "react";
import { WithdrawTable } from "./WithdrawTable";
import { useFetchFtLockStats } from "../../hooks/useFetchFtLockStats";
import { ContentLoader } from "../UI/ContentLoader";
import { WithdrawTableNFT } from "./WitdrawTableNFT";
import { TableHeading } from "./TableHeading";
import { useStacks } from "../../providers/StacksProvider";
import { IconRefresh } from "../UI/Icons";
import { Skeleton } from "@mantine/core";
import { SkeletonTabular } from "../UI/Skeletons";

const Withdraw = () => {
  const { data, fetchData } = useFetchFtLockStats();
  const { currentBlockHeight } = useStacks();

  const [selectToken, setSelectToken] = useState("ft");
  const [selectTokenSort, setSelectTokenSort] = useState("ds");
  const [search, setSearch] = useState("");

  const functionName =
    selectToken === "ft" ? "get-ft-lock-info" : "get-nft-lock-info";

  const currentAsset = selectToken === "ft" ? "ft-name" : "nft-name";
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

  sorted = sorted.filter((item) =>
    item[currentAsset]?.value
      .toString()
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  useEffect(() => {
    if (selectToken === "ft") {
      fetchData({ functionName });
    } else {
      fetchData({ functionName });
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
              <p className="section-pretitle">Withdraw your token locks</p>
              <p className="section-pretitle" color="blue">
                Current Block Height: {currentBlockHeight}
              </p>
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
                  <label for="downloads-filter-order">Filer By Date</label>
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
                <div className="form-select">
                  <label for="downloads-filter-order">Search</label>
                  <input
                    type="text"
                    id="downloads-filter-order"
                    placeholder="Search by asset Name"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />

                  <svg className="form-select-icon icon-small-arrow">
                    {/* <use xlink:href="#svg-small-arrow"></use> */}
                  </svg>
                </div>
                <div
                  className="form-select"
                  style={{
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  onClick={() => {
                    fetchData({ functionName });
                  }}
                >
                  <IconRefresh />
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
                            <SkeletonTabular
                              className="table-row medium"
                              height={60}
                              width="100%"
                              howMany={3}
                            />
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
                                    taker={token["taker"]?.value}
                                    lockTime={token["lock-expiry"]?.value}
                                    lockedTime={token["locked-time"]?.value}
                                    lockedBlockHeight={
                                      token["locked-block-height"]?.value
                                    }
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
                                    lockedBlockHeight={
                                      token["locked-block-height"]?.value
                                    }
                                  />
                                );
                              }
                            })
                          ) : (
                            <div
                              className="table-row medium"
                              style={{
                                background: "transparent",
                                position: "absolute",
                                width: "100%",
                              }}
                            >
                              <div
                                className="table-column"
                                style={{
                                  position: "absolute",
                                  width: "100%",
                                  height: "100%",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                }}
                              >
                                <h3>
                                  No {selectToken?.toLocaleUpperCase()} lock
                                  found
                                </h3>
                              </div>
                            </div>
                          )}
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
