import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateZoneDTO, UpdateZoneDTO } from './dto'
import { Zone } from '@app/common/database';


@Injectable()
export class ZonesService {

  constructor(
    @InjectRepository(Zone)
    private readonly zoneRepository: Repository<Zone>

  ) { }

  async createZone(dto: CreateZoneDTO): Promise<Zone> {
    const zone = await this.zoneRepository.findOne({ where: { name: dto.name } })

    if (zone) {
      throw new ConflictException('Zone with this name already exists')
    }

    const newZone = this.zoneRepository.create({
      name: dto.name,
      perimeter: dto.perimeter
    })
    return this.zoneRepository.save(newZone)
  }

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

  async updateZone(id: number, updateZoneDto: UpdateZoneDTO) {
    const zone = await this.zoneRepository.findOne({ where: { id } })
    if (!zone) {
      throw new NotFoundException('Zone not found')
    }
    zone.name = updateZoneDto.name ?? zone.name
    zone.perimeter = updateZoneDto.perimeter ?? zone.perimeter

    return this.zoneRepository.save(zone)
  }

  async removeZone(id: number) {
    const zone = await this.zoneRepository.findOne({ where: { id } })
    if (!zone) {
      throw new NotFoundException('Zone not found')
    }
    return this.zoneRepository.remove(zone)
  }
}
