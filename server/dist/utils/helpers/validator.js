"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateErrorObjFromValidationResponse = exports.validateUser = void 0;
const joi_1 = __importDefault(require("@hapi/joi"));
const validateUser = (user) => {
    const userSchema = joi_1.default.object({
        username: joi_1.default.string().min(5).max(30).required(),
        password: joi_1.default.string().min(3).max(15).required(),
    }).options({ abortEarly: false });
    return userSchema.validateAsync(user);
};
exports.validateUser = validateUser;
const generateErrorObjFromValidationResponse = (validationResult) => {
    const errorObj = [];
    validationResult.slice(0).forEach((error) => {
        var _a;
        errorObj.push({ message: error.message, field: (_a = error.context) === null || _a === void 0 ? void 0 : _a.key });
    });
    return errorObj;
};
exports.generateErrorObjFromValidationResponse = generateErrorObjFromValidationResponse;
//# sourceMappingURL=validator.js.map