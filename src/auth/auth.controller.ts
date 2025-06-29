import {
  Controller,
  Post,
  Body,
  Res,
  Req,
  UseGuards,
  Get,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { Response, Request } from 'express';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Public } from './decorator/public.decorator';

@ApiTags('Auth')
@ApiBearerAuth()
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @Public()
  @ApiOperation({ summary: 'Sign in' })
  @ApiResponse({ status: 200, description: 'Sign in succesfully' })
  register(@Body() dto: RegisterDto, @Res() res: Response) {
    return this.authService
      .register(dto, res)
      .then((result) => res.json(result))
      .catch((err) =>
        res.status(err.status || 500).json({ message: err.message }),
      );
  }

  @Post('login')
  @Public()
  login(@Body() dto: LoginDto, @Res() res: Response) {
    return this.authService.login(dto, res);
  }

  @Post('refresh')
  refresh(@Req() req: Request) {
    const token = req.cookies['refresh_token'];
    return this.authService.refreshToken(token);
  }

  @UseGuards(JwtAuthGuard)
  @Get('protected')
  protected() {
    return { message: 'This route is protected' };
  }
}
