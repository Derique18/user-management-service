import { JWTPayload } from '../interfaces/auth.interface';

declare global {
  namespace Express {
    interface Request {
      user?: JWTPayload;
    }
  }
}