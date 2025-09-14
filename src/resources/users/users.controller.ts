import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, UploadedFiles } from '@nestjs/common';

import { Roles, RolesGuard, AuthGuard, OwnerCheckGuard } from '../../guards';
import { FilesInterceptor } from '@nestjs/platform-express';
import { UserRole } from 'src/entities/enums/role.enum';
import { UpdateUserDTO } from './dto/update-user.dto';
import { ChangeRoleDTO } from './dto/change-role.dto';
import { UsersService } from './users.service';
import { IdDTO } from 'src/dto/id-param.dto';
import { AuthUser } from 'src/decorators/auth-user.decorator';
import { IRequestUser } from '../auth/models/request-user';



@UseGuards(AuthGuard, RolesGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Roles(UserRole.ADMIN, UserRole.USER)
  @Patch(':id')
  @UseGuards(OwnerCheckGuard)
  @UseInterceptors(FilesInterceptor('photo'))
  async updateCat(
    @Param() param: IdDTO,
    @Body() dto: UpdateUserDTO,
    @UploadedFiles() files?: Express.Multer.File[],
  ) {
    return this.usersService.updateUsersData(param.id, dto, files);
  }

  @Roles(UserRole.ADMIN)
  @Get()
  async findUsers() {
    return await this.usersService.findAll();
  }

  @Roles(UserRole.ADMIN)
  @Post(':id')
  async addAdmin(@Param() param: IdDTO, @Body() dto: ChangeRoleDTO) {
    return this.usersService.chageRoles(param.id, dto);
  }

  @Roles(UserRole.ADMIN)
  @Delete(':id')
  async deleteUser(@Param() param: IdDTO) {
    return this.usersService.removeUser(param.id);
  }


  @Post('favorites/:id')
  async addFavorite(
    @AuthUser() user: IRequestUser,
    @Param() param: IdDTO,   // <-- теперь Nest правильно обернёт { productId: "2" } → IdDTO
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



