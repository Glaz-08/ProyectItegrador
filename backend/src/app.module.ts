import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { getEnvValue } from './config/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './modulos/user/entities/user.entity';
import { Sala } from './modulos/salas/entities/sala.entity';
import { Asistencia } from './modulos/asistencia/entities/asistencia.entity';
import { UserModule } from './modulos/user/user.module';
import { SalasModule } from './modulos/salas/salas.module';
import { AsistenciaModule } from './modulos/asistencia/asistencia.module';

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
      synchronize: true, // Mantén esto en true para sincronizar los cambios en el esquema
      // Se eliminó dropSchema para evitar la pérdida de datos en el futuro
      entities: [User, Sala, Asistencia],
    }),
    UserModule,
    SalasModule,
    AsistenciaModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
