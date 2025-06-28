import {
  Injectable,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  async register(dto: RegisterDto) {
    const userExists = await this.usersService.findByEmail(dto.email);
    if (userExists) throw new ForbiddenException('Email already registered');

    const hashed = await bcrypt.hash(dto.password, 10);
    const user = await this.usersService.create({
      ...dto,
      password: hashed,
    });

    return {
      message: 'Registered successfully',
      user: { id: user.id, email: user.email },
    };
  }

  async login(dto: LoginDto, res: Response) {
    const user = await this.usersService.findByEmail(dto.email);
    if (!user || !(await bcrypt.compare(dto.password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: user.id, email: user.email, role: user.role };
    const access_token = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: '15m',
    });

    const refresh_token = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: '7d',
    });

    res.cookie('refresh_token', refresh_token, {
      httpOnly: true,
      sameSite: 'strict',
      secure: false, // ставь true на проде
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return { access_token };
  }

  async refreshToken(refreshToken: string) {
    try {
      const payload = await this.jwtService.verifyAsync(refreshToken, {
        secret: process.env.JWT_SECRET,
      });

      const newAccessToken = this.jwtService.sign(
        { sub: payload.sub, email: payload.email, role: payload.role },
        { secret: process.env.JWT_SECRET, expiresIn: '15m' },
      );

      return { access_token: newAccessToken };
    } catch (err) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }
}
