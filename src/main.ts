import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { Reflector } from '@nestjs/core';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { RolesGuard } from './auth/roles.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());

  const reflector = app.get(Reflector);
  app.useGlobalGuards(new JwtAuthGuard(), new RolesGuard(reflector));

  await app.listen(Number(process.env.PORT));
}
bootstrap();
