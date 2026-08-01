export interface RegisterDTO {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
}
export interface LoginDTO {
    email: string;
    password: string;
}
export interface RefreshTokenDTO {
    refreshToken: string;
}
export interface ForgotPasswordDTO {
    email: string;
}
export interface ResetPasswordDTO {
    token: string;
    newPassword: string;
}
export interface JWTPayload {
    id: string;
    firstName: string;
    lastName: string;
}
export interface AuthTokens {
    accessToken: string;
    refreshToken: string;
}
//# sourceMappingURL=auth.interface.d.ts.map