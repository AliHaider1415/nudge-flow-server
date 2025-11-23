import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, pass: string): Promise<{ message: string, access_token: string }> {
    const user = await this.usersService.findOne(email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const passwordValid = await bcrypt.compare(pass, user.password);
    if (!passwordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }
    
    const payload = { sub: user.id, username: user.username };
    return {
      message: "Login Successful",
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async signUp(
    username: string,
    email: string,
    password: string,
  ): Promise<{ message: string }> {
    const existingUser = await this.usersService.findOne(email);

    if (existingUser) {
      return {
        message: 'User already exists',
      };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await this.usersService.create(username, email, hashedPassword);

    return { message: 'User created successfully' };
  }
}
