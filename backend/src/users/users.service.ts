import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    if (await this.userRepository.findOneBy({ email: createUserDto.email }))
      throw new ConflictException('Email already exists');

    try {
      const user = new User();
      await user.setUser(createUserDto);

      return await this.userRepository.save(user);
    } catch (error) {
      throw new NotFoundException('Erro no login, verifique suas credênciais.');
    }
  }

  async findAll() {
    try {
      const users = await this.userRepository.find();

      if (!users) throw new NotFoundException('Users not found');

      return users;
    } catch (error) {
      throw new NotFoundException('Users not found');
    }
  }

  async findOne(id: number) {
    try {
      const user = await this.userRepository.findOneBy({ id });

      if (!user) throw new NotFoundException('Erro no login, verifique suas credênciais.');

      return user;
    } catch (error) {
      throw new NotFoundException('Erro no login, verifique suas credênciais.');
    }
  }

  async findOneByEmail(email: string) {
    try {
      const user = await this.userRepository.findOneBy({ email });

      if (!user) throw new NotFoundException('Erro no login, verifique suas credênciais.');

      return user;
    } catch (error) {
      throw new NotFoundException('Erro no login, verifique suas credênciais.');
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      const user = await this.userRepository.update(id, updateUserDto);

      if (!user) throw new NotFoundException('Erro no login, verifique suas credênciais.');

      return await this.userRepository.findOneBy({ id });
    } catch (error) {
      throw new UnprocessableEntityException('Error updating user');
    }
  }

  async remove(id: number) {
    try {
      return await this.userRepository.delete(id);
    } catch (error) {
      throw new UnprocessableEntityException('Error deleting user');
    }
  }
}
