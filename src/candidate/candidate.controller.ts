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
import { CandidateService } from './candidate.service';
import { CreateCandidateDto } from './dto/create-candidate.dto';
import { UpdateCandidateDto } from './dto/update-candidate.dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

@Controller('candidate')
export class CandidateController {
  constructor(private readonly candidateService: CandidateService) {}

  @Post()
  create(@Body() createCandidateDto: CreateCandidateDto) {
    return this.candidateService.create(createCandidateDto);
  }

  @Post('addFcmToken')
  applyToJob(@Body() phone: any, token: any) {
    return this.candidateService.addFcmToken(token, phone);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.candidateService.findAll();
  }

  @Get(':phone')
  fetchCandidateByPhone(@Param('phone') phone: string) {
    return this.candidateService.fetchCandidateByPhone(phone);
  }

  @Get('accepted/:id')
  fetchAcceptedJobs(@Param('id') id: string) {
    return this.candidateService.fetchAcceptedJobs(id);
  }

  @Get('rejected/:id')
  fetchRejectedJobs(@Param('id') id: string) {
    return this.candidateService.fetchRejectedJobs(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCandidateDto: UpdateCandidateDto,
  ) {
    return this.candidateService.update(+id, updateCandidateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.candidateService.remove(+id);
  }
}
