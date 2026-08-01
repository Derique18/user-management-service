"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const express_1 = require("express");
const auth_service_1 = require("../services/auth.service");
const validation_1 = require("../utils/validation");
class AuthController {
    static async register(req, res) {
        try {
            const { error, value } = validation_1.registerSchema.validate(req.body);
            if (error) {
                return res.status(400).json({ success: false, message: error.details[0].message });
            }
            const user = await auth_service_1.AuthService.register(value);
            return res.status(201).json({
                success: true,
                message: 'User registered successfully',
                data: user,
            });
        }
        catch (err) {
            return res.status(400).json({ success: false, message: err.message });
        }
    }
    static async login(req, res) {
        try {
            const { error, value } = validation_1.loginSchema.validate(req.body);
            if (error) {
                return res.status(400).json({ success: false, message: error.details[0].message });
            }
            const result = await auth_service_1.AuthService.login(value);
            return res.status(200).json({
                success: true,
                message: 'Login successful',
                data: result,
            });
        }
        catch (err) {
            return res.status(400).json({ success: false, message: err.message });
        }
    }
    static async refreshToken(req, res) {
        try {
            const { error, value } = validation_1.refreshTokenSchema.validate(req.body);
            if (error) {
                return res.status(400).json({ success: false, message: error.details[0].message });
            }
            const tokens = await auth_service_1.AuthService.refreshToken(value.refreshToken);
            return res.status(200).json({
                success: true,
                message: 'Tokens refreshed successfully',
                data: tokens,
            });
        }
        catch (err) {
            return res.status(401).json({ success: false, message: err.message });
        }
    }
    static async logout(req, res) {
        try {
            const userId = req.user?.id;
            if (userId) {
                await auth_service_1.AuthService.logout(userId);
            }
            return res.status(200).json({
                success: true,
                message: 'Logged out successfully',
            });
        }
        catch (err) {
            return res.status(500).json({ success: false, message: err.message });
        }
    }
    static async forgotPassword(req, res) {
        try {
            const { error, value } = validation_1.forgotPasswordSchema.validate(req.body);
            if (error) {
                return res.status(400).json({ success: false, message: error.details[0].message });
            }
            const resetToken = await auth_service_1.AuthService.forgotPassword(value.email);
            return res.status(200).json({
                success: true,
                message: 'Password reset token generated',
                data: { resetToken },
            });
        }
        catch (err) {
            return res.status(400).json({ success: false, message: err.message });
        }
    }
    static async resetPassword(req, res) {
        try {
            const { error, value } = validation_1.resetPasswordSchema.validate(req.body);
            if (error) {
                return res.status(400).json({ success: false, message: error.details[0].message });
            }
            await auth_service_1.AuthService.resetPassword(value.token, value.newPassword);
            return res.status(200).json({
                success: true,
                message: 'Password reset successfully',
            });
        }
        catch (err) {
            return res.status(400).json({ success: false, message: err.message });
        }
    }
}
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map