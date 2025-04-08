export enum UserRole {
  ADMIN = 'admin',
  CUSTOMER = 'customer',
}

export namespace customErrorMsg {
  export enum UserErrors {
    INVALID_USER_ROLE = 'Invalid or missing role. Must be "admin" or "customer".',
    USER_NOT_FOUND = 'User not found.',
    USER_ALREADY_VERIFIED = 'User is already verified.',
    INVALID_VERIFICATION_CODE = 'Invalid verification code.',
    INVALID_EMAIL_PASSWORD = 'Invalid email or password.',
    YOU_ARE_NOT_ALLOWED_TO_LOGIN_HERE = 'You are not allowed to login from here.',
    VERIFY_YOUR_EMAIL_FIRST = 'Please verify your email first.',
  }
}
