import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Sala } from '../../salas/entities/sala.entity';

@Entity('asistencias')
export class Asistencia {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  usuario: User;

  @Column()
  user_id: number;

  @ManyToOne(() => Sala)
  @JoinColumn({ name: 'sala_id' })
  sala: Sala;

  @Column()
  sala_id: number;

  @CreateDateColumn({ type: 'timestamp' })
  fecha_registro: Date;

  @Column({ default: true })
  presente: boolean;

  @Column({ nullable: true })
  observaciones?: string;
}
