import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';

import { AdminAuthGuard } from '@app/common';
import { CreateZoneDTO, UpdateZoneDTO } from './dto'
import { ZonesService } from './zones.service';
import { IdDTO } from '@app/common';


@UseGuards(AdminAuthGuard)
@Controller('zones')
export class ZonesController {
  constructor(private readonly zonesService: ZonesService) { }

  @Post()
  async create(@Body() dto: CreateZoneDTO) {
    return this.zonesService.createZone(dto);
  }


  @Get()
  findAll() {
    return this.zonesService.findAll();
  }

  @Get(':id')
  findOne(@Param() param: IdDTO) {
    return this.zonesService.findOne(param.id);
  }

  @Patch(':id')
  update(@Param() param: IdDTO, @Body() updateZoneDto: UpdateZoneDTO) {
    return this.zonesService.updateZone(param.id, updateZoneDto);
  }

  @Delete(':id')
  remove(@Param() param: IdDTO) {
    return this.zonesService.removeZone(param.id);
  }
}
