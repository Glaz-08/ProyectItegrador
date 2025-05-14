import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './entities/user.entity';
import { Sala } from '../salas/entities/sala.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Sala]),
    AuthModule
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
