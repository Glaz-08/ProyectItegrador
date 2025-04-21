import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ApiResponse } from 'src/interface/ApiResponse'; 
import { HttpException, HttpStatus } from '@nestjs/common';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateResponse } from 'src/utils/api-response.util';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
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
}
