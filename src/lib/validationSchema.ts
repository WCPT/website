import * as yup from "yup";

export const userRegistrationSchema = yup.object({
  firstname: yup.string().min(1).max(50).required(),
  lastname: yup.string().min(1).max(50).required(),
  email: yup.string().email().required(),
  password: yup
    .string()
    .min(8, "Password must be 8 characters long")
    .matches(/[0-9]/, "Password requires a number")
    .matches(/[a-z]/, "Password requires a lowercase letter")
    .matches(/[A-Z]/, "Password requires an uppercase letter")
    .matches(/[^\w]/, "Password requires a symbol")
    .max(30)
    .required(),
  country: yup
    .string()
    .oneOf([
      "AS",
      "CK",
      "FJ",
      "PF",
      "GU",
      "KI",
      "MH",
      "FM",
      "NR",
      "NC",
      "NU",
      "MP",
      "PW",
      "PG",
      "PN",
      "WS",
      "SB",
      "TK",
      "TO",
      "TV",
      "VU",
      "WF",
    ])
    .required(),
  occupation: yup
    .string()
    .oneOf([
      "teacher:ECE",
      "teacher:primary",
      "teacher:secondary",
      "teacher:tertiary",
      "other",
    ])
    .required(),
});
