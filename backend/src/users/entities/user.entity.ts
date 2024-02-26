import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../dto/create-user.dto';

@Entity()
@Unique(['email'])
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  constructor() {}

  async setUser(
    userData: CreateUserDto,
    passwordSalt: number = 10,
  ): Promise<void> {
    if (!userData) return;

    this.email = userData.email;
    this.username = userData.username;
    this.password = await bcrypt.hash(userData.password, passwordSalt);
  }

  async checkPassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
}
