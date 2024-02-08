import * as yup from "yup";

export const tokenSchema = (currentBlockHeight) =>
  yup.object().shape({
    assetName: yup.string().optional(),
    taker: yup
      .string()
      .required("taker is required")
      .min(34, "taker is invalid")
      .max(52, "taker is invalid"),
    amount: yup
      .number()
      .integer("Decimal places are not allowed")
      .typeError("amount is required")
      .required("amount is required")
      .min(1, "amount must be greater than 1"),
    days: yup
      .number()
      .integer("Decimal places are not allowed")
      .typeError("days are required")

      .required("days is required")
      .min(1, "days must be greater than 0"),
  });
export const nftSchema = (currentBlockHeight) =>
  yup.object().shape({
    assetName: yup.string().optional(),
    taker: yup
      .string()
      .required("taker is required")
      .min(34, "taker is invalid")
      .max(52, "taker is invalid"),
    tokenID: yup
      .number()
      .integer("Decimal places are not allowed")
      .typeError("token id is required")
      .required("token is required")
      .min(0, "amount must be greater than 0"),
    days: yup
      .number()
      .integer("Decimal places are not allowed")
      .typeError("days are required")

      .required("days is required")
      .min(1, "days must be greater than 0"),
  });
