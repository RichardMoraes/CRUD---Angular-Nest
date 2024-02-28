import { Entity } from 'src/entities/entities/entity.entity';
import { MedicalSpecialty } from 'src/entities/entities/medical-specialty.entity';
import { User } from 'src/users/entities/user.entity';
import { DataSourceOptions } from 'typeorm';

export const config: DataSourceOptions = {
  type: 'mysql',
  host: 'mysql',
  port: 3306,
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  synchronize: true,
  entities: [User, Entity, MedicalSpecialty],
};
