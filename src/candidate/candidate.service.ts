import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCandidateDto } from './dto/create-candidate.dto';
import { UpdateCandidateDto } from './dto/update-candidate.dto';
import { Candidate } from './schema/candidate.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Jobs } from 'src/jobs/schema/jobs.schema';

@Injectable()
export class CandidateService {
  constructor(
    @InjectModel('Jobs')
    private readonly jobsModel: Model<Jobs>,
    @InjectModel('Candidate') private readonly candidateModel: Model<Candidate>,
  ) {}

  async create(createCandidateDto: CreateCandidateDto): Promise<Candidate> {
    const createdCandidate = new this.candidateModel(createCandidateDto);
    return createdCandidate.save();
  }

  async addFcmToken(token: string, phone: string): Promise<Candidate> {
    try {
      const candidate = await this.candidateModel.findOne({ phone }).exec();

      if (!candidate) {
        throw new NotFoundException(`Candidate with phone:${phone} not found`);
      }

      candidate.fcmToken.push(token);

      await candidate.save();

      return candidate;
    } catch (error) {
      // Handle any errors that may occur during the process
      throw error;
    }
  }

  async findAll(): Promise<Candidate[]> {
    return this.candidateModel.find().exec();
  }

  async fetchAcceptedJobs(candidateId: string): Promise<any[]> {
    const candidate = await this.candidateModel.findById(candidateId).exec();

    if (!candidate) {
      // Handle the case where the candidate is not found
      throw new NotFoundException('Candidate not found');
    }

    // Fetch the accepted jobs for the candidate
    const acceptedJobs = await this.jobsModel
      .find({ _id: { $in: candidate.acceptedJobs } })
      .exec();

    return acceptedJobs;
  }
  async fetchRejectedJobs(candidateId: string): Promise<any[]> {
    const candidate = await this.candidateModel.findById(candidateId).exec();

    if (!candidate) {
      // Handle the case where the candidate is not found
      throw new NotFoundException('Candidate not found');
    }

    // Fetch the accepted jobs for the candidate
    const rejectedJobs = await this.jobsModel
      .find({ _id: { $in: candidate.rejectedJobs } })
      .exec();

    return rejectedJobs;
  }

  async fetchCandidateByPhone(phone: string): Promise<Candidate> {
    const candidate = await this.candidateModel.findOne({ phone }).exec();

    if (!candidate) {
      throw new NotFoundException(`Candidate with phone:${phone} not found`);
    }
    return candidate;
  }

  findOne(id: number) {
    return `This action returns a #${id} candidate`;
  }

  update(id: number, updateCandidateDto: UpdateCandidateDto) {
    return `This action updates a #${id} candidate`;
  }

  remove(id: number) {
    return `This action removes a #${id} candidate`;
  }
}
