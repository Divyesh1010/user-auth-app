// Uncomment these imports to begin using these cool features!

import {service} from '@loopback/core';
import {repository} from '@loopback/repository';
import {getModelSchemaRef, HttpErrors, post, requestBody} from '@loopback/rest';
import {compare} from 'bcryptjs';
import {customErrorMsg, UserRole} from '../keys';
import {User} from '../models';
import {UserRepository} from '../repositories';
import {UserService} from '../services/user.service';

// import {inject} from '@loopback/core';

export class UserController {
  constructor(
    @repository(UserRepository)
    public userRepository: UserRepository,
    @service(UserService)
    public userService: UserService,
  ) {}

  @post('/register/user')
  async registerUser(
    @requestBody({
      description: 'Register User Based on User Role',
      content: {
        'application/json': {
          schema: getModelSchemaRef(User, {
            exclude: ['id', 'isVerified', 'verificationCode'],
          }),
        },
      },
    })
    payload: Omit<User, 'id' | 'isVerified' | 'verificationCode'>,
  ) {
    const allowedRoles = [UserRole.CUSTOMER, UserRole.CUSTOMER];

    if (!payload?.userRole || !allowedRoles.includes(payload?.userRole)) {
      throw new HttpErrors.BadRequest(
        customErrorMsg?.UserErrors?.INVALID_USER_ROLE,
      );
    }

    return this.userService.register({payload, role: payload.userRole});
  }

  @post('/verify-user')
  async verifyUser(
    @requestBody({
      description: 'Verify User based on email and otp',
      content: {
        'application/json': {
          schema: {
            required: ['email', 'verificationCode'],
            properties: {
              email: {
                type: 'string',
                format: 'email',
                maxLength: 254,
                minLength: 5,
                pattern: '(?!^ +$)^.+$',
                errorMessage: {
                  pattern: `can't be blank`,
                },
              },
              verificationCode: {
                type: 'number',
                minLength: 6,
                pattern: '(?!^ +$)^.+$',
                errorMessage: {
                  pattern: `can't be blank`,
                },
              },
            },
          },
        },
      },
    })
    payload: {
      email: string;
      verificationCode: number;
    },
  ): Promise<User> {
    const user = await this.userRepository.findOne({
      where: {
        email: payload?.email,
      },
    });
    if (!user) {
      throw new HttpErrors.BadRequest(
        customErrorMsg?.UserErrors?.USER_NOT_FOUND,
      );
    }
    if (user.isVerified) {
      throw new HttpErrors.BadRequest(
        customErrorMsg?.UserErrors?.USER_ALREADY_VERIFIED,
      );
    }
    if (user?.verificationCode !== payload?.verificationCode) {
      throw new HttpErrors.BadRequest(
        customErrorMsg?.UserErrors?.INVALID_VERIFICATION_CODE,
      );
    }

    await this.userRepository.updateById(user?.id, {
      isVerified: true,
    });

    return this.userRepository.findById(user?.id);
  }

  @post('/login/admin')
  async adminLogin(
    @requestBody({
      description: 'Admin Login API',
      content: {
        'application/json': {
          schema: {
            required: ['email', 'verificationCode'],
            properties: {
              email: {
                type: 'string',
                format: 'email',
                maxLength: 254,
                minLength: 5,
                pattern: '(?!^ +$)^.+$',
                errorMessage: {
                  pattern: `can't be blank`,
                },
              },
              password: {
                type: 'string',
                minLength: 8,
                pattern: '(?!^ +$)^.+$',
                errorMessage: {
                  pattern: `can't be blank`,
                },
              },
            },
          },
        },
      },
    })
    payload: {
      email: string;
      password: string;
    },
  ): Promise<User> {
    const user = await this.userRepository.findOne({
      where: {
        email: payload?.email,
      },
    });

    if (!user) {
      throw new HttpErrors.BadRequest(
        customErrorMsg?.UserErrors?.USER_NOT_FOUND,
      );
    }

    if (user?.password) {
      const passwordMatch = await compare(payload?.password, user?.password);

      if (!passwordMatch) {
        throw new HttpErrors.BadRequest(
          customErrorMsg?.UserErrors?.INVALID_EMAIL_PASSWORD,
        );
      }
    }

    if (user?.userRole !== UserRole.ADMIN) {
      throw new HttpErrors.BadRequest(
        customErrorMsg?.UserErrors?.YOU_ARE_NOT_ALLOWED_TO_LOGIN_HERE,
      );
    }

    if (!user?.isVerified) {
      throw new HttpErrors.BadRequest(
        customErrorMsg?.UserErrors?.VERIFY_YOUR_EMAIL_FIRST,
      );
    }

    return user;
  }
}
