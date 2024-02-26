import { Entity } from 'src/entities/entities/entity.entity';
import { MedicalSpecialty } from 'src/entities/entities/medical-specialty.entity';
import { User } from 'src/users/entities/user.entity';
import { DataSourceOptions } from 'typeorm';

export const config: DataSourceOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'backend',
  password: 'q1Q!q1Q!',
  database: 'crud',
  synchronize: true,
  entities: [User, Entity, MedicalSpecialty],
};
