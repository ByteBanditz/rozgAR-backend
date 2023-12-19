import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CandidateService } from './candidate.service';
import { CandidateController } from './candidate.controller';
import { CandidateSchema } from './schema/candidate.schema';
import { JobsSchema } from 'src/jobs/schema/jobs.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Jobs', schema: JobsSchema }]),
    MongooseModule.forFeature([{ name: 'Candidate', schema: CandidateSchema }]),
  ],
  controllers: [CandidateController],
  providers: [CandidateService],
})
export class CandidateModule {}
