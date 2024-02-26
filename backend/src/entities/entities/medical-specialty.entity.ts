import {
  Entity as ORMEntity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';
import { Entity } from './entity.entity';

@ORMEntity()
export class MedicalSpecialty {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @ManyToOne(() => Entity, (entity) => entity.medical_specialties)
  value: string;
}
