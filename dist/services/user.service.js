"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
const user_interface_1 = require("../interfaces/user.interface");
class UserService {
    static async getUserById(id) {
        const user = await prisma_1.default.user.findUnique({
            where: { id },
            select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true,
                createdAt: true,
                updatedAt: true,
            },
        });
        if (!user) {
            throw new Error('User not found');
        }
        return user;
    }
    static async updateUser(id, data) {
        const user = await prisma_1.default.user.findUnique({ where: { id } });
        if (!user) {
            throw new Error('User not found');
        }
        if (data.email && data.email !== user.email) {
            const emailExists = await prisma_1.default.user.findUnique({
                where: { email: data.email },
            });
            if (emailExists) {
                throw new Error('Email is already in use');
            }
        }
        const updatedUser = await prisma_1.default.user.update({
            where: { id },
            data,
            select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true,
                createdAt: true,
                updatedAt: true,
            },
        });
        return updatedUser;
    }
    static async deleteUser(id) {
        const user = await prisma_1.default.user.findUnique({ where: { id } });
        if (!user) {
            throw new Error('User not found');
        }
        await prisma_1.default.user.delete({ where: { id } });
        return true;
    }
}
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map