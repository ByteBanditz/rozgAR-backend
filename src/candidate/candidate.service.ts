import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCandidateDto } from './dto/create-candidate.dto';
import { UpdateCandidateDto } from './dto/update-candidate.dto';
import { Candidate } from './schema/candidate.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class CandidateService {
  constructor(
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
