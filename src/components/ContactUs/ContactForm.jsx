import React from "react";

export const ContactForm = () => {
  return (
    <>
      <div className="content-grid">
        <div className="section-header">
          <div className="section-header-info">
            <h2 className="section-title">Smart Contract Audit</h2>
            <p className="section-pretitle">
              Enter Details for your Smart Contract Audit
            </p>
          </div>
        </div>
        <div className="grid small-space">
          <div className="grid-column">
            <div className="widget-box">
              <div className="widget-box-content">
                <form className="form">
                  <div className="form-row split">
                    <div className="form-item">
                      <div className="form-input small">
                        <label htmlFor="billing-first-name">First Name</label>
                        <input
                          type="text"
                          id="billing-first-name"
                          name="billing_first_name"
                        />
                      </div>
                    </div>
                    <br />
                    <br />
                    <br />
                    <div className="form-item">
                      <div className="form-input small">
                        <label htmlFor="billing-last-name">Last Name</label>
                        <input
                          type="text"
                          id="billing-last-name"
                          name="billing_last_name"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="form-row split">
                    <div className="form-item">
                      <div className="form-input small">
                        <label htmlFor="billing-email">Email</label>
                        <input
                          type="text"
                          id="billing-email"
                          name="billing_email"
                        />
                      </div>
                    </div>
                    <div className="form-item">
                      <div className="form-input small">
                        <label htmlFor="billing-phone-number">
                          Phone Number
                        </label>
                        <input
                          type="text"
                          id="billing-phone-number"
                          name="billing_phone_number"
                        />
                      </div>
                    </div>
                  </div>
                  <br />
                  <div className="form-row">
                    <div className="form-item">
                      <div className="form-input small">
                        <label htmlFor="billing-address">Full Address</label>
                        <input
                          type="text"
                          id="billing-address"
                          name="billing_address"
                        />
                      </div>
                    </div>
                  </div>
                  <br />
                    <br />
                  <div className="form-row split">
                    <div className="form-item">
                      <div className="form-select">
                        <label htmlFor="billing-country">Country</label>
                        <select id="billing-country" name="billing_country">
                          <option value={0}>Select your Country</option>
                          <option value={1}>United States</option>
                        </select>
                        <svg className="form-select-icon icon-small-arrow">
                          <use xlinkHref="#svg-small-arrow" />
                        </svg>
                      </div>
                    </div>
                    <br />
                    <br />
                    <br />
                    <div className="form-item">
                      <div className="form-select">
                        <label htmlFor="billing-state">State</label>
                        <select id="billing-state" name="billing_state">
                          <option value={0}>Select your State</option>
                          <option value={1}>New York</option>
                        </select>
                        <svg className="form-select-icon icon-small-arrow">
                          <use xlinkHref="#svg-small-arrow" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="form-row split">
                    <div className="form-item">
                      <div className="form-select">
                        <label htmlFor="billing-city">City</label>
                        <select id="billing-city" name="billing_city">
                          <option value={0}>Select your City</option>
                          <option value={1}>New York</option>
                        </select>
                        <svg className="form-select-icon icon-small-arrow">
                          <use xlinkHref="#svg-small-arrow" />
                        </svg>
                      </div>
                    </div>
                    <div className="form-item">
                      <div className="form-input small">
                        <label htmlFor="billing-zip-code">ZIP Code</label>
                        <input
                          type="text"
                          id="billing-zip-code"
                          name="billing_zip_code"
                        />
                      </div>
                    </div>
                  </div>
                  <br />
                    <br />
                  <div className="form-row">
                    <div className="form-item">
                      <div className="form-input small medium-textarea">
                        <textarea
                          id="billing-details"
                          name="billing_details"
                          placeholder="Write any additional details here..."
                          defaultValue={""}
                        />
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
