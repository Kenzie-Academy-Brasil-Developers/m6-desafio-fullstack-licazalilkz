import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { ClientsService } from '../clients/clients.service';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private clientsService: ClientsService,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const client = await this.clientsService.findByEmail(loginDto.email);
    if (!client) {
      throw new UnauthorizedException(
        'Email doesnt exists or is wrong, please try again.',
      );
    }
    if (!(await compare(loginDto.password, client.password))) {
      throw new UnauthorizedException('Invalid password !');
    }

    return {
      token: this.jwtService.sign(
        { email: loginDto.email },
        { subject: client.id, secret: process.env.SECRET_KEY },
      ),
      id: client.id,
    };
  }
}
