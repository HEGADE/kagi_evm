import React, { useContext, useEffect, useState } from "react";
import { WithdrawTable } from "./WithdrawTable";
import { WithdrawTableNFT } from "./WitdrawTableNFT";
import { TableHeading } from "./TableHeading";
import { IconRefresh } from "../UI/Icons";
import { getTokenList } from "../../services/lock.services";
import { MetamaskContext } from "../../context/MetamaskContext";
import { getLockedNftList } from "../../services/lock-nft.services";
import { SkeletonTabular } from "../UI/Skeletons";
import { rem } from "@mantine/core";
import { NotFound } from "./404-token";
import { Render } from "../UI/Render";

const Withdraw = () => {
  const [selectToken, setSelectToken] = useState("ft");
  const [selectTokenSort, setSelectTokenSort] = useState("ds");
  const [search, setSearch] = useState(null);

  const [loading, setLoading] = useState(true);

  const [tokens, setTokens] = useState([]);

  let tokensWithIndex = tokens?.[selectToken]?.map((item, idx) => {
    return {
      ...item,
      lockID: idx,
    };
  });

  let sorted = [];

  const { accountID } = useContext(MetamaskContext);

  if (tokensWithIndex?.length) {
    sorted = tokensWithIndex?.sort((a, b) => {
      const timeA = new Date(Number(a.unlockTime) * 1000);
      const timeB = new Date(Number(b.unlockTime) * 1000);

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

  // sorted = sorted.filter((item) => {
  //   if (!search) {
  //     return item;
  //   }
  //   return item[currentAsset]?.value
  //     .toString()
  //     .toLowerCase()
  //     .includes(search.toLowerCase());
  // });

  const fetchTokenList = async () => {
    let res = await getTokenList({ accountAddress: accountID });

    let resNft = await getLockedNftList({ accountAddress: accountID });

    setTokens((pre) => {
      return {
        nft: resNft,
        ft: res,
      };
    });
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => {
      setLoading(true);
    };
  }, [accountID]);

  useEffect(() => {
    if (accountID) fetchTokenList();
  }, [selectToken, accountID]);

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
              <p className="section-pretitle" color="blue"></p>
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
                    return null;
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
                      <div className="table table-downloads table-responsive split-rows">
                        <TableHeading type={selectToken} />
                        <div className="table-body same-color-rows">
                          {loading ? (
                            <SkeletonTabular
                              className="table-row medium padded"
                              howMany={5}
                              width="100%"
                              height={rem(60)}
                            />
                          ) : sorted?.length > 0 ? (
                            sorted?.map((token, indx) => {
                              if (selectToken === "ft") {
                                return (
                                  <WithdrawTable
                                    assetContact={token?.erc20}
                                    amount={token?.amount}
                                    lockID={Number(token?.lockID)}
                                    key={indx + Number(token?.unlockTime)}
                                    unlockTime={token?.unlockTime}
                                    lockedTime={token?.lockedTime}
                                  />
                                );
                              } else {
                                return (
                                  <WithdrawTableNFT
                                    assetContact={token?.tokenAddress}
                                    lockID={Number(token?.tokenId)}
                                    unlockTime={Number(token?.unlockTime)}
                                    key={indx + Number(token?.tokenId)}
                                  />
                                );
                              }
                            })
                          ) : (
                            <NotFound selectToken={selectToken} />
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
