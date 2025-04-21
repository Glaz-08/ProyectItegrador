import { IsNumber, IsNotEmpty, IsBoolean, IsOptional, IsString } from 'class-validator';

export class CreateAsistenciaDto {
  @IsNumber()
  @IsNotEmpty()
  user_id: number;

  @IsNumber()
  @IsNotEmpty()
  sala_id: number;

  @IsBoolean()
  @IsOptional()
  presente?: boolean;

  @IsString()
  @IsOptional()
  observaciones?: string;
}
