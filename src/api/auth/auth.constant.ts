import { swaggerSchemaExample } from '../../share/utils/swagger_schema';

export const ERROR_AUTH = {
  USER_NOT_FOUND: {
    CODE: 'us00001',
    MESSAGE: 'Username or password is invalid!',
  },
  PASSWORD_INCORRECT: {
    CODE: 'us00002',
    MESSAGE: 'Username or password is invalid!',
  },
  USER_LOCKED: {
    CODE: 'us00004',
    MESSAGE:
      'Your account has been locked. Please contact the Admin to activate your account again!',
  },
  USER_WRONG_OLD_PASSWORD: {
    code: 'us00005',
    MESSAGE: 'Password does not match',
  },
  USER_NAME_EXISTED: {
    CODE: 'us00006',
    MESSAGE: 'This username already exists. Please input a new username',
  },
  USER_LOCKED_30_MIN: {
    CODE: 'us00007',
    MESSAGE: 'Your account has been locked. Please try again after 30 minutes!',
  },
  OTP_INVALID: {
    CODE: 'us00008',
    MESSAGE: 'Invalid OTP code. Please try again.',
  },
  USER_ID_INVALID: {
    CODE: 'us00009',
    MESSAGE: 'User ID is invalid or does not exist.',
  },
  USER_EMAIL_EXISTED: {
    CODE: 'us00010',
    MESSAGE: 'This email already exists. Please input a new email',
  },
  OTP_QUEUE_FAILED: {
    CODE: 'us00011',
    MESSAGE: 'Failed to add OTP to the queue. Please try again later.',
  },
  USER_EMAIL_NOT_EXIST: {
    CODE: 'us00012',
    MESSAGE: 'This email does not exist. Please input a valid email',
  },
  OTP_EXPIRED: {
    CODE: 'us00013',
    MESSAGE: 'OTP code has expired. Please check it.',
  },
};

export const ACCEPT_AUTH = {
  OTP_SENT_SUCCESS: {
    CODE: 'aa0001',
    MESSAGE: 'OTP sent successfully to your email',
  },
  OTP_VERIFIED: {
    CODE: 'aa0002',
    MESSAGE: 'OTP verified successfully',
  },
  PASSWORD_CHANGED: {
    CODE: 'aa0003',
    MESSAGE: 'Password changed successfully',
  },
};

export const WRONG_NUMBER_OF_LOGIN = {
  FIRST_TIME: 10,
  SECOND_TIME: 20,
  THIRD_TIME: 30,
};
export const ACTIVE_USER_AFTER_LOCK = 30; // 30 min

export const AUTH_SWAGGER_RESPONSE = {
  LOGIN_SUCCESS: swaggerSchemaExample(
    {
      data: {
        accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
        accessTokenExpire: 86400,
        refreshToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
        refreshTokenExpire: 604800,
        isFirstTimeLogin: true,
      },
      statusCode: 200,
    },
    'login success',
  ),
  LOGIN_FAIL: swaggerSchemaExample(
    {
      message: 'User not found, disabled or locked',
      code: 'sys00001',
      statusCode: 404,
    },
    'User not found',
  ),
  REGISTER_SUCCESS: swaggerSchemaExample(
    {
      message: 'Register success',
      code: 'sys00001',
      statusCode: 201,
    },
    'register success',
  ),
  REGISTER_FAIL: swaggerSchemaExample(
    {
      message: 'This username already exists. Please input a new username',
      code: 'sys00001',
      statusCode: 404,
    },
    'register fail',
  ),
  BAD_REQUEST_EXCEPTION: swaggerSchemaExample(
    {
      message: 'bad exception',
      code: 'sys00001',
      statusCode: 400,
    },
    'bad request exception',
  ),
  UNAUTHORIZED_EXCEPTION: swaggerSchemaExample(
    {
      message: 'Unauthorized',
      code: 'sys00001',
      statusCode: 401,
    },
    'Unauthorized exception, you need to login again',
  ),
  NOT_FOUND_EXCEPTION: swaggerSchemaExample(
    {
      message: 'not found exception',
      code: 'sys00001',
      statusCode: 404,
    },
    'not found exception',
  ),
  INTERNAL_SERVER_EXCEPTION: swaggerSchemaExample(
    {
      message: 'internal server error',
      code: 'sys00001',
      statusCode: 500,
    },
    'internal server error',
  ),
  SEND_OTP_SUCCESS: swaggerSchemaExample(
    {
      message: 'OTP sent successfully to your email',
      code: 'aa0001',
      statusCode: 200,
    },
    'send OTP success',
  ),
  SEND_OTP_FAIL: swaggerSchemaExample(
    {
      message: 'Invalid email or OTP already sent',
      code: 'sys00001',
      statusCode: 400,
    },
    'send OTP fail',
  ),
  FORGOT_PASSWORD_SUCCESS: swaggerSchemaExample(
    {
      message: 'Password changed successfully',
      code: 'sys00001',
      statusCode: 200,
    },
    'forgot password success',
  ),
  FORGOT_PASSWORD_FAIL: swaggerSchemaExample(
    {
      message: 'Invalid OTP or email',
      code: 'sys00001',
      statusCode: 400,
    },
    'forgot password fail',
  ),
};
