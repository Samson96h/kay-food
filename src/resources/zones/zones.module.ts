import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { ZonesController } from './zones.controller';
import { ZonesService } from './zones.service';
import { Zone } from 'src/entities';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Zone]),
  JwtModule.register({})],
  controllers: [ZonesController],
  providers: [ZonesService],
})
export class ZonesModule { }
