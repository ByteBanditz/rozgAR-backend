import { Injectable } from '@nestjs/common';
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
