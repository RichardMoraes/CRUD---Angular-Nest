import { Module } from '@nestjs/common';
import { EntitiesService } from './entities.service';
import { EntitiesController } from './entities.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Entity } from './entities/entity.entity';
import { MedicalSpecialty } from './entities/medical-specialty.entity';

@Module({
  controllers: [EntitiesController],
  imports: [TypeOrmModule.forFeature([Entity, MedicalSpecialty])],
  providers: [EntitiesService],
})
export class EntitiesModule {}
