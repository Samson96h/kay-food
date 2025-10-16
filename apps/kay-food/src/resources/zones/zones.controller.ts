import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';

import { AuthGuard } from '@app/common';
import { ZonesService } from './zones.service';
import { IdDTO } from '@app/common';


@UseGuards(AuthGuard)
@Controller('zones')
export class ZonesController {
  constructor(private readonly zonesService: ZonesService) { }


  @Get()
  findAll() {
    return this.zonesService.findAll();
  }

  @Get(':id')
  findOne(@Param() param: IdDTO) {
    return this.zonesService.findOne(param.id);
  }
}
