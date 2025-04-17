import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ApiResponse } from 'src/interface/ApiResponse'; 
import { HttpException,HttpStatus  } from '@nestjs/common';//colocar en todas las que tengan una API response
import { User } from './entities/user.entity';
import { Repository } from 'typeorm'; //para hacer consultas a la base de datos
import { CreateResponse } from 'src/utils/api-response.util'; //para crear la respuesta de la API


@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

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
