import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { getEnvValue } from './config/config';
import { TypeOrmModule
} from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: getEnvValue('DATABASE_HOST'),
      port: +getEnvValue('DATABASE_PORT'),
      username: getEnvValue('DATABASE_USERNAME'),
      password: getEnvValue('DATABASE_PASSWORD'),
      database: getEnvValue('DATABASE_NAME'),
      synchronize: true,
      entities: [], 
    }),

  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
