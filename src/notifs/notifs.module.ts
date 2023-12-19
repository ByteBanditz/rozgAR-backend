import { Module } from '@nestjs/common';
import { NotifsService } from './notifs.service';
import { NotifsController } from './notifs.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { NotifsSchema } from './schema/notifs.schema';
import { CandidateSchema } from 'src/candidate/schema/candidate.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Notifs', schema: NotifsSchema }]),
    MongooseModule.forFeature([{ name: 'Candidate', schema: CandidateSchema }]),
  ],
  controllers: [NotifsController],
  providers: [NotifsService],
})
export class NotifsModule {}
