import { Injectable } from '@nestjs/common';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { Jobs } from './schema/jobs.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

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

  findAll() {
    return this.jobsModel.find().exec();
  }

  findOne(id: number) {
    return `This action returns a #${id} job`;
  }

  update(id: number, updateJobDto: UpdateJobDto) {
    return `This action updates a #${id} job`;
  }

  remove(id: number) {
    return `This action removes a #${id} job`;
  }
}
