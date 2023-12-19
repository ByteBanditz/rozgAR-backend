import { Injectable, UnauthorizedException } from '@nestjs/common';
import {
  CreateJobProviderDto,
  LoginJobProviderDto,
} from './dto/create-job-provider.dto';
import { UpdateJobProviderDto } from './dto/update-job-provider.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { JobProvider } from './schema/jobProvider.schema';

@Injectable()
export class JobProviderService {
  constructor(
    @InjectModel('JobProvider')
    private readonly jobProviderModel: Model<JobProvider>,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginJobProviderDto: LoginJobProviderDto): Promise<any> {
    // Using findOne with email
    const user = await this.jobProviderModel
      .findOne({ email: loginJobProviderDto.email })
      .exec();

    // Check if the user is found
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    // Compare passwords using a secure method, e.g., bcrypt
    const isPasswordValid = await this.comparePasswords(
      loginJobProviderDto.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const payload = {
      sub: user.id,
      username: user.organisationName,
      phone: user.phone,
    };

    console.log(payload);

    return this.jwtService.signAsync(payload, {
      expiresIn: '19d',
    });
  }

  private async comparePasswords(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    // Implement your secure password comparison logic here, e.g., using bcrypt
    // For example purposes, we assume a direct comparison (not recommended for production)
    return plainTextPassword === hashedPassword;
  }

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
