import { Request, Response } from 'express';
import { UserService } from '../services/user.service';
import { updateUserSchema } from '../utils/validation';

export class UserController {
  static async getProfile(req: Request, res: Response) {
    try {
      const userId = req.user?.id;
      if (!userId) {
        return res.status(401).json({ success: false, message: 'Unauthorized' });
      }

      const user = await UserService.getUserById(userId);
      return res.status(200).json({
        success: true,
        message: 'Profile retrieved successfully',
        data: user,
      });
    } catch (err: any) {
      return res.status(404).json({ success: false, message: err.message });
    }
  }

  static async updateProfile(req: Request, res: Response) {
    try {
      const userId = req.user?.id;
      if (!userId) {
        return res.status(401).json({ success: false, message: 'Unauthorized' });
      }

      const { error, value } = updateUserSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ success: false, message: error.details[0].message });
      }

      const updatedUser = await UserService.updateUser(userId, value);
      return res.status(200).json({
        success: true,
        message: 'Profile updated successfully',
        data: updatedUser,
      });
    } catch (err: any) {
      return res.status(400).json({ success: false, message: err.message });
    }
  }

  static async deleteProfile(req: Request, res: Response) {
    try {
      const userId = req.user?.id;
      if (!userId) {
        return res.status(401).json({ success: false, message: 'Unauthorized' });
      }

      await UserService.deleteUser(userId);
      return res.status(200).json({
        success: true,
        message: 'Account deleted successfully',
      });
    } catch (err: any) {
      return res.status(400).json({ success: false, message: err.message });
    }
  }
}