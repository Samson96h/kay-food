import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from 'src/entities/categories-entiti';
import { MediaFiles } from 'src/entities/media-files';
import { User } from 'src/entities/users-entiti';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Category, User, MediaFiles]),
    AuthModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule { }
