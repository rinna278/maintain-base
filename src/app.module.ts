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
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
