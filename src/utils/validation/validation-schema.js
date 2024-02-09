import * as yup from "yup";
import { principalCV } from "@stacks/transactions";
export const tokenSchema = (balance) =>
  yup.object().shape({
    assetName: yup.string().optional(),
    taker: yup
      .string()
      .required("taker is required")

      .test("forValidAddress", "taker is invalid", (value) => {
        try {
          principalCV(String(value));
          return true;
        } catch (err) {
          console.log(err);
          return false;
        }
      }),
    amount: yup
      .number()
      .integer("Decimal places are not allowed")
      .typeError("amount is required")
      .required("amount is required")
      .min(1, "amount must be greater than 1")
      .max(balance, "Insufficient Balance"),
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
      .required("taker is required")
      .test("forValidAddress", "taker is invalid", (value) => {
        try {
          principalCV(String(value));
          return true;
        } catch (err) {
          console.log(err);
          return false;
        }
      }),
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
