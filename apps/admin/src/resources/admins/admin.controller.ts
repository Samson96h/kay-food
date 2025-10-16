import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDTO } from './dto/create-admin.dto';
import { AdminAuthGuard } from '@app/common';
import { AdminLoginDTO } from './dto/admin-login.dto';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) { }

  @UseGuards(AdminAuthGuard)
  @Post()
  async addAdmin(@Body() createAdminDto: CreateAdminDTO) {
    return this.adminService.addAdmin(createAdminDto);
  }

  @Post('login')
  async adminLogin(@Body() login: AdminLoginDTO) {
    return this.adminService.adminLogin(login)
  }

  @UseGuards(AdminAuthGuard)
  @Get()
  async findAll() {
    return this.findAll()
  }

}
