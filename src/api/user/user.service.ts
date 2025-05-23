import {
  BadRequestException,
  HttpCode,
  HttpStatus,
  Injectable,
  NotFoundException,
  Patch,
  UseGuards,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JWT_CONFIG, DEFAULT_ADMIN_USER } from '../../configs/constant.config';
import { IPaginateParams } from '../../share/common/app.interface';
import { StringUtil } from '../../share/utils/string.util';
import { Like, Repository } from 'typeorm';
import { RoleTypes, RoleName, RoleStatus } from '../role/role.constant';
import { ERROR_USER } from './user.constant';
import { UserEntity } from './user.entity';
import { IChangePassword } from './user.interface';
import { BaseService } from '../../share/database/base.service';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleEntity } from '../role/role.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { ERROR_AUTH } from '../auth/auth.constant';
import { PermissionGuard } from '../permission/permission.guard';
import { PermissionMetadata } from '../permission/permission.decorator';
import { PERMISSIONS } from '../permission/permission.constant';

@Injectable()
export class UserService extends BaseService<UserEntity> {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(RoleEntity)
    private readonly roleRepository: Repository<RoleEntity>,
  ) {
    super(userRepository);
  }

  async onModuleInit() {
    const userCount = await this.userRepository.count({});
    if (userCount === 0) {
      const uModel = new UserEntity();
      uModel.email = DEFAULT_ADMIN_USER.email;
      uModel.password = await bcrypt.hash(
        DEFAULT_ADMIN_USER.password,
        JWT_CONFIG.SALT_ROUNDS,
      );
      uModel.name = DEFAULT_ADMIN_USER.name;
      uModel.role = await this.roleRepository.findOneBy({
        type: RoleTypes.Admin,
        name: RoleName.Administrator,
      });
      await this.userRepository.save(uModel);
    }
  }

  async getByEmail(email: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: {
        email,
        role: {
          status: RoleStatus.ACTIVE,
        },
      },
      relations: ['role.permissions'],
    });
    if (!user) {
      throw new NotFoundException(ERROR_USER.USER_NOT_FOUND.MESSAGE);
    }
    return user;
  }

  findUser(params: IPaginateParams) {
    const conditions: any = {};
    if (params.search) {
      conditions.name = Like(
        `%${StringUtil.mysqlRealEscapeString(params.search)}%`,
      );
    }
    if (params.status) {
      conditions.status = Number(params.status);
    }

    return this.getPagination(conditions, params, ['role']);
  }

  public async changePassword(
    id: number,
    paramsChangePassword: IChangePassword,
  ): Promise<boolean> {
    const userFound = await this.userRepository.findOneBy({ id });
    const { oldPassword, newPassword } = paramsChangePassword;
    const isRightPassword = bcrypt.compareSync(oldPassword, userFound.password);
    if (!isRightPassword) {
      throw new BadRequestException({
        message: ERROR_USER.USER_WRONG_OLD_PASSWORD.MESSAGE,
        code: ERROR_USER.USER_WRONG_OLD_PASSWORD.code,
      });
    }

    userFound.password = bcrypt.hashSync(newPassword, JWT_CONFIG.SALT_ROUNDS);
    userFound.save();

    return true;
  }

  async removeRefreshToken(userId: number): Promise<boolean> {
    await this.userRepository.update(userId, {
      currentHashedRefreshToken: null,
    });
    return true;
  }

  async getUserIfRefreshTokenMatches(refreshToken: string, userId: number) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      select: {
        id: true,
        currentHashedRefreshToken: true,
      },
    });
    const isRefreshTokenMatching = await bcrypt.compare(
      refreshToken,
      user?.currentHashedRefreshToken,
    );

    if (isRefreshTokenMatching) {
      return user;
    }
    return null;
  }

  async setCurrentRefreshToken(refreshToken: string, userId: number) {
    const currentHashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    await this.userRepository.update(userId, {
      currentHashedRefreshToken,
    });
  }

  async createUser(data: CreateUserDto): Promise<UserEntity> {
    const user = await this.userRepository.findOneBy({
      email: data?.email?.toLowerCase(),
    });

    if (user) {
      throw new NotFoundException(ERROR_AUTH.USER_NAME_EXISTED.MESSAGE);
    }

    const passwordHash = await bcrypt.hash(
      data.password,
      JWT_CONFIG.SALT_ROUNDS,
    );
    const role = await this.roleRepository.findOneBy({
      type: RoleTypes.Admin,
      status: RoleStatus.ACTIVE,
      name: RoleName.Administrator,
    });

    const uModel = new UserEntity();
    uModel.email = data.email.toLowerCase();
    uModel.password = passwordHash;
    uModel.name = data.name;
    uModel.role = role;
    if (data.phone) {
      uModel.phone = data.phone;
    }
    return this.userRepository.save(uModel);
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    return this.userRepository.findOne({
      where: { email: email.toLowerCase() },
    });
  }
}
