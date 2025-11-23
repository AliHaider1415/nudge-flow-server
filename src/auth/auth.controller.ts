import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto } from './dto/user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('sign-in')
  signIn(@Body() loginUserDto: LoginUserDto) {
    return this.authService.signIn(loginUserDto.email, loginUserDto.password);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('sign-up')
  signUp(@Body() signUpUserDto: CreateUserDto) {
    return this.authService.signUp(signUpUserDto.username, signUpUserDto.email, signUpUserDto.password)
  }
}
