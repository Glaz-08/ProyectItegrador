import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAsistenciaDto } from './dto/create-asistencia.dto';
import { UpdateAsistenciaDto } from './dto/update-asistencia.dto';
import { Asistencia } from './entities/asistencia.entity';
import { ApiResponse } from 'src/interface/ApiResponse';
import { CreateResponse } from 'src/utils/api-response.util';
import { User } from '../user/entities/user.entity';
import { Sala } from '../salas/entities/sala.entity';

@Injectable()
export class AsistenciaService {
  constructor(
    @InjectRepository(Asistencia)
    private asistenciaRepository: Repository<Asistencia>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Sala)
    private salaRepository: Repository<Sala>,
  ) {}

  async create(createAsistenciaDto: CreateAsistenciaDto): Promise<ApiResponse<Asistencia>> {
    try {
      // Verificar que el usuario exista
      const usuario = await this.userRepository.findOne({ 
        where: { id: createAsistenciaDto.user_id } 
      });
      
      if (!usuario) {
        throw new HttpException(
          CreateResponse('Usuario no encontrado', null, 'NOT_FOUND'),
          HttpStatus.NOT_FOUND,
        );
      }

      // Verificar que la sala exista
      const sala = await this.salaRepository.findOne({ 
        where: { id: createAsistenciaDto.sala_id } 
      });
      
      if (!sala) {
        throw new HttpException(
          CreateResponse('Sala no encontrada', null, 'NOT_FOUND'),
          HttpStatus.NOT_FOUND,
        );
      }

      const newAsistencia = this.asistenciaRepository.create(createAsistenciaDto);
      const savedAsistencia = await this.asistenciaRepository.save(newAsistencia);
      
      return CreateResponse('Asistencia registrada exitosamente', savedAsistencia, 'CREATED');
    } catch (error) {
      if (error instanceof HttpException) throw error;
      
      throw new HttpException(
        CreateResponse('Error al registrar asistencia', null, 'BAD_REQUEST', error.message),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findAll(): Promise<ApiResponse<Asistencia[]>> {
    try {
      const asistencias = await this.asistenciaRepository.find({
        relations: ['usuario', 'sala']
      });
      
      if (asistencias.length === 0) {
        return CreateResponse('No hay asistencias registradas', [], 'OK');
      }
      
      return CreateResponse('Asistencias encontradas', asistencias, 'OK');
    } catch (error) {
      throw new HttpException(
        CreateResponse('Error al buscar asistencias', null, 'BAD_REQUEST', error.message),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findOne(id: number): Promise<ApiResponse<Asistencia>> {
    try {
      const asistencia = await this.asistenciaRepository.findOne({ 
        where: { id },
        relations: ['usuario', 'sala']
      });
      
      if (!asistencia) {
        throw new HttpException(
          CreateResponse('Asistencia no encontrada', null, 'NOT_FOUND'),
          HttpStatus.NOT_FOUND,
        );
      }
      
      return CreateResponse('Asistencia encontrada', asistencia, 'OK');
    } catch (error) {
      if (error instanceof HttpException) throw error;
      
      throw new HttpException(
        CreateResponse('Error al buscar asistencia', null, 'BAD_REQUEST', error.message),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async update(id: number, updateAsistenciaDto: UpdateAsistenciaDto): Promise<ApiResponse<Asistencia>> {
    try {
      const asistencia = await this.asistenciaRepository.findOne({ where: { id } });
      
      if (!asistencia) {
        throw new HttpException(
          CreateResponse('Asistencia no encontrada', null, 'NOT_FOUND'),
          HttpStatus.NOT_FOUND,
        );
      }
      
      await this.asistenciaRepository.update(id, updateAsistenciaDto);
      const updatedAsistencia = await this.asistenciaRepository.findOne({ 
        where: { id },
        relations: ['usuario', 'sala']
      });
      
      return CreateResponse('Asistencia actualizada exitosamente', updatedAsistencia, 'OK');
    } catch (error) {
      if (error instanceof HttpException) throw error;
      
      throw new HttpException(
        CreateResponse('Error al actualizar asistencia', null, 'BAD_REQUEST', error.message),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async remove(id: number): Promise<ApiResponse<null>> {
    try {
      const asistencia = await this.asistenciaRepository.findOne({ where: { id } });
      
      if (!asistencia) {
        throw new HttpException(
          CreateResponse('Asistencia no encontrada', null, 'NOT_FOUND'),
          HttpStatus.NOT_FOUND,
        );
      }
      
      await this.asistenciaRepository.delete(id);
      return CreateResponse('Asistencia eliminada exitosamente', null, 'OK');
    } catch (error) {
      if (error instanceof HttpException) throw error;
      
      throw new HttpException(
        CreateResponse('Error al eliminar asistencia', null, 'BAD_REQUEST', error.message),
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  
  async findByUser(userId: number): Promise<ApiResponse<Asistencia[]>> {
    try {
      const asistencias = await this.asistenciaRepository.find({ 
        where: { user_id: userId },
        relations: ['usuario', 'sala']
      });
      
      if (asistencias.length === 0) {
        return CreateResponse('El usuario no tiene asistencias registradas', [], 'OK');
      }
      
      return CreateResponse('Asistencias del usuario encontradas', asistencias, 'OK');
    } catch (error) {
      throw new HttpException(
        CreateResponse('Error al buscar asistencias del usuario', null, 'BAD_REQUEST', error.message),
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  
  async findBySala(salaId: number): Promise<ApiResponse<Asistencia[]>> {
    try {
      const asistencias = await this.asistenciaRepository.find({ 
        where: { sala_id: salaId },
        relations: ['usuario', 'sala']
      });
      
      if (asistencias.length === 0) {
        return CreateResponse('No hay asistencias registradas para esta sala', [], 'OK');
      }
      
      return CreateResponse('Asistencias de la sala encontradas', asistencias, 'OK');
    } catch (error) {
      throw new HttpException(
        CreateResponse('Error al buscar asistencias de la sala', null, 'BAD_REQUEST', error.message),
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
