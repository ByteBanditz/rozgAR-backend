import { PartialType } from '@nestjs/mapped-types';
import { CreateJobProviderDto } from './create-job-provider.dto';

export class UpdateJobProviderDto extends PartialType(CreateJobProviderDto) {}
