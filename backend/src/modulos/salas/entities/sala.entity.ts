import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('salas')
export class Sala {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  codigo: string;

  @Column()
  nombre: string;

  @Column()
  capacidad: number;

  @Column({ default: true })
  disponible: boolean;

  @Column({ nullable: true })
  descripcion?: string;
}
