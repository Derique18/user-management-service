import { Request, Response } from 'express';
export declare class AuthController {
    static register(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static login(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static refreshToken(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static logout(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static forgotPassword(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static resetPassword(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
//# sourceMappingURL=auth.controller.d.ts.map