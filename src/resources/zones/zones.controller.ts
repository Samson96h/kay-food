import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';

import { AuthGuard, Roles, RolesGuard } from 'src/guards';
import { UserRole } from 'src/entities/enums/role.enum';
import { CreateZoneDTO } from './dto/create-zone.dto';
import { UpdateZoneDTO } from './dto/update-zone.dto';
import { ZonesService } from './zones.service';
import { IdDTO } from 'src/dto/id-param.dto';


@UseGuards(AuthGuard, RolesGuard)
@Controller('zones')
export class ZonesController {
  constructor(private readonly zonesService: ZonesService) { }

  @Roles(UserRole.ADMIN)
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

  @Roles(UserRole.ADMIN)
  @Patch(':id')
  update(@Param() param: IdDTO, @Body() updateZoneDto: UpdateZoneDTO) {
    return this.zonesService.updateZone(param.id, updateZoneDto);
  }

  @Roles(UserRole.ADMIN)
  @Delete(':id')
  remove(@Param() param: IdDTO) {
    return this.zonesService.removeZone(param.id);
  }
}
