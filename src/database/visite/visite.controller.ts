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

import { VisiteService } from './visite.service';
import VisiteDto from './visite.dto';
import { ParseJsonObjectPipe } from 'src/core/shared/pipes/json-object.pipe';

@Catch()
@UseInterceptors(LoggingInterceptor)
@Controller('visite')
export class VisiteController {
  constructor(private readonly visiteService: VisiteService) {}

  @Post()
  async save(@Body(new ValidationPipe()) visiteDto: VisiteDto) {
    const result = await this.visiteService.save(visiteDto);
    return result;
  }

  @Put(':primaryKey')
  async update(
    @Body(new ValidationPipe()) visiteDto: VisiteDto,
    @Param('primaryKey', new ParseJsonPipe()) primaryKey,
  ) {
    const result = await this.visiteService.update(visiteDto, primaryKey);
    return result;
  }

  @Delete(':primaryKey')
  async delete(@Param('primaryKey', new ParseJsonPipe()) primaryKey) {
    const result = await this.visiteService.delete(primaryKey);
    return result;
  }

  @Get()
  async find() {
    const result = await this.visiteService.find({});
    return result;
  }

  @Get('query/:findOption')
  async findQuery(@Param('findOption', new ParseJsonObjectPipe()) findOption) {
    const result = await this.visiteService.find(findOption);
    return result;
  }

  @Get(':primaryKey')
  async findById(@Param('primaryKey', new ParseJsonPipe()) primaryKey) {
    const result = await this.visiteService.findById(primaryKey);
    return result;
  }
}
