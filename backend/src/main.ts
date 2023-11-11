import { INestApplication, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './modules/app.module';

const setupSwagger = (app: INestApplication<any>) => {
  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('GMI notes app')
    .setDescription('GMI notes app API description')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
};

const setupApp = async (app: INestApplication<any>) => {
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
};

const bootstrap = async () => {
  try {
    const app = await NestFactory.create(AppModule);
    const configService = app.get(ConfigService);
    const port = configService.get('APP_PORT') || 8000;

    await setupApp(app);
    setupSwagger(app);

    await app.listen(port);
  } catch (error) {
    console.error('Error during application bootstrap:', error);
    process.exit(1);
  }
};
bootstrap();
