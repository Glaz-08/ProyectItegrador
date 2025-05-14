import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AsistenciaService } from './asistencia.service';
import { CreateAsistenciaDto } from './dto/create-asistencia.dto';
import { UpdateAsistenciaDto } from './dto/update-asistencia.dto';

@Controller('asistencia')
export class AsistenciaController {
  constructor(private readonly asistenciaService: AsistenciaService) {}

  @Post('registrar')
  create(@Body() createAsistenciaDto: CreateAsistenciaDto) {
    return this.asistenciaService.create(createAsistenciaDto);
  }

  @Get('listar')
  findAll() {
    return this.asistenciaService.findAll();
  }

  @Get('detalle/:id')
  findOne(@Param('id') id: string) {
    return this.asistenciaService.findOne(+id);
  }

  @Patch('actualizar/:id')
  update(@Param('id') id: string, @Body() updateAsistenciaDto: UpdateAsistenciaDto) {
    return this.asistenciaService.update(+id, updateAsistenciaDto);
  }

  @Delete('eliminar/:id')
  remove(@Param('id') id: string) {
    return this.asistenciaService.remove(+id);
  }

  @Get('por-usuario/:userId')
  findByUser(@Param('userId') userId: string) {
    return this.asistenciaService.findByUser(+userId);
  }

  @Get('por-sala/:salaId')
  findBySala(@Param('salaId') salaId: string) {
    return this.asistenciaService.findBySala(+salaId);
  }
}
