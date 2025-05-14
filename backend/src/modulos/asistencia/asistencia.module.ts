import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AsistenciaService } from './asistencia.service';
import { AsistenciaController } from './asistencia.controller';
import { Asistencia } from './entities/asistencia.entity';
import { User } from '../user/entities/user.entity';
import { Sala } from '../salas/entities/sala.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Asistencia, User, Sala])],
  controllers: [AsistenciaController],
  providers: [AsistenciaService],
})
export class AsistenciaModule {}
