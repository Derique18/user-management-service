import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import {
  registerSchema,
  loginSchema,
  refreshTokenSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
} from '../utils/validation';

export class AuthController {
  static async register(req: Request, res: Response) {
    try {
      const { error, value } = registerSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ success: false, message: error.details[0].message });
      }

      const user = await AuthService.register(value);
      return res.status(201).json({
        success: true,
        message: 'User registered successfully',
        data: user,
      });
    } catch (err: any) {
      return res.status(400).json({ success: false, message: err.message });
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const { error, value } = loginSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ success: false, message: error.details[0].message });
      }

      const result = await AuthService.login(value);
      return res.status(200).json({
        success: true,
        message: 'Login successful',
        data: result,
      });
    } catch (err: any) {
      return res.status(400).json({ success: false, message: err.message });
    }
  }

  static async refreshToken(req: Request, res: Response) {
    try {
      const { error, value } = refreshTokenSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ success: false, message: error.details[0].message });
      }

      const tokens = await AuthService.refreshToken(value.refreshToken);
      return res.status(200).json({
        success: true,
        message: 'Tokens refreshed successfully',
        data: tokens,
      });
    } catch (err: any) {
      return res.status(401).json({ success: false, message: err.message });
    }
  }

  static async logout(req: Request, res: Response) {
    try {
      const userId = (req as any).user?.id;
      if (userId) {
        await AuthService.logout(userId);
      }
      return res.status(200).json({
        success: true,
        message: 'Logged out successfully',
      });
    } catch (err: any) {
      return res.status(500).json({ success: false, message: err.message });
    }
  }

  static async forgotPassword(req: Request, res: Response) {
    try {
      const { error, value } = forgotPasswordSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ success: false, message: error.details[0].message });
      }

      const resetToken = await AuthService.forgotPassword(value.email);
      return res.status(200).json({
        success: true,
        message: 'Password reset token generated',
        data: { resetToken },
      });
    } catch (err: any) {
      return res.status(400).json({ success: false, message: err.message });
    }
  }

  static async resetPassword(req: Request, res: Response) {
    try {
      const { error, value } = resetPasswordSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ success: false, message: error.details[0].message });
      }

      await AuthService.resetPassword(value.token, value.newPassword);
      return res.status(200).json({
        success: true,
        message: 'Password reset successfully',
      });
    } catch (err: any) {
      return res.status(400).json({ success: false, message: err.message });
    }
  }
}