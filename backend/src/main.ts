import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import * as dotenv from 'dotenv';
import { createConnection } from 'mysql2/promise';

async function bootstrap() {
  while (true) {
    try {
      await createConnection({
        host: 'mysql',
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE,
      });

      console.log('Connected to MySQL successfully!');
      break;
    } catch (error) {
      console.error('Error connecting to MySQL:', error);
      console.log('Retrying connection in 5 seconds...');

      await new Promise((resolve) => setTimeout(resolve, 5000));
    }
  }

  const app = await NestFactory.create(AppModule);
  dotenv.config();
  app.use(cookieParser());
  app.enableCors({
    credentials: true,
    origin: process.env.ALLOWED_ORIGINS.split(','),
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  });

  await app.listen(3000);
}
bootstrap();
