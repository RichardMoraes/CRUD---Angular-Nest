import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UnprocessableEntityException,
  Query,
} from '@nestjs/common';
import { EntitiesService } from './entities.service';
import { CreateEntityDto } from './dto/create-entity.dto';
import { UpdateEntityDto } from './dto/update-entity.dto';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';
import { Entity } from './entities/entity.entity';

export interface EntityResponse {
  status: string;
  data?: Partial<Entity> | Partial<Entity[]>;
}

@Controller('entities')
export class EntitiesController {
  constructor(private readonly entityService: EntitiesService) {}

  @UseGuards(JwtGuard)
  @Get('specialties')
  async findAllMedicalSpecialties() {
    const specialties = await this.entityService.findAllMedicalSpecialties();

    return {
      status: 'success',
      data: {
        ...specialties,
      },
    };
  }

  @UseGuards(JwtGuard)
  @Post('specialties')
  async findMedicalSpecialties(@Body() body: any) {
    const { specialties } = body;

    return {
      status: 'success',
      data: await this.entityService.findMedicalSpecialties(specialties),
    };
  }

  @Post()
  async create(
    @Body() createEntityDto: CreateEntityDto,
  ): Promise<EntityResponse> {
    const cnpj = createEntityDto.cnpj.replace(/[^\d]/g, '');
    const entity = await this.entityService.create({
      ...createEntityDto,
      cnpj,
    });

    if (!entity) throw new UnprocessableEntityException('Cannot create entity');

    return {
      status: 'success',
      data: {
        ...entity,
      },
    };
  }

  @UseGuards(JwtGuard)
  @Get()
  async findAll(@Query('search') search?: string) {
    const entities = search
      ? await this.entityService.findBySearch(search)
      : await this.entityService.findAll();

    return {
      status: 'success',
      data: {
        ...entities,
      },
    };
  }

  @UseGuards(JwtGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const entity = await this.entityService.findOne(+id);

    return {
      status: 'success',
      data: {
        ...entity,
      },
    };
  }

  @UseGuards(JwtGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateEntityDto: UpdateEntityDto,
  ) {
    const entity = await this.entityService.update(+id, updateEntityDto);

    return {
      status: 'success',
      data: {
        ...entity,
      },
    };
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const entity = await this.entityService.remove(+id);

    return {
      status: 'success',
      data: {
        ...entity,
      },
    };
  }
}
