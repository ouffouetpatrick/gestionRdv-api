import {
  Body,
  Catch,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ParseJsonPipe } from '../../core/shared/pipes/parse-json.pipe';
import { ValidationPipe } from '../../core/shared/pipes/validation.pipe';
import { LoggingInterceptor } from '../../core/shared/interceptors/logging.interceptor';

import { MotifService } from './motif.service';
import { MotifDto } from './motif.dto';
import { ParseJsonObjectPipe } from 'src/core/shared/pipes/json-object.pipe';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Catch()
@UseInterceptors(LoggingInterceptor)
@Controller('motif')
export class MotifController {
  constructor(private readonly motifService: MotifService) {}

  @Post()
  // @UseGuards(JwtAuthGuard)
  async save(@Body(new ValidationPipe()) motifDto: MotifDto) {
    const result = await this.motifService.save(motifDto);
    return result;
  }

  @Put(':primaryKey')
  @UseGuards(JwtAuthGuard)
  async update(
    @Body(new ValidationPipe()) motifDto: MotifDto,
    @Param('primaryKey', new ParseJsonPipe()) primaryKey,
  ) {
    const result = await this.motifService.update(motifDto, primaryKey);
    return result;
  }

  @Delete(':primaryKey')
  @UseGuards(JwtAuthGuard)
  async delete(@Param('primaryKey', new ParseJsonPipe()) primaryKey) {
    const result = await this.motifService.delete(primaryKey);
    return result;
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async find() {
    const result = await this.motifService.find({});
    return result;
  }

  @Get('query/:findOption')
  @UseGuards(JwtAuthGuard)
  async findQuery(@Param('findOption', new ParseJsonObjectPipe()) findOption) {
    const result = await this.motifService.find(findOption);
    return result;
  }

  @Get(':primaryKey')
  @UseGuards(JwtAuthGuard)
  async findById(@Param('primaryKey', new ParseJsonPipe()) primaryKey) {
    const result = await this.motifService.findById(primaryKey);
    return result;
  }
}
