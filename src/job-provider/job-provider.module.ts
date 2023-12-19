import { Module } from '@nestjs/common';
import { JobProviderService } from './job-provider.service';
import { JobProviderController } from './job-provider.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { JobProviderSchema } from './schema/jobProvider.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'JobProvider', schema: JobProviderSchema },
    ]),
  ],
  controllers: [JobProviderController],
  providers: [JobProviderService],
})
export class JobProviderModule {}
