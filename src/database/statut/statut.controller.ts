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

import { StatutService } from './statut.service';
import { StatutDto } from './statut.dto';
import { ParseJsonObjectPipe } from 'src/core/shared/pipes/json-object.pipe';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Catch()
@UseInterceptors(LoggingInterceptor)
@Controller('statut')
export class StatutController {
  constructor(private readonly statutService: StatutService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async save(@Body(new ValidationPipe()) statutDto: StatutDto) {
    const result = await this.statutService.save(statutDto);
    return result;
  }

  @Put(':primaryKey')
  @UseGuards(JwtAuthGuard)
  async update(
    @Body(new ValidationPipe()) statutDto: StatutDto,
    @Param('primaryKey', new ParseJsonPipe()) primaryKey,
  ) {
    const result = await this.statutService.update(statutDto, primaryKey);
    return result;
  }

  @Delete(':primaryKey')
  @UseGuards(JwtAuthGuard)
  async delete(@Param('primaryKey', new ParseJsonPipe()) primaryKey) {
    const result = await this.statutService.delete(primaryKey);
    return result;
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async find() {
    const result = await this.statutService.find({});
    return result;
  }

  @Get('query/:findOption')
  @UseGuards(JwtAuthGuard)
  async findQuery(@Param('findOption', new ParseJsonObjectPipe()) findOption) {
    const result = await this.statutService.find(findOption);
    return result;
  }

  @Get(':primaryKey')
  @UseGuards(JwtAuthGuard)
  async findById(@Param('primaryKey', new ParseJsonPipe()) primaryKey) {
    const result = await this.statutService.findById(primaryKey);
    return result;
  }
}
