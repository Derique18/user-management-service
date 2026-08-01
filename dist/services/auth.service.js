"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma_1 = __importDefault(require("../config/prisma"));
const auth_interface_1 = require("../interfaces/auth.interface");
class AuthService {
    static generateTokens(payload) {
        const accessToken = jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET || 'fallback_secret', { expiresIn: '15m' });
        const refreshToken = jsonwebtoken_1.default.sign(payload, process.env.JWT_REFRESH_SECRET || 'fallback_refresh_secret', { expiresIn: '7d' });
        return { accessToken, refreshToken };
    }
    static async register(data) {
        const existingUser = await prisma_1.default.user.findUnique({
            where: { email: data.email },
        });
        if (existingUser) {
            throw new Error('Email is already registered');
        }
        const hashedPassword = await bcryptjs_1.default.hash(data.password, 10);
        const user = await prisma_1.default.user.create({
            data: {
                email: data.email,
                password: hashedPassword,
                firstName: data.firstName,
                lastName: data.lastName,
            },
        });
        const { password, refreshToken, resetToken, ...userWithoutSecrets } = user;
        return userWithoutSecrets;
    }
    static async login(data) {
        const user = await prisma_1.default.user.findUnique({
            where: { email: data.email },
        });
        if (!user) {
            throw new Error('Invalid email or password');
        }
        const isPasswordValid = await bcryptjs_1.default.compare(data.password, user.password);
        if (!isPasswordValid) {
            throw new Error('Invalid email or password');
        }
        const payload = {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
        };
        const tokens = this.generateTokens(payload);
        await prisma_1.default.user.update({
            where: { id: user.id },
            data: { refreshToken: tokens.refreshToken },
        });
        const { password, refreshToken, resetToken, ...userWithoutSecrets } = user;
        return { user: userWithoutSecrets, tokens };
    }
    static async refreshToken(token) {
        try {
            const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_REFRESH_SECRET || 'fallback_refresh_secret');
            const user = await prisma_1.default.user.findUnique({
                where: { id: decoded.id },
            });
            if (!user || user.refreshToken !== token) {
                throw new Error('Invalid or expired refresh token');
            }
            const payload = {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
            };
            const tokens = this.generateTokens(payload);
            await prisma_1.default.user.update({
                where: { id: user.id },
                data: { refreshToken: tokens.refreshToken },
            });
            return tokens;
        }
        catch (err) {
            throw new Error('Invalid or expired refresh token');
        }
    }
    static async logout(userId) {
        await prisma_1.default.user.update({
            where: { id: userId },
            data: { refreshToken: null },
        });
        return true;
    }
    static async forgotPassword(email) {
        const user = await prisma_1.default.user.findUnique({ where: { email } });
        if (!user) {
            throw new Error('User with this email does not exist');
        }
        const resetToken = jsonwebtoken_1.default.sign({ id: user.id }, process.env.JWT_SECRET || 'fallback_secret', { expiresIn: '1h' });
        await prisma_1.default.user.update({
            where: { id: user.id },
            data: { resetToken },
        });
        return resetToken;
    }
    static async resetPassword(token, newPassword) {
        let decoded;
        try {
            decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || 'fallback_secret');
        }
        catch {
            throw new Error('Invalid or expired reset token');
        }
        const user = await prisma_1.default.user.findUnique({ where: { id: decoded.id } });
        if (!user || user.resetToken !== token) {
            throw new Error('Invalid or expired reset token');
        }
        const hashedPassword = await bcryptjs_1.default.hash(newPassword, 10);
        await prisma_1.default.user.update({
            where: { id: user.id },
            data: {
                password: hashedPassword,
                resetToken: null,
            },
        });
        return true;
    }
}
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map