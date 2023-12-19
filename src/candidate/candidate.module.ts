import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CandidateService } from './candidate.service';
import { CandidateController } from './candidate.controller';
import { CandidateSchema } from './schema/candidate.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Candidate', schema: CandidateSchema }]),
  ],
  controllers: [CandidateController],
  providers: [CandidateService],
})
export class CandidateModule {}
