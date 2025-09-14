import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ZonesService } from './zones.service';
import { CreateZoneDTO } from './dto/create-zone.dto';
import { UpdateZoneDTO } from './dto/update-zone.dto';
import { AuthGuard, Roles, RolesGuard } from 'src/guards';
import { UserRole } from 'src/entities/enums/role.enum';
import { IdDTO } from 'src/dto/id-param.dto';

@UseGuards(AuthGuard, RolesGuard)
@Controller('zones')
export class ZonesController {
  constructor(private readonly zonesService: ZonesService) {}

  @Roles(UserRole.ADMIN)
  @Post()
  async create(@Body() createZoneDto: CreateZoneDTO) {
    return this.zonesService.createZone(createZoneDto);
  }

  @Get()
  findAll() {
    return this.zonesService.findAll();
  }

  @Get(':id')
  findOne(@Param() param : IdDTO) {
    return this.zonesService.findOne(param.id);
  }

  @Patch(':id')
  update(@Param() param : IdDTO, @Body() updateZoneDto: UpdateZoneDTO) {
    return this.zonesService.updateZone(param.id, updateZoneDto);
  }

  @Delete(':id')
  remove(@Param() param : IdDTO) {
    return this.zonesService.removeZone(param.id);
  }
}
