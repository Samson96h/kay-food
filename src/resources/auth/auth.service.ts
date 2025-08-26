import { Injectable } from '@nestjs/common';
import { CreateAuthDTO } from './dto/create-auth.dto';
import { CodeDTO } from './dto/check-code.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/users-entiti';
import { Repository } from 'typeorm';
import { SecretCode } from 'src/entities/secret-code';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { IAuthEnticationResponse } from './models/autentication-response';
import { createRandomCode } from 'src/helpers/code-helper';
import { UserRole } from 'src/entities/enums/role.enum';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(SecretCode)
    private readonly secretRepository: Repository<SecretCode>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) { }

  async loginOrRegister(dto: CreateAuthDTO): Promise<IAuthEnticationResponse> {
    const { phone } = dto;
    let user = await this.userRepository.findOne({ where: { phone } });
    if (!user) {
      user = this.userRepository.create({ phone });
      await this.userRepository.save(user);
    }

    const existing = await this.secretRepository.findOne({ where: { user: { id: user.id } } });
    if (existing) {
      await this.secretRepository.delete({ id: existing.id });
    }

    const tempToken = this.jwtService.sign(
      { sub: user.id, phone: user.phone, role: UserRole, temp: true }, {
      secret: this.configService.get<string>('JWT_TEMP_SECRET'),
      expiresIn: '10m',
    },
    );
    const code = createRandomCode().toString()

    const secretCode = this.secretRepository.create({ code, user });
    await this.secretRepository.save(secretCode);

    return {
      accessToken: tempToken,
      code,
    };
  }

  async authentication(dto: CodeDTO): Promise<IAuthEnticationResponse> {
    const existing = await this.secretRepository.findOne({
      where: { code: dto.code },
      relations: ['user'],
    });

    if (!existing) {
      return { message: 'Invalid code' };
    }

    await this.secretRepository.delete({ id: existing.id });

    const user = existing.user;

    const accessToken = this.jwtService.sign(
      { sub: user.id, phone: user.phone, role: existing.user.roles }, {
      secret: this.configService.get<string>('JWT_SECRET'),
      expiresIn: '1d',
    },
    );

    return {
      accessToken: accessToken,
      message: 'Authentication successful',
    };
  }
}