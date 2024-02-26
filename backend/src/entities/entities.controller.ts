import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { EntitiesService } from './entities.service';
import { CreateEntityDto } from './dto/create-entity.dto';
import { UpdateEntityDto } from './dto/update-entity.dto';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('entities')
export class EntitiesController {
  constructor(private readonly entityService: EntitiesService) {}

  @Post()
  create(@Body() createEntityDto: CreateEntityDto) {
    const cnpj = createEntityDto.cnpj.replace(/[^\d]/g, '');

    return this.entityService.create({
      ...createEntityDto,
      cnpj,
    });
  }

  @UseGuards(JwtGuard)
  @Get()
  findAll() {
    return this.entityService.findAll();
  }

  @UseGuards(JwtGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.entityService.findOne(+id);
  }

  @UseGuards(JwtGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEntityDto: UpdateEntityDto) {
    return this.entityService.update(+id, updateEntityDto);
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.entityService.remove(+id);
  }
}
