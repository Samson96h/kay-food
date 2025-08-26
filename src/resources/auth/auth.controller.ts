import { Body, Controller, Post, UseGuards} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CodeDTO } from './dto/check-code.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { CreateAuthDTO } from './dto/create-auth.dto';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async login (@Body() dto: CreateAuthDTO) {
    return this.authService.loginOrRegister(dto)
  }

  @UseGuards(AuthGuard)
  @Post('login')
  async confirm(@Body() dto: CodeDTO) {
    return this.authService.authentication(dto);
  }
  
}
