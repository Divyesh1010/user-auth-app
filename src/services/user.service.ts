import {BindingScope, injectable, service} from '@loopback/core';
import {repository} from '@loopback/repository';
import {HttpErrors} from '@loopback/rest';
import {genSalt, hash} from 'bcryptjs';
import {generateRandomOtp} from '../helper';
import {UserRole} from '../keys';
import {UserRepository} from '../repositories';
import {EmailService} from './email.service';

type registerParams = {
  payload: any;
  role: UserRole;
};
@injectable({scope: BindingScope.TRANSIENT})
export class UserService {
  constructor(
    @repository(UserRepository)
    public userRepository: UserRepository,
    @service(EmailService)
    public emailService: EmailService,
  ) {}

  async register({payload, role}: registerParams) {
    const existingUser = await this.userRepository.findOne({
      where: {
        email: payload?.email,
      },
    });

    if (existingUser) {
      throw new HttpErrors.BadRequest('Email already registered');
    }

    // Generate verification code
    const verificationCode = generateRandomOtp(6);
    // Hash password
    const hasedPassword = await hash(payload?.password, await genSalt());

    const user = await this.userRepository.create({
      ...payload,
      password: hasedPassword,
      userRole: role,
      isVerified: false,
      verificationCode,
    });

    await this.emailService.sendVerificationCode({
      email: user?.email,
      code: verificationCode,
    });

    return user;
  }
}
