import Joi, { ValidationErrorItem, ValidationResult } from "@hapi/joi";
import { FieldError } from "./../../resolvers/user";

type User = {
  username: string;
  password: string;
};

export const validateUser: (user: User) => Promise<ValidationResult> = (
  user: User
) => {
  const userSchema = Joi.object({
    username: Joi.string().min(5).max(30).required(),
    password: Joi.string().min(3).max(15).required(),
  }).options({ abortEarly: false });
  return userSchema.validateAsync(user);
};

export const generateErrorObjFromValidationResponse: (
  validationResult: ValidationErrorItem[]
) => FieldError[] = (validationResult: ValidationErrorItem[]) => {
  const errorObj: FieldError[] = [];

  validationResult.slice(0).forEach((error) => {
    errorObj.push({ message: error.message, field: error.context?.key });
  });
  return errorObj;
};
