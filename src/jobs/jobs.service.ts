import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { Jobs } from './schema/jobs.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Candidate } from 'src/candidate/schema/candidate.schema';

@Injectable()
export class JobsService {
  constructor(
    @InjectModel('Jobs')
    private readonly jobsModel: Model<Jobs>,
  ) {}

  async create(createJobDto: CreateJobDto): Promise<Jobs> {
    const createdJobProvider = new this.jobsModel(createJobDto);
    return createdJobProvider.save();
  }

  async findAll(): Promise<Jobs[]> {
    return this.jobsModel.find().exec();
  }

  async getApplicants(jobId: string): Promise<any> {
    try {
      const job = await this.jobsModel.findById(jobId).exec();

      if (!job) {
        throw new NotFoundException(`Job with id ${jobId} not found`);
      }

      const applicants = job.applicants; // Assuming 'applicants' is the array field in your schema

      return applicants;
    } catch (error) {
      throw new NotFoundException(`Job with id ${jobId} not found`);
    }
  }

  async applyToJob(jobId: string, candidate: Candidate): Promise<any> {
    try {
      const job = await this.jobsModel.findById(jobId).exec();

      if (!job) {
        throw new NotFoundException(`Job with id ${jobId} not found`);
      }

      // Add the candidate to the 'applicants' array
      job.applicants.push(candidate);

      // Save the updated job document
      await job.save();

      return job.applicants; // Return the updated list of applicants
    } catch (error) {
      throw new NotFoundException(`Job with id ${jobId} not found`);
    }
  }

  update(id: number, updateJobDto: UpdateJobDto) {
    return `This action updates a #${id} job`;
  }

  remove(id: number) {
    return `This action removes a #${id} job`;
  }
}
