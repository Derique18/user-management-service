import { RegisterDTO, LoginDTO, AuthTokens } from '../interfaces/auth.interface';
export declare class AuthService {
    private static generateTokens;
    static register(data: RegisterDTO): Promise<{
        id: string;
        email: string;
        firstName: string;
        lastName: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    static login(data: LoginDTO): Promise<{
        user: {
            id: string;
            email: string;
            firstName: string;
            lastName: string;
            createdAt: Date;
            updatedAt: Date;
        };
        tokens: AuthTokens;
    }>;
    static refreshToken(token: string): Promise<AuthTokens>;
    static logout(userId: string): Promise<boolean>;
    static forgotPassword(email: string): Promise<string>;
    static resetPassword(token: string, newPassword: string): Promise<boolean>;
}
//# sourceMappingURL=auth.service.d.ts.map