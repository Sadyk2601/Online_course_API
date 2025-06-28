import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ModuleEntity } from '../../modules/entity/module.entity';

@Entity()
export class Lesson {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ type: 'text' })
  content: string;

  @ManyToOne(() => ModuleEntity, (module) => module.lessons, {
    onDelete: 'CASCADE',
  })
  module: ModuleEntity;
}
