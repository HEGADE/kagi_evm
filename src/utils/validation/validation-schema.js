import * as yup from "yup";
import { principalCV } from "@stacks/transactions";
import Web3 from "web3";

export const tokenSchema = (balance) =>
  yup.object().shape({
    assetName: yup.string().optional(),
    token: yup.string().required("taker is required"),
    amount: yup
      .number()
      .integer("Decimal places are not allowed")
      .typeError("amount is required")
      .required("amount is required")
      .min(1, "amount must be greater than 1")
      .max(balance, "amount must be less than token balance"),
    days: yup
      .number()
      .integer("Decimal places are not allowed")
      .typeError("days are required")

      .required("days is required")
      .min(1, "days must be greater than 0"),
  });
export const nftSchema = () =>
  yup.object().shape({
    assetName: yup.string().optional(),
    tokenAddress: yup
      .string()
      .required("Token Address is required")

      .test("forValidAddress", "Token Address is invalid", (value) => {
        try {
          return Web3.utils.isAddress(value);
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
  token: yup
    .string()
    .matches(
      /^[a-zA-Z0-9 ]+$/gi,
      "Only letters and numbers are allowed in Token name"
    )
    .max(30, "Token name should not be greater than 30 characters")
    .test(
      "forValidName",
      "Token name should not only contain number",
      (value) => {
        if (!isNaN(value)) {
          return false;
        }
        return true;
      }
    ),
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
    .min(100, "Supply must be greater than 100")
    .typeError("Supply is required"),
});

export const createNFTSchema = yup.object().shape({
  nftName: yup
    .string()
    .max(30, "nft name should not be greater than 30 characters")
    .matches(
      /^[a-zA-Z0-9 ]+$/gi,
      "Only letters and numbers are allowed in name"
    )
    .test(
      "forValidName",
      "nft name should not only contain number",
      (value) => {
        if (!isNaN(value)) {
          return false;
        }
        return true;
      }
    ),
  contractName: yup
    .string()
    .max(30, "Contract name should not be greater than 30 characters")
    .matches(
      /^[a-zA-Z0-9 ]+$/gi,
      "Only letters and numbers are allowed in name"
    )
    .test(
      "forValidName",
      "Contract name should not only contain number",
      (value) => {
        if (!isNaN(value)) {
          return false;
        }
        return true;
      }
    ),
  nftSymbol: yup
    .string()
    .max(30, "nft symbol should not be greater than 30 characters")
    .matches(
      /^[a-zA-Z0-9 ]+$/gi,
      "Only letters and numbers are allowed in name"
    )
    .test(
      "forValidName",
      "nft symbol  should not only contain number",
      (value) => {
        if (!isNaN(value)) {
          return false;
        }
        return true;
      }
    ),
});

export const VestTokenSchema = (balance) =>
  yup.object().shape({
    name: yup.string().required("Name is required"),
    address: yup
      .string()
      .required("Address is required")
      .required("Address is required")
      .test("forValidAddress", "Token address is invalid", (value) => {
        try {
          return Web3.utils.isAddress(value);
        } catch (err) {
          console.log(err);
          return false;
        }
      }),
    taker: yup
      .string()
      .required("Taker address  is required")
      .required("Taker address is required")
      .test("forValidAddress", "Taker address is invalid", (value) => {
        try {
          return Web3.utils.isAddress(value);
        } catch (err) {
          console.log(err);
          return false;
        }
      }),

    amount: yup
      .number()
      .required("Amount is required")
      .min(1, "Amount must be greater than 1")
      .max(balance, "Amount must be less than token balance")
      .typeError("Amount is required"),
    cliff: yup
      .date()
      .required("Cliff is required")
      .min(
        yup.ref("vestingPeriod"),
        "cliff period must be greater than vestingPeriod period"
      ),

    vestingPeriod: yup
      .date()
      .required("Vesting Period is required")
      .min(new Date(), "Vesting period must be greater than current date"),
    duration: yup
      .number()
      .required("Duration  is required")
      .typeError(" Duration is required")
      .min(1, "Duration must be greater than  0"),
  });


  
export const TradableVestTokenSchema = (balance) =>
  yup.object().shape({
    name: yup.string().required("Name is required"),
    address: yup
      .string()
      .required("Address is required")
      .required("Address is required")
      .test("forValidAddress", "Token address is invalid", (value) => {
        try {
          return Web3.utils.isAddress(value);
        } catch (err) {
          console.log(err);
          return false;
        }
      }),
    taker: yup
      .string()
      .required("Taker address  is required")
      .required("Taker address is required")
      .test("forValidAddress", "Taker address is invalid", (value) => {
        try {
          return Web3.utils.isAddress(value);
        } catch (err) {
          console.log(err);
          return false;
        }
      }),

    amount: yup
      .number()
      .required("Amount is required")
      .min(1, "Amount must be greater than 1")
      .max(balance, "Amount must be less than token balance")
      .typeError("Amount is required"),
    cliff: yup
      .date()
      .required("Cliff is required")
      .min(
        yup.ref("vestingPeriod"),
        "cliff period must be greater than vestingPeriod period"
      ),

    vestingPeriod: yup
      .date()
      .required("Vesting Period is required")
      .min(new Date(), "Vesting period must be greater than current date"),
    duration: yup
      .number()
      .required("Duration  is required")
      .typeError(" Duration is required")
      .min(1, "Duration must be greater than  0"),
  });
