import { UserRole } from '../keys';
import { UserRepository } from '../repositories';
import { EmailService } from './email.service';
type registerParams = {
    payload: any;
    role: UserRole;
};
export declare class UserService {
    userRepository: UserRepository;
    emailService: EmailService;
    constructor(userRepository: UserRepository, emailService: EmailService);
    register({ payload, role }: registerParams): Promise<import("../models").User>;
}
export {};
