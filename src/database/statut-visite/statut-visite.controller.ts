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

import { StatutVisiteService } from './statut-visite.service';
import StatutVisiteDto from './statut-visite.dto';
import { ParseJsonObjectPipe } from 'src/core/shared/pipes/json-object.pipe';

@Catch()
@UseInterceptors(LoggingInterceptor)
@Controller('statutVisite')
export class StatutVisiteController {
  constructor(private readonly statutVisiteService: StatutVisiteService) {}

  @Post()
  async save(@Body(new ValidationPipe()) statutVisiteDto: StatutVisiteDto) {
    const result = await this.statutVisiteService.save(statutVisiteDto);
    return result;
  }

  @Put(':primaryKey')
  async update(
    @Body(new ValidationPipe()) statutVisiteDto: StatutVisiteDto,
    @Param('primaryKey', new ParseJsonPipe()) primaryKey,
  ) {
    const result = await this.statutVisiteService.update(statutVisiteDto, primaryKey);
    return result;
  }

  @Delete(':primaryKey')
  async delete(@Param('primaryKey', new ParseJsonPipe()) primaryKey) {
    const result = await this.statutVisiteService.delete(primaryKey);
    return result;
  }

  @Get()
  async find() {
    const result = await this.statutVisiteService.find({});
    return result;
  }

  @Get('query/:findOption')
  async findQuery(@Param('findOption', new ParseJsonObjectPipe()) findOption) {
    const result = await this.statutVisiteService.find(findOption);
    return result;
  }

  @Get(':primaryKey')
  async findById(@Param('primaryKey', new ParseJsonPipe()) primaryKey) {
    const result = await this.statutVisiteService.findById(primaryKey);
    return result;
  }
}
