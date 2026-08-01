"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserSchema = exports.resetPasswordSchema = exports.forgotPasswordSchema = exports.refreshTokenSchema = exports.loginSchema = exports.registerSchema = void 0;
const joi_1 = __importDefault(require("joi"));
// 1. Auth Schemas
exports.registerSchema = joi_1.default.object({
    email: joi_1.default.string().email().required().messages({
        'string.email': 'Please provide a valid email address',
        'any.required': 'Email is required',
    }),
    password: joi_1.default.string().min(6).required().messages({
        'string.min': 'Password must be at least 6 characters long',
        'any.required': 'Password is required',
    }),
    firstName: joi_1.default.string().trim().required().messages({
        'any.required': 'First name is required',
    }),
    lastName: joi_1.default.string().trim().required().messages({
        'any.required': 'Last name is required',
    }),
});
exports.loginSchema = joi_1.default.object({
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().required(),
});
exports.refreshTokenSchema = joi_1.default.object({
    refreshToken: joi_1.default.string().required().messages({
        'any.required': 'Refresh token is required',
    }),
});
exports.forgotPasswordSchema = joi_1.default.object({
    email: joi_1.default.string().email().required(),
});
exports.resetPasswordSchema = joi_1.default.object({
    token: joi_1.default.string().required(),
    newPassword: joi_1.default.string().min(6).required().messages({
        'string.min': 'New password must be at least 6 characters long',
    }),
});
// 2. User Management Schemas
exports.updateUserSchema = joi_1.default.object({
    firstName: joi_1.default.string().trim().optional(),
    lastName: joi_1.default.string().trim().optional(),
    email: joi_1.default.string().email().optional(),
});
//# sourceMappingURL=validation.js.map