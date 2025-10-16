import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { Category, MediaFiles, Product, User } from '@app/common/database';
import { UsersController } from './users.controller';
import { AuthModule } from '../auth/auth.module';
import { UsersService } from './users.service';


@Module({
  imports: [TypeOrmModule.forFeature([Category, User, MediaFiles, Product]),
    AuthModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule { }
