import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { Reflector } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { RolesGuard } from './auth/guards/roles.guard';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());

  const config = new DocumentBuilder()
    .setTitle('Online Kurslar Tizimi')
    .setDescription('Online kurslarni boshqarish uchun REST API hujjati')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const reflector = app.get(Reflector);
  app.useGlobalGuards(new JwtAuthGuard(reflector), new RolesGuard(reflector));

  await app.listen(Number(process.env.PORT));
}
bootstrap();
