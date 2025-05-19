// import { Inject, Injectable, Logger } from '@nestjs/common';
// import { Redis } from 'ioredis';

// @Injectable()
// export class OtpService {
//   private readonly logger = new Logger(OtpService.name);
//   private readonly ttlSeconds = 5 * 60; // OTP sống 5 phút

//   constructor(
//     @Inject('REDIS_CLIENT')
//     private readonly redisClient: Redis,
//   ) {}

//   // Tạo và lưu OTP
//   async generateAndSaveOtp(email: string): Promise<string> {
//     const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6 chữ số
//     const key = this.getRedisKey(email);
//     await this.redisClient.set(key, otp, 'EX', this.ttlSeconds);
//     this.logger.debug(`Generated OTP for ${email}: ${otp}`);
//     return otp;
//   }

//   // Kiểm tra OTP
//   async validateOtp(email: string, code: string): Promise<boolean> {
//     const key = this.getRedisKey(email);
//     const stored = await this.redisClient.get(key);
//     if (stored && stored === code) {
//       await this.redisClient.del(key); // xóa sau khi dùng
//       return true;
//     }
//     return false;
//   }

//   private getRedisKey(email: string) {
//     return `otp:${email}`;
//   }
// }
