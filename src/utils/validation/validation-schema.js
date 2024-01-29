import * as yup from "yup";

export const tokenSchema = yup.object().shape({
  assetName: yup.string().required("Asset name is required"),
  taker: yup
    .string()
    .required("taker is required")
    .min(34, "taker is invalid")
    .max(52, "taker is invalid"),
  amount: yup
    .number()
    .typeError("amount is required")
    .required("amount is required")
    .min(1, "amount must be greater than 1"),
  days: yup
    .number()
    .typeError("days are required")

    .required("days is required")
    .min(1, "days must be greater than 0"),
});
