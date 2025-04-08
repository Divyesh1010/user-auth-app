import { Entity } from '@loopback/repository';
import { UserRole } from '../keys';
export declare class User extends Entity {
    id?: number;
    firstName: string;
    lastName: string;
    email: string;
    password?: string | null;
    userRole: UserRole;
    isVerified: boolean;
    verificationCode?: number | null;
    constructor(data?: Partial<User>);
}
export interface UserRelations {
}
export type UserWithRelations = User & UserRelations;
