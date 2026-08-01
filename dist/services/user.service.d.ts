import { UpdateUserDTO } from '../interfaces/user.interface';
export declare class UserService {
    static getUserById(id: string): Promise<{
        createdAt: Date;
        email: string;
        firstName: string;
        id: string;
        lastName: string;
        updatedAt: Date;
    }>;
    static updateUser(id: string, data: UpdateUserDTO): Promise<{
        createdAt: Date;
        email: string;
        firstName: string;
        id: string;
        lastName: string;
        updatedAt: Date;
    }>;
    static deleteUser(id: string): Promise<boolean>;
}
//# sourceMappingURL=user.service.d.ts.map