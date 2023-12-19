import { Module } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { JobsController } from './jobs.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { JobsSchema } from './schema/jobs.schema';
import { CandidateSchema } from 'src/candidate/schema/candidate.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Jobs', schema: JobsSchema }]),
    MongooseModule.forFeature([{ name: 'Candidate', schema: CandidateSchema }]),
  ],
  controllers: [JobsController],
  providers: [JobsService],
})
export class JobsModule {}
