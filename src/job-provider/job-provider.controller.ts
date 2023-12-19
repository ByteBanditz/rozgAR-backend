import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { JobProviderService } from './job-provider.service';
import {
  CreateJobProviderDto,
  LoginJobProviderDto,
} from './dto/create-job-provider.dto';
import { UpdateJobProviderDto } from './dto/update-job-provider.dto';

@Controller('job-provider')
export class JobProviderController {
  constructor(private readonly jobProviderService: JobProviderService) {}

  @Post()
  create(@Body() createJobProviderDto: CreateJobProviderDto) {
    return this.jobProviderService.create(createJobProviderDto);
  }

  @Post('login')
  login(@Body() loginJobProviderDto: LoginJobProviderDto) {
    return this.jobProviderService.login(loginJobProviderDto);
  }

  @Get()
  findAll() {
    return this.jobProviderService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.jobProviderService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateJobProviderDto: UpdateJobProviderDto,
  ) {
    return this.jobProviderService.update(+id, updateJobProviderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.jobProviderService.remove(+id);
  }
}
