import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDTO } from './dto/update-user.dto';
import { Roles, RolesGuard } from 'src/guards/roles.guard';
import { AuthGuard } from 'src/guards/auth.guard';
import { UserRole } from 'src/entities/enums/role.enum';
import { FilesInterceptor } from '@nestjs/platform-express';
import { OwnerCheckGuard } from 'src/guards/owner-check-guard';
import { ChangeRoleDTO } from './dto/change-role.dto';



@UseGuards(AuthGuard, RolesGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Roles(UserRole.ADMIN, UserRole.USER)
  @Patch(':id')
  @UseGuards(OwnerCheckGuard)
  @UseInterceptors(FilesInterceptor('photo'))
  async updateCat(
    @Param('id') id: number,
    @Body() dto: UpdateUserDTO,
    @UploadedFiles() files?: Express.Multer.File[],
  ) {
    return this.usersService.updateUsersData(id, dto, files);
  }

  @Roles(UserRole.ADMIN)
  @Get()
  async findUsers() {
    return await this.usersService.findAll();
  }

  @Roles(UserRole.ADMIN)
  @Post(':id')
  async addAdmin(@Param('id') id: number, @Body() dto: ChangeRoleDTO) {
    return this.usersService.chageRoles(id, dto);
  }

  @Roles(UserRole.ADMIN)
  @Delete(':id')
  async deleteUser(@Param('id') id: number) {
    return this.usersService.removeUser(id);
  }
}



