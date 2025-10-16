import { CreateAuthDTO } from './dto/create-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CodeDTO } from './dto/check-code.dto';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';

import { IAuthEnticationResponse } from './models/autentication-response';
import { User, SecretCode } from '@app/common/database';
import { createRandomCode } from '@app/common/helpers';
import { ConfigService } from '@nestjs/config';
import { IJWTConfig } from '@app/common';

@Injectable()
export class AuthService {
  private jwtConfig: IJWTConfig;
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(SecretCode)
    private readonly secretRepository: Repository<SecretCode>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    this.jwtConfig = this.configService.get("JWT_CONFIG") as IJWTConfig
   }

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
      { sub: user.id, phone: user.phone, temp: true }, {
      secret: this.jwtConfig.tempSecret,
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
      { sub: user.id, phone: user.phone }, {
      secret: this.jwtConfig.secret,
      expiresIn: '1d',
    },
    );

    return {
      accessToken: accessToken,
      message: 'Authentication successful',
    };
  }
}