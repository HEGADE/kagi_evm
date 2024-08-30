import React, { useContext, useEffect, useState } from "react";
import { IconRefresh } from "../UI/Icons";
import VestingHeading from "./VestingHeading";
import VestingTable from "./VestingTable";
import { getVestingSchedules } from "../../services/vesting.services";
import { MetamaskContext } from "../../context/MetamaskContext";

const data = [
  {
    name: "Luffy",
    tokenAddress: "0x120dasd3e0d0ed0s0ads0sd00e0dncnd63",
    amount: 10000,
    cliffPeriod: 8,
    vestingPeriod: 7,
  },
  {
    name: "Sanji",
    tokenAddress: "0x1jhhkhjk7837982122233dfdsewql22d",
    amount: 100,
    cliffPeriod: 10,
    vestingPeriod: 22,
  },
  {
    name: "Blackbeard",
    tokenAddress: "0x120dasd3e0d0ed0s0ads0sd00e0dncnd63",
    amount: 2000,
    cliffPeriod: 20,
    vestingPeriod: 90,
  },
  {
    name: "Zoro",
    tokenAddress: "0x1jhhkhjk7837982122233dfdsewql22d",
    amount: 10,
    cliffPeriod: 7,
    vestingPeriod: 2,
  },
];

function VestingTokenList() {
  const { accountID } = useContext(MetamaskContext);

  const [tokenVestingList, settokenVestingList] = useState([]);

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
                  // onChange={(e) => e}
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
                  // onChange={(e) => e}
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
                        {tokenVestingList?.length ? (
                          tokenVestingList?.map((tokens, indx) => {
                            return (
                              <VestingTable token={tokens} vestID={indx} />
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
