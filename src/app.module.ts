import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './api/user/user.module';
import { AuthModule } from './api/auth/auth.module';
import { LoggerMiddleware } from './share/middlewares/logger.middleware';
import { PermissionModule } from './api/permission/permission.module';
import { RoleModule } from './api/role/role.module';
import { DatabaseModule } from './configs/database/database.module';
import { StorageModule } from './api/storage/storage.module';
import { PetModule } from './api/pet/pet.module';
import { SpeciesModule } from './api/species/species.module';
import { BreedModule } from './api/breed/breed.module';
import { DoctorRequestModule } from './api/doctor-request/doctor-request.module';
import { AppointmentModule } from './api/appointment/appointment.module';
import { EmailModule } from './api/email/email.module';
import { OtpModule } from './api/otp/otp.module';
import { RedisModule } from './configs/redis/redis.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    PermissionModule,
    RoleModule,
    UserModule,
    AuthModule,
    StorageModule,
    PetModule,
    SpeciesModule,
    BreedModule,
    DoctorRequestModule,
    AppointmentModule,
    EmailModule,
    OtpModule,
    RedisModule,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
