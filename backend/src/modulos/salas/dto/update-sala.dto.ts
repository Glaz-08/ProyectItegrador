import { PartialType } from '@nestjs/mapped-types';
import { CreateSalaDto } from './create-sala.dto';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateSalaDto extends PartialType(CreateSalaDto) {
  @IsString()
  @IsOptional()
  nombre?: string;

  @IsNumber()
  @IsOptional()
  capacidad?: number;

  @IsBoolean()
  @IsOptional()
  disponible?: boolean;
}
