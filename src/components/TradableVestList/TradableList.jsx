import React, { useContext, useEffect, useState } from "react";
import { IconRefresh } from "../UI/Icons";
import { MetamaskContext } from "../../context/MetamaskContext";
import TradableHeading from "./TradableHeading";
import TradableTable from "./TradableTable";
import { getVestingSchedules } from "../../services/tradable-vest.services";

const dmDate = new Date();
const dummyDate = 1725101557;
const cliffDate = 1725101557

const data = [
  {
    cliffTime: cliffDate,
    tokenAddress: "0xAbC1234567890DEFabc1234567890defABC12345",
    startTime: dummyDate,
    amount: 1000,
    duration: 365, // days
  },
  {
    cliffTime: cliffDate,
    tokenAddress: "0x1234567890ABCdef1234567890abCDEf12345678",
    startTime: dummyDate,
    amount: 2500,
    duration: 180, // days
  },
  {
    cliffTime: cliffDate,
    tokenAddress: "0xDEFaBC1234567890defABC1234567890abcdef12",
    startTime: dummyDate,
    amount: 500,
    duration: 90, // days
  },
  {
    cliffTime: cliffDate,
    tokenAddress: "0x9876543210FEDcba9876543210fedcBA98765432",
    startTime: dummyDate,
    amount: 1500,
    duration: 120, // days
  },
  {
    cliffTime: cliffDate,
    tokenAddress: "0xABCDEF1234567890abcdef1234567890ABCDEF12",
    startTime: dummyDate,
    amount: 3000,
    duration: 240, // days
  },
];

function TradableList() {
  const { accountID } = useContext(MetamaskContext);

  const [tokenVestingList, settokenVestingList] = useState([]);

  const fetchtokenVestingList = async () => {
    let res = await getVestingSchedules({ accountAddress: accountID });
    settokenVestingList(res);
  };

  useEffect(() => {
    fetchtokenVestingList();
  }, [accountID]);

  console.log(tokenVestingList);

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
                      <TradableHeading />
                      <div className="table-body same-color-rows">
                        {tokenVestingList?.length ? (
                          tokenVestingList?.map((datas, indx) => {
                            return (
                              <TradableTable token={datas} vestID={indx} refreshTokenVestingList={fetchtokenVestingList} />
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

export default TradableList;
