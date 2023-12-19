import { Module } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { JobsController } from './jobs.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { JobsSchema } from './schema/jobs.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Jobs', schema: JobsSchema }])],
  controllers: [JobsController],
  providers: [JobsService],
})
export class JobsModule {}
