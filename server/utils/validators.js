import { body, validationResult } from "express-validator";

export const validate = (validations) => {
  return async (req, res, next) => {
    for (let validation of validations) {
      const result = await validation.run(req);
      if (!result.isEmpty()) {
        break;
      }
    }
    const errors = validationResult(req);

    if (errors.isEmpty()) {
      return next();
    }

    return res
      .status(422) //unprocessable request
      .json({ errors: errors.array() });
  };
};

export const loginValidator = [
  body("email").notEmpty().isEmail().withMessage("Please, provide your email."),
  body("password")
    .notEmpty()
    .trim()
    .isLength({ min: 6 })
    .withMessage("Password must be of 6 characters atleast."),
];

export const signupValidator = [
  body("name").notEmpty().withMessage("Name is required."),
  ...loginValidator,
];
