import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { User } from './entities/user.entity';
// este peromite hacer todos los end points
//enruta mi backend y expone los endpoits 

@Controller('user') // http:localhost:3000/user
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post("crear_usuario") //http:localhost:3000/user/crear_usuario
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get("obtener_usuario") // http:localhost:3000/user/obtener-usuarios
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto, @GetUser() user: User) {
    return this.userService.update(+id, updateUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @GetUser() user: User) {
    return this.userService.remove(+id);
  }

  @Get('sala/disponibilidad/:salaId')
  verificarDisponibilidadSala(@Param('salaId') salaId: string) {
    return this.userService.verificarDisponibilidadSala(+salaId);
  }
  @UseGuards(JwtAuthGuard)
  @Post('sala/reservar/:salaId')
  reservarSala(
    @Param('salaId') salaId: string,
    @GetUser() user: User,
  ) {
    return this.userService.reservarSala(+salaId, user.id);
  }
}
