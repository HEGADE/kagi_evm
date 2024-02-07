import React from "react";
import { TokenInfoCard } from "./TokenInfoCard";

const CreateTokenForm = () => {
  return (
    <>
      <div className="content-grid">
        <div className="section-header">
          <div className="section-header-info">
            <h2 className="section-title">Create Token</h2>
            <p className="section-pretitle">
              Launch your own token without knowing coding
            </p>
          </div>
        </div>
        <div className="grid grid-8-4 small-space">
          <div className="grid-column">
            <div className="widget-box">
              <div className="widget-box-content">
                <form className="form">
                  <div className="form-row split">
                    <div className="form-item">
                      <div className="form-input small">
                        <label htmlFor="billing-first-name">Token Name</label>
                        <input type="text" id="name" name="name" />
                      </div>
                    </div>
                    <br />
                    <br />
                    <br />
                  </div>
                  <div className="form-row split">
                    <div className="form-item">
                      <div className="form-input small">
                        <label htmlFor="billing-email">Token Symbol</label>
                        <input type="text" id="symbol" name="symbol" />
                      </div>
                    </div>
                  </div>
                  <br />
                  <div className="form-row">
                    <div className="form-item">
                      <div className="form-input small">
                        <label htmlFor="billing-address">Decimal</label>
                        <input type="text" id="decimal" name="decimal" />
                      </div>
                      <br />
                    </div>
                  </div>
                  <div className="form-row split">
                    <div className="form-item">
                      <div className="form-input small">
                        <label htmlFor="billing-zip-code">Supply</label>
                        <input type="text" id="supply" name="supply" />
                      </div>
                      <br />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-item">
                      {/* FORM INPUT */}
                      <div className="form-input small medium-textarea">
                        <textarea
                          id="billing-details"
                          name="billing_details"
                          placeholder="Token Url (www.example.com)"
                          defaultValue={""}
                        />
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <TokenInfoCard
            name="Cryptic"
            decimal="8"
            supply="222"
            symbol="COC"
            url={"www.example.com"}
          />
        </div>
      </div>
    </>
  );
};

export { CreateTokenForm };
