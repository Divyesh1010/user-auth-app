import {Entity, model, property} from '@loopback/repository';
import {UserRole} from '../keys';

@model({
  settings: {
    strictObjectIDCoercion: true,
    scope: {
      where: {isDeleted: {neq: true}},
    },
  },
})
export class User extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
    jsonSchema: {
      maxLength: 500,
      minLength: 2,
      pattern: '(?!^ +$)^.+$',
      errorMessage: {
        pattern: `can't be blank`,
      },
    },
  })
  firstName: string;

  @property({
    type: 'string',
    required: true,
    jsonSchema: {
      maxLength: 500,
      minLength: 2,
      pattern: '(?!^ +$)^.+$',
      errorMessage: {
        pattern: `can't be blank`,
      },
    },
  })
  lastName: string;

  @property({
    type: 'string',
    required: true,
    jsonSchema: {
      format: 'email',
      transform: ['trim'],
      maxLength: 254,
      minLength: 5,
      pattern: '(?!^ +$)^.+$',
      errorMessage: {
        pattern: `can't be blank`,
      },
    },
  })
  email: string;

  @property({
    type: 'string',
    default: null,
    jsonSchema: {
      minLength: 8,
      nullable: true,
    },
  })
  password?: string | null;

  @property({
    type: 'string',
    required: true,
    jsonSchema: {
      enum: Object.values(UserRole),
      pattern: '(?!^ +$)^.+$',
      errorMessage: {
        pattern: `can't be blank`,
      },
    },
  })
  userRole: UserRole;

  @property({
    type: 'boolean',
    default: false,
  })
  isVerified: boolean;

  @property({
    type: 'number',
    default: null,
    jsonSchema: {
      nullable: true,
    },
  })
  verificationCode?: number | null;

  constructor(data?: Partial<User>) {
    super(data);
  }
}

export interface UserRelations {
  // describe navigational properties here
}

export type UserWithRelations = User & UserRelations;
