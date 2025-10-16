import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';

import { AuthGuard, OwnerCheckGuard } from '../../../../../libs/common/src/guards';
import { AuthUser } from '../../../../../libs/common/src/decorators/auth-user.decorator';
import { UpdateUserDTO } from './dto/update-user.dto';
import { IRequestUser } from './models/request-user';
import { UsersService } from './users.service';
import { IdDTO } from '@app/common';


@UseGuards(AuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }


  @Patch(':id')
  @UseGuards(OwnerCheckGuard)
  @UseInterceptors(FilesInterceptor('photo'))
  async updateData(
    @Param() param: IdDTO,
    @Body() dto: UpdateUserDTO,
    @UploadedFiles() files?: Express.Multer.File[],
  ) {
    return this.usersService.updateUsersData(param.id, dto, files);
  }



  @Post('favorites/:id')
  async addFavorite(
    @AuthUser() user: IRequestUser,
    @Param() param: IdDTO,
  ) {
    return this.usersService.addFavorite(user.id, param.id);
  }

  @Get('favorites')
  async getFavorites(@AuthUser() user: IRequestUser) {
    return this.usersService.getFavorites(user.id);
  }

  @Delete('favorites/:id')
  async removeFavorite(
    @AuthUser() user: IRequestUser,
    @Param() param: IdDTO,
  ) {
    return this.usersService.removeFavorite(user.id, param.id);
  }

}



