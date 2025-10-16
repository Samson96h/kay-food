import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { ZonesController } from './zones.controller';
import { ZonesService } from './zones.service';
import { Zone } from '@app/common/database';
import { SharedModule } from '../../shared';


@Module({
  imports: [TypeOrmModule.forFeature([Zone]),
  JwtModule.register({}),
SharedModule],
  controllers: [ZonesController],
  providers: [ZonesService],
})
export class ZonesModule { }
