import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { TradableVestTokenSchema } from "../../utils/validation/validation-schema";
import { ValidationError } from "../UI/Errors";
import { copy } from "../../utils/copy-text";
import toast from "react-hot-toast";
import ButtonWithLoading from "../UI/LoaderButton";
import { MetamaskContext } from "../../context/MetamaskContext";
import { unixTimeStamp } from "../../helpers/convertion";
import { vestToken } from "../../services/tradable-vest.services";


const TradableVest = ({ data, tokenAddress }) => {
  const {
    register,
    watch,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(TradableVestTokenSchema(data?.balance)),
  });

  // let { name, address, amount, cliff, vestingPeriod, taker } = watch();

  const [buttonLoading, setButtonLoading] = useState(false);
  const [includeTotalSupply, setIncludeTotalSupply] = useState(false);
  const { accountID } = useContext(MetamaskContext);

  useEffect(() => {
    reset({
      name: data?.assetName,
      address: tokenAddress,
    });
  }, [data, tokenAddress]);

  const onSubmit = async (data) => {
    const { address, amount, cliff, vestingPeriod, taker, duration } = data;
    

    setButtonLoading(true);

    try {
      await vestToken({
        accountAddress: accountID,
        takerAddress: taker,
        cliffPeriod: unixTimeStamp(cliff),
        vestingPeriod: unixTimeStamp(vestingPeriod),
        duration,
        ert20TokenAddress: address,
        amount: amount,
      });

      toast.success("Token vested successfully", {
        duration: 4000,
        position: "bottom-right",
      });
    } catch (err) {
      toast.error("An error occurred, please try again", {
        duration: 4000,
        position: "bottom-right",
      });
      console.log("error", err);
    } finally {
      setButtonLoading(false);
    }
  };

  console.log(errors);
  

  return (
    <>
      <div className="grid grid-8-4 small-space">
        <div className="grid-column">
          <div className="widget-box">
            <div className="widget-box-content">
              <p
                style={{
                  float: "right",

                  color: "dodgerblue",
                }}
              >
                {data?.balance} {data?.symbol}
              </p>
              <form className="form" onSubmit={handleSubmit(onSubmit)}>
                <div className="form-row split">
                  <div className="form-item">
                    <div className="form-input small">
                      <input
                        placeholder="Token Address"
                        disabled
                        type="text"
                        id="address"
                        name="address"
                        {...register("address", { required: true })}
                      />
                      <ValidationError err={errors.address} />
                    </div>
                  </div>
                </div>

                <div className="form-row split">
                  <div className="form-item">
                    <div className="form-input small">
                      <input
                        disabled
                        placeholder="Token Name"
                        type="text"
                        id="name"
                        name="name"
                        {...register("name", { required: true })}
                      />
                      <ValidationError err={errors.name} />
                    </div>
                  </div>
                  <br />
                </div>
                <div className="form-row split">
                  <div className="form-item">
                    <div className="form-input small">
                      <input
                        placeholder="Taker Address"
                        type="text"
                        id="name"
                        name="taker"
                        {...register("taker", { required: true })}
                      />
                      <ValidationError err={errors.taker} />
                    </div>
                  </div>
                  <br />
                  <br />
                  <br />
                </div>

                <div className="form-row">
                  <div className="form-item">
                    <div className="form-input small">
                      <input
                        placeholder="Token Amount"
                        type="text"
                        id="amount"
                        name="amount"
                        {...register("amount", { required: true })}
                      />
                      <ValidationError err={errors.amount} />
                    </div>
                    <br />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-item">
                  <label htmlFor="vestingPeriod" className="form-label">Vesting Start Time</label>
                    <div className="form-input small">
                      <input
                        placeholder="Vesting Start Time"
                        type="date"
                        min={new Date().toISOString().split("T")[0]}
                        id="vestingPeriod"
                        name="vestingPeriod"
                        className="date-input"
                        {...register("vestingPeriod", { required: false })}
                      />
                      <ValidationError err={errors.vestingPeriod} />
                    </div>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-item">
                  <label htmlFor="cliff" className="form-label">Cliff Period</label>
                    <div className="form-input small">
                      <input
                        placeholder="Cliff Period"
                        type="date"
                        id="cliff"
                        name="cliff"
                        className="date-input"
                        {...register("cliff", { required: true })}
                      />
                      <ValidationError err={errors.cliff} />
                    </div>
                    <br />
                  </div>
                </div>
                <div className="form-row split">
                  <div className="form-item">
                    <div className="form-input small">
                      <input
                        placeholder="Duration (The duration over which the tokens will be vested)"
                        type="text"
                        id="duration"
                        name="duration"
                        {...register("duration", { required: false })}
                      />
                      <ValidationError err={errors.duration} />
                    </div>
                  </div>
                </div>
                <ButtonWithLoading
                  isLoading={buttonLoading}
                  loaderColor="blue"
                  disabled={!isValid}
                  text="Vest Token"
                  className="button secondary"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export { TradableVest };
