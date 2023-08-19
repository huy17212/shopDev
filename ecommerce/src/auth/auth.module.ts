import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { JwtStrategy } from './jwt-strategy';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/flat/auth/user.entity/user.entity';

import { Module } from '@nestjs/common';
import { AuthService } from './service/auth.service';

@Module({
  providers: [AuthService]
})
export class AuthModule {
 
}

