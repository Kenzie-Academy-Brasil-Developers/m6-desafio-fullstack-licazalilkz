import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ClientsService } from '../clients/clients.service';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'prisma/database/prisma.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    ClientsService,
    JwtService,
    PrismaService,
    JwtStrategy,
  ],
})
export class AuthModule {}
