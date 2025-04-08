import { User } from '../models';
import { UserRepository } from '../repositories';
import { UserService } from '../services/user.service';
export declare class UserController {
    userRepository: UserRepository;
    userService: UserService;
    constructor(userRepository: UserRepository, userService: UserService);
    registerUser(payload: Omit<User, 'id' | 'isVerified' | 'verificationCode'>): Promise<User>;
    verifyUser(payload: {
        email: string;
        verificationCode: number;
    }): Promise<User>;
    adminLogin(payload: {
        email: string;
        password: string;
    }): Promise<User>;
}
