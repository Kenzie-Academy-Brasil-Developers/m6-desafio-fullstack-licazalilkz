import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ClientsService } from '../clients/clients.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PrismaService } from 'prisma/database/prisma.service';
import { JwtStrategy } from './jwt.strategy';
import { ClientsModule } from '../clients/clients.module';

@Module({
  imports: [
    ClientsModule,
    JwtModule.register({
      secret: process.env.SECRET_KEY,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, ClientsService, PrismaService, JwtStrategy],
})
export class AuthModule {}
