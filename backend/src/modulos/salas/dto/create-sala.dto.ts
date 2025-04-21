import { IsString, IsNotEmpty, IsNumber, IsOptional, IsBoolean } from 'class-validator';

export class CreateSalaDto {
  @IsString()
  @IsNotEmpty()
  codigo: string;

  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsNumber()
  @IsNotEmpty()
  capacidad: number;

  @IsBoolean()
  @IsOptional()
  disponible?: boolean;

  @IsString()
  @IsOptional()
  descripcion?: string;
}
