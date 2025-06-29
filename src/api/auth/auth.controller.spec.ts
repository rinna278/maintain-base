import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JWT_CONFIG } from '../../configs/constant.config';
import { UserEntity } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { MOCK_USER_WITH_ROLE } from '../user/user.constant';
import { RoleEntity } from '../role/role.entity';

const MOCK_USER_RESPONSE = Promise.resolve({
  ...MOCK_USER_WITH_ROLE,
  password: '$2b$12$VaegMcM07WIGh5ePNKydPuURhhzr6F5rFfuBz2BtkO.Ut.1PNDRbK',
  save: () => true,
});

describe('AuthController', () => {
  let authController: AuthController;
  const mockedRepo = {
    findOne: jest.fn(() => MOCK_USER_RESPONSE),
    save: jest.fn(() => Promise.resolve(true)),
  };
  const mockUserService = {
    getByEmail: jest.fn(() => MOCK_USER_RESPONSE),
    setCurrentRefreshToken: jest.fn(() => Promise.resolve(true)),
    removeRefreshToken: jest.fn(() => Promise.resolve(true)),
  };
  const mockJwtService = {
    signAsync: jest.fn(() => Promise.resolve('xxx')),
  };

  beforeEach(async () => {
    const auth: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        AuthService,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: mockedRepo,
        },
        {
          provide: getRepositoryToken(RoleEntity),
          useValue: mockedRepo,
        },
        {
          provide: UserService,
          useValue: mockUserService,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
      ],
    }).compile();

    authController = auth.get<AuthController>(AuthController);
  });

  describe('login', () => {
    it('should return success', async () => {
      const result = await authController.login({
        email: 'huynhdn@gmail.com',
        password: 'abcd1234',
      });
      expect(result).toStrictEqual({
        accessToken: 'xxx',
        accessTokenExpire: JWT_CONFIG.JWT_ACCESS_TOKEN_EXPIRATION_TIME,
        refreshToken: 'xxx',
        refreshTokenExpire: JWT_CONFIG.JWT_REFRESH_TOKEN_EXPIRATION_TIME,
        isFirstTimeLogin: false,
      });
    });
  });

  describe('refresh', () => {
    it('should return success', async () => {
      const result = await authController.refresh('1111');
      expect(result).toStrictEqual({
        accessToken: 'xxx',
        accessTokenExpire: JWT_CONFIG.JWT_ACCESS_TOKEN_EXPIRATION_TIME,
        refreshToken: 'xxx',
        refreshTokenExpire: JWT_CONFIG.JWT_REFRESH_TOKEN_EXPIRATION_TIME,
        isFirstTimeLogin: false,
      });
    });
  });

  describe('logout', () => {
    it('should return success', async () => {
      const result = await authController.logOut(1111);
      expect(result).toStrictEqual({
        status: true,
      });
    });
  });
});
