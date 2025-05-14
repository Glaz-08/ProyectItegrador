import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { ApiResponse } from 'src/interface/ApiResponse';
import { CreateResponse } from 'src/utils/api-response.util';
import { HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async register(createUserDto: CreateUserDto): Promise<ApiResponse<any>> {
    try {
      // Verificar si el usuario ya existe
      const userExists = await this.userRepository.findOne({
        where: { rut: createUserDto.rut },
      });

      if (userExists) {
        throw new HttpException(
          CreateResponse('Usuario ya existe', null, 'BAD_REQUEST'),
          HttpStatus.BAD_REQUEST,
        );
      }

      // Crear el nuevo usuario
      const user = this.userRepository.create(createUserDto);
      const savedUser = await this.userRepository.save(user);

      // Generar token JWT
      const payload = { id: savedUser.id, rut: savedUser.rut };
      const token = this.jwtService.sign(payload);

      return CreateResponse(
        'Usuario registrado exitosamente',
        { 
          user: {
            id: savedUser.id,
            rut: savedUser.rut,
            nombre: savedUser.nombre,
            apellido: savedUser.apellido,
            email: savedUser.email,
          }, 
          token 
        },
        'CREATED',
      );
    } catch (error) {
      if (error instanceof HttpException) throw error;
      
      throw new HttpException(
        CreateResponse('Error al registrar usuario', null, 'BAD_REQUEST', error.message),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async login(loginDto: LoginDto): Promise<ApiResponse<any>> {
    try {
      // Buscar usuario por rut, incluyendo la contraseña (que normalmente no se selecciona)
      const user = await this.userRepository
        .createQueryBuilder('user')
        .where('user.rut = :rut', { rut: loginDto.rut })
        .addSelect('user.password')
        .getOne();

      if (!user) {
        throw new UnauthorizedException(
          CreateResponse('Credenciales inválidas', null, 'UNAUTHORIZED'),
        );
      }

      // Verificar contraseña
      const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);
      if (!isPasswordValid) {
        throw new UnauthorizedException(
          CreateResponse('Credenciales inválidas', null, 'UNAUTHORIZED'),
        );
      }

      // Generar token JWT
      const payload = { id: user.id, rut: user.rut };
      const token = this.jwtService.sign(payload);

      return CreateResponse(
        'Inicio de sesión exitoso',
        { 
          user: {
            id: user.id,
            rut: user.rut,
            nombre: user.nombre,
            apellido: user.apellido,
            email: user.email,
          }, 
          token 
        },
        'OK',
      );
    } catch (error) {
      if (error instanceof UnauthorizedException) throw error;
      
      throw new HttpException(
        CreateResponse('Error al iniciar sesión', null, 'BAD_REQUEST', error.message),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async validateUser(payload: any) {
    const { id } = payload;
    return await this.userRepository.findOne({ where: { id } });
  }
}
