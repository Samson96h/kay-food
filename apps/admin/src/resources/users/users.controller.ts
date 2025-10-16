import { Controller, Get, Body, Patch, Param, Delete, UseGuards, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';

import { OwnerCheckGuard, AdminAuthGuard } from '@app/common';
import { UpdateUserDTO } from './dto/update-user.dto';
import { UsersService } from './users.service';
import { IdDTO } from '@app/common';


@UseGuards(AdminAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }


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


  @Get()
  async findUsers() {
    return await this.usersService.findAll();
  }


  @Delete(':id')
  async deleteUser(@Param() param: IdDTO) {
    return this.usersService.removeUser(param.id);
  }

}



