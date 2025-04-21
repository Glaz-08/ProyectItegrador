import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSalaDto } from './dto/create-sala.dto';
import { UpdateSalaDto } from './dto/update-sala.dto';
import { Sala } from './entities/sala.entity';
import { ApiResponse } from 'src/interface/ApiResponse';
import { CreateResponse } from 'src/utils/api-response.util';

@Injectable()
export class SalasService {
  constructor(
    @InjectRepository(Sala)
    private salaRepository: Repository<Sala>,
  ) {}

  async create(createSalaDto: CreateSalaDto): Promise<ApiResponse<Sala>> {
    try {
      const newSala = this.salaRepository.create(createSalaDto);
      const savedSala = await this.salaRepository.save(newSala);
      return CreateResponse('Sala creada exitosamente', savedSala, 'CREATED');
    } catch (error) {
      throw new HttpException(
        CreateResponse('Error al crear sala', null, 'BAD_REQUEST', error.message),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findAll(): Promise<ApiResponse<Sala[]>> {
    try {
      const salas = await this.salaRepository.find();
      
      if (salas.length === 0) {
        return CreateResponse('No hay salas registradas', [], 'OK');
      }
      
      return CreateResponse('Salas encontradas', salas, 'OK');
    } catch (error) {
      throw new HttpException(
        CreateResponse('Error al buscar salas', null, 'BAD_REQUEST', error.message),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findOne(id: number): Promise<ApiResponse<Sala>> {
    try {
      const sala = await this.salaRepository.findOne({ where: { id } });
      
      if (!sala) {
        throw new HttpException(
          CreateResponse('Sala no encontrada', null, 'NOT_FOUND'),
          HttpStatus.NOT_FOUND,
        );
      }
      
      return CreateResponse('Sala encontrada', sala, 'OK');
    } catch (error) {
      if (error instanceof HttpException) throw error;
      
      throw new HttpException(
        CreateResponse('Error al buscar sala', null, 'BAD_REQUEST', error.message),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async update(id: number, updateSalaDto: UpdateSalaDto): Promise<ApiResponse<Sala>> {
    try {
      const sala = await this.salaRepository.findOne({ where: { id } });
      
      if (!sala) {
        throw new HttpException(
          CreateResponse('Sala no encontrada', null, 'NOT_FOUND'),
          HttpStatus.NOT_FOUND,
        );
      }
      
      await this.salaRepository.update(id, updateSalaDto);
      const updatedSala = await this.salaRepository.findOne({ where: { id } });
      
      return CreateResponse('Sala actualizada exitosamente', updatedSala, 'OK');
    } catch (error) {
      if (error instanceof HttpException) throw error;
      
      throw new HttpException(
        CreateResponse('Error al actualizar sala', null, 'BAD_REQUEST', error.message),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async remove(id: number): Promise<ApiResponse<null>> {
    try {
      const sala = await this.salaRepository.findOne({ where: { id } });
      
      if (!sala) {
        throw new HttpException(
          CreateResponse('Sala no encontrada', null, 'NOT_FOUND'),
          HttpStatus.NOT_FOUND,
        );
      }
      
      await this.salaRepository.delete(id);
      return CreateResponse('Sala eliminada exitosamente', null, 'OK');
    } catch (error) {
      if (error instanceof HttpException) throw error;
      
      throw new HttpException(
        CreateResponse('Error al eliminar sala', null, 'BAD_REQUEST', error.message),
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
