import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { Category, MediaFiles, Product, User } from '../../../../../libs/common/src/database/entities';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { SharedModule } from '../../shared/SharedModule';

@Module({
  imports: [
    TypeOrmModule.forFeature([Category, User, MediaFiles, Product]),
    SharedModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}