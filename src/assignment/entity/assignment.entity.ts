import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  CreateDateColumn,
} from 'typeorm';
import { User } from '../../users/entity/user.entity';
import { ModuleEntity } from '../../modules/entity/module.entity';

@Entity()
export class Assignment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.assignments)
  student: User;

  @ManyToOne(() => ModuleEntity, (mod) => mod.assignments)
  module: ModuleEntity;

  @Column()
  content: string;

  @Column({ nullable: true })
  grade: number;

  @CreateDateColumn()
  submittedAt: Date;
}
