import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DoctorRequestEntity } from './doctor-request.entity';
import { UserEntity } from '../user/user.entity';
import { RoleEntity } from '../role/role.entity';
import { CreateDoctorRequestDto } from './dto/create-doctor-request.dto';
import { DoctorRequestStatus } from './doctor-request.constant';
import { RoleName } from '../role/role.constant';

@Injectable()
export class DoctorRequestService {
  constructor(
    @InjectRepository(DoctorRequestEntity)
    private readonly doctorRequestRepo: Repository<DoctorRequestEntity>,

    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,

    @InjectRepository(RoleEntity)
    private readonly roleRepo: Repository<RoleEntity>,
  ) {}

  async createRequest(userId: number, dto: CreateDoctorRequestDto) {
    const existing = await this.doctorRequestRepo.findOneBy({
      userId,
      status: DoctorRequestStatus.PENDING,
    });
    if (existing) throw new BadRequestException("You've already sent request.");

    const request = this.doctorRequestRepo.create({
      userId,
      cv: dto.cv,
    });
    return this.doctorRequestRepo.save(request);
  }

  async approveRequest(requestId: number) {
    const request = await this.doctorRequestRepo.findOneBy({ id: requestId });
    if (!request) throw new NotFoundException();

    const doctorRole = await this.roleRepo.findOneBy({ name: RoleName.Doctor });

    if (!doctorRole) throw new Error('Role doctor not found');

    await this.userRepo.update(request.userId, { roleId: doctorRole.id });

    request.status = DoctorRequestStatus.APPROVED;
    return this.doctorRequestRepo.save(request);
  }

  async rejectRequest(requestId: number) {
    const request = await this.doctorRequestRepo.findOneBy({ id: requestId });
    if (!request) throw new NotFoundException();

    request.status = DoctorRequestStatus.REJECTED;
    return this.doctorRequestRepo.save(request);
  }

  async revokeDoctorRole(userId: number) {
    const user = await this.userRepo.findOne({
      where: { id: userId },
      relations: ['role'],
    });
    if (!user) throw new NotFoundException('User not found');

    const doctorRole = await this.roleRepo.findOneBy({ name: RoleName.Doctor });

    if (!doctorRole) throw new Error('Role doctor not found');

    if (user.role.name !== doctorRole.name) {
      throw new BadRequestException('User have no role Doctor');
    }

    const userRole = await this.roleRepo.findOneBy({ name: RoleName.User });
    if (!userRole) throw new Error('not found role User');

    user.role.id = userRole.id;
    return this.userRepo.save(user);
  }

  async getAllRequests(
    status?: DoctorRequestStatus,
  ): Promise<DoctorRequestEntity[]> {
    const query = this.doctorRequestRepo
      .createQueryBuilder('request')
      .leftJoinAndSelect('request.user', 'user');

    if (status) {
      query.andWhere('request.status = :status', { status });
    }

    return await query.orderBy('request.createdAt', 'DESC').getMany();
  }
}
