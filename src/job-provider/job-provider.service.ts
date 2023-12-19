import { Injectable } from '@nestjs/common';
import { CreateJobProviderDto } from './dto/create-job-provider.dto';
import { UpdateJobProviderDto } from './dto/update-job-provider.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JobProvider } from './schema/jobProvider.schema';

@Injectable()
export class JobProviderService {
  constructor(
    @InjectModel('JobProvider')
    private readonly jobProviderModel: Model<JobProvider>,
  ) {}

  async create(
    createJobProviderDto: CreateJobProviderDto,
  ): Promise<JobProvider> {
    const createdJobProvider = new this.jobProviderModel(createJobProviderDto);
    return createdJobProvider.save();
  }

  findAll() {
    return this.jobProviderModel.find().exec();
  }

  findOne(id: number) {
    return `This action returns a #${id} jobProvider`;
  }

  update(id: number, updateJobProviderDto: UpdateJobProviderDto) {
    return `This action updates a #${id} jobProvider`;
  }

  remove(id: number) {
    return `This action removes a #${id} jobProvider`;
  }
}
