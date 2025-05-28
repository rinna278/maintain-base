import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiOkResponse,
  ApiTags,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiInternalServerErrorResponse,
  ApiBody,
  ApiCreatedResponse,
} from '@nestjs/swagger';
import { GetUser } from '../../share/decorator/get-user.decorator';
import { AUTH_SWAGGER_RESPONSE } from './auth.constant';
import { AuthService } from './auth.service';
import { LoginResponseDto } from './dto/login-response.dto';
import { LoginDto } from './dto/login.dto';
import { RefreshDto } from './dto/refresh.dto';
import JwtRefreshGuard from './guards/jwt-refresh.guard';
import { JwtAuthGuard } from './guards/jwt.guard';
import { SignUpDto } from './dto/signup.dto';
import { SendOtpDto } from './dto/send-otp.dto';
import { IAdminPayload } from 'src/share/common/app.interface';
import { ForgotPasswordDto } from './dto/forgot-password.dto';

@ApiTags('Authentication')
@ApiBadRequestResponse(AUTH_SWAGGER_RESPONSE.BAD_REQUEST_EXCEPTION)
@ApiInternalServerErrorResponse(AUTH_SWAGGER_RESPONSE.INTERNAL_SERVER_EXCEPTION)
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOkResponse(AUTH_SWAGGER_RESPONSE.LOGIN_SUCCESS)
  @ApiNotFoundResponse(AUTH_SWAGGER_RESPONSE.LOGIN_FAIL)
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<LoginResponseDto> {
    return this.authService.login(loginDto);
  }

  @ApiCreatedResponse(AUTH_SWAGGER_RESPONSE.REGISTER_SUCCESS)
  @ApiBadRequestResponse(AUTH_SWAGGER_RESPONSE.REGISTER_FAIL)
  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  signUp(
    @Body() data: SignUpDto,
    @GetUser() user: IAdminPayload,
  ): Promise<unknown> {
    return this.authService.signUp(data, user);
  }

  @UseGuards(JwtRefreshGuard)
  @HttpCode(HttpStatus.CREATED)
  @Post('refresh')
  @ApiBody({
    type: RefreshDto,
    description: 'refresh token to get new access token',
    required: true,
  })
  refresh(@GetUser('id') userId) {
    return this.authService.refreshToken(userId);
  }

  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @Post('logout')
  logOut(@GetUser('id') userId: number) {
    return this.authService.removeRefreshToken(userId);
  }

  @ApiOkResponse(AUTH_SWAGGER_RESPONSE.SEND_OTP_SUCCESS)
  @ApiBadRequestResponse(AUTH_SWAGGER_RESPONSE.SEND_OTP_FAIL)
  @HttpCode(HttpStatus.OK)
  @Post('send-otp')
  @ApiBody({
    type: SendOtpDto,
    description: 'Email to send OTP',
    required: true,
  })
  sendOtp(@Body() data: SendOtpDto) {
    return this.authService.sendOtp(data);
  }

  @ApiOkResponse(AUTH_SWAGGER_RESPONSE.SEND_OTP_SUCCESS)
  @ApiBadRequestResponse(AUTH_SWAGGER_RESPONSE.SEND_OTP_FAIL)
  @HttpCode(HttpStatus.OK)
  @Post('send-otp-forgot-password')
  @ApiBody({
    type: SendOtpDto,
    description: 'Email to send OTP',
    required: true,
  })
  sendOtpForgotPassword(@Body() data: SendOtpDto) {
    return this.authService.sendOtpForChangePassword(data);
  }

  @HttpCode(HttpStatus.OK)
  @Post('forgot-password')
  @ApiBody({
    description: 'Email, OTP and new password to change password',
    type: ForgotPasswordDto,
  })
  @ApiOkResponse(AUTH_SWAGGER_RESPONSE.FORGOT_PASSWORD_SUCCESS)
  @ApiBadRequestResponse(AUTH_SWAGGER_RESPONSE.FORGOT_PASSWORD_FAIL)
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    const result =
      await this.authService.changePasswordWithOtp(forgotPasswordDto);
    return result;
  }
}
