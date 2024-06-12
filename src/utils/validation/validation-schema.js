import * as yup from "yup";
import { principalCV, StringAsciiCV } from "@stacks/transactions";

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

export const CreateTokenSchemaFT = yup.object().shape({
  url: yup.string().url("Invalid URL").required("URL is required"),
  name: yup
    .string()
    .matches(
      /^[a-zA-Z0-9 ]+$/gi,
      "Only letters and numbers are allowed in name"
    )
    .max(30, "Name should not be greater than 30 characters")
    .test("forValidName", "name should not only contain number", (value) => {
      if (!isNaN(value)) {
        return false;
      }
      return true;
    }),
  symbol: yup
    .string()
    .matches(/^[a-zA-Z0-9]+$/gi, "Only letters and numbers are allowed symbol")
    .test("forValidName", "symbol should not only contain number", (value) => {
      if (!isNaN(value)) {
        return false;
      }
      return true;
    }),
  supply: yup
    .number()
    .integer("Decimal places are not allowed")
    .optional()
    .min(1, "Supply must be greater than 1")
    .typeError("Supply is required"),
  decimals: yup
    .number()
    .integer("Decimal places are not allowed")
    .required("Decimals is required")
    .typeError("Decimal is required")

    .min(1, "Decimal must be greater than 0"),
});

export const createNFTSchema = yup.object().shape({
  url: yup.string().url("Invalid URL").required("URL is required"),
  name: yup
    .string().max(30,"Name should not be greater than 30 characters")
    .matches(
      /^[a-zA-Z0-9 ]+$/gi,
      "Only letters and numbers are allowed in name"
    )
    .test("forValidName", "name should not only contain number", (value) => {
      if (!isNaN(value)) {
        return false;
      }
      return true;
    }),
});
