import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('salas')
export class Sala {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  capacidad: number;

  @Column({ 
    default: true,
    comment: 'Indica si la sala está disponible (true) u ocupada (false)'
  })
  disponible: boolean;
}
