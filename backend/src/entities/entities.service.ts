import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateEntityDto } from './dto/create-entity.dto';
import { UpdateEntityDto } from './dto/update-entity.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Entity } from 'src/entities/entities/entity.entity';
import { Repository } from 'typeorm';
import { MedicalSpecialty } from './entities/medical-specialty.entity';

@Injectable()
export class EntitiesService {
  constructor(
    @InjectRepository(Entity)
    private entityRepository: Repository<Entity>,
    @InjectRepository(MedicalSpecialty)
    private medicalSpecialtyRepository: Repository<MedicalSpecialty>,
  ) {}

  async create(createEntityDto: CreateEntityDto) {
    // CNPJ Validation
    if (!this.validateCNPJ(createEntityDto.cnpj))
      throw new UnprocessableEntityException('Invalid CNPJ');

    // unique key CNPJ Validation
    if (await this.entityRepository.findOneBy({ cnpj: createEntityDto.cnpj }))
      throw new ConflictException('Entity CNPJ already registered');

    // Medical Specialties Validation
    createEntityDto.medical_specialties.map(async (id: string) => {
      const specialty = await this.medicalSpecialtyRepository.findOneBy({
        id: parseInt(id),
      });

      if (!specialty)
        throw new Error(`Medical specialty with ID ${id} not found`);

      return specialty.id;
    });

    try {
      return this.entityRepository.save(createEntityDto);
    } catch (error) {
      throw new UnprocessableEntityException('Error to save entity');
    }
  }

  async findAll() {
    try {
      const entities = this.entityRepository.find();

      if (!entities) throw new NotFoundException('Entities not found');

      return entities;
    } catch (error) {
      throw new NotFoundException('Entities not found');
    }
  }

  async findBySearch(searchTerm: string) {
    try {
      const entities = await this.entityRepository
        .createQueryBuilder('entity')
        .where('entity.company_name LIKE :search', {
          search: `%${searchTerm}%`,
        })
        .orWhere('entity.fantasy_name LIKE :search', {
          search: `%${searchTerm}%`,
        })
        .orWhere('entity.cnpj LIKE :search', { search: `%${searchTerm}%` })
        .getMany();

      if (!entities) throw new NotFoundException('No entities not found');

      return entities;
    } catch (error) {
      throw new NotFoundException('No entities not found');
    }
  }

  async findOne(id: number) {
    try {
      const entity = await this.entityRepository.findOneBy({ id });

      if (!entity) throw new NotFoundException('entity not found');

      return entity;
    } catch (error) {
      throw new NotFoundException('Entity not found');
    }
  }

  async update(id: number, updateEntityDto: UpdateEntityDto) {
    try {
      const entity = await this.entityRepository.update(id, updateEntityDto);

      if (!entity) throw new NotFoundException('Entity not found');

      return await this.entityRepository.findOneBy({ id });
    } catch (error) {
      console.log(error);
      throw new UnprocessableEntityException('Error updating Entity');
    }
  }

  async remove(id: number) {
    try {
      return await this.entityRepository.delete(id);
    } catch (error) {
      throw new UnprocessableEntityException('Error deleting Entity');
    }
  }

  async findAllMedicalSpecialties() {
    try {
      const specialties = await this.medicalSpecialtyRepository.find();

      if (!specialties) throw new NotFoundException('Specialties not found');

      return specialties;
    } catch (error) {
      throw new UnprocessableEntityException('Error getting specialties');
    }
  }

  async findMedicalSpecialties(specialtiesData: string[]) {
    try {
      const specialties = specialtiesData.map(async (id: string) => {
        const specialty = await this.medicalSpecialtyRepository.findOneBy({
          id: parseInt(id),
        });

        if (!specialty)
          throw new Error(`Medical specialty with ID ${id} not found`);

        return specialty.value;
      });

      return await Promise.all(specialties);
    } catch (error) {
      throw new UnprocessableEntityException('Error getting specialties');
    }
  }

  validateCNPJ(cnpj: string): boolean {
    cnpj = cnpj.replace(/[^\d]/g, '');

    if (cnpj.length !== 14) return false;

    if (/^(\d)\1+$/.test(cnpj)) return false;

    let sum = 0;
    let weight = 5;
    for (let i = 0; i < 12; i++) {
      sum += parseInt(cnpj.charAt(i)) * weight;
      weight--;

      if (weight === 1) weight = 9;
    }
    let mod = sum % 11;
    const digit1 = mod < 2 ? 0 : 11 - mod;

    sum = 0;
    weight = 6;
    for (let i = 0; i < 13; i++) {
      sum += parseInt(cnpj.charAt(i)) * weight;
      weight--;
      if (weight === 1) weight = 9;
    }
    mod = sum % 11;
    const digit2 = mod < 2 ? 0 : 11 - mod;

    return (
      parseInt(cnpj.charAt(12)) === digit1 &&
      parseInt(cnpj.charAt(13)) === digit2
    );
  }
}
