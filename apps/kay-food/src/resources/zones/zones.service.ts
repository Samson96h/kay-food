import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Zone } from '@app/common/database';


@Injectable()
export class ZonesService {

  constructor(
    @InjectRepository(Zone)
    private readonly zoneRepository: Repository<Zone>

  ) { }


  findAll() {
    return this.zoneRepository.find();
  }

  async findOne(id: number): Promise<Zone> {
    const zone = await this.zoneRepository.findOne({ where: { id } })
    if (!zone) {
      throw new NotFoundException('Zone not found')
    }
    return zone
  }

}
