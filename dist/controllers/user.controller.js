"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const express_1 = require("express");
const user_service_1 = require("../services/user.service");
const validation_1 = require("../utils/validation");
class UserController {
    static async getProfile(req, res) {
        try {
            const userId = req.user?.id;
            if (!userId) {
                return res.status(401).json({ success: false, message: 'Unauthorized' });
            }
            const user = await user_service_1.UserService.getUserById(userId);
            return res.status(200).json({
                success: true,
                message: 'Profile retrieved successfully',
                data: user,
            });
        }
        catch (err) {
            return res.status(404).json({ success: false, message: err.message });
        }
    }
    static async updateProfile(req, res) {
        try {
            const userId = req.user?.id;
            if (!userId) {
                return res.status(401).json({ success: false, message: 'Unauthorized' });
            }
            const { error, value } = validation_1.updateUserSchema.validate(req.body);
            if (error) {
                return res.status(400).json({ success: false, message: error.details[0].message });
            }
            const updatedUser = await user_service_1.UserService.updateUser(userId, value);
            return res.status(200).json({
                success: true,
                message: 'Profile updated successfully',
                data: updatedUser,
            });
        }
        catch (err) {
            return res.status(400).json({ success: false, message: err.message });
        }
    }
    static async deleteProfile(req, res) {
        try {
            const userId = req.user?.id;
            if (!userId) {
                return res.status(401).json({ success: false, message: 'Unauthorized' });
            }
            await user_service_1.UserService.deleteUser(userId);
            return res.status(200).json({
                success: true,
                message: 'Account deleted successfully',
            });
        }
        catch (err) {
            return res.status(400).json({ success: false, message: err.message });
        }
    }
}
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map