const { body, validationResult } = require("express-validator");

const respondwithquickvalidationerrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

const registerUserValidations = [
  body("userName")
    .isString()
    .withMessage("userName must be a string")
    .isLength({ min: 2, max: 100 })
    .withMessage("userName must be between 2 and 100 characters"),

  body("email").isEmail().withMessage("Invalid email format"),

  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),

  body("fullName")
    .isString()
    .withMessage("fullName must be a string")
    .isLength({ min: 2, max: 100 })
    .withMessage("fullName must be between 2 and 100 characters"),

  body("role")
    .optional()
    .isIn(["user", "admin"])
    .withMessage("role must be either 'user' or 'admin'"),

  respondwithquickvalidationerrors,
];

const loginUserValidations = [
  body("email").optional().isEmail().withMessage("Invalid email format"),

  body("userName")
    .optional()
    .isString()
    .withMessage("userName must be a string"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  (req, res, next) => {
    if (!req.body.email && !req.body.userName) {
      return res.status(400).json({ message: "Email or userName is required" });
    }
    next();
  },

  respondwithquickvalidationerrors,
];

const addUserAddressValidations = [
  body("street")
    .isString()
    .withMessage("street must a string")
    .notEmpty()
    .withMessage("street is reruied"),
  body("city")
    .isString()
    .withMessage("city must a string")
    .notEmpty()
    .withMessage("city is reruied"),
  body("state")
    .isString()
    .withMessage("state must a string")
    .notEmpty()
    .withMessage("state is reruied"),
  body("pincode")
    .isString()
    .withMessage("pincode must a string")
    .notEmpty()
    .withMessage("pincde is reruied"),
  body("country")
    .isString()
    .withMessage("country must a string")
    .notEmpty()
    .withMessage("country is reruied"),
  body("isDefault").optional().isBoolean().withMessage("must be boolean"),
  respondwithquickvalidationerrors,
];

const createContactValidations = [
  body("name")
    .isString()
    .withMessage("name must be a string")
    .isLength({ min: 2, max: 100 })
    .withMessage("name must be between 2 and 100 characters"),

  body("phone")
    .isString()
    .withMessage("phone must be a string")
    .matches(/^[0-9+() -]*$/)
    .withMessage("Invalid phone number format")
    .notEmpty()
    .withMessage("phone is required"),

  body("email").isEmail().withMessage("Invalid email format"),

  body("url")
    .optional()
    .isURL()
    .withMessage("Invalid URL format"),

  body("message")
    .optional()
    .isString()
    .withMessage("message must be a string"),

  respondwithquickvalidationerrors,
];

const joinMemberValidations = [
  body("fullName")
    .isString()
    .withMessage("fullName must be a string")
    .isLength({ min: 2, max: 100 })
    .withMessage("fullName must be between 2 and 100 characters"),

  body("email").isEmail().withMessage("Invalid email format"),

  body("phone")
    .isString()
    .withMessage("phone must be a string")
    .notEmpty()
    .withMessage("phone is required"),

  body("university")
    .isString()
    .withMessage("university must be a string")
    .notEmpty()
    .withMessage("university is required"),

  body("year")
    .isString()
    .withMessage("year must be a string")
    .notEmpty()
    .withMessage("year is required"),

  body("interests")
    .isString()
    .withMessage("interests must be a string")
    .notEmpty()
    .withMessage("interests is required"),

  body("motivation")
    .isString()
    .withMessage("motivation must be a string")
    .notEmpty()
    .withMessage("motivation is required"),

  body("experience")
    .isString()
    .withMessage("experience must be a string")
    .notEmpty()
    .withMessage("experience is required"),

  body("github")
    .optional()
    .isString()
    .withMessage("github must be a string"),

  body("linkedin")
    .optional()
    .isString()
    .withMessage("linkedin must be a string"),

  body("newsletter")
    .optional()
    .isBoolean()
    .withMessage("newsletter must be a boolean"),

  respondwithquickvalidationerrors,
];

module.exports = {
  registerUserValidations,
  loginUserValidations,
  addUserAddressValidations,
  joinMemberValidations,
  createContactValidations,
};
