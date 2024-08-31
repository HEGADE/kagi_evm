import React, { useContext, useEffect, useState } from "react";
import { IconRefresh } from "../UI/Icons";
import VestingHeading from "./VestingHeading";
import VestingTable from "./VestingTable";
import { getVestingSchedules } from "../../services/vesting.services";
import { MetamaskContext } from "../../context/MetamaskContext";

function VestingTokenList() {
  const { accountID } = useContext(MetamaskContext);

  const [tokenVestingList, settokenVestingList] = useState([]);
  const [selectTokenSort, setSelectTokenSort] = useState("ds");

  let tokensWithIndex = tokenVestingList?.map((item, idx) => {
    return {
      ...item,
      vestID: idx,
    };
  });

  let sorted = [];

  if (tokenVestingList?.length) {
    sorted = tokensWithIndex.sort((a, b) => {
      const timeA = new Date(Number(a?.cliffTime) * 1000);
      const timeB = new Date(Number(b?.cliffTime) * 1000);

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

  const fetchtokenVestingList = async () => {
    let res = await getVestingSchedules({ accountAddress: accountID });
    settokenVestingList(res);
  };

  useEffect(() => {
    if (accountID) fetchtokenVestingList();
  }, [accountID]);

  return (
    <div class="content-grid">
      <div className="account-hub-content">
        <div className="section-header">
          <div className="section-header-info">
            <h2 className="section-title">
              Vesting Tokens <span className="highlighted"> </span>
            </h2>
            {/* <p className="section-pretitle">Withdraw your token locks</p> */}
            <p className="section-pretitle" color="blue">
              Number of tokens vested
            </p>
          </div>
        </div>
        <div className="section-filters-bar v2">
          <form className="form">
            <div className="form-item split medium">
              <div className="form-select">
                <label for="downloads-filter-category">Category</label>
                <select
                  id="downloads-filter-category"
                  name="tokens_filter_category"
                >
                  <option value="ft">Vest Tokens</option>
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
                  placeholder="Search by token name"
                  // value={search}
                  // onChange={(e) => setSearch(e.target.value)}
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
                //   onClick={() => {
                //     fetchData({ functionName });
                //   }}
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
                      <VestingHeading />
                      <div className="table-body same-color-rows">
                        {sorted?.length ? (
                          sorted?.map((token, indx) => {
                            return (
                              <VestingTable
                                token={token}
                                vestID={token?.vestID}
                              />
                            );
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
                              <h6>No Token found</h6>
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
  );
}

export default VestingTokenList;
