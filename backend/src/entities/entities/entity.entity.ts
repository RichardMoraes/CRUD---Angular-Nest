import {
  Entity as ORMEntity,
  Column,
  PrimaryGeneratedColumn,
  Unique,
  ManyToOne,
  JoinTable,
} from 'typeorm';
import { MedicalSpecialty } from './medical-specialty.entity';

@ORMEntity()
@Unique(['cnpj'])
export class Entity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  company_name: string;

  @Column()
  fantasy_name: string;

  @Column()
  cnpj: string;

  @Column()
  region: string;

  @Column({ type: 'date' })
  opening_date: Date;

  @Column({ default: true })
  active: boolean;

  @Column('simple-array')
  medical_specialties: string[];
}
