import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ApiResponse } from 'src/interface/ApiResponse'; 
import { HttpException, HttpStatus } from '@nestjs/common';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateResponse } from 'src/utils/api-response.util';
import { Sala } from '../salas/entities/sala.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Sala)
    private salaRepository: Repository<Sala>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<ApiResponse<User>> {
    try {
      const newUser = this.userRepository.create(createUserDto);
      const savedUser = await this.userRepository.save(newUser);
      return CreateResponse('Usuario creado exitosamente', savedUser, 'CREATED');
    } catch (error) {
      throw new HttpException(
        CreateResponse('Error al crear usuario', null, 'BAD_REQUEST', error.message),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async dataUserByRut(rut: string): Promise<ApiResponse<User | null>> {
    const user = await this.userRepository.findOne({ where: { rut } });

    if (!user) {
      throw new HttpException(
        CreateResponse('No hay usuarios registrados', null, 'NOT_FOUND'),
        HttpStatus.NOT_FOUND,
      );
    }

    return CreateResponse('Usuario encontrado', user, 'OK');
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async verificarDisponibilidadSala(salaId: number): Promise<ApiResponse<Sala>> {
    try {
      const sala = await this.salaRepository.findOne({ where: { id: salaId } });
      
      if (!sala) {
        throw new HttpException(
          CreateResponse('Sala no encontrada', null, 'NOT_FOUND'),
          HttpStatus.NOT_FOUND,
        );
      }
      
      const mensaje = sala.disponible 
        ? 'La sala está disponible para reserva' 
        : 'La sala ya está reservada';
      
      return CreateResponse(mensaje, sala, 'OK');
    } catch (error) {
      if (error instanceof HttpException) throw error;
      
      throw new HttpException(
        CreateResponse('Error al verificar disponibilidad de sala', null, 'BAD_REQUEST', error.message),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async reservarSala(salaId: number, userId: number): Promise<ApiResponse<Sala>> {
    try {
      // Primero verificamos que la sala exista
      const sala = await this.salaRepository.findOne({ where: { id: salaId } });
      
      if (!sala) {
        throw new HttpException(
          CreateResponse('Sala no encontrada', null, 'NOT_FOUND'),
          HttpStatus.NOT_FOUND,
        );
      }
      
      // Verificamos que la sala esté disponible
      if (!sala.disponible) {
        throw new HttpException(
          CreateResponse('La sala ya está reservada', null, 'BAD_REQUEST'),
          HttpStatus.BAD_REQUEST,
        );
      }
      
      // Verificamos que el usuario exista
      const user = await this.userRepository.findOne({ where: { id: userId } });
      
      if (!user) {
        throw new HttpException(
          CreateResponse('Usuario no encontrado', null, 'NOT_FOUND'),
          HttpStatus.NOT_FOUND,
        );
      }
      
      // Actualizamos el estado de la sala a no disponible
      await this.salaRepository.update(salaId, { disponible: false });
      
      // Obtenemos la sala actualizada
      const salaActualizada = await this.salaRepository.findOne({ where: { id: salaId } });
      
      return CreateResponse('Sala reservada exitosamente', salaActualizada, 'OK');
    } catch (error) {
      if (error instanceof HttpException) throw error;
      
      throw new HttpException(
        CreateResponse('Error al reservar sala', null, 'BAD_REQUEST', error.message),
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
