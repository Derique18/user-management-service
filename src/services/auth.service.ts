import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../config/prisma';
import { RegisterDTO, LoginDTO, JWTPayload, AuthTokens } from '../interfaces/auth.interface';

export class AuthService {
  private static generateTokens(payload: JWTPayload): AuthTokens {
    const accessToken = jwt.sign(
      payload,
      process.env.JWT_SECRET || 'fallback_secret',
      { expiresIn: '15m' }
    );

    const refreshToken = jwt.sign(
      payload,
      process.env.JWT_REFRESH_SECRET || 'fallback_refresh_secret',
      { expiresIn: '7d' }
    );

    return { accessToken, refreshToken };
  }

  static async register(data: RegisterDTO) {
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      throw new Error('Email is already registered');
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await prisma.user.create({
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

  static async login(data: LoginDTO) {
    const user = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (!user) {
      throw new Error('Invalid email or password');
    }

    const isPasswordValid = await bcrypt.compare(data.password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid email or password');
    }

    const payload: JWTPayload = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
    };

    const tokens = this.generateTokens(payload);

    await prisma.user.update({
      where: { id: user.id },
      data: { refreshToken: tokens.refreshToken },
    });

    const { password, refreshToken, resetToken, ...userWithoutSecrets } = user;
    return { user: userWithoutSecrets, tokens };
  }

  static async refreshToken(token: string) {
    try {
      const decoded = jwt.verify(
        token,
        process.env.JWT_REFRESH_SECRET || 'fallback_refresh_secret'
      ) as JWTPayload;

      const user = await prisma.user.findUnique({
        where: { id: decoded.id },
      });

      if (!user || user.refreshToken !== token) {
        throw new Error('Invalid or expired refresh token');
      }

      const payload: JWTPayload = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
      };

      const tokens = this.generateTokens(payload);

      await prisma.user.update({
        where: { id: user.id },
        data: { refreshToken: tokens.refreshToken },
      });

      return tokens;
    } catch (err) {
      throw new Error('Invalid or expired refresh token');
    }
  }

  static async logout(userId: string) {
    await prisma.user.update({
      where: { id: userId },
      data: { refreshToken: null },
    });
    return true;
  }

  static async forgotPassword(email: string) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new Error('User with this email does not exist');
    }

    const resetToken = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET || 'fallback_secret',
      { expiresIn: '1h' }
    );

    await prisma.user.update({
      where: { id: user.id },
      data: { resetToken },
    });

    return resetToken;
  }

  static async resetPassword(token: string, newPassword: string) {
    let decoded: any;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret');
    } catch {
      throw new Error('Invalid or expired reset token');
    }

    const user = await prisma.user.findUnique({ where: { id: decoded.id } });
    if (!user || user.resetToken !== token) {
      throw new Error('Invalid or expired reset token');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        resetToken: null,
      },
    });

    return true;
  }
}