import { Module } from '@nestjs/common';
import { JobProviderService } from './job-provider.service';
import { JobProviderController } from './job-provider.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { JobProviderSchema } from './schema/jobProvider.schema';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { JwtStrategy } from '../passport/jwt.strategy';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'JobProvider', schema: JobProviderSchema },
    ]),
    JwtModule.register({
      secret: 'vhbadsjhvdhkfs53s4+8',
      signOptions: { expiresIn: '19h' },
    }),
  ],
  controllers: [JobProviderController],
  providers: [JobProviderService, JwtStrategy],
})
export class JobProviderModule {}
