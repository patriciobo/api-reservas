import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CamasService } from './camas.service';
import { CreateCamaDto } from './dto/create-cama.dto';
import { UpdateCamaDto } from './dto/update-cama.dto';

@Controller('camas')
export class CamasController {
  constructor(private readonly camasService: CamasService) {}

  @Post()
  create(@Body() createCamaDto: CreateCamaDto) {
    return this.camasService.create(createCamaDto);
  }

  @Get()
  findAll() {
    return this.camasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.camasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCamaDto: UpdateCamaDto) {
    return this.camasService.update(+id, updateCamaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.camasService.remove(+id);
  }
}
