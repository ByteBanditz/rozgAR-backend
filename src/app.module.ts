import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CandidateModule } from './candidate/candidate.module';
import { JobsModule } from './jobs/jobs.module';
import { JobProviderModule } from './job-provider/job-provider.module';
import { NotifsModule } from './notifs/notifs.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    CandidateModule,
    JobsModule,
    JobProviderModule,
    MongooseModule.forRoot(
      'mongodb+srv://abhidg:ZEI82rZhfkqBB6wD@cluster0.fbczjdl.mongodb.net/?retryWrites=true&w=majority',
    ),
    NotifsModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
