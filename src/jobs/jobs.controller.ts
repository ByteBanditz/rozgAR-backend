import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { JobsService } from './jobs.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { Candidate } from 'src/candidate/schema/candidate.schema';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createJobDto: CreateJobDto) {
    return this.jobsService.create(createJobDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.jobsService.findAll();
  }

  @Post('apply/:id')
  applyToJob(@Param('id') id: string, @Body() candidate: Candidate) {
    return this.jobsService.applyToJob(id, candidate);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':jobId/accept/:candidateId')
  async acceptCandidate(
    @Param('jobId') jobId: string,
    @Param('candidateId') candidateId: string,
  ): Promise<any> {
    // Call service method to accept the candidate
    const result = await this.jobsService.acceptCandidate(jobId, candidateId);
    return { message: 'Candidate accepted successfully', result };
  }

  @UseGuards(JwtAuthGuard)
  @Post(':jobId/reject/:candidateId')
  async rejectCandidate(
    @Param('jobId') jobId: string,
    @Param('candidateId') candidateId: string,
  ): Promise<any> {
    // Call service method to reject the candidate
    const result = await this.jobsService.rejectCandidate(jobId, candidateId);
    return { message: 'Candidate rejected successfully', result };
  }

  @UseGuards(JwtAuthGuard)
  @Get('applicants/:id')
  findOne(@Param('id') id: string) {
    return this.jobsService.getApplicants(id);
  }

  @Post('jobsMatchingSkills')
  fetchJobsMatchingSkills(@Body() candidate: Candidate) {
    return this.jobsService.fetchJobsMatchingSkills(candidate);
  }

  @Post('jobsPrefLocation/:limit')
  fetchJobsPrefLocation(
    @Body() candidate: Candidate,
    @Param('limit') limit: number,
  ) {
    return this.jobsService.fetchJobsByPreferredLocation(candidate, limit);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateJobDto: UpdateJobDto) {
    return this.jobsService.update(+id, updateJobDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.jobsService.remove(+id);
  }
}
